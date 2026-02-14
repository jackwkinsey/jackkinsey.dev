import { useEffect, useRef } from "react";

const GRID_SIZE = 50;
const CYCLE_COUNT = 8;
const TRAIL_LENGTH = 12;
const SPEED = 1.5;

const COLORS = [
  { r: 0, g: 240, b: 255 },   // cyan
  { r: 0, g: 240, b: 255 },   // cyan
  { r: 255, g: 0, b: 170 },   // magenta
  { r: 0, g: 240, b: 255 },   // cyan
  { r: 123, g: 45, b: 255 },  // electric purple
  { r: 0, g: 240, b: 255 },   // cyan
  { r: 255, g: 0, b: 170 },   // magenta
  { r: 0, g: 240, b: 255 },   // cyan
];

type Direction = 0 | 1 | 2 | 3; // right, down, left, up

const DX: Record<Direction, number> = { 0: 1, 1: 0, 2: -1, 3: 0 };
const DY: Record<Direction, number> = { 0: 0, 1: 1, 2: 0, 3: -1 };

interface Cycle {
  x: number;
  y: number;
  dir: Direction;
  trail: { x: number; y: number }[];
  color: { r: number; g: number; b: number };
  nextTurn: number;
  progress: number;
}

function randomDir(): Direction {
  return (Math.floor(Math.random() * 4)) as Direction;
}

function turnOptions(dir: Direction): Direction[] {
  // Can go straight, turn left, or turn right — never reverse
  const left = ((dir + 3) % 4) as Direction;
  const right = ((dir + 1) % 4) as Direction;
  return [dir, dir, dir, left, right]; // weighted toward straight
}

function initCycle(w: number, h: number, index: number): Cycle {
  const cols = Math.floor(w / GRID_SIZE);
  const rows = Math.floor(h / GRID_SIZE);
  const gridX = Math.floor(Math.random() * cols);
  const gridY = Math.floor(Math.random() * rows);
  const dir = randomDir();

  return {
    x: gridX * GRID_SIZE,
    y: gridY * GRID_SIZE,
    dir,
    trail: [],
    color: COLORS[index % COLORS.length],
    nextTurn: GRID_SIZE,
    progress: 0,
  };
}

export default function LightCycles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cyclesRef = useRef<Cycle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = document.documentElement.scrollHeight;

      // Re-init cycles if none exist or canvas resized significantly
      if (cyclesRef.current.length === 0) {
        cyclesRef.current = Array.from({ length: CYCLE_COUNT }, (_, i) =>
          initCycle(canvas!.width, canvas!.height, i)
        );
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function wrap(cycle: Cycle) {
      const w = canvas!.width;
      const h = canvas!.height;
      if (cycle.x < -GRID_SIZE) cycle.x = w + GRID_SIZE;
      if (cycle.x > w + GRID_SIZE) cycle.x = -GRID_SIZE;
      if (cycle.y < -GRID_SIZE) cycle.y = h + GRID_SIZE;
      if (cycle.y > h + GRID_SIZE) cycle.y = -GRID_SIZE;
    }

    function tick() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      for (const cycle of cyclesRef.current) {
        // Move
        cycle.x += DX[cycle.dir] * SPEED;
        cycle.y += DY[cycle.dir] * SPEED;
        cycle.progress += SPEED;

        // Record trail
        cycle.trail.push({ x: cycle.x, y: cycle.y });
        if (cycle.trail.length > TRAIL_LENGTH * (GRID_SIZE / SPEED)) {
          cycle.trail.shift();
        }

        // Turn at grid intersections
        if (cycle.progress >= cycle.nextTurn) {
          cycle.progress = 0;
          cycle.nextTurn = GRID_SIZE;
          const options = turnOptions(cycle.dir);
          cycle.dir = options[Math.floor(Math.random() * options.length)];
          // Snap to grid
          cycle.x = Math.round(cycle.x / GRID_SIZE) * GRID_SIZE;
          cycle.y = Math.round(cycle.y / GRID_SIZE) * GRID_SIZE;
        }

        wrap(cycle);

        // Draw trail
        const { r, g, b } = cycle.color;
        const len = cycle.trail.length;
        if (len < 2) continue;

        for (let i = 1; i < len; i++) {
          const prev = cycle.trail[i - 1];
          const curr = cycle.trail[i];

          // Skip trail segments that wrap around the screen
          if (Math.abs(curr.x - prev.x) > GRID_SIZE * 2 || Math.abs(curr.y - prev.y) > GRID_SIZE * 2) continue;

          const alpha = (i / len) * 0.6;
          const width = (i / len) * 2;
          ctx!.beginPath();
          ctx!.moveTo(prev.x, prev.y);
          ctx!.lineTo(curr.x, curr.y);
          ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx!.lineWidth = width;
          ctx!.stroke();
        }

        // Draw head glow
        const head = cycle.trail[len - 1];
        const gradient = ctx!.createRadialGradient(head.x, head.y, 0, head.x, head.y, 8);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.3)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Bright center dot
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, 0.9)`;
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}

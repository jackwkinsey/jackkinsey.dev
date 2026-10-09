import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
} from "motion/react";
import { cn } from "@/lib/utils";

const spring: SpringOptions = { damping: 30, stiffness: 160, mass: 1 };

/**
 * Leans its content toward the mouse cursor with a soft glare. Touch input
 * and reduced-motion users get a flat card.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 7,
  radius = 14,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const lift = useSpring(0, spring);
  const glareOpacity = useSpring(0, spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(224,240,255,0.14), transparent 55%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 2 * maxTilt * 0.85);
    rotateY.set((px - 0.5) * 2 * maxTilt);
    lift.set(12);
    glareOpacity.set(1);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    glareOpacity.set(0);
  }

  return (
    <div
      ref={ref}
      className={cn("[perspective:900px]", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, z: lift }}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: glare, opacity: glareOpacity, borderRadius: radius }}
        />
      </motion.div>
    </div>
  );
}

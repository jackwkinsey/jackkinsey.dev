import { useEffect, useRef, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);
  const glitchingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const scheduleRef = useRef<ReturnType<typeof setTimeout>>();

  function triggerGlitch() {
    if (glitchingRef.current) return;
    glitchingRef.current = true;
    setGlitching(true);
    const duration = 800 + Math.random() * 1200; // 0.8-2s burst
    timeoutRef.current = setTimeout(() => {
      glitchingRef.current = false;
      setGlitching(false);
    }, duration);
  }

  // Random glitch with scheduling that doesn't re-run on state changes
  useEffect(() => {
    function scheduleNext() {
      const delay = 8000 + Math.random() * 12000; // 8-20s between glitches
      scheduleRef.current = setTimeout(() => {
        triggerGlitch();
        scheduleNext();
      }, delay);
    }
    scheduleNext();
    return () => {
      clearTimeout(scheduleRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      className={`glitch-wrapper ${className}`}
      onMouseEnter={triggerGlitch}
    >
      <span className="glitch-text" data-text={text} aria-hidden="false">
        {text}
      </span>
      <span
        className={`glitch-layer glitch-cyan ${glitching ? "glitch-active" : ""}`}
        data-text={text}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className={`glitch-layer glitch-magenta ${glitching ? "glitch-active" : ""}`}
        data-text={text}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}

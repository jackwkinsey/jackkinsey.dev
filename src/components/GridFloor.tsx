import { cn } from "@/lib/utils";

/**
 * A neon grid floor receding to a glowing horizon, with a couple of light
 * cycles crossing it. Purely decorative; animation stops under
 * prefers-reduced-motion (see index.css).
 */
export default function GridFloor({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none overflow-hidden [perspective:260px] [perspective-origin:50%_0%] md:[perspective:420px]",
        className,
      )}
    >
      <div className="grid-floor-plane absolute -inset-x-[60%] top-0 h-full origin-top [transform:rotateX(72deg)] md:-inset-x-1/2">
        <span className="light-streak top-1/2 w-[90px] bg-[linear-gradient(90deg,transparent,#ff00aa)] shadow-[0_0_8px_#ff00aa] md:top-[40%] md:w-[140px]" />
        <span
          className="light-streak top-[70%] hidden w-[160px] bg-[linear-gradient(270deg,transparent,#00f0ff)] shadow-[0_0_8px_#00f0ff] md:block"
          style={{ animationDuration: "12s", animationDelay: "-5s", animationDirection: "reverse" }}
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-[rgba(0,240,255,0.5)] shadow-[0_0_14px_2px_rgba(0,240,255,0.35)]" />
    </div>
  );
}

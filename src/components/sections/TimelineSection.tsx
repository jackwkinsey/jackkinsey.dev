import DesktopTimeline from "@/components/timeline/DesktopTimeline";
import MobileTimeline from "@/components/timeline/MobileTimeline";

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="scroll-mt-4 border-t border-[rgba(0,240,255,0.12)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:px-6 md:py-24">
        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-xs tracking-wider text-[#00f0ff]">// TIMELINE</p>
          <h2
            id="timeline-heading"
            className="font-serif text-[26px] leading-tight font-bold text-[#e0f0ff] [text-shadow:0_0_12px_rgba(0,240,255,0.55)] md:text-[40px]"
          >
            Where I've been
          </h2>
          <p className="hidden max-w-xl text-lg text-[#8b93a3] lg:block">
            Over a decade of jobs, side projects and game jams. Hover a dot for a quick look, or
            click it for the full story.
          </p>
        </div>
        <div className="hidden lg:block">
          <DesktopTimeline />
        </div>
        <div className="lg:hidden">
          <MobileTimeline />
        </div>
      </div>
    </section>
  );
}

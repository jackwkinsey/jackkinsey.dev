import { useState } from "react";
import { cn } from "@/lib/utils";

interface AboutItem {
  title: string;
  color: string;
  rgb: string;
  description: string;
}

const ABOUT_ITEMS: AboutItem[] = [
  {
    title: "Career",
    color: "#00f0ff",
    rgb: "0,240,255",
    description:
      "I'm Jack, a Senior Frontend Engineer based in Fort Wayne, Indiana, with over a decade of experience building for the web. I've shipped production code at Apple, worked on data visualization platforms at Exaptive, and currently lead frontend efforts at Plantbid, where I build cross-framework component libraries and bridge the gap between backend and frontend teams.",
  },
  {
    title: "Toolkit",
    color: "#00ff88",
    rgb: "0,255,136",
    description:
      "My core toolkit is React and TypeScript, but I'm most at home wherever the problem is interesting. I've built rich data visualizations with D3, developed cross-platform mobile apps with Expo, and I'm always looking for ways to push what's possible in the browser. Lately I've been deep into AI-assisted development workflows, using tools like Claude Code to dramatically scale my output as a solo developer on side projects.",
  },
  {
    title: "Projects",
    color: "#ff4fc3",
    rgb: "255,0,170",
    description:
      "I'm usually building something outside of work, too. RowLog is my rowing workout tracker with detailed data visualization. HavenPlate is a mobile app helping families navigate dietary restrictions. And Subsisters is an indie game I'm developing with Phaser. I gravitate toward projects that sit at the intersection of thoughtful UI, real utility, and a little creative ambition.",
  },
  {
    title: "Interests",
    color: "#a77bff",
    rgb: "167,123,255",
    description:
      "Beyond code, I produce industrial and electronic music under the name Twelve Dead Prophets, row on a Concept2 RowERG, and play way too much Magic: The Gathering. I've given talks on React, C#, and Unity game development, and I genuinely enjoy the craft of explaining technical ideas clearly, whether that's in a conference talk, a PR description, or a Discord thread with my team.",
  },
];

/** Jack's photo, which swaps to Blue Steel on hover (mouse) or tap (touch). */
function Photo({ className }: { className?: string }) {
  const [steel, setSteel] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={steel}
      aria-label={steel ? "Photo of Jack doing Blue Steel. Activate to switch back." : "Photo of Jack. Activate for Blue Steel."}
      onPointerEnter={(e) => e.pointerType === "mouse" && setSteel(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setSteel(false)}
      onClick={(e) => {
        // Mouse users already see it on hover; keyboard and touch toggle it
        if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") setSteel((s) => !s);
      }}
      className={cn(
        "relative block cursor-pointer overflow-hidden rounded border border-[rgba(0,240,255,0.3)] bg-[#0d0d1a] p-0 neon-border",
        className,
      )}
    >
      <img
        src={steel ? "images/blue-steel.jpg" : "images/jack.jpg"}
        alt=""
        className="size-full object-cover"
      />
      {steel && (
        <span className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full bg-black/65 px-3 py-1 font-mono text-xs text-[#ff4fc3] neon-magenta md:block">
          BLUE STEEL
        </span>
      )}
    </button>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      // Fades the page's flat grid in below the hero's grid floor
      className="scroll-mt-4 bg-[linear-gradient(to_bottom,#0a0a0f,rgba(10,10,15,0)_200px)] md:bg-[linear-gradient(to_bottom,#0a0a0f,rgba(10,10,15,0)_280px)]"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-start gap-6 px-4 py-14 md:gap-14 md:px-6 md:py-24">
        <figure className="m-0 hidden max-w-[380px] flex-[1_1_300px] flex-col gap-3 md:flex">
          <Photo className="aspect-[3/4] w-full" />
          <figcaption className="font-mono text-xs text-[#8b93a3]">Hover (or tap) for my best look.</figcaption>
        </figure>

        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-6 md:gap-8">
          <div className="flex items-center gap-4">
            <Photo className="size-28 shrink-0 md:hidden" />
            <div className="flex min-w-0 flex-col gap-2 md:gap-2.5">
              <p className="font-mono text-[11px] tracking-wider text-[#00f0ff] md:text-xs">// ABOUT</p>
              <h2
                id="about-heading"
                className="font-serif text-[22px] leading-tight font-bold text-[#e0f0ff] [text-shadow:0_0_12px_rgba(0,240,255,0.55)] md:text-[40px]"
              >
                A decade of building for the web
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {ABOUT_ITEMS.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-2.5 rounded-xl bg-[rgba(13,13,26,0.85)] p-[18px] md:p-6"
                style={{ border: `1px solid rgba(${item.rgb},0.22)` }}
              >
                <h3 className="font-mono text-xs font-medium tracking-widest md:text-[13px]" style={{ color: item.color }}>
                  {item.title.toUpperCase()}
                </h3>
                <p className="text-[17px] leading-relaxed text-[#a3acbb]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

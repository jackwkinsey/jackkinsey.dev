import GlitchText from "@/components/GlitchText";
import GridFloor from "@/components/GridFloor";
import ShinyText from "@/components/ShinyText";
import TiltCard from "@/components/TiltCard";

const FACTS = [
  { label: "EXPERIENCE", value: "10+ years" },
  { label: "SHIPPED AT", value: "Apple · Exaptive · Plantbid", wideOnly: true },
  { label: "BASED IN", value: "Fort Wayne, IN" },
];

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <span>
      <span className="text-[#ff4fc3]">~/jack $</span> <span className="text-[#e0f0ff]">{children}</span>
    </span>
  );
}

function Terminal() {
  return (
    <div
      role="img"
      aria-label="Terminal: Senior Frontend Engineer at Plantbid. Side projects: RowLog, HavenPlate, Subsisters."
      className="overflow-hidden rounded-[14px] border border-[rgba(0,240,255,0.3)] bg-[rgba(13,13,26,0.92)] shadow-[0_0_5px_rgba(0,240,255,0.3),0_0_24px_rgba(0,240,255,0.12)]"
    >
      <div className="flex items-center gap-2 border-b border-[rgba(0,240,255,0.15)] px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff4fc3]" />
        <span className="size-2.5 rounded-full bg-[#a77bff]" />
        <span className="size-2.5 rounded-full bg-[#00f0ff]" />
        <span className="ml-2 font-mono text-xs text-[#8b93a3]">~/jack — zsh</span>
      </div>
      <div className="flex flex-col gap-1.5 p-4 font-mono text-[13px] leading-relaxed md:p-5 md:text-sm">
        <Prompt>whoami</Prompt>
        <span className="text-[#00f0ff]">Senior Frontend Engineer @ Plantbid</span>
        <span className="mt-2.5 hidden flex-col gap-1.5 sm:flex">
          <Prompt>cat stack.txt</Prompt>
          <span className="text-[#a3acbb]">React · TypeScript · D3 · Expo · Phaser</span>
        </span>
        <span className="mt-2.5">
          <Prompt>ls side-projects/</Prompt>
        </span>
        <span className="text-[#00ff88]">RowLog/ HavenPlate/ Subsisters/</span>
        <span className="mt-2.5">
          <span className="text-[#ff4fc3]">~/jack $</span>{" "}
          <span className="terminal-cursor inline-block h-[15px] w-2 bg-[#00f0ff] align-[-3px] md:h-[17px] md:w-[9px]" />
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-name" className="relative overflow-hidden bg-[#0a0a0f]">
      <GridFloor className="absolute inset-x-0 bottom-0 h-[180px] md:h-[300px]" />
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center gap-14 px-4 pt-14 pb-[210px] md:px-6 md:pt-24 md:pb-[330px]">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-4 md:gap-5">
          <p className="font-mono text-xs text-[#00f0ff] md:text-[13px]">Hi, my name is</p>
          <div className="flex flex-col gap-1.5 md:gap-2">
            <h1 id="hero-name" className="m-0">
              <GlitchText
                text="Jack Kinsey."
                className="font-serif text-[38px] leading-[1.08] font-bold text-[#e0f0ff] neon-cyan md:text-[64px]"
              />
            </h1>
            <ShinyText
              text="I build web & game apps."
              className="font-serif text-[21px] leading-tight font-medium md:text-4xl"
              speed={3}
              shineColor="#00f0ff"
              color="#ff00aa"
            />
          </div>
          <p className="mt-1 max-w-[560px] text-lg leading-normal text-[#a3acbb] md:mt-2 md:text-xl">
            I'm a full stack web and game developer focused on building exceptional, high-quality,
            and fun websites, games, and other applications.
          </p>
          <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:gap-3 md:mt-4">
            <a
              href="mailto:jack.w.kinsey@gmail.com"
              className="flex min-h-12 items-center justify-center rounded-lg bg-[#00f0ff] px-7 font-mono text-sm font-medium text-[#0a0a0f] no-underline shadow-[0_0_16px_rgba(0,240,255,0.45)] transition-colors hover:bg-[#ff00aa] hover:text-white hover:shadow-[0_0_16px_rgba(255,0,170,0.45)]"
            >
              Get in touch
            </a>
            <a
              href="#timeline"
              className="flex min-h-12 items-center justify-center rounded-lg border border-[rgba(255,0,170,0.6)] px-7 font-mono text-sm text-[#ff4fc3] no-underline transition-colors hover:bg-[rgba(255,0,170,0.12)]"
            >
              See my work
            </a>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-x-12 md:mt-8">
            {FACTS.map((fact) => (
              <div key={fact.label} className={fact.wideOnly ? "hidden flex-col gap-0.5 sm:flex" : "flex flex-col gap-0.5"}>
                <dt className="font-mono text-[10px] tracking-widest text-[#8b93a3] md:text-[11px]">{fact.label}</dt>
                <dd className="text-lg font-semibold text-[#e0f0ff] md:text-xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <TiltCard className="min-w-0 flex-[1_1_360px] self-start md:mt-6">
          <Terminal />
        </TiltCard>
      </div>
    </section>
  );
}

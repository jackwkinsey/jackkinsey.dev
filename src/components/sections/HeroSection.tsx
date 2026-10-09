// import Particles from "@/components/Particles";
import GlitchText from "@/components/GlitchText";
import ShinyText from "@/components/ShinyText";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[420px] md:min-h-[500px] flex flex-col justify-center py-12">
      {/* <Particles
        particleCount={200}
        particleColors={["#00f0ff", "#ff00aa", "#7b2dff"]}
        speed={0.3}
        className="absolute inset-0 z-0"
      /> */}
      <div className="relative z-10 flex flex-col justify-center">
        <p className="font-mono text-xs mb-6 md:mb-8 text-[#00f0ff]">
          Hi, my name is
        </p>
        <GlitchText
          text="Jack Kinsey."
          className="font-serif text-4xl md:text-6xl text-[#e0f0ff] neon-cyan"
        />
        <ShinyText
          text="I build web & game apps."
          className="font-serif text-2xl md:text-4xl"
          speed={3}
          shineColor="#00f0ff"
          color="#ff00aa"
        />
        <p className="mt-6 md:mt-8 md:w-1/2 text-[#6b7280]">
          I'm a full stack web and game developer focused on building
          exceptional, high-quality, and fun websites, games, and other
          applications.
        </p>
        <Button
          variant="outline"
          size="lg"
          asChild
          className="border-[#00f0ff] text-[#00f0ff] hover:bg-[#ff00aa] hover:text-white hover:border-[#ff00aa] neon-border mt-8 md:mt-20 w-full max-w-xs h-12 md:h-10 transition-all duration-300"
        >
          <a href="mailto:jack.w.kinsey@gmail.com">Get In Touch</a>
        </Button>
      </div>
    </section>
  );
}

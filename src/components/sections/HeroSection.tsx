import Particles from "@/components/Particles";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-[500px]">
      <Particles
        particleCount={200}
        particleColors={["#7c3aed", "#a78bfa", "#c4b5fd"]}
        speed={0.3}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center">
        <p className="font-mono text-xs mb-8 text-violet-900 dark:text-violet-500">
          Hi, my name is
        </p>
        <BlurText
          text="Jack Kinsey."
          className="font-serif text-4xl md:text-6xl text-zinc-900 dark:text-zinc-100"
          delay={150}
          animateBy="words"
        />
        <ShinyText
          text="I build web & game apps."
          className="font-serif text-2xl md:text-4xl"
          speed={3}
          shineColor="#a78bfa"
        />
        <p className="mt-8 md:w-1/2 text-center md:text-left">
          I'm a full stack web and game developer focused on building
          exceptional, high-quality, and fun websites, games, and other
          applications.
        </p>
        <Button
          variant="outline"
          size="lg"
          asChild
          className="border-violet-700 text-violet-700 hover:bg-violet-700 hover:text-white dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-400 dark:hover:text-zinc-900 mt-8 md:mt-20 max-w-xs"
        >
          <a href="mailto:jack.w.kinsey@gmail.com">Get In Touch</a>
        </Button>
      </div>
    </section>
  );
}

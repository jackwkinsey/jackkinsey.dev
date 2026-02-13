import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DevStorySection from "@/components/sections/DevStorySection";
import FooterSection from "@/components/sections/FooterSection";

export default function App() {
  return (
    <>
      <main className="p-4 md:mx-auto md:my-8 md:px-8 md:max-w-6xl text-zinc-500 dark:text-zinc-400">
        <HeroSection />
        <AboutSection />
        <DevStorySection />
      </main>
      <FooterSection />
    </>
  );
}

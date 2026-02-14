import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DevStorySection from "@/components/sections/DevStorySection";
import FooterSection from "@/components/sections/FooterSection";
import LightCycles from "@/components/LightCycles";

export default function App() {
  return (
    <>
      {/* Background layers */}
      <div className="cyber-grid fixed inset-0 z-0 pointer-events-none" />
      <LightCycles />

      {/* Scanlines overlay */}
      <div className="scanlines fixed inset-0 z-50 pointer-events-none" />

      <main className="relative z-10 p-4 md:mx-auto md:my-8 md:px-8 md:max-w-6xl text-[#6b7280]">
        <HeroSection />
        <AboutSection />
        <DevStorySection />
      </main>
      <FooterSection />
    </>
  );
}

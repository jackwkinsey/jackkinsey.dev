import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TimelineSection from "@/components/sections/TimelineSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function App() {
  return (
    <div id="top">
      {/* Background layers */}
      <div className="cyber-grid fixed inset-0 z-0 pointer-events-none" />

      {/* Scanlines overlay */}
      <div className="scanlines fixed inset-0 z-50 pointer-events-none" />

      <NavBar />
      <main className="relative z-10 text-[#6b7280]">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}

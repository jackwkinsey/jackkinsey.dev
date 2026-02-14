import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AboutItem {
  id: number;
  title: string;
  heading: string;
  description: string;
  image: string;
}

const ABOUT_ITEMS: AboutItem[] = [
  {
    id: 1,
    title: "Dossier",
    heading: "10+ years jacked into the NET",
    description:
      "Name's Jack. Senior Frontend Engineer operating out of Fort Wayne, Indiana. Over a decade running code through the web. Shipped production chrome at Apple, built data viz rigs at Exaptive, and currently lead frontend ops at Plantbid \u2014 wiring up cross-framework component libraries and bridging the gap between backend and frontend crews.",
    image: "images/jack.jpg",
  },
  {
    id: 2,
    title: "Chrome",
    heading: "React, TypeScript & bleeding edge tech",
    description:
      "My go-to cyberware is React and TypeScript, but I flatline boredom \u2014 I go wherever the problem's interesting. Built rich data viz with D3, shipped cross-platform mobile apps with Expo, and I'm always pushing what the browser can handle. Lately I've been deep into AI-augmented dev workflows, running Claude Code as a co-pilot to delta my output on solo gigs.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    id: 3,
    title: "Gigs",
    heading: "Always shipping something",
    description:
      "Off the clock, I'm still in the NET. RowLog is my rowing data tracker with detailed viz output. HavenPlate is a mobile app helping chooms navigate dietary restrictions. And Subsisters is an indie game I'm building in Phaser. I gravitate toward gigs at the intersection of tight UI, real utility, and a little gonk creative ambition.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    id: 4,
    title: "Offgrid",
    heading: "More than code, choom",
    description:
      "When I unplug, I produce industrial and electronic music under the alias Twelve Dead Prophets, grind reps on a Concept2 RowERG, and play way too much Magic: The Gathering. I've given talks on React, C#, and Unity game dev, and I genuinely enjoy the craft of breaking down technical ideas \u2014 whether that's on stage, in a PR, or in a Discord thread with the crew.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
  },
];

function ValuesList({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:gap-2 lg:gap-8">
      {ABOUT_ITEMS.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <button
            onClick={() => onSelect(index)}
            className={`text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight transition-all duration-500 cursor-pointer ${
              activeIndex === index
                ? "text-[#00f0ff] neon-cyan"
                : "text-[#6b7280] hover:text-[#9ca3af]"
            }`}
          >
            {item.title}
          </button>
        </motion.div>
      ))}
    </div>
  );
}

function ImageSection({ activeValue }: { activeValue: AboutItem }) {
  const [hovered, setHovered] = useState(false);
  const isJackPhoto = activeValue.image === "images/jack.jpg";
  const displayImage =
    isJackPhoto && hovered ? "images/blue-steel.jpg" : activeValue.image;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full lg:max-w-sm mx-auto aspect-3/2 lg:aspect-3/4 lg:rounded-none overflow-hidden shadow-2xl border border-[rgba(0,240,255,0.3)] neon-border"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={displayImage}
            src={displayImage}
            alt={activeValue.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {isJackPhoto && hovered && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="bg-black/60 text-[#ff00aa] neon-magenta text-xs font-mono px-3 py-1 rounded-full">
              BLUE STEEL
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ContentSection({ activeValue }: { activeValue: AboutItem }) {
  return (
    <div className="flex flex-col justify-start gap-4 sm:gap-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeValue.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-[#e0f0ff] mb-4 sm:mb-6">
            {activeValue.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#6b7280] leading-relaxed">
            {activeValue.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeValue = ABOUT_ITEMS[activeIndex];

  return (
    <section id="about" className="mt-20">
      <div className="w-full flex items-center">
        <div className="w-full">
          {/* Mobile/Tablet: Stack vertically */}
          <div className="flex flex-col gap-12 sm:gap-16 lg:hidden">
            <div className="grid grid-cols-2 gap-4 items-center">
            <ValuesList activeIndex={activeIndex} onSelect={setActiveIndex} />
            <ImageSection activeValue={activeValue} />
            </div>
            <ContentSection activeValue={activeValue} />
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden lg:flex lg:flex-col gap-12">
            <div className="grid grid-cols-3 gap-12 xl:gap-16 items-center">
              <div className="flex items-center justify-center">
                <ValuesList activeIndex={activeIndex} onSelect={setActiveIndex} />
              </div>
              <div className="flex items-center justify-center">
                <ImageSection activeValue={activeValue} />
              </div>
              <div className="flex items-center justify-center">
                <ContentSection activeValue={activeValue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

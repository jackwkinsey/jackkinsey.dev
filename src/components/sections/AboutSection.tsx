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
    title: "Career",
    heading: "A decade of building for the web",
    description:
      "I'm Jack, a Senior Frontend Engineer based in Fort Wayne, Indiana, with over a decade of experience building for the web. I've shipped production code at Apple, worked on data visualization platforms at Exaptive, and currently lead frontend efforts at Plantbid, where I build cross-framework component libraries and bridge the gap between backend and frontend teams.",
    image: "images/jack.jpg",
  },
  {
    id: 2,
    title: "Toolkit",
    heading: "React, TypeScript & beyond",
    description:
      "My core toolkit is React and TypeScript, but I'm most at home wherever the problem is interesting. I've built rich data visualizations with D3, developed cross-platform mobile apps with Expo, and I'm always looking for ways to push what's possible in the browser. Lately I've been deep into AI-assisted development workflows, using tools like Claude Code to dramatically scale my output as a solo developer on side projects.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    id: 3,
    title: "Projects",
    heading: "Always building something",
    description:
      "I'm usually building something outside of work, too. RowLog is my rowing workout tracker with detailed data visualization. HavenPlate is a mobile app helping families navigate dietary restrictions. And Subsisters is an indie game I'm developing with Phaser. I gravitate toward projects that sit at the intersection of thoughtful UI, real utility, and a little creative ambition.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    id: 4,
    title: "Interests",
    heading: "More than code",
    description:
      "Beyond code, I produce industrial and electronic music under the name Twelve Dead Prophets, row on a Concept2 RowERG, and play way too much Magic: The Gathering. I've given talks on React, C#, and Unity game development, and I genuinely enjoy the craft of explaining technical ideas clearly, whether that's in a conference talk, a PR description, or a Discord thread with my team.",
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
            className={`text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight transition-colors duration-500 cursor-pointer ${
              activeIndex === index
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-500"
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
        className="relative w-full lg:max-w-sm mx-auto aspect-3/2 lg:aspect-3/4 lg:rounded-none overflow-hidden shadow-2xl"
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
            <span className="bg-black/60 text-white text-xs font-mono px-3 py-1 rounded-full">
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
          <h2 className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-zinc-900 dark:text-white mb-4 sm:mb-6">
            {activeValue.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
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

"use client";

import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  BadgeCheck,
  Briefcase,
  Code2,
  GraduationCap,
  Gamepad,
} from "lucide-react";
import storyData from "@/data/dev_story_data";

function getTypeIcon(type: string) {
  const iconSize = 14;
  const iconStrokeWidth = 2;
  const iconClass = "inline mr-1";

  switch (type) {
    case "app":
      return <Code2 size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />;
    case "certification":
      return <BadgeCheck size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />;
    case "education":
      return <GraduationCap size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />;
    case "game":
      return <Gamepad size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />;
    case "position":
      return <Briefcase size={iconSize} strokeWidth={iconStrokeWidth} className={iconClass} />;
    default:
      return null;
  }
}

function formatDateRange(start: Date, end?: Date | "current") {
  const startStr = `${start.toLocaleString("default", { month: "short" })} ${start.getFullYear()}`;
  if (!end) return startStr;
  if (end === "current") return `${startStr} - Present`;
  const endStr = `${end.toLocaleString("default", { month: "short" })} ${end.getFullYear()}`;
  return `${startStr} - ${endStr}`;
}

const sortByDateDesc = (
  a: (typeof storyData)[number],
  b: (typeof storyData)[number],
) => b.start.getTime() - a.start.getTime();

const positionEntries = storyData
  .filter((e) => e.type === "position")
  .sort(sortByDateDesc);

const otherEntries = [
  ...storyData.filter((e) => e.type === "education").sort(sortByDateDesc),
  ...storyData
    .filter((e) => e.type !== "position" && e.type !== "education")
    .sort(sortByDateDesc),
];

function ShowcaseCarousel({
  data,
  direction,
}: {
  data: typeof storyData;
  direction: "left" | "right";
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [oneSetWidth, setOneSetWidth] = useState(0);

  const baseVelocity = direction === "left" ? -20 : 20;
  const baseX = useMotionValue(0);
  const scrollVelocity = useRef(baseVelocity);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const items = [
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
  ];

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      const itemWidth = isMobile ? 280 : 320;
      const gap = 24;
      const width = (itemWidth + gap) * data.length;
      setOneSetWidth(width);
      baseX.set(-width);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [baseX, data.length]);

  useAnimationFrame((_t, delta) => {
    if (!oneSetWidth) return;

    if (!isDragging) {
      scrollVelocity.current =
        scrollVelocity.current * 0.9 + baseVelocity * 0.1;

      const moveBy = scrollVelocity.current * (delta / 1000);
      baseX.set(baseX.get() + moveBy);

      const x = baseX.get();
      if (x <= -oneSetWidth * 2) {
        baseX.set(x + oneSetWidth);
      } else if (x > 0) {
        baseX.set(x - oneSetWidth);
      }
    }
  });

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        ref={scrollerRef}
        className="flex items-end gap-6 cursor-grab active:cursor-grabbing"
        style={{ x: baseX }}
        drag="x"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_e, info) => {
          setIsDragging(false);
          scrollVelocity.current = info.velocity.x;
        }}
        dragElastic={0.05}
        dragMomentum={false}
      >
        {items.map((entry, index) => (
          <motion.div
            key={`${entry.headerTitle}-${index}`}
            className="shrink-0 w-[280px] sm:w-[320px] h-[320px] rounded-2xl overflow-hidden select-none relative pointer-events-auto bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col"
            initial={{ rotateX: 0, opacity: 1 }}
            animate={
              hoveredId === index
                ? {
                    scale: 1.02,
                    rotateX: -5,
                    y: -10,
                    zIndex: 50,
                  }
                : {
                    scale: 1,
                    rotateX: 0,
                    y: 0,
                    zIndex: 1,
                  }
            }
            transition={{
              duration: 0.3,
              ease: "backOut",
              zIndex: { delay: hoveredId === index ? 0 : 0.4 },
            }}
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ transformPerspective: 1000 }}
          >
            {/* Header Image */}
            {entry.headerImage && (
              <div className="shrink-0 h-20 w-full flex items-center justify-center bg-white dark:bg-zinc-800 p-3">
                <img
                  src={entry.headerImage.src}
                  alt={entry.headerImage.altText}
                  className="max-h-14 max-w-[140px] object-contain pointer-events-none"
                  draggable="false"
                />
              </div>
            )}

            {/* Card Content */}
            <div className="p-4 flex flex-col flex-1 overflow-hidden relative">
              {/* Type & Date */}
              <div className="flex items-center justify-between mb-2 shrink-0">
                <span className="flex items-center text-[11px] font-mono text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                  {getTypeIcon(entry.type)}
                  {entry.type}
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                  {formatDateRange(entry.start, entry.end)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-tight mb-1 shrink-0">
                {entry.headerTitle}
              </h3>

              {/* Subtitle */}
              {entry.headerSubtitle && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 shrink-0">
                  {entry.headerSubtitle}
                </p>
              )}

              {/* Tags */}
              {entry.headerTags && (
                <div className="flex flex-wrap gap-1 mb-2 shrink-0">
                  {entry.headerTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              {entry.links && entry.links.length > 0 && (
                <div className="pt-2 shrink-0 flex gap-3 border-t border-zinc-200 dark:border-zinc-800 mt-2">
                  {entry.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline underline-offset-2 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.text || "link"}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function DevStorySection() {
  return (
    <section id="devstory" className="mt-20 w-full">
      <ShowcaseCarousel data={positionEntries} direction="left" />
      <ShowcaseCarousel data={otherEntries} direction="right" />
    </section>
  );
}

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { EntryBody, EntryLinks, EntryTags, FilterChips } from "./shared";
import {
  TYPE_STYLES,
  byStartDesc,
  entries,
  formatDateRange,
  matchesFilter,
  type Filter,
  type TimelineEntry,
} from "./timeline";

const COMPACT_COUNT = 3;
const newestFirst = [...entries].sort(byStartDesc);

function groupByYear(list: TimelineEntry[]) {
  const groups: { year: number; items: TimelineEntry[] }[] = [];
  for (const entry of list) {
    const year = entry.start.getFullYear();
    const last = groups.at(-1);
    if (last?.year === year) last.items.push(entry);
    else groups.push({ year, items: [entry] });
  }
  return groups;
}

function Diamond({ color, filled }: { color: string; filled?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="block size-[11px] rotate-45 border"
      style={{
        borderColor: color,
        background: filled ? color : "#0a0a0f",
        boxShadow: filled ? `0 0 10px ${color}` : "none",
      }}
    />
  );
}

function EntryCard({
  entry,
  open,
  onToggle,
}: {
  entry: TimelineEntry;
  open: boolean;
  onToggle: () => void;
}) {
  const { color, rgb, label } = TYPE_STYLES[entry.type];
  const panelId = `timeline-panel-${entry.id}`;
  return (
    <div className="flex items-start gap-3">
      <span className="flex w-[27px] shrink-0 justify-center pt-5">
        <Diamond color={color} filled={open} />
      </span>
      <div
        className="min-w-0 flex-1 rounded-xl bg-[rgba(13,13,26,0.92)] transition-all duration-200"
        style={{
          border: `1px solid rgba(${rgb},${open ? 0.6 : 0.18})`,
          boxShadow: open ? `0 0 16px rgba(${rgb},0.18)` : "none",
        }}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-11 w-full cursor-pointer flex-col gap-1 px-3.5 pt-3.5 pb-3 text-left"
        >
          <span className="flex w-full items-center justify-between gap-2">
            <span className="font-mono text-[11px] tracking-widest" style={{ color }}>
              {label.toUpperCase()}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#8b93a3]">
              {formatDateRange(entry)}
              <ChevronDown
                aria-hidden="true"
                size={14}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </span>
          </span>
          <span className="text-lg leading-tight font-bold text-[#e0f0ff]">{entry.headerTitle}</span>
          {entry.headerSubtitle && (
            <span className="text-base font-medium text-[#8b93a3]">{entry.headerSubtitle}</span>
          )}
        </button>
        {open && (
          <div id={panelId} className="flex flex-col gap-3.5 px-3.5 pb-4">
            <EntryBody entry={entry} />
            <EntryTags entry={entry} />
            <EntryLinks entry={entry} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function MobileTimeline() {
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id));

  if (!expanded) {
    const recentWork = newestFirst.filter((e) => e.type === "position").slice(0, COMPACT_COUNT);
    return (
      <div className="flex flex-col gap-4">
        <ol className="relative flex flex-col gap-3">
          <span
            aria-hidden="true"
            className="absolute top-1.5 bottom-1.5 left-[13px] border-l border-[rgba(0,240,255,0.25)]"
          />
          {recentWork.map((entry) => (
            <li key={entry.id}>
              <EntryCard entry={entry} open={openId === entry.id} onToggle={() => toggle(entry.id)} />
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[rgba(0,240,255,0.35)] font-mono text-sm text-[#00f0ff]"
        >
          Explore the full timeline →
        </button>
      </div>
    );
  }

  const groups = groupByYear(newestFirst.filter((e) => matchesFilter(e, filter)));
  return (
    <div className="flex flex-col gap-2">
      <FilterChips
        value={filter}
        onChange={setFilter}
        className="-mx-4 overflow-x-auto px-4 pt-1 pb-2"
      />
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-0 left-[13px] border-l border-[rgba(0,240,255,0.25)]"
        />
        {groups.map((group) => (
          <section key={group.year} aria-label={String(group.year)} className="relative flex flex-col gap-2.5 pt-[18px]">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex w-[27px] justify-center">
                <span className="size-[7px] rounded-full border border-[rgba(0,240,255,0.6)] bg-[#0a0a0f]" />
              </span>
              <h3 className="font-serif text-sm font-medium tracking-wider text-[#8b93a3]">{group.year}</h3>
            </div>
            {group.items.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                open={openId === entry.id}
                onToggle={() => toggle(entry.id)}
              />
            ))}
          </section>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setExpanded(false);
          setFilter("all");
          document.getElementById("timeline")?.scrollIntoView();
        }}
        className="mt-4 flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-[rgba(0,240,255,0.35)] font-mono text-sm text-[#00f0ff]"
      >
        Show less
      </button>
    </div>
  );
}

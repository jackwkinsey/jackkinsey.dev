import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { EntryBody, EntryLinks, EntryTags, FilterChips } from "./shared";
import {
  TYPE_STYLES,
  byStartAsc,
  endDate,
  entries,
  formatDateRange,
  formatDuration,
  initials,
  matchesFilter,
  toYear,
  type Filter,
  type TimelineEntry,
} from "./timeline";

const ROW_HEIGHT = 36;
// Share of the axis given to the years before the first job, so the long
// stretch of school years doesn't eat the timeline
const COMPRESSED_PCT = 12;

const chronological = [...entries].sort(byStartAsc);
const firstYear = Math.floor(toYear(chronological[0].start));
const careerStartYear = Math.floor(
  Math.min(...entries.filter((e) => e.type === "position").map((e) => toYear(e.start))),
);
const lastYear = new Date().getFullYear() + 1;

function xPct(year: number) {
  if (year < careerStartYear) {
    return ((year - firstYear) / (careerStartYear - firstYear)) * COMPRESSED_PCT;
  }
  return (
    COMPRESSED_PCT +
    ((year - careerStartYear) / (lastYear - careerStartYear)) * (100 - COMPRESSED_PCT)
  );
}

type Placed = { entry: TimelineEntry; start: number; end: number; mid: number; row: number };

// Spans may touch (one job ending the month the next starts) without
// being bumped to a new row
const TOUCH_TOLERANCE = 0.2;

/** Assigns each entry the first row where it doesn't overlap the previous one. */
function placeInRows(list: TimelineEntry[], pointGap: number): Placed[] {
  const rowEnds: number[] = [];
  return list.map((entry) => {
    const start = xPct(toYear(entry.start));
    const end = entry.end ? xPct(toYear(endDate(entry)!)) : start + pointGap;
    let row = rowEnds.findIndex((rowEnd) => rowEnd <= start + TOUCH_TOLERANCE);
    if (row === -1) row = rowEnds.push(0) - 1;
    rowEnds[row] = end;
    return { entry, start, end, mid: entry.end ? (start + end) / 2 : start, row };
  });
}

const workRows = placeInRows(chronological.filter((e) => e.type === "position"), 0);
const sideRows = placeInRows(chronological.filter((e) => e.type !== "position"), 2.5);

const ticks = [firstYear];
for (let year = careerStartYear; year < lastYear; year++) ticks.push(year);

export default function DesktopTimeline() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState(
    () => [...entries].sort(byStartAsc).at(-1)!.id,
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visible = useMemo(
    () => chronological.filter((e) => matchesFilter(e, filter)),
    [filter],
  );

  // Keep a visible selection when the filter hides the current one
  const selected =
    visible.find((e) => e.id === selectedId) ?? visible.at(-1) ?? chronological.at(-1)!;
  const index = visible.findIndex((e) => e.id === selected.id);
  const selectedType = TYPE_STYLES[selected.type];

  const renderLane = (placed: Placed[]) => {
    const rows = Math.max(...placed.map((p) => p.row)) + 1;
    return (
      <div className="relative" style={{ height: rows * ROW_HEIGHT }}>
        {placed
          .filter((p) => p.entry.end)
          .map(({ entry, start, end, row }) => {
            const { rgb } = TYPE_STYLES[entry.type];
            const on = entry.id === selected.id;
            return (
              <div
                key={`span-${entry.id}`}
                aria-hidden="true"
                className="absolute h-1 rounded-sm transition-all duration-200"
                style={{
                  left: `${start}%`,
                  width: `calc(${end - start}% - 2px)`,
                  top: row * ROW_HEIGHT + ROW_HEIGHT / 2 - 2,
                  background: `rgba(${rgb},${on ? 0.55 : 0.18})`,
                  opacity: matchesFilter(entry, filter) ? 1 : 0.25,
                }}
              />
            );
          })}
        {placed.map(({ entry, mid, row }) => {
          const { color, rgb, label } = TYPE_STYLES[entry.type];
          const on = entry.id === selected.id;
          const hovered = entry.id === hoveredId;
          return (
            <button
              key={entry.id}
              type="button"
              aria-pressed={on}
              aria-label={`${entry.headerTitle}, ${entry.headerSubtitle ?? ""}, ${formatDateRange(entry)}`}
              onClick={() => setSelectedId(entry.id)}
              onMouseEnter={() => setHoveredId(entry.id)}
              onMouseLeave={() => setHoveredId((id) => (id === entry.id ? null : id))}
              onFocus={() => setHoveredId(entry.id)}
              onBlur={() => setHoveredId((id) => (id === entry.id ? null : id))}
              className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full"
              style={{
                left: `calc(${mid}% - 16px)`,
                top: row * ROW_HEIGHT + ROW_HEIGHT / 2 - 16,
                zIndex: hovered ? 10 : on ? 2 : 1,
                opacity: matchesFilter(entry, filter) ? 1 : 0.25,
              }}
            >
              <span
                aria-hidden="true"
                className="rounded-full border-2 transition-all duration-150"
                style={{
                  width: on || hovered ? 16 : 12,
                  height: on || hovered ? 16 : 12,
                  borderColor: color,
                  background: on ? color : `rgba(${rgb},0.3)`,
                  boxShadow: on || hovered ? `0 0 12px ${color}` : "none",
                }}
              />
              {hovered && (
                <span
                  role="tooltip"
                  className={cn(
                    "pointer-events-none absolute top-1/2 flex w-[230px] -translate-y-1/2 flex-col gap-0.5 rounded-[10px] bg-[#0d0d1a] px-3 py-2.5 text-left",
                    mid > 65 ? "right-[calc(100%+4px)]" : "left-[calc(100%+4px)]",
                  )}
                  style={{
                    border: `1px solid rgba(${rgb},0.6)`,
                    boxShadow: `0 0 16px rgba(${rgb},0.25), 0 8px 24px rgba(0,0,0,0.6)`,
                  }}
                >
                  <span className="font-mono text-[10px] tracking-widest" style={{ color }}>
                    {label.toUpperCase()}
                  </span>
                  <span className="text-[17px] leading-tight font-bold text-[#e0f0ff]">
                    {entry.headerTitle}
                  </span>
                  {entry.headerSubtitle && (
                    <span className="text-[15px] font-semibold text-[#c9d4e3]">
                      {entry.headerSubtitle}
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-[#8b93a3]">
                    {formatDateRange(entry)}
                    {entry.end && ` · ${formatDuration(entry)}`}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <FilterChips value={filter} onChange={setFilter} showCounts className="flex-wrap" />

      <div className="overflow-x-auto rounded-2xl border border-[rgba(0,240,255,0.18)] bg-[rgba(13,13,26,0.85)] shadow-[0_0_24px_rgba(0,240,255,0.06)]">
        <div className="relative min-w-[960px] px-7 pt-6 pb-12">
          <div className="relative">
            {/* Year ruler */}
            <div className="relative h-7 border-b border-[rgba(0,240,255,0.18)]">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 border-r border-dashed border-[rgba(167,123,255,0.4)] bg-[repeating-linear-gradient(135deg,rgba(167,123,255,0.1)_0_2px,transparent_2px_8px)]"
                style={{ width: `${COMPRESSED_PCT}%` }}
              />
              {ticks.map((year) => (
                <span
                  key={year}
                  className="absolute bottom-1.5 border-l border-[rgba(0,240,255,0.25)] pl-1 font-mono text-[11px] leading-none text-[#8b93a3]"
                  style={{ left: `${xPct(year)}%` }}
                >
                  {year}
                </span>
              ))}
            </div>

            <p className="mt-5 mb-2.5 font-mono text-[11px] tracking-widest text-[#00f0ff]">WORK</p>
            {renderLane(workRows)}

            <p className="mt-6 mb-2.5 font-mono text-[11px] tracking-widest text-[#ff4fc3]">
              PROJECTS &amp; EDUCATION
            </p>
            {renderLane(sideRows)}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 -bottom-4 border-l border-dashed border-[rgba(255,0,170,0.7)]"
              style={{ left: `${xPct(toYear(new Date()))}%` }}
            >
              <span className="absolute top-0 left-1.5 font-mono text-[10px] tracking-widest text-[#ff4fc3]">
                NOW
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details for the selected entry */}
      <div
        className="flex flex-wrap gap-8 rounded-2xl bg-[rgba(13,13,26,0.92)] p-8"
        style={{
          border: `1px solid rgba(${selectedType.rgb},0.35)`,
          boxShadow: `0 0 28px rgba(${selectedType.rgb},0.1)`,
        }}
        aria-live="polite"
      >
        <div className="flex flex-[1_1_260px] flex-col gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#0a0a14] p-2 font-serif text-lg font-bold"
              style={{ border: `1px solid rgba(${selectedType.rgb},0.4)`, color: selectedType.color }}
            >
              {selected.headerImage ? (
                <img
                  src={selected.headerImage.src}
                  alt={selected.headerImage.altText}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span aria-hidden="true">{initials(selected.headerTitle)}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs tracking-widest" style={{ color: selectedType.color }}>
                {selectedType.label.toUpperCase()}
              </span>
              <span className="font-mono text-xs text-[#8b93a3]">{formatDateRange(selected)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-2xl leading-tight font-medium text-[#e0f0ff]">
              {selected.headerTitle}
            </h3>
            {selected.headerSubtitle && (
              <p className="text-xl font-semibold text-[#c9d4e3]">{selected.headerSubtitle}</p>
            )}
            <p className="font-mono text-xs text-[#8b93a3]">{formatDuration(selected)}</p>
          </div>
          <EntryTags entry={selected} />
        </div>

        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-5">
          <EntryBody entry={selected} />
          <EntryLinks entry={selected} />
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgba(0,240,255,0.12)] pt-4">
            <button
              type="button"
              disabled={index <= 0}
              onClick={() => setSelectedId(visible[index - 1].id)}
              className="min-h-11 cursor-pointer rounded-lg border border-[rgba(0,240,255,0.3)] px-4 font-mono text-xs text-[#00f0ff] disabled:cursor-default disabled:opacity-35"
            >
              ← Earlier
            </button>
            <span className="font-mono text-xs text-[#8b93a3]">
              {index + 1} / {visible.length}
            </span>
            <button
              type="button"
              disabled={index >= visible.length - 1}
              onClick={() => setSelectedId(visible[index + 1].id)}
              className="min-h-11 cursor-pointer rounded-lg border border-[rgba(0,240,255,0.3)] px-4 font-mono text-xs text-[#00f0ff] disabled:cursor-default disabled:opacity-35"
            >
              Later →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

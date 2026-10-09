import storyData, { type StoryCardData } from "@/data/dev_story_data";

export type EntryType = StoryCardData["type"];
export type TimelineEntry = StoryCardData & { id: string };
export type Filter = "all" | "work" | "projects" | "education";

export const TYPE_STYLES: Record<
  EntryType,
  { label: string; color: string; rgb: string }
> = {
  position: { label: "Position", color: "#00f0ff", rgb: "0,240,255" },
  education: { label: "Education", color: "#a77bff", rgb: "167,123,255" },
  game: { label: "Game", color: "#ff4fc3", rgb: "255,0,170" },
  app: { label: "App", color: "#00ff88", rgb: "0,255,136" },
  certification: { label: "Certification", color: "#ffaa00", rgb: "255,170,0" },
};

export const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

export const entries: TimelineEntry[] = storyData.map((entry, index) => ({
  ...entry,
  id: `${entry.type}-${index}`,
}));

export function matchesFilter(entry: TimelineEntry, filter: Filter) {
  switch (filter) {
    case "all":
      return true;
    case "work":
      return entry.type === "position";
    case "projects":
      return entry.type === "game" || entry.type === "app";
    case "education":
      return entry.type === "education" || entry.type === "certification";
  }
}

export const byStartAsc = (a: TimelineEntry, b: TimelineEntry) =>
  a.start.getTime() - b.start.getTime();
export const byStartDesc = (a: TimelineEntry, b: TimelineEntry) =>
  b.start.getTime() - a.start.getTime();

/** End date for entries with a span ("current" resolves to today). */
export function endDate(entry: TimelineEntry): Date | undefined {
  if (!entry.end) return undefined;
  return entry.end === "current" ? new Date() : entry.end;
}

export function formatMonth(date: Date) {
  return `${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
}

export function formatDateRange(entry: TimelineEntry) {
  const start = formatMonth(entry.start);
  if (!entry.end) return start;
  return `${start} — ${entry.end === "current" ? "Present" : formatMonth(entry.end)}`;
}

export function formatDuration(entry: TimelineEntry) {
  const end = endDate(entry);
  if (!end) return `Released ${formatMonth(entry.start)}`;
  const months =
    (end.getFullYear() - entry.start.getFullYear()) * 12 +
    (end.getMonth() - entry.start.getMonth());
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "month" : "months"}`);
  return parts.join(", ") || "Less than a month";
}

/** Fractional year, e.g. March 2019 -> 2019.17 */
export function toYear(date: Date) {
  return date.getFullYear() + date.getMonth() / 12;
}

export function initials(text: string) {
  return text
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

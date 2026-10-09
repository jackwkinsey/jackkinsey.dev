import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import {
  FILTERS,
  entries,
  matchesFilter,
  type Filter,
  type TimelineEntry,
} from "./timeline";

export function FilterChips({
  value,
  onChange,
  showCounts = false,
  className,
}: {
  value: Filter;
  onChange: (filter: Filter) => void;
  showCounts?: boolean;
  className?: string;
}) {
  return (
    <div role="group" aria-label="Filter timeline" className={cn("flex gap-2", className)}>
      {FILTERS.map((filter) => {
        const active = filter.id === value;
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter.id)}
            className={cn(
              "flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-base font-semibold transition-all duration-200",
              active
                ? "border-[#00f0ff] bg-[rgba(0,240,255,0.14)] text-[#e0f0ff] shadow-[0_0_10px_rgba(0,240,255,0.35)]"
                : "border-[rgba(0,240,255,0.22)] text-[#8b93a3] hover:text-[#c9d4e3]",
            )}
          >
            {filter.label}
            {showCounts && (
              <span className="font-mono text-xs opacity-70">
                {entries.filter((e) => matchesFilter(e, filter.id)).length}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function EntryBody({ entry }: { entry: TimelineEntry }) {
  if (!entry.bodyMarkdown) return null;
  return (
    <div className="flex flex-col gap-3 text-base leading-relaxed text-[#c9d4e3] md:text-lg">
      <ReactMarkdown
        components={{
          ul: ({ children }) => (
            <ul className="flex list-[square] flex-col gap-2 pl-5">{children}</ul>
          ),
          p: ({ children }) => <p>{children}</p>,
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ""}
              className="max-h-64 w-auto rounded-md border border-[rgba(0,240,255,0.2)]"
            />
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-md bg-[#0a0a14] p-3 font-mono text-sm text-[#00f0ff]">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#ff4fc3] underline underline-offset-4">
              {children}
            </a>
          ),
        }}
      >
        {entry.bodyMarkdown}
      </ReactMarkdown>
    </div>
  );
}

export function EntryTags({ entry }: { entry: TimelineEntry }) {
  if (!entry.headerTags?.length) return null;
  return (
    <ul className="flex list-none flex-wrap gap-1.5 p-0" aria-label="Technologies">
      {entry.headerTags.map((tag) => (
        <li
          key={tag}
          className="rounded border border-[rgba(0,240,255,0.22)] bg-[rgba(0,240,255,0.08)] px-2 py-0.5 font-mono text-[11px] text-[#00f0ff]"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function EntryLinks({ entry, className }: { entry: TimelineEntry; className?: string }) {
  if (!entry.links?.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {entry.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-lg border border-[rgba(255,0,170,0.45)] px-3.5 font-mono text-xs text-[#ff4fc3] no-underline transition-colors hover:bg-[rgba(255,0,170,0.12)]"
        >
          {link.text || "link"} ↗
        </a>
      ))}
    </div>
  );
}

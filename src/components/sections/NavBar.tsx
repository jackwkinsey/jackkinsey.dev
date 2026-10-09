import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Timeline" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-[rgba(0,240,255,0.12)] bg-[rgba(10,10,15,0.9)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2.5 md:px-6 md:py-3.5">
        <a href="#top" aria-label="Jack Kinsey, back to top" className="flex min-h-11 items-center gap-2.5 text-[#e0f0ff] no-underline">
          <span className="flex size-9 items-center justify-center rounded-lg border border-[#00f0ff] font-serif text-sm font-bold text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.35)]">
            JK
          </span>
          <span className="hidden font-serif text-[15px] font-medium tracking-wide md:inline">Jack Kinsey</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-2 font-mono text-[13px] md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center px-3 text-[#8b93a3] no-underline transition-colors hover:text-[#00f0ff]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:jack.w.kinsey@gmail.com"
            className="ml-2 flex min-h-11 items-center rounded-lg border border-[#00f0ff] px-[18px] text-[#00f0ff] no-underline shadow-[0_0_8px_rgba(0,240,255,0.25)] transition-colors hover:bg-[#00f0ff] hover:text-[#0a0a0f]"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-[rgba(0,240,255,0.35)] px-3.5 font-mono text-[13px] text-[#00f0ff] md:hidden"
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          Menu
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="flex flex-col px-4 pb-4 font-mono text-[15px] md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-[rgba(0,240,255,0.1)] text-[#e0f0ff] no-underline last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

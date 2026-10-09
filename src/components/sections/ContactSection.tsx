import { Gamepad2, Github } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-4 border-t border-[rgba(0,240,255,0.12)]"
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4 px-4 py-16 text-center md:gap-5 md:px-6 md:py-28">
        <p className="font-mono text-[11px] tracking-wider text-[#00f0ff] md:text-xs">// CONTACT</p>
        <h2
          id="contact-heading"
          className="font-serif text-[30px] leading-tight font-bold text-[#e0f0ff] [text-shadow:0_0_12px_rgba(0,240,255,0.55)] md:text-5xl"
        >
          Let's build something.
        </h2>
        <p className="max-w-[560px] text-lg leading-normal text-[#a3acbb] md:text-xl">
          Have a project in mind, a role to fill, or want to talk shop about React, games or music?
          My inbox is open.
        </p>
        <div className="mt-2 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 md:mt-3">
          <a
            href="mailto:jack.w.kinsey@gmail.com"
            className="flex min-h-12 items-center justify-center rounded-lg bg-[#00f0ff] px-7 font-mono text-sm font-medium text-[#0a0a0f] no-underline shadow-[0_0_16px_rgba(0,240,255,0.45)] transition-colors hover:bg-[#ff00aa] hover:text-white"
          >
            Email me
          </a>
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
            <a
              href="https://github.com/jackwkinsey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-[rgba(0,240,255,0.35)] px-6 font-mono text-sm text-[#e0f0ff] no-underline transition-colors hover:bg-[rgba(0,240,255,0.1)]"
            >
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://jackkinsey.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-[rgba(255,0,170,0.45)] px-6 font-mono text-sm text-[#e0f0ff] no-underline transition-colors hover:bg-[rgba(255,0,170,0.1)]"
            >
              <Gamepad2 size={18} aria-hidden="true" />
              itch.io
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

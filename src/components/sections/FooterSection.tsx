export default function FooterSection() {
  return (
    <footer className="relative z-10 border-t border-[rgba(0,240,255,0.3)] bg-[#0a0a0f] font-mono text-xs md:text-[13px]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 pt-5 pb-7 text-center md:flex-row md:justify-between md:gap-3 md:px-6 md:py-6 md:text-left">
        <p className="text-[#00f0ff]">
          Designed &amp; built by Jack Kinsey · © {new Date().getFullYear()}
        </p>
        <a
          href="https://github.com/jackwkinsey/jackkinsey.dev/fork"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center text-[#ff00aa] underline underline-offset-4 transition-all duration-300 hover:neon-magenta"
        >
          Fork this on GitHub
        </a>
      </div>
    </footer>
  );
}

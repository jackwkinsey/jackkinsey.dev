export default function FooterSection() {
  return (
    <footer className="h-20 bg-[#0a0a0f] border-t border-[rgba(0,240,255,0.3)] text-sm font-mono flex flex-col justify-center items-center">
      <p className="text-[#00f0ff]">Designed & built by Jack Kinsey // Night City</p>
      <p>
        <a
          href="https://github.com/jackwkinsey/jackkinsey.dev/fork"
          target="blank"
          className="underline underline-offset-4 text-[#ff00aa] hover:neon-magenta transition-all duration-300"
        >
          Flatline the repo
        </a>
      </p>
    </footer>
  );
}

export default function FooterSection() {
  return (
    <footer className="h-20 bg-violet-900 text-violet-300 text-sm font-mono flex flex-col justify-center items-center">
      <p>Designed & built by Jack Kinsey</p>
      <p>
        <a
          href="https://github.com/jackwkinsey/jackkinsey.dev/fork"
          target="blank"
          className="underline underline-offset-4"
        >
          Fork this on GitHub
        </a>
      </p>
    </footer>
  );
}

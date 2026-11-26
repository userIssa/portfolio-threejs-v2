"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Cpu, Download } from "lucide-react";
import dynamic from "next/dynamic";

const SwordHero = dynamic(() => import("./SwordHero"), {
  ssr: false,
});

const TYPING_WORDS = [
  "I build systems. Then I break them.",
  "Software Engineer. Ethical Hacker. Both on purpose.",
  "Full-stack dev by day. Penetration tester by design.",
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIdx];
    const typingSpeed = isDeleting ? 40 : 90;

    const timer = setTimeout(
      () => {
        if (!isDeleting && typedText === currentWord) {
          setIsDeleting(true);
        } else if (isDeleting && typedText === "") {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % TYPING_WORDS.length);
        } else {
          setTypedText(
            isDeleting
              ? currentWord.substring(0, typedText.length - 1)
              : currentWord.substring(0, typedText.length + 1)
          );
        }
      },
      !isDeleting && typedText === currentWord ? 2000 : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-6 relative overflow-hidden"
    >
      {/* Neo-Tokyo Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-40" />

      {/* Cyber Red Sun Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-cyber-red/5 blur-[90px] pointer-events-none -z-10" />
      <div
        aria-hidden="true"
        className="absolute top-[20%] right-[10%] opacity-5 text-[150px] font-bold text-[var(--ink)] tracking-widest leading-none pointer-events-none select-none font-mono text-right"
      >
        ポートハーコート、
        <br />
        ナイジェリア
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 text-left">
        {/* Intro panel */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 self-start px-3 py-1 bg-cyber-pink/10 border border-cyber-pink/35 rounded-full text-xs font-mono text-cyber-pink tracking-widest uppercase font-bold">
            <Cpu size={14} />
            <span>{"PORTFOLIO_NODE // アクティブ"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-[var(--ink)] font-sans">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan text-neon-glow-pink">
              Issa
            </span>
          </h1>

          <div className="text-xl sm:text-2xl font-mono font-semibold min-h-[2.5rem] py-1 flex items-center text-cyber-cyan text-neon-glow-cyan">
            <span>
              <span className="text-[var(--ink)] border-r-2 border-cyber-pink pr-1 animate-blink">{typedText}</span>
            </span>
          </div>

          <p className="text-sm sm:text-base text-[var(--text)] max-w-xl font-sans leading-relaxed">
            BSc Software Engineering graduate and cybersecurity specialist. Specializing in secure web ecosystems, robust backend microservices, and network exploit assessments. I build performant digital architectures and test security boundaries.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mt-4">
            <button
              type="button"
              onClick={() => handleScrollTo("contact")}
              className="flex items-center gap-2 px-5 py-3 bg-cyber-pink hover:bg-[var(--ink)] text-white hover:text-[var(--bg)] font-bold font-mono rounded-full transition-all text-xs tracking-wider shadow-neon-pink"
            >
              SEND SIGNAL
              <ArrowRight size={14} />
            </button>
            <a
              href="/assets/resume.pdf"
              download="Toluwanimi_Oderinde_Resume.pdf"
              className="cta-wipe flex items-center gap-2 px-5 py-3 border border-cyber-cyan/50 bg-cyber-cyan/5 text-cyber-cyan font-bold font-mono rounded-full text-xs tracking-wider"
            >
              <Download size={14} />
              DOWNLOAD CV
            </a>
            <a
              href="https://github.com/userIssa"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-wipe flex items-center gap-2 px-4 py-3 border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] font-bold font-mono rounded-full text-xs tracking-wider"
              aria-label="GitHub profile"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GITHUB</span>
            </a>
          </div>
        </div>

        {/* Interactive 3D Sword */}
        <div className="lg:col-span-6 w-full h-[350px] sm:h-[450px] lg:h-[500px] relative">
          <SwordHero />
        </div>
      </div>
    </section>
  );
}

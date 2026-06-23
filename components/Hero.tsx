"use client";

import { useEffect, useState } from "react";
import { Terminal, Shield, ArrowRight, Cpu, FolderGit, FileJson, Play } from "lucide-react";
import dynamic from "next/dynamic";

const DragonHero = dynamic(() => import("./DragonHero"), {
  ssr: false,
});

const TYPING_WORDS = [
  "I build systems. Then I break them.",
  "Software Engineer. Ethical Hacker. Both on purpose.",
  "Full-stack dev by day. Penetration tester by design.",
  "Software Engineer", "Ethical Hacker", "Human Being"
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = TYPING_WORDS[wordIdx];
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % TYPING_WORDS.length);
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentWord.substring(0, typedText.length - 1)
            : currentWord.substring(0, typedText.length + 1)
        );
      }, typingSpeed);
    }

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
      className="min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-6 relative overflow-hidden select-none"
    >
      {/* Neo-Tokyo Grid overlay and scanlines */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-20" />
      
      {/* Elegant Cyber Red Sun Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-cyber-red/5 blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[10%] opacity-5 text-[150px] font-bold text-white tracking-widest leading-none pointer-events-none select-none font-mono text-right">
        ポートハーコート、
        <br />
        ナイジェリア
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 text-left">
        {/* Intro panel */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 self-start px-3 py-1 bg-cyber-pink/10 border border-cyber-pink/35 rounded-full text-xs font-mono text-cyber-pink tracking-widest uppercase font-bold">
            <Cpu size={14} />
            <span>PORTFOLIO_NODE // アクティブ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white font-sans">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan text-neon-glow-pink">
              Issa
            </span>
          </h1>

          <div className="text-xl sm:text-2xl font-mono font-semibold min-h-[2.5rem] py-1 flex items-center text-cyber-cyan text-neon-glow-cyan">
            <span>
              <span className="text-white border-r-2 border-cyber-pink pr-1 animate-blink">{typedText}</span>
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl font-sans leading-relaxed">
            BSc Software Engineering graduate and cybersecurity specialist. Specializing in secure web ecosystems, robust backend microservices, and network exploit assessments. I build performant digital architectures and test security boundaries.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => handleScrollTo("contact")}
              className="flex items-center gap-2 px-5 py-3 bg-cyber-pink hover:bg-white text-white hover:text-black font-bold font-mono rounded-lg transition-all text-xs tracking-wider shadow-neon-pink"
            >
              SEND SIGNAL
              <ArrowRight size={14} />
            </button>
            <a
              href="/assets/resume.pdf"
              download="Toluwanimi_Oderinde_Resume.pdf"
              className="flex items-center gap-2 px-5 py-3 border border-cyber-cyan/40 hover:border-cyber-cyan bg-cyber-cyan/5 text-cyber-cyan hover:text-white font-bold font-mono rounded-lg transition-all text-xs tracking-wider shadow-neon-cyan"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>

        {/* Interactive 3D Wireframe Dragon */}
        <div className="lg:col-span-6 w-full h-[350px] sm:h-[450px] lg:h-[500px] relative">
          <DragonHero />
        </div>
      </div>
    </section>
  );
}

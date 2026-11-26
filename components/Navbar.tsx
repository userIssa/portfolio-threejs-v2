"use client";

import { useState, useEffect } from "react";
import { Terminal, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function HoverScribble() {
  return (
    <svg
      className="absolute inset-0 w-[125%] h-[160%] -left-[12.5%] -top-[30%] pointer-events-none z-0 select-none"
      viewBox="0 0 100 40"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 5 20 C 5 5, 95 5, 95 20 C 95 35, 5 35, 5 22 C 5 12, 85 8, 92 18 C 95 24, 75 32, 50 32"
        stroke="var(--accent-pink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="300"
        strokeDashoffset="300"
        className="animate-[drawScribble_0.5s_ease-out_forwards]"
      />
    </svg>
  );
}

export default function Navbar() {
  const [activeSec, setActiveSec] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["home", "about", "experience", "projects", "decryptor", "credentials", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (section === "decryptor") {
              setActiveSec("projects");
            } else if (section === "credentials") {
              setActiveSec("experience");
            } else {
              setActiveSec(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const navItems = [
    { id: "home", label: "HOME // ホーム" },
    { id: "about", label: "ABOUT // 概要" },
    { id: "experience", label: "EXPERIENCE // 経歴" },
    { id: "projects", label: "PROJECTS // 制作" },
    { id: "contact", label: "CONTACT // 連絡" },
  ];

  const handleScrollTo = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: "smooth",
      });
      setActiveSec(id);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo/Identity - Option 2: Editorial Terminal Wordmark */}
        <button
          type="button"
          onClick={() => handleScrollTo("home")}
          className="flex items-center gap-1.5 hover:opacity-95 group transition-all shrink-0 whitespace-nowrap"
          aria-label="Issa.dev Home"
        >
          <span
            aria-hidden="true"
            className="font-mono font-bold text-sm text-cyber-pink group-hover:text-cyber-cyan transition-colors"
          >
            &gt;_
          </span>

          <span className="flex items-baseline leading-none">
            <span className="font-sans font-black text-[18px] tracking-tight text-[var(--ink)]">
              ISSA
            </span>
            <span className="font-mono font-bold text-[13px] tracking-normal text-cyber-pink">
              .dev
            </span>
            <span
              aria-hidden="true"
              className="font-mono font-bold text-[13px] text-cyber-cyan animate-blink"
            >
              _
            </span>
          </span>

          <span
            aria-hidden="true"
            className="text-[9px] font-mono text-[var(--muted)] tracking-widest ml-0.5 hidden sm:inline"
          >
            イッサ
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollTo(item.id)}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
              className={`font-mono text-[10px] font-semibold tracking-wider whitespace-nowrap shrink-0 relative py-2 transition-colors ${
                activeSec === item.id
                  ? "text-cyber-pink text-neon-glow-pink"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="relative z-10 px-1.5 py-1 inline-block">
                {item.label}
                {hoveredItemId === item.id && <HoverScribble />}
              </span>
              {activeSec === item.id && (
                <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-cyber-pink animate-pulse rounded-full shadow-neon-pink" />
              )}
            </button>
          ))}

          {/* Neo-Tokyo Online indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 border border-cyber-pink/25 bg-cyber-pink/5 rounded-full text-[9px] font-mono text-cyber-pink tracking-wider whitespace-nowrap shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink animate-ping shrink-0" />
            <span>オンライン (ONLINE) // HIREABLE</span>
          </div>

          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2.5">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-[var(--ink)] hover:bg-[var(--surface-subtle)] rounded transition-all"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] z-20 h-screen bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--line)] flex flex-col p-6 animate-fade-in">
          <nav className="flex flex-col gap-6 font-mono text-xs font-semibold tracking-widest text-left" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollTo(item.id)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                className={`py-2 border-b border-[var(--line)] transition-all text-left relative ${
                  activeSec === item.id
                    ? "text-cyber-pink pl-2"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                <span className="relative z-10 px-2 py-1 inline-block">
                  {item.label}
                  {hoveredItemId === item.id && <HoverScribble />}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-8 flex items-center gap-2.5 p-3.5 border border-cyber-pink/25 bg-cyber-pink/5 rounded-lg text-xs font-mono text-cyber-pink">
            <Terminal size={14} className="shrink-0 animate-pulse" />
            <span>システム (SYSTEM): ONLINE // HIREABLE</span>
          </div>
        </div>
      )}
    </header>
  );
}

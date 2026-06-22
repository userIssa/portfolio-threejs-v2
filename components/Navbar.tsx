"use client";

import { useState, useEffect } from "react";
import { Terminal, Shield, Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeSec, setActiveSec] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section tracking via IntersectionObserver
      const sections = ["home", "about", "experience", "projects", "contact"];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSec(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        scrolled ? "bg-cyber-dark/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo/Identity */}
        <button
          onClick={() => handleScrollTo("home")}
          className="flex items-center gap-2.5 font-mono text-white text-base font-bold tracking-wider hover:opacity-90 group transition-all"
        >
          <div className="p-1.5 rounded-lg border border-cyber-pink/35 bg-cyber-pink/10 text-cyber-pink group-hover:shadow-neon-pink transition-all">
            <Shield size={16} className="animate-pulse" />
          </div>
          <span className="text-white group-hover:text-cyber-pink transition-colors">
            ISSA<span className="text-cyber-pink">.DEV</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`font-mono text-[10px] font-semibold tracking-widest relative py-1 transition-colors ${
                activeSec === item.id ? "text-cyber-pink text-neon-glow-pink" : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
              {activeSec === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-pink animate-pulse rounded-full shadow-neon-pink" />
              )}
            </button>
          ))}

          {/* Neo-Tokyo Online indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 border border-cyber-pink/20 bg-cyber-pink/5 rounded-full text-[9px] font-mono text-cyber-pink tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink animate-ping shrink-0" />
            <span>オンライン (ONLINE) // HIREABLE</span>
          </div>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-1.5 text-white/80 hover:text-white hover:bg-white/5 rounded transition-all"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] z-20 h-screen bg-[#08090f]/95 border-t border-white/5 flex flex-col p-6 animate-fade-in">
          <nav className="flex flex-col gap-6 font-mono text-xs font-semibold tracking-widest text-left">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`py-2 border-b border-white/5 transition-all text-left ${
                  activeSec === item.id ? "text-cyber-pink pl-2" : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
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

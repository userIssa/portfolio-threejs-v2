"use client";

import { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncTimer = setTimeout(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    }, 0);
    return () => clearTimeout(syncTimer);
  }, []);

  const applyTheme = (nextDark: boolean) => {
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("issa-theme", nextDark ? "dark" : "light");
    } catch {
      // Ignore storage errors
    }
    setIsDark(nextDark);
  };

  const handleToggle = () => {
    const nextDark = !isDark;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as DocumentWithViewTransition;

    if (!doc.startViewTransition || prefersReducedMotion) {
      applyTheme(nextDark);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 48;
    const y = rect ? rect.top + rect.height / 2 : 32;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      applyTheme(nextDark);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 580,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    }).catch(() => {
      // Ignore transition cancellation
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? "Switch to Paper light mode" : "Switch to Obsidian dark mode"}
      title={isDark ? "Switch to Paper mode" : "Back to Obsidian mode"}
      onClick={handleToggle}
      className="theme-toggle-isolated group relative flex items-center gap-2 px-2 py-1 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] hover:border-cyber-pink/60 transition-all shrink-0"
    >
      {/* Tactile pill track */}
      <span className="relative w-10 h-5 rounded-full bg-[var(--bg-2)] border border-[var(--line)] flex items-center px-0.5 transition-colors">
        <span
          className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
            isDark
              ? "translate-x-0 bg-cyber-pink text-white shadow-[0_0_8px_rgba(255,42,109,0.55)]"
              : "translate-x-5 bg-[#111318] text-[#f2f1ec]"
          }`}
        >
          {isDark ? <Moon size={10} /> : <Sun size={10} />}
        </span>
      </span>

      <span className="hidden xl:inline font-mono text-[9px] tracking-wider uppercase text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors whitespace-nowrap pr-1">
        {isDark ? "OBSIDIAN" : "PAPER"}
      </span>
    </button>
  );
}

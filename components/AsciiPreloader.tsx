"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { PRELOADER_ASCII_FRAMES, ASCII_FRAME_INTERVAL_MS } from "./preloaderFrames";

interface AsciiPreloaderProps {
  onComplete: () => void;
}

const TOTAL_TICKS = PRELOADER_ASCII_FRAMES.reduce((sum, f) => sum + f.ticks, 0);

export default function AsciiPreloader({ onComplete }: AsciiPreloaderProps) {
  const [frameIdx, setFrameIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const exitingRef = useRef(false);

  const handleExit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setIsExiting(true);

    setTimeout(() => {
      onComplete();
    }, 650);
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const immediate = setTimeout(() => onComplete(), 0);
      return () => clearTimeout(immediate);
    }

    document.body.style.overflow = "hidden";

    let currentIdx = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const step = () => {
      const currentFrame = PRELOADER_ASCII_FRAMES[currentIdx];
      const delay = (currentFrame?.ticks ?? 1) * ASCII_FRAME_INTERVAL_MS;

      timerId = setTimeout(() => {
        if (exitingRef.current) return;
        currentIdx += 1;
        if (currentIdx >= PRELOADER_ASCII_FRAMES.length) {
          handleExit();
          return;
        }
        setFrameIdx(currentIdx);
        step();
      }, delay);
    };

    step();

    return () => {
      clearTimeout(timerId);
      document.body.style.overflow = "";
    };
  }, [handleExit, onComplete]);

  const elapsedTicks = PRELOADER_ASCII_FRAMES.slice(0, frameIdx + 1).reduce(
    (sum, f) => sum + f.ticks,
    0
  );
  const progressPct = Math.min(100, Math.round((elapsedTicks / TOTAL_TICKS) * 100));
  const currentArt = PRELOADER_ASCII_FRAMES[frameIdx]?.art ?? "";

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#05070a] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-[650ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Subtle Crimson / Cyber-Pink CRT Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,60,0.14)_0%,rgba(255,42,109,0.04)_45%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 terminal-scanlines opacity-30 pointer-events-none" />

      {/* Top HUD Bar */}
      <div className="absolute top-6 inset-x-6 flex items-center justify-between z-50 font-mono text-xs">
        <div className="flex items-center gap-2.5 text-cyber-pink/80 tracking-widest">
          <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse shadow-neon-red" />
          <span>{"ASCII_BOOT_SEQ // ROLL_A001"}</span>
          <span className="text-cyber-cyan hidden sm:inline">[{progressPct}%]</span>
        </div>

        <button
          type="button"
          onClick={handleExit}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-cyber-pink/50 bg-black/60 hover:bg-cyber-pink/10 rounded-full text-xs font-mono tracking-widest text-white/80 hover:text-cyber-pink transition-all uppercase"
        >
          <span>Skip</span>
          <X size={12} />
        </button>
      </div>

      {/* Centered ASCII Frame Viewport */}
      <div className="relative z-10 flex items-center justify-center w-full px-4">
        <pre
          aria-hidden="true"
          className="font-mono whitespace-pre text-[clamp(5.2px,1.02vw,13px)] leading-[1.15] tracking-[0.06em] text-cyber-pink text-neon-glow-pink drop-shadow-[0_0_8px_rgba(255,0,60,0.45)] w-[96ch] overflow-hidden"
        >
          {currentArt}
        </pre>
      </div>

      {/* Bottom Progress Rail */}
      <div className="absolute bottom-8 w-64 max-w-[80vw] flex flex-col gap-2 items-center font-mono">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyber-red via-cyber-pink to-cyber-cyan transition-all duration-100"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="text-[10px] tracking-widest text-white/40 uppercase">
          {"Bypassing Firewall // バイパス中"}
        </span>
      </div>
    </div>
  );
}

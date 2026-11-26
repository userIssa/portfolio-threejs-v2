"use client";

import { useState, useEffect } from "react";
import TerminalCLI from "@/components/TerminalCLI";
import MatrixOverlay from "@/components/MatrixOverlay";
import AsciiPreloader from "@/components/AsciiPreloader";
import CustomCursor from "@/components/CustomCursor";

export default function PortfolioOverlays() {
  const [isHacking, setIsHacking] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />

      {/* Footer Details */}
      <footer className="py-8 pb-20 sm:pb-8 border-t border-[var(--line)] bg-[var(--bg-2)]/60 font-mono text-xs text-[var(--muted)] text-center">
        <div className="max-w-6xl mx-auto px-6 sm:pr-48 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} ISSA.DEV. ALL RIGHTS RESERVED.</span>
          <button
            type="button"
            className="text-cyber-pink hover:underline cursor-pointer bg-transparent border-0 p-0 font-mono text-xs"
            onClick={() => setIsHacking(true)}
          >
            [BYPASS_HANDSHAKE_OVERRIDE // システムバイパス]
          </button>
        </div>
      </footer>

      {/* Unified Command Line & System Log Dock */}
      <TerminalCLI onHackTrigger={() => setIsHacking(true)} />

      {/* Matrix Glitch Overlay when 'hack' is triggered */}
      {isHacking && <MatrixOverlay onComplete={() => setIsHacking(false)} />}

      {/* ASCII Preloader on initial load and page refresh */}
      {showPreloader && <AsciiPreloader onComplete={() => setShowPreloader(false)} />}
    </>
  );
}

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { SW, SH, STARRY_NIGHT_DATA } from "./starryNightData";

interface AsciiPreloaderProps {
  onComplete: () => void;
}

const ROWS = SH >> 1; // 114 half-block terminal rows (2 pixels per cell vertically)
const BARE: readonly [number, number, number] = [9, 11, 26];
const DURATION_SEC = 4.6;
const HOLD_READY_MS = 320;
const BAR_BLOCKS = 28;

/** Deterministic 32-bit integer spatial hash matching starrynight.py. */
function hsh(ix: number, iy: number): number {
  let n = (Math.imul(ix | 0, 374761393) + Math.imul(iy | 0, 668265263)) >>> 0;
  n = Math.imul((n ^ (n >>> 13)) >>> 0, 1274126177) >>> 0;
  return (((n ^ (n >>> 16)) >>> 0) & 0xffff) / 65535.0;
}

/** Smooth 2D value noise matching starrynight.py. */
function noise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  let fx = x - ix;
  let fy = y - iy;
  fx = fx * fx * (3 - 2 * fx);
  fy = fy * fy * (3 - 2 * fy);
  const a = hsh(ix, iy);
  const b = hsh(ix + 1, iy);
  const c = hsh(ix, iy + 1);
  const d = hsh(ix + 1, iy + 1);
  return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy;
}

/** Decode base64 + zlib stream into raw RGB (3*N) and stroke angle (N) bytes. */
async function decodePaintingData(b64: string): Promise<Uint8Array> {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  const ds = new DecompressionStream("deflate");
  const stream = new Blob([bytes]).stream().pipeThrough(ds);
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}

export default function AsciiPreloader({ onComplete }: AsciiPreloaderProps) {
  const [progressPct, setProgressPct] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleExit();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false }) ?? null;
    if (ctx) {
      ctx.fillStyle = `rgb(${BARE[0]}, ${BARE[1]}, ${BARE[2]})`;
      ctx.fillRect(0, 0, SW, SH);
    }

    let cancelled = false;
    let rafId = 0;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;

    const startAnimation = async () => {
      if (!ctx || typeof DecompressionStream === "undefined") {
        setProgressPct(100);
        setIsReady(true);
        holdTimer = setTimeout(handleExit, 300);
        return;
      }

      let raw: Uint8Array;
      try {
        raw = await decodePaintingData(STARRY_NIGHT_DATA);
      } catch {
        if (!cancelled) handleExit();
        return;
      }
      if (cancelled) return;

      const n = SW * SH;
      const rgb = raw.subarray(0, 3 * n);
      const ang = raw.subarray(3 * n);

      // Precompute stroke direction vectors, glow mask, phase, and clumped dab reveal order
      const cs = new Float32Array(n);
      const sn = new Float32Array(n);
      const glow = new Uint8Array(n);
      const glowSeed = new Float32Array(n);

      for (let y = 0; y < SH; y++) {
        const gy = Math.floor(y / 9);
        for (let x = 0; x < SW; x++) {
          const idx = y * SW + x;
          const a = (ang[idx] / 255.0) * Math.PI;
          cs[idx] = Math.cos(a);
          sn[idx] = Math.sin(a);

          const o = idx * 3;
          const r = rgb[o];
          const g = rgb[o + 1];
          const b = rgb[o + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum > 150 && (r + g) * 0.5 - b > 35) {
            glow[idx] = 1;
            glowSeed[idx] = hsh(Math.floor(x / 9), gy) * 6.2831853;
          }
        }
      }

      // Per half-block cell (cols = SW, rows = SH / 2) phase and dab reveal threshold
      const cellCount = SW * ROWS;
      const ph = new Float32Array(cellCount);
      const order = new Float32Array(cellCount);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < SW; c++) {
          const ci = r * SW + c;
          ph[ci] = c * 0.05 + r * 0.09 + 5.0 * noise(c * 0.04, r * 0.08);
          order[ci] = 0.55 * hsh(c, r) + 0.45 * noise(c * 0.16, r * 0.30);
        }
      }

      const img = ctx.createImageData(SW, SH);
      const buf = img.data;
      const startTime = performance.now();
      let lastReportedPct = -1;
      let doneTriggered = false;

      const samplePixel = (x: number, y: number, t: number, phase: number, outIdx: number) => {
        const idx = y * SW + x;
        const s = 1.35 * Math.sin(t * 1.1 + phase);
        let xx = x + Math.round(cs[idx] * s);
        let yy = y + Math.round(sn[idx] * s);
        if (xx < 0) xx = 0;
        else if (xx >= SW) xx = SW - 1;
        if (yy < 0) yy = 0;
        else if (yy >= SH) yy = SH - 1;

        const srcOffset = (yy * SW + xx) * 3;
        let r = rgb[srcOffset];
        let g = rgb[srcOffset + 1];
        let b = rgb[srcOffset + 2];

        if (glow[idx]) {
          const f = 1.0 + 0.09 * Math.sin(t * 2.1 + glowSeed[idx]);
          r = Math.min(255, r * f);
          g = Math.min(255, g * f);
          b = Math.min(255, b * f);
        }

        // Subtle terminal 6-bit RGB quantization matching starrynight.py truecolor feel
        buf[outIdx] = (r | 0) & 0xfc;
        buf[outIdx + 1] = (g | 0) & 0xfc;
        buf[outIdx + 2] = (b | 0) & 0xfc;
        buf[outIdx + 3] = 255;
      };

      const renderFrame = (now: number) => {
        if (cancelled || exitingRef.current) return;

        const t = (now - startTime) / 1000;
        const x = Math.min(1.0, t / DURATION_SEC);
        const prog = x * x * (3 - 2 * x) * 1.02;
        const pct = Math.min(100, Math.floor(Math.min(prog, 1.0) * 100));

        if (pct !== lastReportedPct) {
          lastReportedPct = pct;
          setProgressPct(pct);
        }

        for (let r = 0; r < ROWS; r++) {
          const yTop = r << 1;
          const yBot = yTop + 1;
          for (let c = 0; c < SW; c++) {
            const ci = r * SW + c;
            const outTop = (yTop * SW + c) << 2;
            const outBot = (yBot * SW + c) << 2;

            if (order[ci] >= prog) {
              buf[outTop] = BARE[0];
              buf[outTop + 1] = BARE[1];
              buf[outTop + 2] = BARE[2];
              buf[outTop + 3] = 255;

              buf[outBot] = BARE[0];
              buf[outBot + 1] = BARE[1];
              buf[outBot + 2] = BARE[2];
              buf[outBot + 3] = 255;
            } else {
              const phase = ph[ci];
              samplePixel(c, yTop, t, phase, outTop);
              samplePixel(c, yBot, t, phase, outBot);
            }
          }
        }

        ctx.putImageData(img, 0, 0);

        if (x >= 1.0 && !doneTriggered) {
          doneTriggered = true;
          setIsReady(true);
          setProgressPct(100);
          holdTimer = setTimeout(() => {
            if (!cancelled) handleExit();
          }, HOLD_READY_MS);
        }

        rafId = requestAnimationFrame(renderFrame);
      };

      rafId = requestAnimationFrame(renderFrame);
    };

    startAnimation();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (holdTimer) clearTimeout(holdTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [handleExit, onComplete]);

  const filledBlocks = Math.floor((progressPct / 100) * BAR_BLOCKS);
  const asciiBar = "█".repeat(filledBlocks) + "░".repeat(BAR_BLOCKS - filledBlocks);

  return (
    <div
      className={`fixed inset-0 w-screen h-[100dvh] z-[90] bg-[#090b1a] select-none overflow-hidden transition-all duration-[650ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Full-Screen Starry Night Half-Block Canvas */}
      <canvas
        ref={canvasRef}
        width={SW}
        height={SH}
        aria-label="Animated terminal rendition of Vincent van Gogh's The Starry Night"
        className="absolute inset-0 w-full h-full object-cover object-center [image-rendering:pixelated]"
      />

      {/* Authentic terminal scanline texture & top/bottom readability scrim */}
      <div className="absolute inset-0 terminal-scanlines opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,11,26,0.72)_0%,transparent_20%,transparent_74%,rgba(9,11,26,0.86)_100%)] pointer-events-none" />

      {/* Top HUD Bar */}
      <div className="absolute top-5 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between z-20 font-mono text-xs">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#090b1a]/75 backdrop-blur-md border border-[#f0d890]/25 text-[#f0d890]/95 tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#f0c850] animate-pulse shadow-[0_0_8px_rgba(240,200,80,0.85)]" />
          <span>{"STARRY_NIGHT // VAN_GOGH_1889"}</span>
          <span className="text-[#78aaff] hidden sm:inline">[{String(progressPct).padStart(3, "0")}%]</span>
        </div>

        <button
          type="button"
          onClick={handleExit}
          aria-label="Skip preloader"
          className="flex items-center gap-1.5 px-3.5 py-1.5 border border-white/25 hover:border-[#f0d890]/70 bg-[#090b1a]/80 backdrop-blur-md hover:bg-[#f0d890]/15 rounded-full text-xs font-mono tracking-widest text-white/90 hover:text-[#f0d890] transition-all uppercase"
        >
          <span>Skip</span>
          <X size={12} />
        </button>
      </div>

      {/* Bottom Floating Terminal Progress Bar from starrynight.py */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-4 flex justify-center z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#090b1a]/80 backdrop-blur-md border border-[#f0d890]/20 shadow-[0_12px_40px_rgba(0,0,0,0.65)] font-mono text-[11px] sm:text-xs tracking-wider text-[#f3dfb0]">
          <div className="flex items-center gap-2 sm:gap-3 whitespace-pre">
            <span className="text-[#8cb4ff] min-w-[7ch] text-right">
              {isReady ? "Ready" : "Loading"}
            </span>
            <span className="text-[#f0c850] tracking-tighter leading-none">{asciiBar}</span>
            <span className="min-w-[4ch] text-right tabular-nums">
              {progressPct}%
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-white/55 uppercase">
            {"288×228 Brushstroke Field // 星月夜"}
          </span>
        </div>
      </div>
    </div>
  );
}

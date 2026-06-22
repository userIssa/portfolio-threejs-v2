"use client";

import { useEffect, useRef, useState } from "react";

export default function MatrixOverlay({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Half-width Katakana characters
    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1079".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 9, 15, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = katakana[Math.floor(Math.random() * katakana.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character - alternating pink and green for cyber Tokyo vibe
        ctx.fillStyle = i % 3 === 0 ? "#ff2a85" : "#10b981"; 
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const statusTimer = setTimeout(() => {
      setShowStatus(true);
    }, 1500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(statusTimer);
      clearTimeout(completeTimer);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#08090f] flex items-center justify-center font-mono select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {showStatus && (
        <div className="z-10 p-6 sm:p-10 glassmorphism border-cyber-pink/45 rounded-2xl flex flex-col items-center justify-center text-center gap-4 animate-fade-in shadow-neon-pink bg-[#08090f]/90 max-w-md mx-6">
          <div className="w-12 h-12 rounded-full border border-cyber-pink/40 flex items-center justify-center bg-cyber-pink/10 text-cyber-pink animate-ping" />
          <div className="text-2xl font-bold text-cyber-pink text-neon-glow-pink uppercase tracking-widest mt-2 animate-pulse">
            SYSTEM BYPASS GRANTED
          </div>
          <div className="text-[10px] text-white/70 leading-relaxed max-w-xs mt-1">
            Root override access confirmed. Secure dossiers extracted. Re-launching Neo-Tokyo network loops.
          </div>
          <div className="text-[9px] text-white/30 tracking-widest animate-pulse mt-2 uppercase">
            ターミナルシャットダウン...
          </div>
        </div>
      )}
    </div>
  );
}

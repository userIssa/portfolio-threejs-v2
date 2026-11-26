"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  sakuraRgb: string;
  angle: number;
  spin: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  flutter: number;
  flutterSpeed: number;
}

const SAKURA_PALETTE = [
  "244, 114, 182", // blossom pink
  "251, 146, 178", // soft sakura rose
  "225, 29, 72",   // deep accent sakura
  "249, 168, 212", // pale petal blush
  "236, 72, 153",  // vibrant sakura
] as const;

/** Draw a delicate notched cherry-blossom petal centered at (0, 0). */
function drawSakuraPetal(ctx: CanvasRenderingContext2D, length: number, width: number) {
  ctx.beginPath();
  ctx.moveTo(0, -length * 0.55);
  ctx.bezierCurveTo(width * 0.95, -length * 0.45, width, length * 0.15, width * 0.22, length * 0.55);
  // Subtle signature sakura tip notch
  ctx.lineTo(0, length * 0.38);
  ctx.lineTo(-width * 0.22, length * 0.55);
  ctx.bezierCurveTo(-width, length * 0.15, -width * 0.95, -length * 0.45, 0, -length * 0.55);
  ctx.closePath();
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animId = 0;
    const ripples: Ripple[] = [];
    let particles: Particle[] = [];
    let pointerX = -1000;
    let pointerY = -1000;

    const isDarkMode = () => document.documentElement.classList.contains("dark");

    const initParticles = () => {
      particles = [];
      const count = Math.max(24, Math.min(Math.floor((canvas.width * canvas.height) / 19000), 68));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.35) * 0.35,
          vy: Math.random() * 0.48 + 0.32,
          size: Math.random() * 4.5 + 4.5, // ~4.5..9px sakura petal length
          alpha: Math.random() * 0.34 + 0.44, // ~0.44..0.78 clearly visible on paper
          color: Math.random() > 0.6 ? "cyan" : "pink",
          sakuraRgb: SAKURA_PALETTE[Math.floor(Math.random() * SAKURA_PALETTE.length)],
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.018,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.02 + 0.012,
          swayAmp: Math.random() * 0.45 + 0.2,
          flutter: Math.random() * Math.PI * 2,
          flutterSpeed: Math.random() * 0.03 + 0.015,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const addRipple = (x: number, y: number) => {
      const dark = isDarkMode();
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.min(canvas.width, canvas.height) * 0.22,
        speed: 3.5,
        alpha: dark ? 0.45 : 0.3,
        color: Math.random() > 0.5
          ? dark ? "0, 229, 255" : "2, 132, 199"
          : dark ? "255, 42, 109" : "225, 29, 72",
      });
    };

    const draw = () => {
      const dark = isDarkMode();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft ambient cursor aura
      if (pointerX > 0 && pointerY > 0) {
        const grad = ctx.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, 220);
        if (dark) {
          grad.addColorStop(0, "rgba(0, 229, 255, 0.05)");
          grad.addColorStop(0.5, "rgba(255, 42, 109, 0.025)");
          grad.addColorStop(1, "rgba(5, 7, 10, 0)");
        } else {
          grad.addColorStop(0, "rgba(2, 132, 199, 0.045)");
          grad.addColorStop(0.5, "rgba(225, 29, 72, 0.02)");
          grad.addColorStop(1, "rgba(242, 241, 236, 0)");
        }
        ctx.fillStyle = grad;
        ctx.fillRect(pointerX - 220, pointerY - 220, 440, 440);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swayPhase += p.swaySpeed;
        p.flutter += p.flutterSpeed;

        // Gentle breeze displacement near cursor
        let breezeX = 0;
        let breezeY = 0;
        if (!dark && pointerX > 0 && pointerY > 0) {
          const dx = p.x - pointerX;
          const dy = p.y - pointerY;
          const distSq = dx * dx + dy * dy;
          if (distSq > 1 && distSq < 16900) {
            const force = (1 - Math.sqrt(distSq) / 130) * 0.55;
            const invDist = 1 / Math.sqrt(distSq);
            breezeX = dx * invDist * force;
            breezeY = dy * invDist * force * 0.4;
          }
        }

        const speedScale = dark ? 0.45 : 1.0;
        p.x += (p.vx + Math.sin(p.swayPhase) * p.swayAmp) * speedScale + breezeX;
        p.y += p.vy * speedScale + breezeY;
        p.angle += p.spin;

        if (p.x < -16) p.x = canvas.width + 16;
        if (p.x > canvas.width + 16) p.x = -16;
        if (p.y > canvas.height + 16) {
          p.y = -16;
          p.x = Math.random() * canvas.width;
        }

        if (dark) {
          // Obsidian dark mode: keep ~60% subtle drifting motes
          if (i % 5 === 0 || i % 5 === 3) continue;
          const rgb = p.color === "cyan" ? "0, 229, 255" : "255, 42, 109";
          const moteRadius = p.size * 0.28;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, moteRadius * 1.5, moteRadius, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${p.alpha * 0.38})`;
          ctx.fill();
          ctx.restore();
        } else {
          // Paper mode: prominent fluttering sakura petals
          const tiltScale = 0.48 + 0.52 * Math.abs(Math.cos(p.flutter));
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(1, tiltScale);
          drawSakuraPetal(ctx, p.size, p.size * 0.62);
          ctx.fillStyle = `rgba(${p.sakuraRgb}, ${p.alpha})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(190, 24, 93, ${p.alpha * 0.25})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.restore();
        }
      }

      for (let idx = ripples.length - 1; idx >= 0; idx--) {
        const r = ripples[idx];
        r.radius += r.speed;
        r.alpha -= 0.012;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(idx, 1);
          continue;
        }

        for (let ring = 0; ring < 3; ring++) {
          const currentRadius = r.radius - ring * 12;
          if (currentRadius <= 0) continue;

          const ringAlpha = r.alpha * (1 - ring * 0.25);

          ctx.beginPath();
          ctx.arc(r.x, r.y, currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color}, ${ringAlpha})`;
          ctx.lineWidth = 1.5 - ring * 0.3;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    let lastRippleX = -1000;
    let lastRippleY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;

      const dx = e.clientX - lastRippleX;
      const dy = e.clientY - lastRippleY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 30) {
        const dark = isDarkMode();
        if (ripples.length < 28) {
          ripples.push({
            x: e.clientX,
            y: e.clientY,
            radius: 0,
            maxRadius: 70,
            speed: 1.6,
            alpha: dark ? 0.28 : 0.2,
            color: Math.random() > 0.5
              ? dark ? "0, 229, 255" : "2, 132, 199"
              : dark ? "255, 42, 109" : "225, 29, 72",
          });
        }
        lastRippleX = e.clientX;
        lastRippleY = e.clientY;
      }
    };

    const handleClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[var(--bg)] overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-cyber-surgery pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}

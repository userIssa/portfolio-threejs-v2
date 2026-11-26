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
  radius: number;
  alpha: number;
  color: string;
  angle: number;
  spin: number;
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
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 36000), 42);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: Math.random() * 0.18 + 0.08,
          radius: Math.random() * 1.8 + 0.9,
          alpha: Math.random() * 0.25 + 0.08,
          color: Math.random() > 0.6 ? "cyan" : "pink",
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.01,
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

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y > canvas.height + 10) p.y = -10;

        const rgb = p.color === "cyan"
          ? dark ? "0, 229, 255" : "2, 132, 199"
          : dark ? "255, 42, 109" : "225, 29, 72";

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 1.5, p.radius, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${dark ? p.alpha : p.alpha * 0.8})`;
        ctx.fill();
        ctx.restore();
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

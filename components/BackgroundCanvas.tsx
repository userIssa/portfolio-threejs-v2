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

    let animId: number;
    let ripples: Ripple[] = [];
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 30000), 50);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: Math.random() * 0.2 + 0.1, // Drift downwards slowly
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.3 + 0.1,
          color: Math.random() > 0.6 ? "rgba(0, 229, 255, " : "rgba(255, 42, 109, ", // Cyan or Sakura Pink
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    const addRipple = (x: number, y: number) => {
      // Spawn two concentric ripples with slight delays or widths
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.min(canvas.width, canvas.height) * 0.25,
        speed: 3.5,
        alpha: 0.6,
        color: Math.random() > 0.5 ? "0, 229, 255" : "255, 42, 109", // Cyan or Sakura Pink
      });
    };

    const draw = () => {
      // Clear with very slight transparency to prevent ghosting but allow clean redraws
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw drifting particles (Cherry blossom cyber-droplets)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;

        // Wrap around boundaries
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        // Draw a small elongated drop/petal shape
        ctx.ellipse(0, 0, p.radius * 1.5, p.radius, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw water ripples
      ripples.forEach((r, idx) => {
        r.radius += r.speed;
        r.alpha -= 0.01;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(idx, 1);
          return;
        }

        // Draw multiple close concentric rings to represent fluid refraction waves
        for (let ring = 0; ring < 3; ring++) {
          const currentRadius = r.radius - ring * 12;
          if (currentRadius <= 0) continue;

          // Decay transparency for outer ring layers
          const ringAlpha = r.alpha * (1 - ring * 0.25);
          
          ctx.beginPath();
          ctx.arc(r.x, r.y, currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color}, ${ringAlpha})`;
          ctx.lineWidth = 1.5 - ring * 0.3;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    let lastMouseX = -1000;
    let lastMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn a trail ripple every 30 pixels of mouse movement
      if (dist > 30) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 70,
          speed: 1.6,
          alpha: 0.28,
          color: Math.random() > 0.5 ? "0, 229, 255" : "255, 42, 109",
        });
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    const handleClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
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
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-cyber-bg overflow-hidden">
      {/* Blurred artwork image layer */}
      <div className="absolute inset-0 bg-cyber-surgery pointer-events-none" />
      
      {/* HTML Canvas drawing ripples over the blurred artwork */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type CursorMode = "default" | "expand" | "precision" | "hidden";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    const el = cursorRef.current;
    if (!el) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = prefersReducedMotion ? 1 : 0.22;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let currentScale = 1;
    let targetScale = 1;
    let visible = false;
    let animId = 0;

    const resolveMode = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) return "default";
      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        return "hidden";
      }
      if (target.closest("[data-cursor='precision']")) {
        return "precision";
      }
      if (target.closest("[data-cursor='default']")) {
        return "default";
      }
      if (target.closest("a, button, [role='button'], [data-cursor='expand']")) {
        return "expand";
      }
      return "default";
    };

    const applyMode = (mode: CursorMode) => {
      if (mode === "hidden") {
        el.style.opacity = "0";
        targetScale = 0.6;
        return;
      }
      el.style.opacity = visible ? "1" : "0";
      if (mode === "expand") {
        targetScale = 3.2;
      } else if (mode === "precision") {
        targetScale = 0.5;
      } else {
        targetScale = 1;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        currentX = targetX;
        currentY = targetY;
      }
      applyMode(resolveMode(e.target));
    };

    const handleMouseLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      currentScale += (targetScale - currentScale) * ease;

      el.style.transform = `translate3d(${currentX - 7}px, ${currentY - 7}px, 0) scale(${currentScale})`;
      animId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    animId = requestAnimationFrame(tick);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[14px] h-[14px] rounded-full bg-white pointer-events-none z-[9998] mix-blend-difference opacity-0 will-change-transform transition-opacity duration-150"
    />
  );
}

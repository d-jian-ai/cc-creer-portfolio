"use client";

import { useEffect, useRef } from "react";

export default function HeroGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const el = glowRef.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.setProperty("--glow-x", `${currentX}px`);
      el.style.setProperty("--glow-y", `${currentY}px`);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [--glow-x:50%] [--glow-y:35%]"
    >
      {/* 环境漂浮光斑：冷绿 + 雾白 + 暖光点缀 */}
      <div className="motion-safe:animate-[drift-a_22s_ease-in-out_infinite] absolute -left-1/4 top-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-emerald-300/25 blur-[100px] dark:bg-emerald-500/15" />
      <div className="motion-safe:animate-[drift-b_26s_ease-in-out_infinite] absolute -right-1/4 bottom-[-15%] h-[55vmax] w-[55vmax] rounded-full bg-teal-200/20 blur-[110px] dark:bg-teal-500/10" />
      <div className="motion-safe:animate-[drift-c_18s_ease-in-out_infinite] absolute left-1/3 top-1/4 h-[35vmax] w-[35vmax] rounded-full bg-amber-200/15 blur-[90px] dark:bg-amber-400/10" />

      {/* 跟随鼠标的雾白光晕 */}
      <div
        className="absolute h-[45vmax] w-[45vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-[80px] dark:bg-white/10"
        style={{ left: "var(--glow-x)", top: "var(--glow-y)" }}
      />
    </div>
  );
}

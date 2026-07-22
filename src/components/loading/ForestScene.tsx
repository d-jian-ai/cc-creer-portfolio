"use client";

import { useEffect, useRef } from "react";
import type { WeatherKind } from "@/lib/weather";

// 占位氛围渐变，等真实森林照片到位后替换这里的背景层即可，
// 其余的雾气/光斑/视差逻辑不用动。
const GRADIENTS: Record<WeatherKind, string> = {
  fog: "radial-gradient(circle at 50% 30%, #4b5f52 0%, #2b3830 45%, #10160f 100%)",
  clear: "radial-gradient(circle at 50% 25%, #6b8f6a 0%, #2f4a34 45%, #0d1710 100%)",
  rain: "radial-gradient(circle at 50% 30%, #364a4a 0%, #1c2b2b 45%, #070d0c 100%)",
  snow: "radial-gradient(circle at 50% 25%, #6f7d78 0%, #313f3c 45%, #0e1513 100%)",
  night: "radial-gradient(circle at 50% 20%, #1c2b28 0%, #0d1512 45%, #050805 100%)",
};

export default function ForestScene({ weather }: { weather: WeatherKind }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `scale(1.08) translate(${x * -12}px, ${y * -8}px)`;
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div
        ref={ref}
        className="absolute inset-0 scale-105 transition-[background] duration-700 ease-out"
        style={{ background: GRADIENTS[weather] }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

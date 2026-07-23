"use client";

import { useEffect, useState } from "react";
import HeroGlow from "./HeroGlow";
import HeroShader from "./HeroShader";

export default function HeroBackground() {
  const [mode, setMode] = useState<"loading" | "shader" | "css">("loading");

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setMode(isMobile || prefersReducedMotion ? "css" : "shader");
  }, []);

  if (mode === "loading") return null;
  if (mode === "shader") return <HeroShader />;
  return <HeroGlow />;
}

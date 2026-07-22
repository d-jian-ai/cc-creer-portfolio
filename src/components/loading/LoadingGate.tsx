"use client";

import { useCallback, useEffect, useState } from "react";
import ForestScene from "./ForestScene";
import WeatherLayer from "./WeatherLayer";
import LoadingRing from "./LoadingRing";
import { detectWeather, type WeatherKind } from "@/lib/weather";

const ENTER_KEY = "site-entered";
const MIN_LOADING_MS = 1200;

export default function LoadingGate() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [weather, setWeather] = useState<WeatherKind>("fog");

  useEffect(() => {
    setMounted(true);

    if (sessionStorage.getItem(ENTER_KEY)) {
      setVisible(false);
      return;
    }

    let cancelled = false;
    const start = Date.now();

    detectWeather().then((w) => {
      if (cancelled) return;
      setWeather(w);
      const elapsed = Date.now() - start;
      const wait = Math.max(MIN_LOADING_MS - elapsed, 0);
      window.setTimeout(() => {
        if (!cancelled) setReady(true);
      }, wait);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  const handleEnter = useCallback(() => {
    setLeaving(true);
    sessionStorage.setItem(ENTER_KEY, "1");
    window.setTimeout(() => setVisible(false), 700);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ease-out ${
        leaving ? "pointer-events-none scale-105 opacity-0" : "opacity-100"
      }`}
    >
      <ForestScene weather={weather} />
      <WeatherLayer weather={weather} />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {!ready ? (
          <LoadingRing />
        ) : (
          <button
            type="button"
            onClick={handleEnter}
            aria-label="进入"
            className="h-4 w-4 animate-pulse rounded-full bg-white/90 shadow-[0_0_30px_10px_rgba(255,255,255,0.35)] transition-transform hover:scale-125"
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { fireflyOptions } from "@/lib/spaceParticles";

export default function FireflyField() {
  const t = useTranslations("space");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!enabled) {
    return (
      <div className="flex h-[50vh] min-h-[320px] w-full items-center justify-center rounded-2xl border border-foreground/10 text-sm text-foreground/40">
        {t("fireflyDisabled")}
      </div>
    );
  }

  return (
    <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-b from-emerald-950/40 to-black/60">
      <ParticlesProvider init={loadSlim}>
        <Particles
          id="space-fireflies"
          className="absolute inset-0"
          options={fireflyOptions}
        />
      </ParticlesProvider>
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/50">
        {t("fireflyHint")}
      </p>
    </div>
  );
}

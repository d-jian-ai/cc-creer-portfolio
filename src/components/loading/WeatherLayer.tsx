"use client";

import { useMemo } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { getWeatherParticleOptions } from "@/lib/particles";
import type { WeatherKind } from "@/lib/weather";

export default function WeatherLayer({ weather }: { weather: WeatherKind }) {
  const options = useMemo(() => getWeatherParticleOptions(weather), [weather]);

  return (
    <ParticlesProvider init={loadSlim}>
      <Particles
        id="loading-weather"
        className="absolute inset-0"
        options={options}
      />
    </ParticlesProvider>
  );
}

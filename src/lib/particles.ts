import type { ISourceOptions } from "@tsparticles/engine";
import type { WeatherKind } from "./weather";

const shared: ISourceOptions = {
  fullScreen: { enable: false },
  detectRetina: true,
  fpsLimit: 60,
};

export function getWeatherParticleOptions(weather: WeatherKind): ISourceOptions {
  switch (weather) {
    case "fog":
      return {
        ...shared,
        particles: {
          number: { value: 10 },
          shape: { type: "circle" },
          paint: { fill: { enable: true, color: { value: "#e8efe9" } } },
          opacity: { value: { min: 0.03, max: 0.12 } },
          size: { value: { min: 140, max: 260 } },
          move: {
            enable: true,
            speed: 0.15,
            direction: "right",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },
      };

    case "clear":
      return {
        ...shared,
        particles: {
          number: { value: 24 },
          shape: { type: "circle" },
          paint: {
            fill: { enable: true, color: { value: ["#ffe6b0", "#fff2d1"] } },
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: { enable: true, speed: 0.6, sync: false },
          },
          size: { value: { min: 1, max: 3 } },
          move: {
            enable: true,
            speed: 0.25,
            direction: "top",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },
      };

    case "rain":
      return {
        ...shared,
        particles: {
          number: { value: 120 },
          shape: { type: "circle" },
          paint: { fill: { enable: true, color: { value: "#bcd2d6" } } },
          opacity: { value: 0.35 },
          size: { value: { min: 1, max: 2 } },
          move: {
            enable: true,
            speed: { min: 12, max: 20 },
            direction: "bottom",
            straight: true,
            outModes: { default: "out" },
          },
        },
      };

    case "snow":
      return {
        ...shared,
        particles: {
          number: { value: 50 },
          shape: { type: "circle" },
          paint: { fill: { enable: true, color: { value: "#ffffff" } } },
          opacity: { value: { min: 0.3, max: 0.8 } },
          size: { value: { min: 1.5, max: 3.5 } },
          move: {
            enable: true,
            speed: { min: 0.6, max: 1.6 },
            direction: "bottom",
            random: true,
            straight: false,
            drift: 0.5,
            outModes: { default: "out" },
          },
        },
      };

    case "night":
      return {
        ...shared,
        particles: {
          number: { value: 26 },
          shape: { type: "circle" },
          paint: {
            fill: { enable: true, color: { value: ["#d9f2a3", "#f7e28a"] } },
          },
          opacity: {
            value: { min: 0.1, max: 0.9 },
            animation: { enable: true, speed: 1.2, sync: false },
          },
          size: { value: { min: 1, max: 2.5 } },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          },
        },
      };

    default:
      return shared;
  }
}

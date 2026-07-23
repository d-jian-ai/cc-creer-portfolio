import type { ISourceOptions } from "@tsparticles/engine";

// 萤火虫在鼠标附近聚集的交互配置 —— 复用 tsparticles 自带的 attract 交互模式实现，
// 不用自己写物理引擎。
export const fireflyOptions: ISourceOptions = {
  fullScreen: { enable: false },
  detectRetina: true,
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "attract" },
    },
    modes: {
      attract: {
        distance: 220,
        duration: 0.4,
        factor: 3,
        speed: 1,
        maxSpeed: 20,
      },
    },
  },
  particles: {
    number: { value: 70 },
    shape: { type: "circle" },
    paint: {
      fill: {
        enable: true,
        color: { value: ["#d9f2a3", "#f7e28a", "#eafff0"] },
      },
    },
    opacity: {
      value: { min: 0.15, max: 0.9 },
      animation: { enable: true, speed: 1.4, sync: false },
    },
    size: { value: { min: 1.5, max: 3.5 } },
    move: {
      enable: true,
      speed: 0.7,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
  },
};

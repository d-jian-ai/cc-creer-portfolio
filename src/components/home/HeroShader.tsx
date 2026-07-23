"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// 经典的 value-noise + fbm 流动雾气 shader（ShaderToy 常见手法的移植版），
// 配色沿用项目的"冷绿 + 雾白 + 暖光点缀"基调。
const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = uv;
    aspectUv.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.05;
    float n = fbm(aspectUv * 2.2 + vec2(t, -t * 0.6));
    float n2 = fbm(aspectUv * 3.5 - vec2(t * 0.7, t * 0.3));

    vec3 coolGreen = vec3(0.16, 0.36, 0.29);
    vec3 mistWhite = vec3(0.86, 0.90, 0.87);
    vec3 warmLight = vec3(0.96, 0.78, 0.52);

    vec3 color = mix(coolGreen, mistWhite, n);
    color = mix(color, warmLight, pow(n2, 3.0) * 0.4);

    vec2 mouseUv = uMouse;
    mouseUv.x *= uResolution.x / uResolution.y;
    float dist = distance(aspectUv, mouseUv);
    float glow = smoothstep(0.5, 0.0, dist) * 0.35;
    color += warmLight * glow;

    float vignette = smoothstep(0.9, 0.2, distance(uv, vec2(0.5)));
    color *= mix(0.55, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
  });

  useFrame((state) => {
    const u = uniforms.current;
    u.uTime.value = state.clock.elapsedTime;
    u.uMouse.value.lerp(
      new THREE.Vector2(mouse.current.x, mouse.current.y),
      0.05,
    );
    u.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}

export default function HeroShader() {
  return (
    <div className="absolute inset-0">
      <Canvas
        gl={{ antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}

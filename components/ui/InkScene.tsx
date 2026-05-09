"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SmokePlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
      },

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,

      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;

        float random(vec2 st){
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st){
          vec2 i = floor(st);
          vec2 f = fract(st);

          float a = random(i);
          float b = random(i + vec2(1.0,0.0));
          float c = random(i + vec2(0.0,1.0));
          float d = random(i + vec2(1.0,1.0));

          vec2 u = f*f*(3.0-2.0*f);

          return mix(a,b,u.x) +
                 (c-a)*u.y*(1.0-u.x) +
                 (d-b)*u.x*u.y;
        }

        void main() {
          vec2 uv = vUv;

          // stronger flowing movement
          uv.y += uTime * 0.16;
          uv.x += sin(uv.y * 6.0 + uTime * 1.8) * 0.12;
          uv.x += cos(uv.y * 3.5 + uTime * 1.2) * 0.06;

          // layered animated noise
          float n1 = noise(uv * 4.0);
          float n2 = noise((uv + n1 + uTime * 0.08) * 7.0);
          float n3 = noise((uv + n2 - uTime * 0.05) * 11.0);

          float smoke = n1 * 0.45 + n2 * 0.35 + n3 * 0.25;

          // fade top / reveal bottom
          smoke *= smoothstep(1.0, 0.15, vUv.y);

          smoke = smoothstep(0.28, 0.92, smoke);

          vec3 dark = vec3(0.08,0.08,0.08);
          vec3 warm = vec3(0.72,0.56,0.28);

          vec3 color = mix(dark, warm, smoke * 0.45);

          gl_FragColor = vec4(color, smoke * 0.92);
        }
      `,
    });
  }, []);

  return (
    <mesh scale={[11, 8, 91]}>
      <planeGeometry args={[1, 1, 4, 4]} />
      <primitive ref={materialRef} object={material} attach="material" />
    </mesh>
  );
}

export default function InkScene() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <SmokePlane />
      </Canvas>
    </div>
  );
}
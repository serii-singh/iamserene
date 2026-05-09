// components/ui/HeroInkScene.tsx

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function HeroSmoke() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const velocity = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!materialRef.current) return;

    // Smooth mouse follow
    mouse.current.lerp(targetMouse.current, 0.08);

    // velocity from movement
    velocity.current.lerp(
      targetMouse.current.clone().sub(mouse.current).multiplyScalar(10),
      0.08
    );

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value = mouse.current;
    materialRef.current.uniforms.uVelocity.value = velocity.current;
  });

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uVelocity: { value: new THREE.Vector2(0, 0) },
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
        uniform vec2 uMouse;
        uniform vec2 uVelocity;

        varying vec2 vUv;

        float random(vec2 st){
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
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

          // Base smoke motion
          uv.y += uTime * 0.04;
          uv.x += sin(uv.y * 4.0 + uTime * 0.8) * 0.04;

          // Cursor reactive zone
          float dist = distance(uv, uMouse);

          float force = smoothstep(0.38, 0.0, dist);

          // push smoke using movement direction
          uv -= uVelocity * force * 0.12;

          // soft swirl around cursor
          vec2 dir = normalize(uv - uMouse + 0.0001);
          uv += dir * sin(dist * 28.0 - uTime * 5.0) * 0.012 * force;

          // layered smoke
          float n1 = noise(uv * 3.2);
          float n2 = noise((uv + n1) * 6.0);
          float n3 = noise((uv + n2) * 9.5);

          float smoke = n1 * 0.45 + n2 * 0.35 + n3 * 0.22;

          smoke = smoothstep(0.22, 0.95, smoke);

          vec3 black = vec3(0.02,0.02,0.02);
          vec3 silver = vec3(0.85,0.85,0.85);
          vec3 gold = vec3(0.78,0.62,0.28);

          vec3 col = mix(black, silver, smoke * 0.22);
          col = mix(col, gold, smoke * 0.14);

          // cursor interaction highlight
          col += force * 0.04;

          gl_FragColor = vec4(col, smoke * 0.68);
        }
      `,
    });
  }, []);

  const handleMove = (e: any) => {
    targetMouse.current.set(e.uv.x, e.uv.y);
  };

  return (
    <mesh
      scale={[14, 8, 1]}
      onPointerMove={handleMove}
    >
      <planeGeometry args={[1, 1, 128, 128]} />
      <primitive
        object={material}
        ref={materialRef}
        attach="material"
      />
    </mesh>
  );
}

export default function HeroInkScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <HeroSmoke />
      </Canvas>
    </div>
  );
}
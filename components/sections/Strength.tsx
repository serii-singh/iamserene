"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/* ---------------- Panels Data ---------------- */
const panels = [
  {
    number: "01",
    title: "Design That Speaks",
    description: "Interfaces built with clarity, elegance, and presence.",
    coloredWord: "Design",
  },
  {
    number: "02",
    title: "Built To Perform",
    description: "Fast, responsive experiences engineered for scale.",
    coloredWord: "Perform",
  },
  {
    number: "03",
    title: "Details That Matter",
    description: "Because polish is what people remember.",
    coloredWord: "Details",
  },
];

/* ---------------- Tunnel ---------------- */
function Tunnel() {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return [...Array(190)].map((_, i) => ({
      z: -i * 1.2,
      scale: 1 + i * 0.12,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const children = groupRef.current.children;

    children.forEach((ring: any) => {
      ring.position.z += delta * 14;
      ring.rotation.z += 0.0015;
    });

    children.forEach((ring: any) => {
      if (ring.position.z > 4) {
        const furthestZ = Math.min(
          ...children.map((r: any) => r.position.z)
        );

        ring.position.z = furthestZ - 1.2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          position={[0, 0, ring.z]}
          rotation={[0, 0, i * 0.15]}
          scale={ring.scale}
        >
          <torusGeometry args={[2.5, 0.08, 16, 100]} />

          <meshStandardMaterial
            color={i % 2 === 0 ? "#efd6a8" : "#bda875"}
            emissive={i % 2 === 0 ? "#d7b577" : "#000000"}
            emissiveIntensity={0.35}
            metalness={1}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Floating Orb ---------------- */
function FloatingOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.5) * 0.2;

    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={[0, 0, -20]}>
      <sphereGeometry args={[0.4, 64, 64]} />

      <meshStandardMaterial
        color="#dcb25f"
        emissive="#e6d4b6"
        emissiveIntensity={2}
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  );
}

/* ---------------- Particles ---------------- */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = -Math.random() * 100;
    }

    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.position.z += delta * 8;

    if (pointsRef.current.position.z > 10) {
      pointsRef.current.position.z = 0;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.08}
        color="#f5d28a"
        transparent
        opacity={0.8}
      />
    </points>
  );
}

/* ---------------- Main Scene ---------------- */
export default function TunnelScene() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const maxScroll = 1200;
      const progress = Math.min(scrollY / maxScroll, 1);

      const index = Math.floor(progress * panels.length);

      setTextIndex(
        Math.min(index, panels.length - 1)
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-[250vh] w-full">
      
      {/* Sticky Hero */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 blur-sm scale-110"
          style={{
            backgroundImage: "url('/images/ink-bg.png')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-[1]" />

        {/* Canvas */}
        <Canvas
          className="absolute inset-0 z-[2]"
          camera={{ position: [0, 0, 5], fov: 75 }}
        >
          <fog attach="fog" args={["#000000", 15, 120]} />

          <ambientLight intensity={0.4} />
          <pointLight position={[0, 0, 5]} intensity={4} />
          <pointLight position={[0, 0, -20]} intensity={3} />

          <Tunnel />
          <FloatingOrb />
          <Particles />
        </Canvas>

        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center z-[3] px-6 pointer-events-none">
          <div className="text-center max-w-4xl animate-fadeIn">
            
            <h2 className="text-5xl md:text-8xl font-extrabold uppercase tracking-tight leading-tight">
              {panels[textIndex].title
                .split(" ")
                .map((word, i) => (
                  <span
                    key={i}
                    className={
                      word === panels[textIndex].coloredWord
                        ? "text-[#d7b06a]"
                        : "text-white"
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
            </h2>

            <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              {panels[textIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
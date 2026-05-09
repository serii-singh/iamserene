"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------------- PREMIUM FALLING SAND ---------------- */

function FallingSand() {
  const pointsRef = useRef<THREE.Points>(null);

  const COUNT = 2200;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      arr[i3] = (Math.random() - 0.5) * 0.03;
      arr[i3 + 1] = Math.random() * 1.1 - 0.55;
      arr[i3 + 2] = (Math.random() - 0.5) * 0.03;
    }

    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const pos =
      pointsRef.current.geometry.attributes.position
        .array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      pos[i3 + 1] -= delta * 1.8;

      if (pos[i3 + 1] < -0.58) {
        pos[i3 + 1] = 0.62;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate =
      true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#f2d08a"
        size={0.008}
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ---------------- HOURGLASS ---------------- */

function PremiumHourglass() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y =
      state.clock.elapsedTime * 0.18;
  });

  return (
    <group ref={group} scale={1.05}>

      {/* TOP BASE */}
      <mesh position={[0, 1.58, 0]}>
        <cylinderGeometry args={[0.78, 0.88, 0.14, 64]} />

        <meshPhysicalMaterial
          color="#c89a4b"
          metalness={1}
          roughness={0.16}
          clearcoat={1}
          reflectivity={1}
        />
      </mesh>

      {/* BOTTOM BASE */}
      <mesh position={[0, -1.58, 0]}>
        <cylinderGeometry args={[0.88, 0.78, 0.14, 64]} />

        <meshPhysicalMaterial
          color="#c89a4b"
          metalness={1}
          roughness={0.16}
          clearcoat={1}
          reflectivity={1}
        />
      </mesh>

      {/* PREMIUM PILLARS */}
      {[
        [0.62, 0.62],
        [-0.62, 0.62],
        [0.62, -0.62],
        [-0.62, -0.62],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <cylinderGeometry
            args={[0.045, 0.06, 3.15, 24]}
          />

          <meshPhysicalMaterial
            color="#b8863b"
            metalness={1}
            roughness={0.22}
            clearcoat={1}
          />
        </mesh>
      ))}

      {/* TOP GLASS */}
      <mesh position={[0, 0.48, 0]}>
        <coneGeometry
          args={[0.48, 1.15, 128, 128, true]}
        />

        <MeshTransmissionMaterial
          backside
          transmission={1}
          roughness={0}
          thickness={0.3}
          ior={1.52}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0}
          temporalDistortion={0}
        />
      </mesh>

      {/* BOTTOM GLASS */}
      <mesh
        position={[0, -0.48, 0]}
        rotation={[Math.PI, 0, 0]}
      >
        <coneGeometry
          args={[0.48, 1.15, 128, 128, true]}
        />

        <MeshTransmissionMaterial
          backside
          transmission={1}
          roughness={0}
          thickness={0.3}
          ior={1.52}
          chromaticAberration={0.02}
          anisotropy={0.1}
        />
      </mesh>

      {/* GOLD RINGS */}
      <mesh position={[0, 0.98, 0]}>
        <torusGeometry args={[0.52, 0.018, 32, 120]} />

        <meshStandardMaterial
          color="#e2bb6b"
          metalness={1}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[0, -0.98, 0]}>
        <torusGeometry args={[0.52, 0.018, 32, 120]} />

        <meshStandardMaterial
          color="#e2bb6b"
          metalness={1}
          roughness={0.18}
        />
      </mesh>

      {/* TOP SAND */}
      <mesh position={[0, 0.78, 0]}>
        <coneGeometry args={[0.24, 0.48, 32]} />

        <meshStandardMaterial
          color="#f3d58f"
          emissive="#d7b06a"
          emissiveIntensity={0.35}
          roughness={0.35}
        />
      </mesh>

      {/* BOTTOM SAND */}
      <mesh position={[0, -1.02, 0]}>
        <coneGeometry args={[0.32, 0.42, 32]} />

        <meshStandardMaterial
          color="#f3d58f"
          emissive="#d7b06a"
          emissiveIntensity={0.22}
          roughness={0.4}
        />
      </mesh>

      {/* FLOWING SAND */}
      <FallingSand />

      {/* INNER GLOW */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1.2}
        color="#d7b06a"
      />
    </group>
  );
}

/* ---------------- MAIN SECTION ---------------- */

export default function TimelessEngineering() {
  return (
  <section className="relative min-h-screen overflow-hidden bg-black">

    {/* background */}
    <div className="absolute inset-0">

      {/* smoky radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_50%,rgba(215,176,106,0.18),transparent_25%)]" />

      {/* dark fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#050505] to-black" />

      {/* left subtle warm haze */}
      <div className="absolute left-0 top-0 h-full w-[40%] bg-gradient-to-r from-[#1a1208]/40 to-transparent blur-3xl" />

      {/* floating particles */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#d7b06a]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </div>

    {/* content layout */}
    <div className="relative z-10 grid min-h-screen grid-cols-1 items-center px-8 md:grid-cols-2 md:px-20">

      {/* LEFT TEXT */}
      <div className="max-w-xl">

        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#d7b06a]/70">
          TIMELESS ENGINEERING
        </p>

        <div className="mb-8 h-[1px] w-20 bg-[#d7b06a]/40" />

        <h2 className="text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          <span className="block text-white">
            Crafted Beyond
          </span>

          <span className="block text-[#d7b06a]">
            Temporary Trends
          </span>
        </h2>

        <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60">
          Great products shouldn’t feel outdated in months.
          I build digital experiences engineered to remain
          elegant, fast, and unforgettable over time.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#d7b06a]" />
          <span className="text-sm tracking-[0.3em] text-white/50 uppercase">
            Built to Last
          </span>
        </div>
      </div>

      {/* RIGHT HOURGLASS */}
      <div className="relative flex items-center justify-center">

        {/* glow behind hourglass */}
        <div className="absolute h-[500px] w-[500px] rounded-full bg-[#d7b06a]/20 blur-[140px]" />

        {/* rotating rings behind */}
        <div className="absolute h-[520px] w-[520px] rounded-full border border-[#d7b06a]/10 animate-spin-slow" />
        <div className="absolute h-[600px] w-[600px] rounded-full border border-[#d7b06a]/5 animate-spin-reverse" />

        {/* canvas */}
        <div className="relative h-[700px] w-full">
          <Canvas
            camera={{ position: [0, 0, 5.8], fov: 42 }}
          >
            <ambientLight intensity={0.9} />

            <directionalLight
              position={[5, 5, 5]}
              intensity={1.8}
            />

            <directionalLight
              position={[-5, 2, 2]}
              intensity={1.2}
              color="#d7b06a"
            />

            <Float
              speed={1.5}
              rotationIntensity={0.15}
              floatIntensity={0.25}
            >
              <PremiumHourglass />
            </Float>

            <Sparkles
              count={80}
              scale={8}
              size={3}
              speed={0.4}
              color="#d7b06a"
            />

            <Environment preset="night" />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.8}
            />
          </Canvas>
        </div>
      </div>
    </div>

    {/* animations */}
    <style jsx>{`
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
          opacity: 0.4;
        }
        50% {
          transform: translateY(-20px);
          opacity: 1;
        }
      }

      .animate-spin-slow {
        animation: spin 20s linear infinite;
      }

      .animate-spin-reverse {
        animation: spinReverse 28s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes spinReverse {
        from {
          transform: rotate(360deg);
        }
        to {
          transform: rotate(0deg);
        }
      }
    `}</style>
  </section>
);
}
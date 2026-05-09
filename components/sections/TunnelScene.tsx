"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import ContactSection from "./Contact";
import Strength from "./StrengthCopy";
import TransitionSection from "./TransitionSection";

/* ---------------- Panels ---------------- */
const panels = [
  {
    title: "Built Beyond Beautiful",
    description:
      "I craft digital experiences that feel premium from the very first interaction.",
    coloredWord: "Beautiful",
  },
  {
    title: "Design That Speaks",
    description:
      "Interfaces built with clarity, elegance, and presence.",
    coloredWord: "Design",
  },
  {
    title: "Built To Perform",
    description:
      "Fast, responsive experiences engineered for scale.",
    coloredWord: "Perform",
  },
  {
    title: "Details That Matter",
    description:
      "Because polish is what people remember.",
    coloredWord: "Details",
  },
];

/* ---------------- Enhanced Tunnel with Slower Speed & End Yellow ---------------- */
function Tunnel({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Create multiple layers of rings for depth
  const rings = useMemo(() => {
    const ringSets = [];
    const layers = 3; // Three layers for depth effect
    
    for (let layer = 0; layer < layers; layer++) {
      const count = 100;
      const baseZ = layer * -30;
      const radius = 2.0 + layer * 0.5;
      const thickness = 0.05 + layer * 0.02;
      const tubeSegments = 80 + layer * 20;
      
      for (let i = 0; i < count; i++) {
        // Calculate color based on depth - far rings (end of tunnel) are yellow/gold
        const depthRatio = Math.min(1, i / count);
        ringSets.push({
          z: baseZ - i * 1.2,
          scale: 1 + i * 0.008,
          radius: radius,
          thickness: thickness,
          tubeSegments: tubeSegments,
          layer: layer,
          rotationSpeed: 0.0008 + layer * 0.0004, // Slower rotation
          depthRatio: depthRatio,
        });
      }
    }
    return ringSets;
  }, []);

  // Glowing core rings - these become yellow at the end
  const coreRings = useMemo(() => {
    return [...Array(40)].map((_, i) => {
      const depthRatio = Math.min(1, i / 40);
      return {
        z: -i * 1.8,
        scale: 1 + i * 0.01,
        radius: 1.2,
        thickness: 0.1,
        depthRatio: depthRatio,
      };
    });
  }, []);

  // Sparkle rings (thin, fast)
  const sparkleRings = useMemo(() => {
    return [...Array(80)].map((_, i) => {
      const depthRatio = Math.min(1, i / 80);
      return {
        z: -i * 1.0,
        scale: 1 + i * 0.006,
        depthRatio: depthRatio,
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    const children = groupRef.current.children;

    children.forEach((child: any) => {
      // Move rings forward - SLOWER SPEED (reduced from 14 to 6)
      child.position.z += delta * 6;
      
      // Rotate rings with varying speeds - SLOWER
      const layerData = child.userData;
      if (layerData) {
        child.rotation.z += delta * layerData.rotationSpeed;
        child.rotation.x = Math.sin(timeRef.current * 0.2 + layerData.layer) * 0.02;
      } else if (child.userData?.isCore) {
        child.rotation.z += delta * 0.0015;
        // Pulse scale for core rings
        const scale = 1 + Math.sin(timeRef.current * 2) * 0.02;
        child.scale.set(scale, scale, scale);
      } else {
        child.rotation.z += delta * 0.001;
      }

      // Update colors based on depth - make end rings yellow
      if (child.material && child.userData?.depthRatio !== undefined) {
        const depthRatio = child.userData.depthRatio;
        // Start with silver/white-blue, transition to gold/yellow at the end
        const startColor = new THREE.Color(0xc0c0c0); // Silver
        const endColor = new THREE.Color(0xe6b85c); // Gold/Yellow
        const color = startColor.lerp(endColor, depthRatio);
        child.material.color = color;
        
        // Emissive intensity increases as we go deeper (more yellow glow at end)
        const emissiveIntensity = 0.3 + depthRatio * 1.2;
        child.material.emissiveIntensity = emissiveIntensity;
        
        // Metalness and roughness shift
        child.material.metalness = 0.7 + depthRatio * 0.2;
        child.material.roughness = 0.2 - depthRatio * 0.1;
      }

      // Fade out rings when near the end of scroll
      if (child.material) {
        const fadeStart = 0.7;
        const fadeEnd = 0.95;
        if (scrollProgress > fadeStart) {
          const opacity = 1 - Math.min(1, (scrollProgress - fadeStart) / (fadeEnd - fadeStart));
          child.material.opacity = Math.max(0, opacity);
          child.material.transparent = true;
        } else {
          child.material.opacity = 1;
        }
      }

      // Reset ring position
      if (child.position.z > 5) {
        const furthestZ = Math.min(
          ...children.map((r: any) => r.position.z)
        );
        child.position.z = furthestZ - 1.8;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Main tunnel rings */}
      {rings.map((ring, i) => (
        <mesh
          key={`ring-${i}`}
          position={[0, 0, ring.z]}
          rotation={[0, 0, i * 0.08]}
          scale={ring.scale}
          userData={{ 
            layer: ring.layer, 
            rotationSpeed: ring.rotationSpeed,
            depthRatio: ring.depthRatio
          }}
        >
          <torusGeometry 
            args={[ring.radius, ring.thickness, 24, ring.tubeSegments]} 
          />
          <meshStandardMaterial
            color="#c0c0c0" // Start silver
            emissive="#d4942a"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={ring.layer === 0 ? 1 : ring.layer === 1 ? 0.9 : 0.75}
          />
        </mesh>
      ))}
      
      {/* Core glowing rings - become yellow at depth */}
      {coreRings.map((ring, i) => (
        <mesh
          key={`core-${i}`}
          position={[0, 0, ring.z]}
          rotation={[0, 0, i * 0.12]}
          scale={ring.scale}
          userData={{ isCore: true, depthRatio: ring.depthRatio }}
        >
          <torusGeometry 
            args={[ring.radius, ring.thickness, 32, 90]} 
          />
          <meshStandardMaterial
            color="#c0c0c0"
            emissive="#ffaa33"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      
      {/* Sparkle rings */}
      {sparkleRings.map((ring, i) => (
        <mesh
          key={`sparkle-${i}`}
          position={[0, 0, ring.z]}
          rotation={[0, 0, i * 0.18]}
          scale={ring.scale}
          userData={{ depthRatio: ring.depthRatio }}
        >
          <torusGeometry args={[2.8, 0.025, 16, 120]} />
          <meshStandardMaterial
            color="#a0a0a0"
            emissive="#ccaa44"
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.15}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Floating Particles for extra depth ---------------- */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = -Math.random() * 100;
    }

    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.position.z += delta * 5; // Slower particle movement

    if (pointsRef.current.position.z > 12) {
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
        size={0.05}
        color="#f5d28a"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------- Floating Orb ---------------- */
function FloatingOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    ref.current.rotation.y += 0.005;
    
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={ref} position={[0, 0, -25]}>
      <sphereGeometry args={[0.35, 64, 64]} />
      <meshStandardMaterial
        color="#e6b85c"
        emissive="#ffaa33"
        emissiveIntensity={1.5}
        metalness={0.9}
        roughness={0.15}
      />
    </mesh>
  );
}

/* ---------------- Main Scene ---------------- */
export default function TunnelScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("tunnel-section");

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const localScroll = window.scrollY - sectionTop;
      const scrollY = Math.max(localScroll, 0);
      const maxScroll = 2200;
      const progress = Math.min(scrollY / maxScroll, 1);

      setScrollProgress(progress);

      if (scrollY < 400) {
        setTextIndex(0);
      } else if (scrollY < 800) {
        setTextIndex(1);
      } else if (scrollY < 1200) {
        setTextIndex(2);
      } else {
        setTextIndex(3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTextScale = 1 + scrollProgress * 0.08;
  const currentTextOpacity = scrollProgress > 0.85
    ? 1 - (scrollProgress - 0.85) * 6
    : 1;

  // BOOM effect
  const exitProgress = scrollProgress > 0.9
    ? Math.min((scrollProgress - 0.9) * 10, 1)
    : 0;

  return (
    <>
      {/* Tunnel Section */}
      <div id="tunnel-section" className="relative h-[350vh] w-full">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">

          {/* Canvas */}
          <Canvas
            className="absolute inset-0 z-10"
            camera={{ position: [0, 0, 5], fov: 75 }}
          >
            <fog attach="fog" args={["#000000", 20, 100]} />
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 0, 5]} intensity={3} color="#e6b85c" />
            <pointLight position={[0, 0, -20]} intensity={1.8} color="#ffaa33" />
            <pointLight position={[2, 1, -10]} intensity={1.2} color="#ffcc66" />
            
            <Tunnel scrollProgress={scrollProgress} />
            <FloatingOrb />
            <Particles />
          </Canvas>

          {/* Text */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
            <div
              key={textIndex}
              className="text-center transition-all duration-300"
              style={{
                transform: `scale(${currentTextScale})`,
                opacity: currentTextOpacity,
              }}
            >
              <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tight">
                {panels[textIndex].title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      word === panels[textIndex].coloredWord
                        ? "text-[#e6b85c]"
                        : "text-white"
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>
              <p className="mt-6 text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
                {panels[textIndex].description}
              </p>
            </div>
          </div>

          {/* CENTER BOOM BLACKOUT */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div
              className="rounded-full bg-black"
              style={{
                width: `${exitProgress * 300}vw`,
                height: `${exitProgress * 300}vw`,
                transform: `scale(${exitProgress})`,
                opacity: exitProgress,
              }}
            />
          </div>
        </div>
      </div>

      {/* NEXT PAGE SECTION */}
      <section className="h-screen bg-[#0a0a0a] flex items-center justify-center">
        <TransitionSection/>
      </section>
    </>
  );
}
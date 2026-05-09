"use client";

import { useRef } from "react";

export default function GoldOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 10;
    const rotateX = -((y - midY) / midY) * 10;

    // orb rotation
    if (orbRef.current) {
      orbRef.current.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `;
    }

    // circular glow
    if (glowRef.current) {
      glowRef.current.style.opacity = "0.45";
      glowRef.current.style.transform =
        "translate(-50%, -50%) scale(1.2)";
    }

    // cursor shine
    if (shineRef.current) {
      shineRef.current.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255,255,255,0.35),
          rgba(255,255,255,0.08) 35%,
          transparent 65%
        )
      `;
    }

    // smoke stronger on hover
    if (smokeRef.current) {
      smokeRef.current.style.opacity = "0.7";
    }

    // brighten video
    const video = orbRef.current?.querySelector("video");

    if (video) {
      video.style.filter =
        "brightness(1.05) contrast(120%) saturate(120%)";
    }
  };

  const reset = () => {
    if (orbRef.current) {
      orbRef.current.style.transform = `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    }

    if (glowRef.current) {
      glowRef.current.style.opacity = "0.1";
      glowRef.current.style.transform =
        "translate(-50%, -50%) scale(1)";
    }

    if (shineRef.current) {
      shineRef.current.style.background = "none";
    }

    if (smokeRef.current) {
      smokeRef.current.style.opacity = "0.35";
    }

    const video = orbRef.current?.querySelector("video");

    if (video) {
      video.style.filter =
        "brightness(0.75) contrast(120%) saturate(85%)";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative w-[420px] md:w-[520px]"
    >
      {/* Small circular glow */}
      <div
        ref={glowRef}
        className="
          absolute
          left-1/2
          top-[47%]
          h-[120px]
          w-[120px]
          md:h-[180px]
          md:w-[180px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(212,175,55,0.45),rgba(212,175,55,0.18),transparent_70%)]
          blur-2xl
          opacity-10
          transition-all duration-300
          pointer-events-none
        "
      />

      {/* Orb container */}
      <div
        ref={orbRef}
        className="relative transition-transform duration-300 ease-out"
      >
        {/* Orb video */}
        <video
          src="/videos/gold-orb.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-contain transition-all duration-500"
          style={{
            filter: "brightness(0.75) contrast(120%) saturate(85%)",
          }}
        />

        {/* Smoke overlay */}
        <div
          ref={smokeRef}
          className="absolute inset-0 opacity-35 mix-blend-screen pointer-events-none"
        >
          <div className="orb-smoke h-full w-full" />
        </div>

        {/* Cursor shine */}
        <div
          ref={shineRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen"
        />
      </div>
    </div>
  );
}
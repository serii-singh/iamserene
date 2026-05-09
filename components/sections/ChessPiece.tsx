"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ChessPiece() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const spinTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
  if (!imageRef.current || !glowRef.current) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: imageRef.current,
      start: "top 80%",
    },
  });

  // Queen emerges from smoke
  tl.from(imageRef.current, {
    y: 80,
    rotateY: -180,
    scale: 0.5,
    opacity: 0,
    filter: "blur(30px)",
    duration: 2.4,
    ease: "power4.out",
  })

    // glow builds up
    .fromTo(
      glowRef.current,
      {
        scale: 0.4,
        opacity: 0,
      },
      {
        scale: 1.2,
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
      },
      "-=2"
    );

  // floating after reveal
  gsap.to(imageRef.current, {
    y: -20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2.2,
  });

}, []);

 const handleMove = (e: React.MouseEvent) => {
  const rect = containerRef.current?.getBoundingClientRect();
  if (!rect || !imageRef.current) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Full horizontal rotation
  const rotateY = ((x - centerX) / centerX) * 180;

  // Vertical tilt
  const rotateX = -((y - centerY) / centerY) * 25;

  gsap.to(imageRef.current, {
    rotateY,
    rotateX,
    scale: 1.08,
    duration: 0.4,
    ease: "power2.out",
    transformPerspective: 1500,
    filter:
      "brightness(1.3) saturate(1.7) sepia(0.4)",
  });

  gsap.to(glowRef.current, {
    scale: 1.3,
    opacity: 1,
    duration: 0.5,
  });
};
  const resetMove = () => {
  if (!imageRef.current) return;

  gsap.to(imageRef.current, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.8,
    ease: "power3.out",
    filter: "brightness(1) saturate(1)",
  });

  gsap.to(glowRef.current, {
    scale: 1,
    opacity: 0.7,
    duration: 0.6,
  });
};

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={resetMove}
      className="
        relative
        flex
        h-[600px]
        w-[600px]
        translate-x-10
         -translate-y-7
        items-center
        justify-center
        [perspective:1500px]
      "
    >
      {/* Outer glow */}
      {/* <div
        ref={glowRef}
        className="
          absolute
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#d4af37]/25
          blur-[150px]
          opacity-70
        "
      /> */}

      {/* Inner glow */}
      <div
        className="
          absolute
          h-[250px]
          w-[250px]
          rounded-full
          bg-[#ffd700]/25
          blur-3xl
        "
      />

      {/* Queen */}
      <img
        ref={imageRef}
        src="/images/queen.png"
        alt="Chess Queen"
        className="
          relative
          z-10
          w-[55%]
          max-w-[360px]
          h-auto
          object-contain
          drop-shadow-[0_0_80px_rgba(212,175,55,0.45)]
          [transform-style:preserve-3d]
          will-change-transform
        "
      />
    </div>
  );
}
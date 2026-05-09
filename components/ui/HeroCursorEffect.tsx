// components/ui/CursorEffect.tsx

"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function CursorEffect() {
  useEffect(() => {
    const ripple = document.getElementById("hero-ripple");

    const moveRipple = (e: MouseEvent) => {
      if (!ripple) return;

      gsap.set(ripple, {
        x: e.clientX,
        y: e.clientY,
      });

      gsap.fromTo(
        ripple,
        {
          opacity: 0.75,
          scale: 0.65,
        },
        {
          opacity: 0,
          scale: 1.8,
          duration: 1,
          ease: "power2.out",
        }
      );
    };

    window.addEventListener("mousemove", moveRipple);

    return () => window.removeEventListener("mousemove", moveRipple);
  }, []);

  return (
    <div
      id="hero-ripple"
      className="pointer-events-none fixed left-0 top-0 z-5 h-44 w-44 rounded-full blur-2xl opacity-0 -translate-x-1/2 -translate-y-1/2"
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(212,175,55,0.16) 32%, rgba(255,255,255,0.05) 48%, rgba(0,0,0,0) 72%)",
      }}
    />
  );
}
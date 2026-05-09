
"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");

    const move = (e: MouseEvent) => {
      if (!glow) return;

      gsap.to(glow, {
        x: e.clientX ,
        y: e.clientY ,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      id="cursor-glow"
      className="pointer-events-none fixed left-0 top-0 z-10 h-[220px] w-[220px] rounded-full opacity-70 blur-xl"
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 28%, rgba(255,255,255,0.18) 48%, rgba(255,255,255,0) 72%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
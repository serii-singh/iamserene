"use client";

import { useEffect, useState } from "react";

export default function SoundTooltip() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const moved = (e: MouseEvent) => {
      setPos({
        x: e.clientX + 18,
        y: e.clientY + 18,
      });
    };

    const clicked = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", moved);
    window.addEventListener("click", clicked, { once: true });

    return () => {
      window.removeEventListener("mousemove", moved);
      window.removeEventListener("click", clicked);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 text-[11px] tracking-[0.2em] text-white/80 backdrop-blur-md transition-opacity duration-300"
      style={{
        left: pos.x,
        top: pos.y,
      }}
    >
      Click to enable sound
    </div>
  );
}
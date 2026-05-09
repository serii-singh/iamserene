"use client";

import { useState } from "react";

export default function TransitionSection() {
  const [mousePos, setMousePos] = useState({
    x: 50,
    y: 50,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({
      x,
      y,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({
      ...prev,
      active: false,
    }));
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-[#050505] text-white"
    >
      {/* background glow */}
      <div className="absolute inset-0">
        {/* center glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7b06a]/10 blur-[160px]" />

        {/* radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,176,106,0.08),transparent_35%)]" />

        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80" />
      </div>

      {/* cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: mousePos.active
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,
              rgba(215,176,106,0.16),
              transparent 18%)`
            : "none",
        }}
      />

      {/* particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* small particles */}
        {[...Array(25)].map((_, i) => (
          <span
            key={`small-${i}`}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#d7b06a]/70 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* bigger particles */}
        {[...Array(8)].map((_, i) => (
          <span
            key={`big-${i}`}
            className="absolute rounded-full bg-[#d7b06a]/20 blur-xl animate-float-slow"
            style={{
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 px-6 text-center">
        <h2
          className="text-5xl md:text-7xl leading-[1.05] tracking-[-0.04em] animate-title"
        >
          <span className="block text-white cursor-default">
            Beautiful Is Just
          </span>

          <span className="block text-[#d7b06a] cursor-default">
            The Beginning
          </span>
        </h2>

        <p
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/50 animate-subtitle cursor-default"
          style={{ animationDelay: "0.3s" }}
        >
          You’ve seen the story.
          You’ve seen the craft.
          Now let’s build something unforgettable.
        </p>
      </div>

      {/* scroll hint */}
      <div
        className="absolute bottom-12 text-center animate-subtitle"
        style={{ animationDelay: "0.6s" }}
      >
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/40 animate-pulse cursor-default">
          Contact
        </p>

        <div className="mx-auto mt-4 h-10 w-[1px] bg-[#d7b06a]/40 animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-40px) translateX(20px);
            opacity: 0.35;
          }
        }

        @keyframes titleReveal {
          0% {
            opacity: 0;
            transform: translateY(50px);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
            filter: blur(0px);
          }
        }

        @keyframes subtitleReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow ease-in-out infinite;
        }

        .animate-title {
          animation: titleReveal 1.4s ease forwards;
        }

        .animate-subtitle {
          opacity: 0;
          animation: subtitleReveal 1s ease forwards;
        }
      `}</style>
    </section>
  );
}
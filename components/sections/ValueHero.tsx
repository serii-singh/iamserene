"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChessPiece from "./ChessPiece";

gsap.registerPlugin(ScrollTrigger);

type Particle = {
  left: string;
  bottom: string;
};

export default function ValueHeroAnimations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles after mount
    setParticles(
      [...Array(18)].map(() => ({
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 40}%`,
      }))
    );

 const ctx = gsap.context(() => {
  // Heading words reveal slower
  gsap.from(".value-word", {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 75%",
    },
    y: 100,
    opacity: 0,
    filter: "blur(30px)",
    stagger: 0.25, // slower word reveal
    duration: 1.8,
    ease: "power4.out",
  });

  // Paragraph reveal after heading
  gsap.from(".value-line", {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 75%",
    },
    y: 50,
    opacity: 0,
    filter: "blur(15px)",
    delay: 1.2, // waits for heading reveal
    duration: 1.6,
    ease: "power3.out",
  });

  // Floating particles slower + calmer
  gsap.fromTo(
  ".particle",
  {
    opacity: 0,
    scale: 0.2,
  },
  {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    stagger: 0.05,
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 75%",
    },
  }
);

gsap.to(".particle", {
  y: -120,
  opacity: 0,
  duration: 6,
  stagger: 0.3,
  repeat: -1,
  ease: "none",
});

}, sectionRef);

    return () => ctx.revert();
  }, []);

 return (
  <section
    ref={sectionRef}
    className="relative h-screen w-screen overflow-hidden bg-black text-white "
  >
    {/* Background image */}
    <img
      src="/images/ink-bg.png"
      alt=""
      className="
        absolute inset-0
        z-[1]
        h-full
        w-full
        object-cover
        object-[65%_center]
        opacity-30
        scale-120
        rotate-180
        pointer-events-none
        select-none
      "
    />

    {/* Bronze gradient */}
    <div
      className="
        absolute inset-0 z-[2]
        bg-[linear-gradient(
          90deg,
          #2b2118_0%,
          #1a140f_20%,
          #0b0908_45%,
          #000000_70%,
          #000000_100%
        )]
      "
    />

    {/* Gold glow */}
    <div
      className="
        absolute inset-0 z-[3]
        bg-[radial-gradient(
          circle_at_40%_20%,
          rgba(212,175,55,0.12),
          transparent_30%
        )]
      "
    />

    {/* Floating particles */}
    {particles.map((particle, i) => (
      <div
        key={i}
        className="particle absolute z-[4] h-[3px] w-[3px] rounded-full bg-[#d7b06a]/40"
        style={{
          left: particle.left,
          bottom: particle.bottom,
        }}
      />
    ))}

    {/* Main Layout */}
    <div className="relative z-10 grid h-full w-full grid-cols-1 items-center md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className=" -translate-y-8 pl-8 md:pl-44">
        <p className="value-line mb-4 text-xs uppercase tracking-[0.4em] text-[#d7b06a]/90">
          What I Bring
        </p>

        <div className="mb-10 h-[1px] w-16 bg-[#d7b06a]/30" />

        <h1 className="text-3xl font-medium tracking-[-0.03em] leading-tight md:text-5xl">
          
          {/* Line 1 */}
          <div className="mb-4 flex flex-wrap items-center gap-x-3">
            <span className="value-word text-[#f2f2f2]">
              Built
            </span>

            <span className="value-word text-[#f2f2f2]">
              Through
            </span>

            <span className="value-word text-[#d7b06a] drop-shadow-[0_0_14px_rgba(212,175,55,0.12)]">
              Curiosity.
            </span>
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap items-center gap-x-3">
            <span className="value-word text-[#f2f2f2]">
              Crafted
            </span>

            <span className="value-word text-[#f2f2f2]">
              With
            </span>

            <span className="value-word text-[#d7b06a] drop-shadow-[0_0_14px_rgba(212,175,55,0.12)]">
              Intention.
            </span>
          </div>
         </h1>
         
           <div className="value-line mt-10 max-w-lg">
    
    <p className="text-base md:text-xl leading-relaxed text-white/110">
      What began as a fascination for how things work
      evolved into a passion for how they feel.
    </p>

    <p className="mt-6 text-sm md:text-xl leading-relaxed text-white border-l border-[#d7b06a]/20 pl-5">
      Today, I create digital experiences that blend
      design, motion, and development into work that
      feels modern, memorable, and made to perform.
    </p>
  </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center md:justify-end pr-8 md:pr-24">
        <ChessPiece />
      </div>
    </div>
  </section>
);
}
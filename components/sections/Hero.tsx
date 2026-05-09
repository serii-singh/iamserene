"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HeroInkScene from "../ui/HeroInkscene";
import CursorEffect from "../ui/HeroCursorEffect";
import SoundTooltip from "../ui/SoundTooltip";

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".hero-word", {
        opacity: 0,
        y: 30,
        filter: "blur(14px)",
      });

      gsap.set(".hero-name", {
        opacity: 0,
        y: 30,
        filter: "blur(14px)",
      });

      gsap.set(".hero-sub", {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
      });

      const tl = gsap.timeline();

      // Meet the Mind
      tl.to(".hero-word", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",
      })

      // Pause
      .to({}, { duration: 0.5 })

      // Serene Singh
      .to(".hero-name", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.45,
        ease: "power4.out",
      })

      // Pause
      .to({}, { duration: 0.4 })

      // Subtitle
      .to(".hero-sub", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      >
          <SoundTooltip />
      {/* Background Canvas (interactive) */}
      <div className="absolute inset-0 z-0">
        <HeroInkScene />
      </div>
      <CursorEffect />
      {/* Optional Background Image */}
      <img
        src="/images/ink-bg.png"
        alt=""
        className="absolute inset-0 z-[1] h-full w-full object-cover object-[65%_center] scale-120 blur-s opacity-55 pointer-events-none select-none "
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 z-[2] bg-black/5 pointer-events-none" /> */}
      {/* <div className="absolute inset-0 z-[1] bg-black/35 pointer-events-none" />

      <div
  className="
    absolute inset-0 z-[2] pointer-events-none
    bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.12),transparent_25%)]
  "
/>

{/* top vignette */}
<div
  className="
    absolute inset-0 z-[3] pointer-events-none
    bg-gradient-to-b from-black/20 via-transparent to-black/40
  "
/>



      {/* About */}
      <div className="absolute right-8 top-8 z-20 pointer-events-auto md:right-14 md:top-10">
        <button className="group text-sm uppercase tracking-[0.15em] text-white/90 transition-all duration-500 hover:text-[#d7b06a]">
          About
          <span className="mt-1 block h-[1px] w-0 bg-[#d7b06a] transition-all duration-500 group-hover:w-full" />
        </button>
      </div>

      {/* Projects */}
      <div className="absolute bottom-8 left-8 z-20 pointer-events-auto md:bottom-10 md:left-14">
        <button className="group text-sm uppercase tracking-[0.15em] text-white/90 transition-all duration-500 hover:text-[#d7b06a]">
          See Projects
          <span className="mt-1 block h-[1px] w-0 bg-[#d7b06a] transition-all duration-500 group-hover:w-full" />
        </button>
          </div>
          
         {/* Scroll Down */}
<div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 md:bottom-10">
  <button className="group flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/60 transition-all duration-500 hover:text-[#d7b06a]">
    <span>Scroll Down</span>

    <span className="h-6 w-[1px] bg-white/30 transition-all duration-500 group-hover:h-8 group-hover:bg-[#d7b06a]" />
  </button>
</div>

      {/* Sound */}
      {/* <div className="absolute bottom-8 right-8 z-20 pointer-events-auto md:bottom-10 md:right-14">
        <button className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-[10px]  tracking-[0.25em] text-white/75 transition-all duration-500 hover:scale-105 hover:border-[#d7b06a] hover:text-[#d7b06a]">
          Sound
        </button>
      </div> */}
          
          {/* Sound */}
{/* <div className="absolute bottom-8 right-8 z-20 pointer-events-auto md:bottom-10 md:right-14">
  <button
    onClick={() => setSoundOn(!soundOn)}
    className={`group relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 hover:scale-105 ${
      soundOn
        ? "border-[#d7b06a] shadow-[0_0_18px_rgba(212,175,55,0.18)]"
        : "border-white/20"
    }`}
  > */}

    {/* hover text */}
    {/* <span className="pointer-events-none absolute -top-8 text-[10px] uppercase tracking-[0.28em] text-white/75 opacity-0 transition-all duration-300 group-hover:opacity-100">
      {soundOn ? "On" : "Off"}
    </span>
  </button>
</div> */}

      {/* Main Content */}
      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-medium tracking-[-0.03em] leading-tight md:text-4xl">
          <span className="hero-word inline-block mr-3 text-[#f2f2f2]">
            Meet
          </span>

          <span className="hero-word inline-block mr-3 text-[#f2f2f2]">
            the
          </span>

          <span className="hero-word inline-block mr-5 text-[#f2f2f2]">
            Mind
          </span>

          <span className="hero-name inline-block text-[#d7b06a] drop-shadow-[0_0_14px_rgba(212,175,55,0.12)]">
            Serene Singh
          </span>
        </h1>

        <p className="hero-sub mt-6 text-xs uppercase tracking-[0.4em] text-white/105 md:text-sm">
          Where Ideas Become Real
        </p>
      </div>
    </section>
  );
}
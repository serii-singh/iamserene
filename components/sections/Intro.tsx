"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import InkScene from "../ui/InkScene";
import CursorGlow from "../ui/CursorGlow";

type IntroProps = {
  onEnter?: () => void;
};

export default function Intro({ onEnter }: IntroProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".word", {
        y: 30,
        opacity: 0,
        filter: "blur(12px)",
      });

      const tl = gsap.timeline();

      tl.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }
      )
        .to(".word", {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
        })
        .fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 24,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.4"
        );

      gsap.to(".word", {
        y: "-=6",
        duration: 2.8,
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".dust", {
        y: -12,
        duration: 4,
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    gsap
      .timeline({
        onComplete: () => onEnter?.(),
      })
      .to(".word", {
        opacity: 0,
        y: -28,
        filter: "blur(18px)",
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.inOut",
      })
         .to(
    experienceRef.current,
    {
      y: -35,
      opacity: 0,
      filter: "blur(10px)",
      duration: 3.7,
      ease: "power3.inOut",
    },
    "-=0.45"
  )
      .to(
        buttonRef.current,
        {
          scale: 0.82,
          opacity: 0,
          duration: 0.45,
          ease: "power3.inOut",
        },
        "0"
      )
      .to(
        sectionRef.current,
        {
          scale: 1.08,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.2"
      )
      .to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.7"
      );
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505] text-[#f4eee7]"
      >
            <CursorGlow />
      {/* Background */}
          <div className="absolute inset-0 z-0">
                {/* <img
  src="images/ink-bg.png"
    alt="Ink Background"
 className="h-full w-full object-cover object-[65%_center] scale-105" 
 /> */}
        <InkScene />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,140,60,0.08),transparent_45%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 opacity-25">
        <div className="dust absolute left-[22%] top-[28%] h-[2px] w-[2px] rounded-full bg-white" />
        <div className="dust absolute left-[68%] top-[38%] h-[2px] w-[2px] rounded-full bg-white" />
        <div className="dust absolute left-[56%] top-[64%] h-[2px] w-[2px] rounded-full bg-white" />
        <div className="dust absolute left-[38%] top-[54%] h-[2px] w-[2px] rounded-full bg-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* <h1 className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-4xl font-medium leading-tight tracking-[0.03em] md:text-7xl">
          <span className="word">Into</span>
          <span className="word">the</span> */}
          {/* <span className="word">deapaths</span> */}
          {/* <span className="word">.</span> */}
          {/* <span className="word">dive</span> */}
          {/* <span className="word text-[#d7b06a]">depths</span>
        </h1> */}
              
       {/* <h1 className="group flex flex-wrap justify-center gap-x-4 gap-y-2 text-4xl font-medium leading-tight tracking-[0.03em] md:text-7xl cursor-default">
  <span className="word transition-all duration-700 ease-out group-hover:blur-md group-hover:opacity-20 group-hover:-translate-y-1">
    Into
  </span>

  <span className="word transition-all duration-700 ease-out group-hover:blur-md group-hover:opacity-20 group-hover:-translate-y-1">
    the
  </span>

  <span className="word text-[#d7b06a] transition-all duration-700 ease-out group-hover:blur-[2px] group-hover:opacity-0 group-hover:-translate-y-0.5">
    depths.
  </span>
</h1> */}
              
<h1 className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-4xl font-medium leading-tight tracking-[0.03em] md:text-7xl cursor-default">

  <span className="word inline-block group">
    <span className="blur-word inline-block transition-all duration-700 ease-out group-hover:blur-[3px] group-hover:opacity-80">
      Into
    </span>
  </span>

  <span className="word inline-block group">
    <span className="blur-word inline-block transition-all duration-700 ease-out group-hover:blur-[3px] group-hover:opacity-80">
      the
    </span>
  </span>

  <span className="word inline-block group">
    <span className="blur-word inline-block text-[#d7b06a] transition-all duration-700 ease-out group-hover:blur-[2px] group-hover:opacity-90">
      depths.
    </span>
  </span>

</h1>

        <button
          ref={buttonRef}
          onClick={handleEnter}
          className="mt-14 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 text-[11px] uppercase tracking-[0.45em] text-[#f4eee7] transition-all duration-500 hover:scale-105 hover:border-white/50 hover:shadow-[0_0_35px_rgba(255,255,255,0.08)]"
        >
          Enter
        </button>

        {/* <p className="mt-5 text-[10px] uppercase tracking-[0.45em] text-white/35">
          Enter the experience
        </p> */}
              {/* <p className="group mt-5 cursor-default text-[10px] uppercase tracking-[0.45em] text-white/35">
  <span className="inline-block transition-all duration-700 ease-out group-hover:blur-[2px] group-hover:opacity-70">
    Enter
  </span>{" "}

  <span className="inline-block transition-all duration-700 ease-out group-hover:blur-[2px] group-hover:opacity-70">
    the
  </span>{" "}

  <span className="inline-block transition-all duration-700 ease-out group-hover:blur-[2px] group-hover:opacity-70">
    experience
  </span>
</p> */}
              
              <p
  ref={experienceRef}
  className="group mt-5 cursor-default text-[10px] uppercase tracking-[0.45em] text-white/35"
>
  <span className="inline-block transition-all duration-700 ease-out group-hover:blur-[2px] group-hover:opacity-70">
    Enter
  </span>{" "}

  <span className="inline-block transition-all duration-700 ease-out group-hover:blur-[2px] group-hover:opacity-70">
    the
  </span>{" "}

  <span className="inline-block transition-all duration-700 ease-out group-hover:blur-[2px] group-hover:opacity-70">
    experience
  </span>
</p>
      </div>

      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 bg-black opacity-0"
      />
    </section>
  );
}
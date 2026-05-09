"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",

        onEnter: () => {
          video.play();

          gsap.fromTo(
            video,
            {
              scale: 1.2,
              opacity: 0,
              filter: "blur(20px)",
            },
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.8,
              ease: "power4.out",
            }
          );

          gsap.fromTo(
            textRef.current,
            {
              y: 60,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            }
          );
        },

        onLeave: () => {
          video.pause();
        },

        onEnterBack: () => {
          video.play();
        },

        onLeaveBack: () => {
          video.pause();
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !videoRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    gsap.to(videoRef.current, {
      rotateY,
      rotateX,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1200,
    });

    if (glowRef.current) {
      glowRef.current.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(212,175,55,0.35),
          transparent 30%
        )
      `;
    }
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;

    gsap.to(videoRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    if (glowRef.current) {
      glowRef.current.style.background = "none";
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/gold-orb.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none mix-blend-screen"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Text */}
      <div
        ref={textRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
      >
        <p className="mb-5 text-xs uppercase tracking-[0.4em] text-[#d7b06a]">
          Cinematic Experience
        </p>

        <h1 className="text-5xl font-medium leading-none tracking-[-0.04em] md:text-8xl">
          Motion
          <span className="block text-[#d7b06a]">
            In Full Form
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-sm tracking-wide text-white/70 md:text-base">
          Move your cursor across the screen
          to interact with the video.
        </p>
      </div>
    </section>
  );
}
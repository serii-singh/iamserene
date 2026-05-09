"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Strength() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const orbit = orbitRef.current;

    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    //----------------------------------
    // Horizontal Scroll
    //----------------------------------
    gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    gsap.fromTo(
      ".reveal-mask",
      {
        x: "-100%",
      },
      {
        x: "0%",
        duration: 2.2,
        ease: "power6.out",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      }
    );

    //----------------------------------
    // Floating Card Animations
    //----------------------------------
    gsap.utils.toArray(".floating-card").forEach((card: any, index: number) => {
      // Entrance animation
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          rotateY: 15,
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "left center",
            end: "right center",
            scrub: 0.5,
          },
        }
      );

      // Continuous floating animation
      gsap.to(card, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3,
      });
    });

    //----------------------------------
    // Mouse Interaction for Orbit
    //----------------------------------
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbit) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;

      gsap.to(orbit, {
        rotateY: x,
        rotateX: -y,
        duration: 1.2,
        ease: "power3.out",
        transformPerspective: 1000,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const panels = [
    {
      number: "01",
      title: "Design That Speaks",
      description: "Interfaces built with clarity, elegance, and presence.",
      coloredWord: "Design",
      titleColor: "text-white",
      coloredTextColor: "text-[#f5d28a]",
      descColor: "text-white/90",
    },
    {
      number: "02",
      title: "Built To Perform",
      description: "Fast, responsive experiences engineered for scale.",
      coloredWord: "Perform",
      titleColor: "text-white",
      coloredTextColor: "text-[#f5d28a]",
      descColor: "text-white/80",
    },
    {
      number: "03",
      title: "Details That Matter",
      description: "Because polish is what people remember.",
      coloredWord: "Details",
      titleColor: "text-white",
      coloredTextColor: "text-[#f5d28a]",
      descColor: "text-white/90",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(140,110,60,0.15), transparent 35%),
          radial-gradient(circle at 80% 20%, rgba(0,0,0,0.7), transparent 40%),
          radial-gradient(circle at 60% 70%, rgba(90,65,30,0.15), transparent 35%),
          linear-gradient(135deg, #050505 0%, #0b0b0b 40%, #000000 100%)
        `,
      }}
    >
      {/* ink background image */}
      <img
        src="/images/ink-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] scale-120 blur-sm opacity-40 pointer-events-none select-none"
      />

      {/* smoke background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] bg-[#6f5326]/20 blur-[150px] rounded-full animate-floatSlow" />
        <div className="absolute bottom-[-20%] right-[10%] w-[800px] h-[800px] bg-black/60 blur-[180px] rounded-full animate-floatReverse" />
      </div>

      <div ref={trackRef} className="relative flex h-full w-max">
        {/* HERO SECTION */}
        <div className="relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden px-10">
          {/* ORGANIC GOLD ORBIT */}
          <div
            ref={orbitRef}
            className="absolute flex items-center justify-center"
            style={{
              width: "850px",
              height: "850px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* main glowing ring */}
            <svg
              width="850"
              height="850"
              viewBox="0 0 850 850"
              className="absolute"
            >
              <defs>
                <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffcc66" />
                  <stop offset="50%" stopColor="#f5d28a" />
                  <stop offset="100%" stopColor="#d7b06a" />
                </linearGradient>

                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="425"
                cy="425"
                r="240"
                stroke="url(#goldStroke)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="900 300"
                fill="none"
                filter="url(#softGlow)"
                className="main-ring"
              />

              <circle
                cx="425"
                cy="425"
                r="285"
                stroke="#f5d28a"
                strokeWidth="4"
                strokeDasharray="500 500"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
                className="second-ring"
              />

              <circle
                cx="425"
                cy="425"
                r="330"
                stroke="#d7b06a"
                strokeWidth="2"
                strokeDasharray="200 80"
                fill="none"
                opacity="0.25"
                className="third-ring"
              />
            </svg>

            <div className="absolute top-[28%] left-[32%] w-8 h-8 bg-[#ffcc66] rounded-full blur-xl opacity-90 animate-pulse" />
            <div className="absolute bottom-[30%] right-[28%] w-6 h-6 bg-[#f5d28a] rounded-full blur-lg opacity-80 animate-pulse" />

            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#f5d28a]/70"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  boxShadow: "0 0 8px rgba(245,210,138,0.6)",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            <div className="overflow-hidden">
              <h2
                className="reveal-mask text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                Built Beyond
                <span className="block text-[#d7b06a] mt-2">
                  Beautiful
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* TRANSPARENT FLOATING PANELS WITH COLORED WORDS */}
        {panels.map((panel, index) => (
          <div
            key={index}
            className="relative flex h-screen w-screen shrink-0 items-center justify-center px-20"
          >
            {/* Transparent Floating Card */}
            <div
              className={`
                floating-card
                relative
                w-[550px]
                cursor-pointer
                transition-all
                duration-700
                group
              `}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Content */}
              <div className="relative z-10">
                {/* Number */}
                <div className="mt-0">
                  <div className="inline-block">
                    <p
                      className={`text-sm tracking-[0.4em] font-semibold ${panel.titleColor} uppercase`}
                    >
                      {panel.number}
                    </p>
                    <div className={`h-[2px] w-full bg-gradient-to-r ${index !== 1 ? 'from-[#f5d28a]' : 'from-white'} to-transparent mt-2`} />
                  </div>
                </div>

                {/* Title with specific word colored yellow */}
                <h2
                  className={`text-5xl md:text-6xl ${panel.titleColor} mb-6 leading-[1.2] font-bold tracking-tight`}
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  {panel.title.split(" ").map((word, i) => {
                    if (word === panel.coloredWord) {
                      return (
                        <span key={i} className={`${panel.coloredTextColor} block`}>
                          {word}
                        </span>
                      );
                    }
                    return <span key={i}>{word} </span>;
                  })}
                </h2>

                {/* Description */}
                <p className={`${panel.descColor} text-lg leading-relaxed`}>
                  {panel.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .main-ring {
          animation: rotateMain 8s linear infinite;
          transform-origin: center;
        }

        .second-ring {
          animation: rotateReverse 12s linear infinite;
          transform-origin: center;
        }

        .third-ring {
          animation: rotateMain 20s linear infinite;
          transform-origin: center;
        }

        @keyframes rotateMain {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes floatSlow {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(20px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        @keyframes floatReverse {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-30px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        .animate-floatSlow {
          animation: floatSlow 12s ease-in-out infinite;
        }

        .animate-floatReverse {
          animation: floatReverse 14s ease-in-out infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #d7b06a;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #f5d28a;
        }
      `}</style>
    </section>
  );
}
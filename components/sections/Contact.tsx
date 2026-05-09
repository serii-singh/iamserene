import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import HeroInkScene from "../ui/HeroInkscene";

export default function ContactSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.4,
  });

  const handleMouseMove = (e: any) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();

    setMouse({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <img
        src="/images/goldcontact.png"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover opacity-70 z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Ink shader overlay */}
      <div className="absolute inset-0 z-20 opacity-70 pointer-events-auto">
        <HeroInkScene />
      </div>

      {/* Mouse glow */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none z-30"
        animate={{
          x: mouse.x - 144,
          y: mouse.y - 144,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
      />

      {/* Gold reactive cursor gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-40"
        animate={{
          background: `
            radial-gradient(
              400px circle at ${mouse.x}px ${mouse.y}px,
              rgba(255,215,0,0.18),
              rgba(255,215,0,0.08) 20%,
              transparent 60%
            )
          `,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      />

      {/* Floating blur overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen z-40"
        animate={{
          x: mouse.x * 0.03,
          y: mouse.y * 0.03,
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 25,
        }}
      >
        <div
          className="absolute inset-0 opacity-30 blur-3xl"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(255,215,0,0.15), transparent 30%),
              radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08), transparent 25%),
              radial-gradient(circle at 50% 50%, rgba(255,180,0,0.1), transparent 35%)
            `,
          }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-50 flex flex-col items-center justify-center h-full text-center px-6">

        {/* Gold @ animation */}
        <motion.img
          src="/images/goldmail.png"
          alt="Mail icon"
          className="absolute w-40 md:w-64"
          initial={{
            opacity: 1,
            scale: 2.5,
            y: -200,
          }}
          animate={
            isInView
              ? {
                  opacity: 0,
                  scale: 0.5,
                  y: 0,
                }
              : {
                  opacity: 1,
                  scale: 2.5,
                  y: -200,
                }
          }
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
        />

        {/* Contact text */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  scale: 0.8,
                }
          }
          transition={{
            delay: 1,
            duration: 1,
          }}
        >
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight cursor-default">
            Get in Touch
          </h1>

          <p className="mt-8 text-gray-300 text-4xl md:text-4xl cursor-default">
            iamserenesingh@gmail.com
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 text-sm md:text-lg z-50">
        <div></div>

        <div className="flex gap-8">
          <a href="#" className="hover:text-gray-400 transition cursor-pointer">
            X
          </a>

          <a href="#" className="hover:text-gray-400 transition cursor-pointer">
            Instagram
          </a>

          <a href="#" className="hover:text-gray-400 transition">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
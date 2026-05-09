"use client";

import { useState } from "react";

export default function FloatingNav() {
    const [soundOn, setSoundOn] = useState(false);
  return (
    <>
      {/* About */}
      <div className="fixed right-8 top-8 z-[999] md:right-14 md:top-10 ">
        <button className="group text-sm uppercase tracking-[0.15em] text-white/90 transition-all duration-500 hover:text-[#d7b06a] cursor-pointer" >
          About
          <span className="mt-1 block h-[1px] w-0 bg-[#d7b06a] transition-all duration-500 group-hover:w-full" />
        </button>
      </div>

      {/* Projects */}
      <div className="fixed bottom-8 left-8 z-[999] md:bottom-10 md:left-14">
        <button className="group text-sm uppercase tracking-[0.15em] text-white/90 transition-all duration-500 hover:text-[#d7b06a] cursor-pointer">
          See Projects
          <span className="mt-1 block h-[1px] w-0 bg-[#d7b06a] transition-all duration-500 group-hover:w-full" />
        </button>
      </div>
       {/* Sound */}
      <div className="fixed bottom-8 right-8 z-[999] md:bottom-10 md:right-14">
        <button
          onClick={() => setSoundOn(!soundOn)}
          className={`group relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer border transition-all duration-500 hover:scale-105 ${
            soundOn
              ? "border-[#d7b06a] shadow-[0_0_18px_rgba(212,175,55,0.18)]"
              : "border-white/20"
          }`}
        >
          {/* Hover text */}
          <span className="pointer-events-none absolute -top-8 text-[10px] uppercase tracking-[0.28em] text-white/75 opacity-0 transition-all duration-300 group-hover:opacity-100">
            {soundOn ? "On" : "Off"}
          </span>
        </button>
      </div>
    </>
  );
}
"use client";

import HeroPage from "@/components/sections/Hero";
import VideoPage from "@/components/sections/VideoHero";
import ValueHero from "@/components/sections/ValueHero";
import FloatingNav from "@/components/sections/FloatingNav";
import { useState } from "react";
import Intro from "@/components/sections/Intro";
import TunnelScene from "@/components/sections/TunnelScene";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [entered, setEntered] = useState(false);
// return(
  return !entered ? (
    <Intro onEnter={() => setEntered(true)} />
  ) : (
    <main className="relative bg-black">
      <FloatingNav />

      {/* HERO + VIDEO FLOW */}
      <div className="relative h-[200vh]">
        
        {/* Hero sticky */}
        <section className="sticky top-0 h-screen z-10">
          <HeroPage />
        </section>

        {/* Video scroll */}
         <section className="relative z-20 h-screen">
          <VideoPage />
        </section>
      </div> 

      {/* Value Section */}
      <section className="relative z-30 h-screen">
        <ValueHero />
      </section>

   <section className="relative z-40">
  <TunnelScene />
    </section>
    
<section className="relative z-50 bg-white">
  <Contact />
</section>
    </main>
  );
}
"use client";

export default function ValueSection() {
  return (
    <section className="relative min-h-screen w-full bg-black px-8 py-28 text-white md:px-16">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.06),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/40">
            What I Bring
          </p>

          <h2 className="text-4xl font-medium leading-tight tracking-[-0.03em] md:text-7xl">
            Built Through Curiosity.
            <br />
            <span className="text-[#d7b06a]">
              Crafted With Intention.
            </span>
          </h2>
        </div>

        {/* Story */}
        <div className="mt-16 max-w-3xl text-lg leading-relaxed text-white/68 md:text-xl">
          <p>
            What began as a fascination for how things
            work evolved into a passion for how they feel.
          </p>

          <p className="mt-6">
            Today, I create digital experiences that blend
            design, motion, and development into work that
            feels modern, memorable, and made to perform.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-24 grid gap-10 border-t border-white/10 pt-14 md:grid-cols-3">
          <div>
            <p className="text-sm tracking-[0.3em] text-[#d7b06a]">
              01
            </p>
            <h3 className="mt-4 text-2xl">Design That Speaks</h3>
            <p className="mt-4 text-white/55 leading-relaxed">
              Interfaces with clarity, elegance,
              and presence.
            </p>
          </div>

          <div>
            <p className="text-sm tracking-[0.3em] text-[#d7b06a]">
              02
            </p>
            <h3 className="mt-4 text-2xl">Built To Perform</h3>
            <p className="mt-4 text-white/55 leading-relaxed">
              Fast, responsive, scalable experiences
              built for real use.
            </p>
          </div>

          <div>
            <p className="text-sm tracking-[0.3em] text-[#d7b06a]">
              03
            </p>
            <h3 className="mt-4 text-2xl">Details That Matter</h3>
            <p className="mt-4 text-white/55 leading-relaxed">
              Because polish is what people remember.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
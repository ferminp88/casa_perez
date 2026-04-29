"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIOS } from "@/lib/content";
import { Quote, Star } from "lucide-react";

/**
 * Testimonios — marquee horizontal infinito con pause en hover/touch.
 *
 *  - Track único duplicado (items + items) animando x: 0 → -50% en loop linear.
 *  - Pausa al posar el cursor o al tocar en mobile (pointerenter/leave + touch).
 *  - Mask horizontal para que las cards no se corten duro en los bordes.
 */

export function Testimonios() {
  const [paused, setPaused] = useState(false);
  const doubled = [...TESTIMONIOS, ...TESTIMONIOS];
  const duration = Math.max(28, TESTIMONIOS.length * 4.5);

  return (
    <section id="testimonios" className="relative bg-night py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-violet-glow opacity-50" />
      <div className="absolute inset-0 bg-dot-grid opacity-30" />

      <div className="container-x relative">
        <Reveal className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <Reveal.Item className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-violet-glow">
              <span className="block h-px w-6 bg-violet" />
              Lo que cuentan
            </p>
            <h2 className="font-display text-balance text-[clamp(1.65rem,3.8vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
              Las familias vuelven. <br />
              <span className="font-editorial italic text-fiesta">Eso ya dice todo.</span>
            </h2>
          </Reveal.Item>
          <Reveal.Item>
            <div className="flex items-center gap-3 rounded-full border border-bone/15 bg-bone/5 px-5 py-3 backdrop-blur">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-lime text-lime" strokeWidth={0} />
                ))}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-bone/80">
                4.9 · +400 festejos
              </span>
            </div>
          </Reveal.Item>
        </Reveal>
      </div>

      {/* Marquee horizontal con mask lateral */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onTouchCancel={() => setPaused(false)}
      >
        <div
          className="flex w-max gap-4 px-6 md:gap-5 md:px-10 animate-marquee-x"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((t, i) => (
            <Card key={`${t.nombre}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ t }: { t: typeof TESTIMONIOS[number] }) {
  return (
    <article className="group relative flex w-[300px] flex-shrink-0 flex-col rounded-2xl border border-black/10 bg-bone p-6 shadow-soft transition-colors hover:bg-white sm:w-[340px] md:w-[380px]">
      <Quote className="absolute -top-2 -left-1 h-8 w-8 text-magenta/40" strokeWidth={1.5} />
      <p className="text-[13px] leading-relaxed text-black md:text-[15px]">
        {t.txt}
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4">
        <div>
          <p className="font-display text-sm font-medium tracking-tight text-black">
            {t.nombre}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-black/55">
            {t.evento}
          </p>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-lime text-lime" strokeWidth={0} />
          ))}
        </div>
      </div>
    </article>
  );
}

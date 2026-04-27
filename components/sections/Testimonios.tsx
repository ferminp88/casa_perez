"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIOS } from "@/lib/content";
import { Quote, Star } from "lucide-react";

/**
 * Testimonios — 3 columnas verticales con auto-scroll infinito a velocidades distintas.
 *
 * Implementación:
 *  - Duplicamos el array para que el loop yPercent: 0 → -50 sea infinito sin saltos
 *  - Cada columna scrollea a su propio ritmo (24s / 30s / 28s)
 *  - Direcciones alternas para que el ojo no siga una sola corriente
 *  - Pause-on-hover de toda la grilla
 *  - Mask vertical (fade-y) para que las cards no se corten duro arriba/abajo
 */
const COLS = 3;

export function Testimonios() {
  const [paused, setPaused] = useState(false);

  // Distribuir testimonios en 3 columnas balanceadas
  const columns: typeof TESTIMONIOS[] = [[], [], []];
  TESTIMONIOS.forEach((t, i) => columns[i % COLS].push(t));

  const speeds = [28, 36, 32]; // segundos por loop completo
  const directions = [1, -1, 1] as const; // 1 = sube, -1 = baja

  return (
    <section id="testimonios" className="relative bg-night py-16 md:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-violet-glow opacity-50" />
      <div className="absolute inset-0 bg-dot-grid opacity-30" />

      <div className="container-x relative">
        <Reveal className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <Reveal.Item className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-violet-glow">
              <span className="block h-px w-6 bg-violet" />
              Lo que cuentan
            </p>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
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

      {/* Grid de columnas con mask vertical */}
      <div
        className="relative mx-auto h-[680px] max-w-[1400px] overflow-hidden md:h-[760px]"
        style={{
          maskImage: "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid h-full grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 md:px-10">
          {columns.map((col, idx) => (
            <Column
              key={idx}
              items={col}
              duration={speeds[idx]}
              direction={directions[idx]}
              paused={paused}
              hideOnMobile={idx === 2 ? "md" : idx === 1 ? "sm" : false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Column({
  items,
  duration,
  direction,
  paused,
  hideOnMobile,
}: {
  items: typeof TESTIMONIOS;
  duration: number;
  direction: 1 | -1;
  paused: boolean;
  hideOnMobile: "sm" | "md" | false;
}) {
  // Duplicamos para loop sin salto. Animamos yPercent 0 → -50 (mostramos solo la mitad superior).
  const doubled = [...items, ...items];

  return (
    <div
      className={
        hideOnMobile === "md"
          ? "hidden md:block"
          : hideOnMobile === "sm"
            ? "hidden sm:block"
            : "block"
      }
    >
      <motion.div
        animate={{ y: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ animationPlayState: paused ? "paused" : "running" }}
        className="flex flex-col gap-4"
      >
        {doubled.map((t, i) => (
          <Card key={`${t.nombre}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

function Card({ t }: { t: typeof TESTIMONIOS[number] }) {
  return (
    <article className="glass-card group relative rounded-2xl p-6 transition-colors hover:bg-bone/8">
      <Quote className="absolute -top-2 -left-1 h-8 w-8 text-magenta/30" strokeWidth={1.5} />
      <p className="text-sm leading-relaxed text-bone/85 md:text-[15px]">
        {t.txt}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-bone/8 pt-4">
        <div>
          <p className="font-display text-sm font-medium tracking-tight text-bone">
            {t.nombre}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-bone/50">
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

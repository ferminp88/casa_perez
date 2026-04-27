"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PILARES, BRAND } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

/**
 * PropuestaValor — single screen, 4 pilares juntos.
 *
 * Layout: header arriba + grid 2×2 (md) / 4 columnas en línea (xl) de cards
 * tipográficas. Sin fotos. Cada card destaca el número del pilar como héroe
 * gráfico (clamp 8rem en el fondo) y rota su acento de color para crear ritmo
 * visual sin caer en monotonía.
 *
 * Acentos rotando: magenta → lime → violet → magenta. La línea separadora
 * inferior pinta con gradient cuando entra en viewport (scroll-driven).
 */

const ACCENTS = [
  { text: "text-magenta", bg: "bg-magenta", ring: "ring-magenta/30", glow: "from-magenta/20" },
  { text: "text-lime", bg: "bg-lime", ring: "ring-lime/30", glow: "from-lime/20" },
  { text: "text-violet-glow", bg: "bg-violet", ring: "ring-violet/40", glow: "from-violet/25" },
  { text: "text-magenta", bg: "bg-magenta", ring: "ring-magenta/30", glow: "from-magenta/20" },
] as const;

export function PropuestaValor() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.3"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="propuesta"
      className="relative bg-night py-24 md:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-violet-glow opacity-50" />
      <div className="absolute inset-0 bg-dot-grid opacity-30" />

      <div className="container-x relative">
        {/* Header */}
        <Reveal className="grid items-end gap-10 md:grid-cols-12">
          <Reveal.Item className="md:col-span-7">
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
              <span className="block h-px w-6 bg-lime" />
              Nuestra forma
            </p>
            <h2 className="font-display text-balance text-[clamp(2.25rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
              Cada evento es{" "}
              <span className="font-editorial italic text-fiesta">único e irrepetible.</span>
            </h2>
          </Reveal.Item>
          <Reveal.Item className="md:col-span-5">
            <p className="text-pretty text-bone/65 md:text-lg">{BRAND.about}</p>
          </Reveal.Item>
        </Reveal>

        {/* Línea de separación scroll-driven */}
        <motion.div
          style={{ scaleX: lineScale, transformOrigin: "0% 50%" }}
          className="mt-14 h-px w-full bg-gradient-to-r from-magenta via-violet to-lime"
        />

        {/* 4 pilares en grid */}
        <Reveal className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {PILARES.map((p, i) => {
            const a = ACCENTS[i];
            return (
              <Reveal.Item key={p.n}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative h-full overflow-hidden rounded-3xl bg-obsidian p-7 ring-1 ${a.ring} transition-all hover:bg-obsidian/80 lg:p-8`}
                >
                  {/* Glow gradient sutil del color del pilar (esquina) */}
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-radial ${a.glow} via-transparent to-transparent blur-2xl opacity-60`} />

                  {/* Número héroe gigante de fondo */}
                  <span
                    className={`pointer-events-none absolute -right-3 -bottom-8 select-none font-display text-[10rem] font-medium leading-none tracking-tightest opacity-[0.10] transition-opacity duration-500 group-hover:opacity-[0.18] ${a.text} lg:text-[12rem]`}
                  >
                    {p.n}
                  </span>

                  {/* Etiqueta superior con número + dot animado */}
                  <div className="relative flex items-center gap-3">
                    <span className={`block h-1.5 w-1.5 rounded-full ${a.bg}`} style={{ boxShadow: "0 0 12px currentColor" }} />
                    <p className={`font-mono text-[11px] uppercase tracking-[0.3em] ${a.text}`}>
                      Pilar · {p.n}
                    </p>
                  </div>

                  {/* Título display */}
                  <h3 className="relative mt-6 font-display text-3xl font-medium leading-[1.02] tracking-[-0.025em] text-bone lg:text-4xl">
                    {p.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="relative mt-4 text-sm text-bone/65 lg:text-base">
                    {p.txt}
                  </p>

                  {/* Línea inferior accent */}
                  <span
                    className={`absolute bottom-0 left-0 h-px w-12 ${a.bg} transition-all duration-500 group-hover:w-full`}
                  />
                </motion.article>
              </Reveal.Item>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

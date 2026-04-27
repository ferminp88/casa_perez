"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ESPACIOS } from "@/lib/content";
import { ImageComparison } from "@/components/ui/ImageComparison";
import { ScrollMediaExpansion } from "@/components/ui/ScrollMediaExpansion";
import { letterVariants } from "@/lib/motion";

/**
 * Espacios — sección compuesta:
 *  1. Intro (sticky-friendly heading)
 *  2. 3 × ScrollMediaExpansion encadenados (uno por salón = experiencia inmersiva)
 *  3. ImageComparison "salón / fiesta"
 *
 * Cada salón consume ~250vh de scroll. Mobile: el sticky + clip-path siguen
 * funcionando; las fotos flotantes laterales se ocultan (no aportan en pantalla
 * angosta y comen perf).
 */
export function Espacios() {
  return (
    <section id="espacios" className="relative bg-night">
      {/* Header de la sección */}
      <div className="relative overflow-hidden bg-obsidian py-32 md:py-44">
        <div className="pointer-events-none absolute inset-0 bg-magenta-glow opacity-50" />
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="container-x relative">
          <Reveal className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <Reveal.Item className="max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-magenta">
                <span className="block h-px w-6 bg-magenta" />
                Tres espacios, un concepto
              </p>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="font-display text-balance text-[clamp(2rem,5.5vw,5rem)] font-medium leading-[0.95] tracking-tightest text-bone"
              >
                {"Salones independientes que".split(" ").map((w, i) => (
                  <span key={i} className="mr-[0.18em] inline-block overflow-hidden align-bottom">
                    <motion.span
                      custom={i}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
                <br />
                <span className="font-editorial italic text-magenta-glow">comparten el ADN.</span>
              </motion.h2>
            </Reveal.Item>
            <Reveal.Item>
              <p className="max-w-xs text-sm text-bone/65">
                Cada uno tiene su carácter. Hacé scroll y entrá en cada salón —
                las fotos crecen hasta envolverte y los detalles aparecen sobre
                la pared.
              </p>
            </Reveal.Item>
          </Reveal>

          {/* Mini-índice de los 3 salones (scroll-link) */}
          <Reveal className="mt-12 flex flex-wrap gap-2">
            {ESPACIOS.map((e, i) => (
              <Reveal.Item key={e.id}>
                <a
                  href={`#salon-${e.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/5 px-4 py-2 text-xs tracking-wide text-bone backdrop-blur transition-all hover:border-magenta/60 hover:bg-magenta/10"
                >
                  <span className="font-mono text-[10px] text-magenta">
                    0{i + 1}
                  </span>
                  {e.nombre}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </Reveal.Item>
            ))}
          </Reveal>
        </div>
      </div>

      {/* 3 experiencias inmersivas encadenadas */}
      {ESPACIOS.map((e, i) => (
        <ScrollMediaExpansion
          key={e.id}
          index={i}
          total={ESPACIOS.length}
          id={e.id}
          nombre={e.nombre}
          metros={e.metros}
          aire={e.aire}
          capacidad={e.capacidad}
          bullets={e.bullets}
          gallery={e.gallery}
        />
      ))}

      {/* Image Comparison: el salón / la fiesta — full width, centro de pantalla */}
      <div className="relative bg-obsidian py-32 md:py-44 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-violet-glow opacity-40" />
        <div className="container-x relative">
          {/* Header centrado */}
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <Reveal.Item>
              <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
                <span className="block h-px w-6 bg-lime" />
                El salón / la fiesta
              </p>
            </Reveal.Item>
            <Reveal.Item>
              <h3 className="font-display text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Lo que ves cuando llegás. <br />
                <span className="font-editorial italic text-magenta-glow">
                  Lo que pasa cuando arranca.
                </span>
              </h3>
            </Reveal.Item>
            <Reveal.Item>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-bone/70 md:text-lg">
                Arrastrá el slider para ver el mismo espacio antes y durante un festejo.
                Los salones son tu lienzo; la fiesta la ponés vos.
              </p>
            </Reveal.Item>
          </Reveal>

          {/* Comparador grande, centrado */}
          <Reveal>
            <Reveal.Item>
              <div className="mx-auto max-w-[1200px]">
                <ImageComparison
                  before="/espacios/casa-new.png"
                  after="/gallery/80/big0000.jpg"
                  beforeLabel="El salón"
                  afterLabel="La fiesta"
                  initial={50}
                />
              </div>
            </Reveal.Item>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

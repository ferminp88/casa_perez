"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { easeOrganic } from "@/lib/motion";
import { X } from "lucide-react";

/**
 * Galería — "Wall of Memories": 3 filas de marquee horizontal infinito,
 * fotos en aspect ratios y tamaños orgánicos (no grilla rígida), direcciones
 * alternas. Click en una foto abre lightbox con backdrop-blur.
 *
 * Por qué este patrón en vez de bento:
 *  - Salón de fiestas = archivo vivo de festejos, no portfolio curado
 *  - El movimiento permanente atrae la vista (segunda mitad de la web,
 *    necesita un punto de energía visual antes de Servicios)
 *  - Clic-zoom da control (UX) sin romper el flujo continuo
 *  - Reutiliza /gallery + /catering + /espacios sin orden estricto
 *
 * Mask vertical + horizontal hace que las filas "respiren" sin bordes duros.
 * Pause-on-hover de la fila apuntada (touch friendly: tap = pause toggle).
 */

// Mezclamos fuentes (gallery + catering + espacios + nuevos salones) para
// que el muro tenga variedad real. Aspect ratios variados a propósito.
type Photo = { src: string; ratio: "tall" | "wide" | "square" };

const ROW1: Photo[] = [
  { src: "/gallery/80/big0000.jpg", ratio: "wide" },
  { src: "/salones/centenario/foto-02.jpg", ratio: "tall" },
  { src: "/gallery/57/big0000.jpg", ratio: "square" },
  { src: "/salones/casona/foto-03.jpg", ratio: "wide" },
  { src: "/gallery/67/big0000.jpg", ratio: "tall" },
  { src: "/catering/1/big0000.jpg", ratio: "square" },
  { src: "/salones/salon467/foto-04.jpg", ratio: "wide" },
  { src: "/gallery/66/big0000.jpg", ratio: "tall" },
];

const ROW2: Photo[] = [
  { src: "/gallery/69/big0000.jpg", ratio: "tall" },
  { src: "/salones/casona/foto-05.jpg", ratio: "square" },
  { src: "/gallery/71/big0000.jpg", ratio: "wide" },
  { src: "/catering/2/big0000.jpg", ratio: "tall" },
  { src: "/salones/centenario/foto-07.jpg", ratio: "square" },
  { src: "/gallery/62/big0000.jpg", ratio: "wide" },
  { src: "/salones/salon467/foto-06.jpg", ratio: "tall" },
  { src: "/gallery/59/big0000.jpg", ratio: "square" },
];

const ROW3: Photo[] = [
  { src: "/salones/centenario/foto-04.jpg", ratio: "square" },
  { src: "/gallery/50/big0000.jpg", ratio: "wide" },
  { src: "/catering/3/big0000.jpg", ratio: "tall" },
  { src: "/salones/casona/foto-07.jpg", ratio: "wide" },
  { src: "/gallery/80/big0000.jpg", ratio: "square" },
  { src: "/salones/salon467/foto-02.jpg", ratio: "tall" },
  { src: "/salones/centenario/foto-06.jpg", ratio: "wide" },
  { src: "/gallery/66/big0000.jpg", ratio: "square" },
];

const RATIO_CLASS: Record<Photo["ratio"], string> = {
  tall: "h-[260px] w-[180px] md:h-[320px] md:w-[220px]",
  wide: "h-[260px] w-[380px] md:h-[320px] md:w-[480px]",
  square: "h-[260px] w-[260px] md:h-[320px] md:w-[320px]",
};

export function GaleriaBento() {
  const [zoom, setZoom] = useState<string | null>(null);

  return (
    <section id="galeria" className="relative bg-night py-32 md:py-44 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-fiesta-mesh opacity-25" />

      <div className="container-x relative">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal.Item>
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
              <span className="block h-px w-6 bg-lime" />
              Pequeñas escenas
            </p>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,4.75rem)] font-medium leading-[0.95] tracking-tightest text-bone">
              De cada festejo, <br />
              <span className="font-editorial italic text-lime-glow">un recuerdo nuevo.</span>
            </h2>
          </Reveal.Item>
          <Reveal.Item>
            <a
              href="#videos"
              className="group inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/5 px-5 py-3 text-sm tracking-wide text-bone backdrop-blur transition-all hover:border-magenta/60 hover:bg-magenta/10"
            >
              Ver fiestas en video
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal.Item>
        </Reveal>

        {/* Counter sutil */}
        <Reveal className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
          <Reveal.Item>
            ✦ archivo vivo · 400+ festejos · click una foto para verla en grande
          </Reveal.Item>
        </Reveal>
      </div>

      {/* Wall of memories: 3 filas con mask */}
      <div
        className="relative space-y-4 overflow-hidden md:space-y-6"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
        }}
      >
        <Row photos={ROW1} duration={50} direction={1} onZoom={setZoom} />
        <Row photos={ROW2} duration={62} direction={-1} onZoom={setZoom} />
        <Row photos={ROW3} duration={56} direction={1} onZoom={setZoom} />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-night/95 p-4 backdrop-blur-md md:p-8"
            onClick={() => setZoom(null)}
          >
            <motion.img
              src={zoom}
              alt=""
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOrganic }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-2xl ring-1 ring-bone/15 shadow-deep"
            />
            <button
              aria-label="Cerrar"
              onClick={() => setZoom(null)}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-bone/10 text-bone backdrop-blur transition-colors hover:bg-magenta hover:text-night"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Row({
  photos,
  duration,
  direction,
  onZoom,
}: {
  photos: Photo[];
  duration: number;
  direction: 1 | -1;
  onZoom: (src: string) => void;
}) {
  const [paused, setPaused] = useState(false);
  // Duplicamos para loop sin salto
  const doubled = [...photos, ...photos];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        animate={paused ? {} : { x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 will-change-transform md:gap-6"
      >
        {doubled.map((p, i) => (
          <button
            key={i}
            onClick={() => onZoom(p.src)}
            className={`group relative flex-none overflow-hidden rounded-2xl ring-1 ring-bone/8 transition-all hover:ring-magenta/50 ${RATIO_CLASS[p.ratio]}`}
            style={{ transform: `rotate(${(i % 5) - 2}deg)` }}
          >
            <img
              src={p.src}
              alt=""
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover saturate-90 transition-all duration-700 group-hover:scale-[1.06] group-hover:saturate-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Magenta glow ring on hover */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "0 0 0 2px rgba(255,46,110,0.5), 0 24px 60px -12px rgba(255,46,110,0.4)" }} />
          </button>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { easeOrganic } from "@/lib/motion";
import { X } from "lucide-react";

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
  tall: "h-[200px] w-[140px] md:h-[320px] md:w-[220px]",
  wide: "h-[200px] w-[260px] md:h-[320px] md:w-[480px]",
  square: "h-[200px] w-[200px] md:h-[320px] md:w-[320px]",
};

export function GaleriaBento() {
  const [zoom, setZoom] = useState<string | null>(null);

  // Lock scroll + ESC
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoom(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoom]);

  return (
    <section id="galeria" className="relative bg-night py-16 md:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-fiesta-mesh opacity-25" />

      <div className="container-x relative">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal.Item>
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
              <span className="block h-px w-6 bg-lime" />
              Pequeñas escenas
            </p>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
              De cada festejo, <br />
              <span className="font-editorial italic text-lime-glow">un recuerdo nuevo.</span>
            </h2>
          </Reveal.Item>
          <Reveal.Item>
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3 text-sm font-medium tracking-wide text-bone shadow-glow-magenta transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              Pedir un presupuesto
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal.Item>
        </Reveal>

        <Reveal className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
          <Reveal.Item>
            ✦ archivo vivo · 400+ festejos · arrastrá las filas o tocá una foto para verla en grande
          </Reveal.Item>
        </Reveal>
      </div>

      <div
        className="relative space-y-4 overflow-hidden md:space-y-6"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)",
        }}
      >
        <Row photos={ROW1} duration={70} direction={1} onZoom={setZoom} />
        <Row photos={ROW2} duration={85} direction={-1} onZoom={setZoom} />
        <Row photos={ROW3} duration={78} direction={1} onZoom={setZoom} />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent
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

/**
 * Row — auto-marquee + drag horizontal.
 * Click en una foto abre lightbox SOLO si no hubo drag previo (threshold 6px).
 * Al soltar después de arrastrar, la foto NO se abre — hay que tocar de nuevo.
 */
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
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);
  // Flag: el click siguiente al drag se ignora.
  const justDragged = useRef(false);
  const doubled = [...photos, ...photos];

  useAnimationFrame((_, delta) => {
    if (hovered || dragging) return;
    const el = innerRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    if (!halfWidth) return;
    const pps = halfWidth / duration;
    const dx = -direction * pps * (delta / 1000);
    let next = x.get() + dx;
    if (next <= -halfWidth) next += halfWidth;
    if (next >= 0) next -= halfWidth;
    x.set(next);
  });

  const wrap = () => {
    const el = innerRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    if (!halfWidth) return;
    let v = x.get();
    while (v <= -halfWidth) v += halfWidth;
    while (v >= 0) v -= halfWidth;
    x.set(v);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        ref={innerRef}
        style={{ x, touchAction: "pan-y" }}
        drag="x"
        dragMomentum
        dragElastic={0.05}
        onDragStart={() => {
          setDragging(true);
          justDragged.current = false;
        }}
        onDragEnd={(_, info) => {
          // Si hubo movimiento significativo, marcamos para suprimir el click
          // que el navegador dispara inmediatamente después del pointerup.
          if (Math.abs(info.offset.x) > 6) {
            justDragged.current = true;
            // Reset corto: el click ya disparó, después dejamos que vuelvan a tocar.
            setTimeout(() => { justDragged.current = false; }, 250);
          }
          setTimeout(() => { wrap(); setDragging(false); }, 350);
        }}
        className="flex cursor-grab gap-4 will-change-transform active:cursor-grabbing md:gap-6"
      >
        {doubled.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              if (justDragged.current) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              onZoom(p.src);
            }}
            className={`group relative flex-none overflow-hidden rounded-2xl ring-1 ring-bone/8 transition-all hover:ring-magenta/50 ${RATIO_CLASS[p.ratio]}`}
            style={{ transform: `rotate(${(i % 5) - 2}deg)` }}
          >
            <img
              src={p.src}
              alt=""
              loading="lazy"
              draggable={false}
              className="pointer-events-none h-full w-full object-cover saturate-90 transition-all duration-700 group-hover:scale-[1.06] group-hover:saturate-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
        ))}
      </motion.div>
    </div>
  );
}

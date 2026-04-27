"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

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
            ✦ archivo vivo · 400+ festejos · agarrá una fila y deslizá a los costados
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
        <Row photos={ROW1} duration={70} direction={1} />
        <Row photos={ROW2} duration={85} direction={-1} />
        <Row photos={ROW3} duration={78} direction={1} />
      </div>
    </section>
  );
}

/**
 * Row — auto-marquee infinito + drag horizontal manual.
 * No abre lightbox al soltar: las fotos no son clickeables.
 */
function Row({
  photos,
  duration,
  direction,
}: {
  photos: Photo[];
  duration: number;
  direction: 1 | -1;
}) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);
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
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setTimeout(() => { wrap(); setDragging(false); }, 350);
        }}
        className="flex cursor-grab gap-4 will-change-transform active:cursor-grabbing md:gap-6"
      >
        {doubled.map((p, i) => (
          <div
            key={i}
            className={`relative flex-none overflow-hidden rounded-2xl ring-1 ring-bone/8 ${RATIO_CLASS[p.ratio]}`}
            style={{ transform: `rotate(${(i % 5) - 2}deg)` }}
            aria-hidden
          >
            <img
              src={p.src}
              alt=""
              loading="lazy"
              draggable={false}
              className="pointer-events-none h-full w-full object-cover saturate-90"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

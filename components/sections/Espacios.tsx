"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ESPACIOS } from "@/lib/content";
import { letterVariants, easeOrganic } from "@/lib/motion";
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";

export function Espacios() {
  const [activeId, setActiveId] = useState(ESPACIOS[0].id);
  const active = ESPACIOS.find((e) => e.id === activeId)!;
  const activeIndex = ESPACIOS.findIndex((e) => e.id === activeId);

  return (
    <section id="espacios" className="relative bg-paper">
      {/* Header de la sección */}
      <div className="relative overflow-hidden bg-paper pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-magenta-glow opacity-30" />
        <div className="absolute inset-0 bg-dot-grid opacity-50" />
        <div className="container-x relative">
          <Reveal className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <Reveal.Item className="max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mustard-deep">
                <span className="block h-px w-6 bg-mustard-deep" />
                Tres espacios, un concepto
              </p>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="font-display text-balance text-[clamp(2rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink"
              >
                {"Salones independientes que".split(" ").map((w, i) => (
                  <span key={i} className="mr-[0.16em] -mb-[0.18em] inline-block overflow-hidden pb-[0.18em] pt-[0.05em] pr-[0.06em] -mr-[0.04em] align-bottom leading-none">
                    <motion.span custom={i} variants={letterVariants} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
                <br />
                <span className="font-editorial italic text-magenta-glow">comparten el ADN.</span>
              </motion.h2>
            </Reveal.Item>
            <Reveal.Item>
              <p className="max-w-xs text-sm text-ink/70">
                Elegí un salón y mirá fotos, capacidad y lo que incluye. Click
                en cualquier foto para verla en grande.
              </p>
            </Reveal.Item>
          </Reveal>

          {/* Tabs de salones */}
          <Reveal className="mt-12 flex flex-wrap gap-2">
            {ESPACIOS.map((e, i) => {
              const isActive = e.id === activeId;
              return (
                <Reveal.Item key={e.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(e.id)}
                    className={`group relative inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm tracking-wide transition-all ${
                      isActive
                        ? "border-ink bg-ink text-paper shadow-soft"
                        : "border-ink/15 bg-ink/5 text-ink/75 hover:border-ink/40 hover:bg-ink/10 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] ${
                        isActive ? "text-mustard" : "text-mustard-deep"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    {e.nombre}
                  </button>
                </Reveal.Item>
              );
            })}
          </Reveal>
        </div>
      </div>

      {/* Panel del salón activo */}
      <div className="relative bg-paper pb-24 md:pb-32">
        <div className="container-x relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: easeOrganic }}
            >
              <SalonPanel salon={active} index={activeIndex} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Image Comparison: el salón / la fiesta */}
      <div className="relative bg-paper py-16 md:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-magenta-glow opacity-25" />
        <div className="container-x relative">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <Reveal.Item>
              <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mustard-deep">
                <span className="block h-px w-6 bg-mustard-deep" />
                El salón / la fiesta
              </p>
            </Reveal.Item>
            <Reveal.Item>
              <h3 className="font-display text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
                Lo que ves cuando llegás. <br />
                <span className="font-editorial italic text-magenta-glow">
                  Lo que pasa cuando arranca.
                </span>
              </h3>
            </Reveal.Item>
            <Reveal.Item>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-ink/70 md:text-lg">
                El mismo espacio, dos momentos. Los salones son tu lienzo;
                la fiesta la ponés vos.
              </p>
            </Reveal.Item>
          </Reveal>

          <Reveal>
            <Reveal.Item>
              <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-2 md:gap-6">
                <SidePanel
                  src="/espacios/casa-new.png"
                  label="El salón"
                  caption="Listo, vacío, esperándote."
                />
                <SidePanel
                  src="/gallery/80/big0000.jpg"
                  label="La fiesta"
                  caption="Lleno, sonando, recordable."
                />
              </div>
            </Reveal.Item>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SidePanel({ src, label, caption }: { src: string; label: string; caption: string }) {
  return (
    <figure className="group relative overflow-hidden rounded-3xl ring-1 ring-ink/10 shadow-soft">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-organic group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
      </div>
      <figcaption className="absolute inset-x-6 bottom-6 text-paper">
        <span className="inline-flex items-center gap-2 rounded-full border border-paper/30 bg-ink/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-mustard" />
          {label}
        </span>
        <p className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

type Salon = (typeof ESPACIOS)[number];

/**
 * SalonPanel — panel del salón activo. Carrusel + bloque de info al lado,
 * los dos arrancan en el mismo top (sin sticky) para que no haya desfase.
 */
function SalonPanel({ salon, index }: { salon: Salon; index: number }) {
  return (
    <div>
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Carrusel */}
        <div className="lg:col-span-7">
          <Carousel photos={salon.gallery} nombre={salon.nombre} />
        </div>

        {/* Info */}
        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mustard-deep">
            Salón · {String(index + 1).padStart(2, "0")} / {String(ESPACIOS.length).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.025em] text-ink">
            {salon.nombre}
          </h3>

          <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-ink/10 py-5">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-mustard-deep">m²</dt>
              <dd className="mt-1.5 text-sm text-ink/85">{salon.metros}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-mustard-deep">aire</dt>
              <dd className="mt-1.5 text-sm text-ink/85">{salon.aire}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-mustard-deep">cap.</dt>
              <dd className="mt-1.5 text-sm text-ink/85">{salon.capacidad}</dd>
            </div>
          </dl>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-mustard-deep">
            Qué incluye
          </p>
          <ul className="mt-4 space-y-3">
            {salon.bullets.map((b) => (
              <li key={b} className="flex gap-4 text-[15px] leading-relaxed text-ink/85">
                <span className="mt-2.5 h-px w-5 flex-none bg-mustard-deep" />
                <span className="text-pretty">{b}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Reservar este salón
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Carousel — hero image con prev/next + dots + autoplay + lightbox.
 * Sin auto-rotación agresiva (8s); pausa en hover; swipe en mobile.
 */
function Carousel({ photos, nombre }: { photos: string[]; nombre: string }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoomIdx, setZoomIdx] = useState<number | null>(null);
  const len = photos.length;

  const go = (n: number) => setIdx(((n % len) + len) % len);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  // Autoplay
  useEffect(() => {
    if (paused || zoomIdx !== null) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % len), 8000);
    return () => clearInterval(id);
  }, [paused, zoomIdx, len]);

  // Keyboard cuando lightbox está abierto
  useEffect(() => {
    if (zoomIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomIdx(null);
      if (e.key === "ArrowLeft") setZoomIdx((i) => (i === null ? null : (i - 1 + len) % len));
      if (e.key === "ArrowRight") setZoomIdx((i) => (i === null ? null : (i + 1) % len));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomIdx, len]);

  // Lock scroll cuando lightbox abierto
  useEffect(() => {
    if (zoomIdx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [zoomIdx]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Hero */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-ink/10 shadow-soft">
        <AnimatePresence mode="sync">
          <motion.button
            key={`${nombre}-${idx}`}
            type="button"
            onClick={() => setZoomIdx(idx)}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: easeOrganic }}
            className="absolute inset-0 cursor-zoom-in"
            aria-label={`Ampliar foto ${idx + 1}`}
          >
            <img
              src={photos[idx]}
              alt={`${nombre} foto ${idx + 1}`}
              className="h-full w-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </motion.button>
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute left-5 top-5 rounded-full border border-paper/30 bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper backdrop-blur">
          {String(idx + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper/30 bg-ink/60 text-paper backdrop-blur transition-all hover:bg-mustard hover:text-ink active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper/30 bg-ink/60 text-paper backdrop-blur transition-all hover:bg-mustard hover:text-ink active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Progress segmented */}
        <div className="absolute inset-x-5 bottom-5 flex gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Foto ${i + 1}`}
              className="group relative h-1 flex-1 overflow-hidden rounded-full bg-paper/30"
            >
              {i === idx && !paused ? (
                <motion.span
                  key={`p-${idx}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-mustard"
                />
              ) : (
                <span className={`absolute inset-y-0 left-0 ${i < idx ? "w-full bg-paper/80" : "w-0"}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Thumb strip */}
      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => go(i)}
            className={`relative aspect-square overflow-hidden rounded-md ring-1 transition-all ${
              i === idx ? "ring-2 ring-mustard-deep" : "ring-ink/10 hover:ring-ink/30"
            }`}
            aria-label={`Ir a foto ${i + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4 backdrop-blur-md md:p-8"
            onClick={() => setZoomIdx(null)}
          >
            <button
              aria-label="Cerrar"
              onClick={(e) => { e.stopPropagation(); setZoomIdx(null); }}
              className="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/10 text-paper backdrop-blur transition-colors hover:bg-mustard hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              aria-label="Anterior"
              onClick={(e) => { e.stopPropagation(); setZoomIdx((i) => (i === null ? null : (i - 1 + len) % len)); }}
              className="absolute left-6 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper backdrop-blur transition-colors hover:bg-mustard hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Siguiente"
              onClick={(e) => { e.stopPropagation(); setZoomIdx((i) => (i === null ? null : (i + 1) % len)); }}
              className="absolute right-6 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper backdrop-blur transition-colors hover:bg-mustard hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.img
              key={zoomIdx}
              src={photos[zoomIdx]}
              alt={`${nombre} ${zoomIdx + 1}`}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOrganic }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-deep"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/70">
              {String(zoomIdx + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CATERING_OPCIONES, BARRA_OPCIONES } from "@/lib/content";
import { easeOrganic } from "@/lib/motion";
import { X } from "lucide-react";

/**
 * Catering — sección compuesta por 2 bloques:
 *
 * 1. Catering: tabs entre 3 opciones. Panel activo muestra split:
 *    galería de fotos (mosaico tall+square) a la izquierda + menú estructurado
 *    en subsecciones (acordeón colapsable) a la derecha.
 *    AnimatePresence en el cambio de tab + grid de fotos para crossfade.
 *
 * 2. Barra libre: 2 cards lado a lado (Clásica / Premium), cada una con foto
 *    de fondo blureada + bloques de menú.
 *
 * UX rationale:
 *  - Tabs > acordeón vertical: 3 opciones de catering son comparables; el
 *    usuario quiere alternar entre ellas, no scroll por las 3.
 *  - Acordeón dentro de cada opción: el menú es largo (6 subsecciones × 5-12
 *    items). Mostrar todo abierto satura visualmente. Primera subsección
 *    abierta por default, el resto colapsado.
 *  - Barra side-by-side: comparación visual directa de las 2 alternativas.
 */

export function Catering({
  activeId,
  onActiveChange,
}: {
  activeId?: string;
  onActiveChange?: (id: string) => void;
} = {}) {
  const [internalActive, setInternalActive] = useState(CATERING_OPCIONES[0].id);
  const active = activeId ?? internalActive;
  const setActive = (id: string) => {
    if (onActiveChange) onActiveChange(id);
    else setInternalActive(id);
  };
  const data = CATERING_OPCIONES.find((o) => o.id === active)!;

  return (
    <section id="catering" className="relative bg-mustard py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-transparent opacity-40" />
      <div className="absolute inset-0 bg-dot-grid opacity-25" />

      <div className="container-x relative">
        {/* Header */}
        <Reveal className="grid items-end gap-10 md:grid-cols-12">
          <Reveal.Item className="md:col-span-7">
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink">
              <span className="block h-px w-6 bg-ink" />
              Cocina propia · 100 m²
            </p>
            <h2 className="font-display text-balance text-[clamp(1.65rem,4.2vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
              Catering pensado <br />
              <span className="font-editorial italic text-ink">de principio a fin.</span>
            </h2>
          </Reveal.Item>
          <Reveal.Item className="md:col-span-5">
            <p className="text-pretty text-sm text-ink/65 md:text-base">
              Tres opciones armadas para cubrir distintos festejos. Bandejeo, islas,
              mesa dulce y barras — todo desde nuestra cocina, con el mismo equipo
              que arma cada evento.
            </p>
          </Reveal.Item>
        </Reveal>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {CATERING_OPCIONES.map((o) => {
            const isActive = o.id === active;
            return (
              <button
                key={o.id}
                onClick={() => setActive(o.id)}
                className={`group relative inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13px] tracking-wide transition-all ${
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 bg-ink/5 text-ink/75 hover:border-ink/50 hover:bg-ink/10 hover:text-ink"
                }`}
              >
                <span
                  className={`font-mono text-xs tracking-[0.2em] ${
                    isActive ? "text-mustard" : "text-mustard-deep"
                  }`}
                >
                  {o.numero}
                </span>
                {o.nombre}
                {isActive && (
                  <motion.span
                    layoutId="catering-tab-glow"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ boxShadow: "0 0 0 1px rgba(255,46,110,0.35)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel activo: carrusel horizontal arriba + menú en 2 columnas abajo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: easeOrganic }}
            className="mt-12"
          >
            {/* Layout compacto: hero image cycling (izq) + menú 2 cols (der).
                Ambos del mismo alto aprox para que no haya scroll largo. */}
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                <HeroCycle fotos={data.fotos} nombre={data.nombre} />
              </div>
              <div className="lg:col-span-7">
                <Menu menu={data.menu} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bloque 2: Barra libre */}
        <div className="mt-20 md:mt-28">
          <Reveal className="grid items-end gap-10 md:grid-cols-12">
            <Reveal.Item className="md:col-span-7">
              <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink">
                <span className="block h-px w-6 bg-ink" />
                Para acompañar
              </p>
              <h3 className="font-display text-balance text-[clamp(1.45rem,3.4vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
                Barra libre, <br />
                <span className="font-editorial italic text-ink">a tu medida.</span>
              </h3>
            </Reveal.Item>
            <Reveal.Item className="md:col-span-5">
              <p className="text-pretty text-ink/65">
                Dos niveles de barra. La clásica viene incluida; la premium suma
                tragos, cervezas y vinos de selección, más opciones de champagne.
              </p>
            </Reveal.Item>
          </Reveal>

          <Reveal className="mt-12 grid gap-6 md:grid-cols-2">
            {BARRA_OPCIONES.map((b) => (
              <Reveal.Item key={b.id}>
                <BarraCard barra={b} />
              </Reveal.Item>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * HeroCycle — 1 foto grande con auto-rotate cada 4s (crossfade) + thumb strip
 * abajo + botón "ver todas" que abre lightbox con TODAS las fotos en grid.
 *
 * Ventajas vs el mosaico anterior:
 *  - Foto principal grande siempre visible y bien encuadrada
 *  - El layout no compite con el menú al lado: ambos arrancan en el mismo top
 *  - El usuario que quiera ver todas las fotos las tiene a un click (lightbox)
 */
function HeroCycle({ fotos, nombre }: { fotos: string[]; nombre: string }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomIdx, setZoomIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % fotos.length), 4000);
    return () => clearInterval(id);
  }, [fotos.length, paused]);

  // Lock scroll del body cuando el lightbox está abierto.
  // Lenis no respeta overflow:hidden por sí solo, pero al combinar
  // overflow-hidden + data-lenis-prevent (en el modal) la página queda quieta.
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [lightbox]);

  // ESC para cerrar
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomIdx !== null) setZoomIdx(null);
        else setLightbox(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, zoomIdx]);

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Hero image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-ink/10">
        <AnimatePresence mode="sync">
          <motion.img
            key={`${nombre}-${idx}`}
            src={fotos[idx]}
            alt={`${nombre} foto ${idx + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: easeOrganic }}
            className="absolute inset-0 h-full w-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />

        {/* Counter + ver todas */}
        <div className="absolute inset-x-5 top-5 flex items-center justify-between">
          <span className="rounded-full border border-ink/20 bg-mustard/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink/85 backdrop-blur">
            {String(idx + 1).padStart(2, "0")} / {String(fotos.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => setLightbox(true)}
            className="rounded-full border border-ink/20 bg-mustard/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink backdrop-blur transition-colors hover:border-ink hover:text-ink"
          >
            Ver todas ({fotos.length})
          </button>
        </div>

        {/* Progress segmented inferior */}
        <div className="absolute inset-x-5 bottom-5 flex gap-1.5">
          {fotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Foto ${i + 1}`}
              className="group relative h-px flex-1 overflow-hidden bg-ink/25"
            >
              {i === idx && !paused ? (
                <motion.span
                  key={`p-${idx}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-ink"
                />
              ) : (
                <span className={`absolute inset-y-0 left-0 ${i < idx ? "w-full bg-ink/60" : "w-0"}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Thumb strip */}
      <div className="mt-3 grid grid-cols-6 gap-1.5">
        {fotos.slice(0, 6).map((src, i) => (
          <button
            key={src}
            onClick={() => setIdx(i)}
            className={`relative aspect-square overflow-hidden rounded-md ring-1 transition-all ${
              i === idx ? "ring-magenta" : "ring-ink/10 hover:ring-ink/30"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            {i === idx && <span className="absolute inset-0 ring-2 ring-magenta ring-inset" />}
          </button>
        ))}
        {fotos.length > 6 && (
          <button
            onClick={() => setLightbox(true)}
            className="grid aspect-square place-items-center rounded-md bg-ink/8 font-mono text-xs text-ink/70 ring-1 ring-ink/10 transition-colors hover:bg-ink/15 hover:text-ink"
          >
            +{fotos.length - 6}
          </button>
        )}
      </div>

      {/* Lightbox grid de todas las fotos */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 z-[80] overflow-y-auto bg-mustard/95 backdrop-blur-md"
            onClick={() => setLightbox(false)}
          >
            {/* Header sticky con título + close */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-ink/10 bg-mustard/80 px-6 py-4 backdrop-blur md:px-12">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/70">
                {nombre} · {fotos.length} fotos
              </p>
              <button
                aria-label="Cerrar"
                onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
                className="grid h-10 w-10 place-items-center rounded-full bg-ink/10 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Grid de thumbnails — figuras con aspect ratio acotado */}
            <div
              className="mx-auto grid max-w-6xl grid-cols-2 gap-3 p-6 md:grid-cols-3 md:gap-4 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              {fotos.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setZoomIdx(i)}
                  className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-all hover:ring-ink/40"
                >
                  <img
                    src={src}
                    alt={`${nombre} ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full border border-ink/20 bg-mustard/60 px-2.5 py-0.5 font-mono text-xs uppercase tracking-widest text-ink/85 backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox de foto individual (click sobre thumbnail del lightbox) */}
      <AnimatePresence>
        {zoomIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 z-[90] grid place-items-center bg-mustard/98 p-6 backdrop-blur-lg"
            onClick={() => setZoomIdx(null)}
          >
            <button
              aria-label="Cerrar foto"
              onClick={(e) => { e.stopPropagation(); setZoomIdx(null); }}
              className="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/10 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-paper"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.img
              key={zoomIdx}
              src={fotos[zoomIdx]}
              alt={`${nombre} ${zoomIdx + 1}`}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOrganic }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain ring-1 ring-ink/15 shadow-deep"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
              {String(zoomIdx + 1).padStart(2, "0")} / {String(fotos.length).padStart(2, "0")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Menu — layout compacto tipo carta editorial. Cada subsección con título
 * pequeño + tag mono + items en lista densa. Border izquierdo magenta.
 *
 * Tipografía calibrada: subsecciones con texto-base (no heading gigante)
 * porque hay 6 secciones en total — si cada una tiene heading enorme,
 * la sección queda inmensa. Items en text-sm con leading apretado.
 */
function Menu({ menu }: { menu: { titulo: string; items: string[] }[] }) {
  return (
    <div className="space-y-7">
      {menu.map((sec, i) => (
        <section key={sec.titulo} className="border-l-2 border-ink/40 pl-5">
          <div className="mb-2.5 flex items-baseline gap-3">
            <span className="font-mono text-xs tracking-[0.3em] text-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="font-display text-base font-medium uppercase tracking-wider text-ink md:text-lg">
              {sec.titulo}
            </h4>
          </div>
          <ul className="space-y-1.5">
            {sec.items.map((it) => (
              <li key={it} className="flex gap-2.5 text-[13px] leading-snug text-ink/75 md:text-sm">
                <span className="mt-2 h-px w-2.5 flex-none bg-ink/40" />
                <span className="text-pretty">{it}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function BarraCard({ barra }: { barra: typeof BARRA_OPCIONES[number] }) {
  const accent =
    barra.acento === "lime"
      ? { ring: "ring-ink/40", text: "text-ink", bg: "bg-ink", glow: "" }
      : { ring: "ring-ink/40", text: "text-ink", bg: "bg-ink", glow: "" };

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl ring-1 ${accent.ring} ${accent.glow}`}
    >
      {/* Foto background blureada */}
      <div className="absolute inset-0">
        <img src={barra.foto} alt="" className="h-full w-full object-cover saturate-50" />
        <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/60 via-transparent to-ink/90" />
      </div>

      <div className="relative p-7 md:p-10">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-mustard">
            {barra.id === "clasica" ? "incluida" : "premium"}
          </p>
          <span className="block h-2 w-2 rounded-full bg-mustard" style={{ boxShadow: "0 0 12px currentColor" }} />
        </div>

        <h4 className="mt-4 font-display text-3xl font-medium tracking-tight text-paper md:text-4xl">
          {barra.nombre}
        </h4>
        <p className="mt-3 max-w-md text-sm text-paper/70">{barra.bajada}</p>

        <div className="mt-8 space-y-6">
          {barra.bloques.map((b) => (
            <div key={b.titulo}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-mustard">
                {b.titulo}
              </p>
              <ul className="mt-3 space-y-1.5">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-2 text-sm text-paper/85">
                    <span className="mt-2 h-px w-3 flex-none bg-mustard opacity-70" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

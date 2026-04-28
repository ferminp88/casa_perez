"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CATERING_OPCIONES } from "@/lib/content";
import { easeOrganic } from "@/lib/motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Catering } from "@/components/sections/Catering";

const TEASERS: Record<string, string> = {
  op1: "Recepción de bienvenida, isla campestre y bandejeo caliente. Pensada para festejos clásicos donde la mesa nunca queda vacía.",
  op2: "Una vuelta más completa: islas temáticas, plato principal y mesa dulce con pastelería propia. Para festejos largos.",
  op3: "Nuestra propuesta más alta: bocados de autor, cortes premium y mesa de cierre. Para casamientos y eventos formales.",
};

export function CateringPreview() {
  const [idx, setIdx] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const data = CATERING_OPCIONES[idx];
  const total = CATERING_OPCIONES.length;
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const go = (n: number) => setIdx(((n % total) + total) % total);

  // Mini foto-rotación dentro del slide activo
  const [photoIdx, setPhotoIdx] = useState(0);
  useEffect(() => {
    setPhotoIdx(0);
    const id = setInterval(
      () => setPhotoIdx((i) => (i + 1) % data.fotos.length),
      4000
    );
    return () => clearInterval(id);
  }, [idx, data.fotos.length]);

  // Lock body scroll mientras el drawer está abierto + ESC para cerrar
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const openDrawer = () => {
    setDrawerOpen(true);
    // reset scroll del drawer al abrir
    requestAnimationFrame(() => {
      drawerRef.current?.scrollTo({ top: 0 });
    });
  };

  const next = () => {
    go(idx + 1);
    drawerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section
        id="catering"
        className="relative bg-night py-12 md:py-16 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-magenta-glow opacity-40" />
        <div className="absolute inset-0 bg-dot-grid opacity-25" />

        <div className="container-x relative">
          {/* Header */}
          <Reveal className="grid items-end gap-8 md:grid-cols-12">
            <Reveal.Item className="md:col-span-7">
              <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-magenta">
                <span className="block h-px w-6 bg-magenta" />
                Cocina propia · 100 m²
              </p>
              <h2 className="font-display text-balance text-[clamp(1.65rem,4.2vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
                Catering pensado <br />
                <span className="font-editorial italic text-fiesta">de principio a fin.</span>
              </h2>
            </Reveal.Item>
            <Reveal.Item className="md:col-span-5">
              <p className="text-pretty text-sm text-bone/65 md:text-base">
                Tres opciones armadas para distintos festejos. Bandejeo, islas, mesa
                dulce y barras — todo desde nuestra cocina.
              </p>
            </Reveal.Item>
          </Reveal>

          {/* Slider */}
          <div className="relative mt-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {CATERING_OPCIONES.map((o, i) => {
                  const isActive = i === idx;
                  return (
                    <button
                      key={o.id}
                      onClick={() => go(i)}
                      className={`group relative inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13px] tracking-wide transition-all ${
                        isActive
                          ? "border-magenta/60 bg-magenta/10 text-bone shadow-glow-magenta"
                          : "border-bone/15 bg-bone/5 text-bone/70 hover:border-bone/30 hover:text-bone"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] tracking-[0.2em] ${
                          isActive ? "text-magenta" : "text-bone/40"
                        }`}
                      >
                        {o.numero}
                      </span>
                      {o.nombre}
                    </button>
                  );
                })}
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <button
                  aria-label="Anterior"
                  onClick={() => go(idx - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 bg-bone/5 text-bone/80 transition-colors hover:border-magenta hover:text-magenta"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label="Siguiente"
                  onClick={() => go(idx + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 bg-bone/5 text-bone/80 transition-colors hover:border-magenta hover:text-magenta"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: easeOrganic }}
                className="grid gap-6 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-7">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl ring-1 ring-bone/10">
                    <AnimatePresence mode="sync">
                      <motion.img
                        key={`${data.id}-${photoIdx}`}
                        src={data.fotos[photoIdx]}
                        alt={`${data.nombre} foto ${photoIdx + 1}`}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: easeOrganic }}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    </AnimatePresence>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" />

                    <div className="absolute inset-x-5 bottom-5 flex gap-1.5">
                      {data.fotos.slice(0, 6).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPhotoIdx(i)}
                          aria-label={`Foto ${i + 1}`}
                          className="group relative h-px flex-1 overflow-hidden bg-bone/25"
                        >
                          <span
                            className={`absolute inset-y-0 left-0 transition-all ${
                              i === photoIdx
                                ? "w-full bg-magenta"
                                : i < photoIdx
                                ? "w-full bg-bone/60"
                                : "w-0"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 md:self-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-magenta">
                    Catering · {data.numero}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-bone md:text-3xl">
                    {data.nombre}
                  </h3>
                  <p className="mt-4 text-pretty text-[14px] leading-relaxed text-bone/70 md:text-[15px]">
                    {TEASERS[data.id] ??
                      "Una propuesta de catering pensada para acompañar tu festejo de principio a fin."}
                  </p>

                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                    Incluye {data.menu.length} momentos del evento
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {data.menu.slice(0, 4).map((sec) => (
                      <li
                        key={sec.titulo}
                        className="rounded-full border border-bone/12 bg-bone/[0.04] px-3 py-1 text-[11px] tracking-wide text-bone/75"
                      >
                        {sec.titulo}
                      </li>
                    ))}
                    {data.menu.length > 4 && (
                      <li className="rounded-full border border-bone/12 bg-bone/[0.04] px-3 py-1 text-[11px] tracking-wide text-bone/55">
                        +{data.menu.length - 4} más
                      </li>
                    )}
                  </ul>

                  <button
                    type="button"
                    onClick={openDrawer}
                    className="group mt-7 inline-flex items-center gap-2 rounded-full bg-magenta px-5 py-3 font-display text-sm font-medium tracking-tight text-night shadow-glow-magenta transition-transform hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Ver el catering completo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Drawer lateral con el catering completo */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOrganic }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[100] bg-night/70 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[110] w-full overflow-hidden bg-night shadow-deep ring-1 ring-bone/10 md:w-[min(1100px,92vw)]"
              role="dialog"
              aria-modal="true"
              aria-label="Catering completo"
            >
              {/* Toolbar sticky */}
              <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-bone/10 bg-night/80 px-5 py-3.5 backdrop-blur-xl md:px-8">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Cerrar"
                    className="grid h-9 w-9 place-items-center rounded-full border border-bone/15 bg-bone/5 text-bone/80 transition-colors hover:border-magenta hover:text-magenta"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
                    Catering · vista completa
                  </p>
                </div>

                <button
                  type="button"
                  onClick={next}
                  className="group inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/5 px-4 py-2 font-display text-[13px] tracking-tight text-bone/85 transition-colors hover:border-magenta hover:text-magenta"
                >
                  Siguiente menú
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Contenido scrolleable */}
              <div
                ref={drawerRef}
                data-lenis-prevent
                className="h-[calc(100%-60px)] overflow-y-auto"
              >
                <Catering />

                <div className="flex justify-center bg-night px-6 pb-12">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="group inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3 font-display text-sm font-medium tracking-tight text-night shadow-glow-magenta transition-transform hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <X className="h-4 w-4" />
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

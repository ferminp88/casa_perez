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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const data = CATERING_OPCIONES[idx];
  const total = CATERING_OPCIONES.length;
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const go = (n: number) => setIdx(((n % total) + total) % total);

  // Mini foto-rotación dentro del slide activo
  const [photoIdx, setPhotoIdx] = useState(0);
  const fotosCount = data.fotos.length;
  const prevPhoto = () =>
    setPhotoIdx((i) => (i - 1 + fotosCount) % fotosCount);
  const nextPhoto = () => setPhotoIdx((i) => (i + 1) % fotosCount);

  useEffect(() => {
    setPhotoIdx(0);
  }, [idx]);

  useEffect(() => {
    if (lightboxOpen) return;
    const id = setInterval(
      () => setPhotoIdx((i) => (i + 1) % fotosCount),
      4000
    );
    return () => clearInterval(id);
  }, [idx, fotosCount, lightboxOpen]);

  // ESC + flechas para el lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, fotosCount]);

  // Lock body scroll mientras el drawer está abierto + ESC para cerrar.
  // Nota: el Catering interior también lockea overflow cuando abre su lightbox.
  // Para evitar que su cleanup (corre al desmontar tras la animación de salida)
  // deje overflow:"hidden" pegado, forzamos un reset diferido.
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      // Re-asegurar después de que termine la animación de salida del drawer
      // y el unmount de Catering (que restaura un valor stale "hidden").
      window.setTimeout(() => {
        document.body.style.overflow = "";
      }, 700);
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
        data-nav-theme="light"
        className="relative bg-mustard py-12 md:py-16 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-transparent opacity-40" />
        <div className="absolute inset-0 bg-dot-grid opacity-25" />

        <div className="container-x relative">
          {/* Header */}
          <Reveal className="grid items-end gap-8 md:grid-cols-12">
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
                    </button>
                  );
                })}
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <button
                  aria-label="Anterior"
                  onClick={() => go(idx - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-ink/5 text-ink/80 transition-colors hover:border-ink hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label="Siguiente"
                  onClick={() => go(idx + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-ink/5 text-ink/80 transition-colors hover:border-ink hover:text-ink"
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
                  <div className="group/photo relative aspect-[16/10] w-full overflow-hidden rounded-3xl ring-1 ring-ink/10">
                    <AnimatePresence mode="sync">
                      <motion.img
                        key={`${data.id}-${photoIdx}`}
                        src={data.fotos[photoIdx]}
                        alt={`${data.nombre} foto ${photoIdx + 1}`}
                        onClick={() => setLightboxOpen(true)}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: easeOrganic }}
                        className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
                        loading="lazy"
                      />
                    </AnimatePresence>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />

                    <button
                      type="button"
                      aria-label="Foto anterior"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevPhoto();
                      }}
                      className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper/30 bg-ink/60 text-paper backdrop-blur transition-all hover:bg-mustard hover:text-ink active:scale-95"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Foto siguiente"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextPhoto();
                      }}
                      className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper/30 bg-ink/60 text-paper backdrop-blur transition-all hover:bg-mustard hover:text-ink active:scale-95"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    <div className="absolute inset-x-5 bottom-5 flex gap-1.5">
                      {data.fotos.slice(0, 6).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPhotoIdx(i)}
                          aria-label={`Foto ${i + 1}`}
                          className="group relative h-px flex-1 overflow-hidden bg-ink/25"
                        >
                          <span
                            className={`absolute inset-y-0 left-0 transition-all ${
                              i === photoIdx
                                ? "w-full bg-ink"
                                : i < photoIdx
                                ? "w-full bg-ink/60"
                                : "w-0"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 md:self-center">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink">
                    Catering · {data.numero}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                    {data.nombre}
                  </h3>
                  <p className="mt-4 text-pretty text-[14px] leading-relaxed text-ink/70 md:text-[15px]">
                    {TEASERS[data.id] ??
                      "Una propuesta de catering pensada para acompañar tu festejo de principio a fin."}
                  </p>

                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.25em] text-ink/45">
                    Incluye {data.menu.length} momentos del evento
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {data.menu.slice(0, 4).map((sec) => (
                      <li
                        key={sec.titulo}
                        className="rounded-full border border-ink/12 bg-ink/[0.04] px-3 py-1 text-xs tracking-wide text-ink/75"
                      >
                        {sec.titulo}
                      </li>
                    ))}
                    {data.menu.length > 4 && (
                      <li className="rounded-full border border-ink/12 bg-ink/[0.04] px-3 py-1 text-xs tracking-wide text-ink/55">
                        +{data.menu.length - 4} más
                      </li>
                    )}
                  </ul>

                  <button
                    type="button"
                    onClick={openDrawer}
                    className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-display text-sm font-medium tracking-tight text-paper  transition-transform hover:scale-[1.03] active:scale-[0.97]"
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

      {/* Lightbox de fotos */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOrganic }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/90 backdrop-blur-md p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Foto ampliada"
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-paper/30 bg-ink/60 text-paper backdrop-blur transition-colors hover:bg-mustard hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-paper/30 bg-ink/60 text-paper backdrop-blur transition-colors hover:bg-mustard hover:text-ink md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-paper/30 bg-ink/60 text-paper backdrop-blur transition-colors hover:bg-mustard hover:text-ink md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={`lb-${data.id}-${photoIdx}`}
                src={data.fotos[photoIdx]}
                alt={`${data.nombre} foto ${photoIdx + 1}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeOrganic }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
              />
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.3em] text-paper/70">
              {photoIdx + 1} / {fotosCount}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[110] w-full overflow-hidden bg-mustard shadow-deep ring-1 ring-ink/10 md:w-[min(1100px,92vw)]"
              role="dialog"
              aria-modal="true"
              aria-label="Catering completo"
            >
              {/* Toolbar sticky */}
              <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-ink/10 bg-mustard/80 px-5 py-3.5 backdrop-blur-xl md:px-8">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Cerrar"
                    className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-ink/5 text-ink/80 transition-colors hover:border-ink hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
                    Catering · vista completa
                  </p>
                </div>

                <button
                  type="button"
                  onClick={next}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-[13px] font-medium tracking-tight text-paper  transition-transform hover:scale-[1.03] active:scale-[0.97]"
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
                <Catering
                  activeId={data.id}
                  onActiveChange={(id) => {
                    const i = CATERING_OPCIONES.findIndex((o) => o.id === id);
                    if (i >= 0) go(i);
                  }}
                />

                <div className="flex justify-center bg-mustard px-6 pb-12">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-medium tracking-tight text-paper  transition-transform hover:scale-[1.03] active:scale-[0.97]"
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

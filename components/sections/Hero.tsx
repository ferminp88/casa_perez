"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { letterVariants, easeOrganic, easeCrisp } from "@/lib/motion";
import { HERO_IMAGES, BRAND, CONTACT } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

// Mosaico hero: 3 capas con parallax diferencial. Reutiliza HERO_IMAGES sin sumar assets.
const COLLAGE = [
  { src: HERO_IMAGES[0], cls: "left-[6%] top-[14%] w-[26%] aspect-[3/4] rotate-[-6deg]", depth: 0.6 },
  { src: HERO_IMAGES[3], cls: "right-[8%] top-[10%] w-[22%] aspect-square rotate-[5deg]", depth: 1.0 },
  { src: HERO_IMAGES[6], cls: "right-[4%] bottom-[18%] w-[28%] aspect-[4/5] rotate-[-3deg]", depth: 0.8 },
];

const TITLE_PRE = ["Olvidate", "de", "todo."];
const TITLE_POST = ["lo", "que", "quieras."];

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const collage1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const collage2Y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const collage3Y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const layerYs = [collage1Y, collage2Y, collage3Y];

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-night isolate"
    >
      {/* Mesh gradient fiesta de fondo */}
      <div className="absolute inset-0 bg-fiesta-mesh opacity-70" />
      <div className="absolute inset-0 bg-dot-grid opacity-50" />

      {/* Imagen de fondo full bleed con parallax + crossfade lento */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-12 -bottom-12">
        <AnimatePresence>
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: easeOrganic }}
            className="absolute inset-0 bg-cover bg-center mask-fade-b"
            style={{ backgroundImage: `url(${HERO_IMAGES[idx]})` }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/40 to-night" />
      <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay" />

      {/* Collage flotante (3 fotos pequeñas con parallax diferencial) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {COLLAGE.map((c, i) => (
          <motion.div
            key={i}
            style={{ y: layerYs[i] }}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: easeOrganic, delay: 0.6 + i * 0.15 }}
            className={`absolute overflow-hidden rounded-2xl shadow-deep ring-1 ring-bone/10 ${c.cls}`}
          >
            <img src={c.src} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-night/40 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Header content */}
      <motion.div
        style={{ y: titleY }}
        className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-24"
      >
        {/* Badge superior con mono + dot pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeCrisp, delay: 0.3 }}
          className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-bone/15 bg-bone/5 px-4 py-1.5 backdrop-blur"
        >
          <span className="relative grid place-items-center">
            <span className="block h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime/60" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80">
            {BRAND.city} · disponible 2026
          </span>
        </motion.div>

        {/* Título: "Olvidate de todo. Festejá lo que quieras." */}
        <h1 className="font-display text-balance text-[clamp(2.75rem,9.5vw,9rem)] font-medium leading-[0.92] tracking-tightest text-bone">
          <span className="block">
            {TITLE_PRE.map((w, i) => (
              <Letter key={`pre-${i}`} i={i}>{w}</Letter>
            ))}
          </span>
          <span className="block">
            <Letter i={3}>
              <span className="font-editorial italic text-magenta-glow">Festejá</span>
            </Letter>
            {TITLE_POST.map((w, i) => (
              <Letter key={`post-${i}`} i={4 + i}>{w}</Letter>
            ))}
          </span>
        </h1>

        {/* Sub + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOrganic, delay: 1.2 }}
          className="mt-12 grid gap-10 md:grid-cols-12 md:items-end"
        >
          <p className="md:col-span-5 max-w-md text-pretty text-base text-bone/70 md:text-lg">
            Tres salones, equipo propio y veintipico de años organizando los festejos
            que se recuerdan. Cumpleaños, bodas, infantiles, corporativos.
          </p>
          <div className="md:col-span-7 flex flex-wrap items-center gap-3 md:justify-end">
            <a
              href="#contacto"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-magenta px-7 py-4 text-sm font-medium text-bone shadow-glow-magenta transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="relative z-10">Pedir presupuesto</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-450 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span aria-hidden className="absolute inset-0 -z-0 bg-gradient-to-r from-magenta via-violet to-magenta opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/5 px-6 py-4 text-sm tracking-wide text-bone backdrop-blur transition-all hover:border-lime/60 hover:bg-bone/10 hover:text-lime"
            >
              WhatsApp directo
            </a>
          </div>
        </motion.div>

        {/* Slider thumbs (timeline) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
            {String(idx + 1).padStart(2, "0")} / {String(HERO_IMAGES.length).padStart(2, "0")}
          </span>
          <div className="flex flex-1 items-center gap-1.5 max-w-md">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className="group relative h-px flex-1 overflow-hidden bg-bone/15"
              >
                <motion.span
                  animate={{ width: i === idx ? "100%" : i < idx ? "100%" : "0%" }}
                  transition={{ duration: i === idx ? 5 : 0.4, ease: i === idx ? "linear" : "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-magenta to-lime"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Marquee inferior decorativo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-4 left-0 right-0 z-10"
      >
        <div className="flex items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40 md:px-10">
          <span>↓ scroll para descubrir</span>
          <span className="hidden md:inline">CityBell · La Plata · AR</span>
        </div>
      </motion.div>
    </section>
  );
}

function Letter({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <span className="mr-[0.18em] inline-block overflow-hidden align-bottom">
      <motion.span
        custom={i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

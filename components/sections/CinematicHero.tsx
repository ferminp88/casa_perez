"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { letterVariants, easeOrganic, easeCrisp } from "@/lib/motion";
import { HERO_IMAGES, BRAND, CONTACT } from "@/lib/content";
import { Play } from "lucide-react";

/**
 * CinematicHero — landing hero "21st.dev cinematic" adaptado a Casa Pérez.
 *
 * Capas (de fondo a frente):
 *  1. Imagen full-bleed con ken-burns slow + crossfade entre las 9 fotos
 *  2. Vignette radial (oscurece bordes, foco al centro/abajo)
 *  3. Tilt parallax con mouse (5° max) sobre toda la capa de imagen
 *  4. Mesh gradient + grain
 *  5. Letterbox bands (top + bottom) para look cine
 *  6. Título overlay con letras animadas y "Festejá" en italic editorial
 *  7. Strip inferior de meta + thumbs + play CTA
 */
const TITLE_PRE = ["Olvidate", "de", "todo."];
const TITLE_POST = ["lo", "que", "quieras."];

export function CinematicHero() {
  const ref = useRef<HTMLElement | null>(null);
  const [idx, setIdx] = useState(0);

  // Auto-rotate cada 6s (más lento que el hero anterior; lectura cinematográfica)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HERO_IMAGES.length), 2800);
    return () => clearInterval(id);
  }, []);

  // Scroll parallax: la imagen se desplaza, el título se desplaza menos
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Mouse parallax tilt: la imagen se inclina sutil siguiendo el cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 80, damping: 20 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 80, damping: 20 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], ["-2%", "2%"]), { stiffness: 80, damping: 20 });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], ["-2%", "2%"]), { stiffness: 80, damping: 20 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="relative min-h-[100svh] w-full overflow-hidden bg-night isolate"
      style={{ perspective: 1400 }}
    >
      {/* Capa imagen + ken-burns + parallax + tilt */}
      <motion.div
        style={{ y: imgY, scale: imgScale, rotateX: tiltX, rotateY: tiltY, x: tx, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.8, ease: easeOrganic },
              scale: { duration: 8, ease: "linear" },
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[idx]})` }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Vignette + ink fade + grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/30 via-night/55 to-night" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 50%, transparent 30%, rgba(10,10,15,0.85) 100%)" }}
      />
      <div className="absolute inset-0 bg-fiesta-mesh opacity-30 mix-blend-screen" />
      <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay" />

      {/* Letterbox bands cine */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: easeOrganic, delay: 0.2 }}
        className="absolute inset-x-0 top-0 z-20 h-9 origin-top bg-night md:h-12"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: easeOrganic, delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 z-20 h-9 origin-bottom bg-night md:h-12"
      />

      {/* Header content */}
      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-24 md:pb-20"
      >
        {/* Badge live */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeCrisp, delay: 0.4 }}
          className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-bone/15 bg-bone/5 px-3.5 py-1 backdrop-blur"
        >
          <span className="relative grid place-items-center">
            <span className="block h-1.5 w-1.5 rounded-full bg-lime" />
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime/60" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80">
            Reservas abiertas · Temporada 2026
          </span>
        </motion.div>

        {/* Título cinematic */}
        <h1 className="font-display text-balance text-[clamp(2.25rem,7.5vw,7rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
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
          transition={{ duration: 0.9, ease: easeOrganic, delay: 1.4 }}
          className="mt-8 grid gap-7 md:grid-cols-12 md:items-end"
        >
          <p className="md:col-span-5 max-w-md text-pretty text-sm text-bone/75 md:text-base">
            Tres salones, equipo propio y veintipico de años organizando los festejos
            que se recuerdan. Cumpleaños, bodas, infantiles, corporativos.
          </p>
          <div className="md:col-span-7 flex flex-wrap items-center gap-3 md:justify-end">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2.5 rounded-full bg-magenta px-5 py-2.5 text-[13px] font-medium tracking-wide text-night shadow-glow-magenta transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              Pedir un presupuesto
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wide text-bone/60 underline-offset-4 transition-colors hover:text-bone hover:underline"
            >
              o WhatsApp directo
            </a>
          </div>
        </motion.div>

      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-20 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/45 md:bottom-24"
      >
        ↓ scroll
      </motion.div>
    </section>
  );
}

function Letter({ children, i }: { children: React.ReactNode; i: number }) {
  // pb/pt dan aire vertical para acentos (á) y descenders sin que el
  // overflow-hidden de la animación los corte. pr + -mr compensa el ancho
  // del wrapper para que los puntos finales no queden recortados con
  // tracking negativo, sin alterar el spacing entre palabras.
  return (
    <span className="mr-[0.16em] -mb-[0.18em] inline-block overflow-hidden pb-[0.18em] pt-[0.05em] pr-[0.06em] -mr-[0.04em] align-bottom leading-none">
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

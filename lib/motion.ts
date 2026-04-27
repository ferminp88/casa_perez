import type { Variants, Transition } from "framer-motion";

/* — Curvas reutilizables (espejo de Tailwind transitionTimingFunction) */
export const easeOrganic = [0.22, 1, 0.36, 1] as const;
export const easeCrisp = [0.16, 1, 0.3, 1] as const;
export const easeSpring = [0.34, 1.56, 0.64, 1] as const;

/* — Spring presets (úsalos para hover/drag, no para entradas) */
export const springSoft: Transition = { type: "spring", stiffness: 180, damping: 24, mass: 0.6 };
export const springSnappy: Transition = { type: "spring", stiffness: 320, damping: 28, mass: 0.5 };

/* — Stagger madre/hijo (entradas listadas) */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOrganic } },
};

/* — Reveal de líneas tipo telón (hero) */
export const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: easeOrganic, delay: 0.1 + i * 0.08 },
  }),
};

/* — Reveal por palabras/letras con blur (texto editorial premium) */
export const letterVariants: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeCrisp, delay: 0.05 + i * 0.025 },
  }),
};

/* — Mask reveal: imagen/bloque que entra detrás de un wipe */
export const maskRevealVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: easeOrganic },
  },
};

/* — Imagen del hero: telón lento con scale */
export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: easeOrganic } },
};

/* — Scale + blur in (cards, modales) */
export const scaleBlurVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(12px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: easeCrisp } },
};

/* — Hover magnético/levantado (botones, cards) */
export const magneticHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -2, scale: 1.015, transition: springSnappy },
  tap: { y: 0, scale: 0.985, transition: { duration: 0.12 } },
} as const;

/* — Parallax sutil (úsalo con useScroll + useTransform en componentes) */
export const parallaxRange = (depth: number = 1) => [-40 * depth, 40 * depth] as const;

/* — viewport defaults (evita ruido al pasar por una sección dos veces) */
export const viewportOnce = { once: true, amount: 0.2 } as const;
export const viewportRepeat = { once: false, amount: 0.3 } as const;

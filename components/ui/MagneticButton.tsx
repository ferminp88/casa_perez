"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  /** Intensidad del magnetismo en px. 0 lo desactiva (mobile/coarse pointer). */
  strength?: number;
};

/**
 * Botón con efecto magnético + halo de gradiente al hover.
 * Implementación: mouse-position → MotionValue → spring → translate.
 * En `pointer: coarse` (touch) saltamos el efecto: no aporta y consume gesto.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 18,
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spring suave: el botón "persigue" al cursor sin overshoot exagerado.
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  // Halo: un blob radial que sigue al cursor dentro del botón.
  const haloX = useTransform(sx, (v) => `${50 + v * 1.5}%`);
  const haloY = useTransform(sy, (v) => `${50 + v * 1.5}%`);

  const handleMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches || strength === 0) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-wide overflow-hidden select-none";
  const styles = {
    primary:
      "bg-magenta text-bone shadow-glow-magenta hover:text-bone focus-visible:ring-2 focus-visible:ring-magenta",
    ghost:
      "border border-bone/20 bg-bone/5 text-bone backdrop-blur hover:border-lime/60 hover:text-lime focus-visible:ring-2 focus-visible:ring-lime/40",
  }[variant];

  const Inner = (
    <>
      {/* Halo gradiente animado, solo en variante primary */}
      {variant === "primary" && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-organic group-hover:opacity-100"
          style={{
            background: `radial-gradient(120px circle at var(--mx) var(--my), #6B2FFF 0%, transparent 60%)`,
            // CSS vars vinculadas a los springs para evitar repaint costoso
            ["--mx" as never]: haloX,
            ["--my" as never]: haloY,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  const motionProps = {
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: clsx(base, styles, className),
  } as const;

  if (href) {
    return (
      <motion.a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...motionProps}>
        {Inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      type="button"
      {...motionProps}
    >
      {Inner}
    </motion.button>
  );
}

"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import clsx from "clsx";

/**
 * ImageComparison — slider before/after estilo shadcn UI Kit.
 *
 * Interacción:
 *  - Drag del handle (mouse + touch) actualiza una motion value [0..100]
 *  - Click en cualquier punto del frame mueve el handle a esa posición
 *  - El handle también acepta keyboard (← →)
 *
 * Render:
 *  - 2 imágenes superpuestas; la "after" tiene clip-path inset(0 X% 0 0)
 *  - Línea vertical + handle redondo glass
 */
export function ImageComparison({
  before,
  after,
  beforeLabel = "Antes",
  afterLabel = "Después",
  className,
  initial = 50,
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  initial?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pos = useMotionValue(initial); // 0..100 (% from left = qué tanto se ve "after")
  const [dragging, setDragging] = useState(false);

  const setFromClientX = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    const v = ((clientX - r.left) / r.width) * 100;
    pos.set(Math.max(0, Math.min(100, v)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setDragging(false);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - 4));
    if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + 4));
  };

  // Clip path para la imagen "after" (la de la derecha): inset desde la izquierda
  const afterClip = useTransform(pos, (v) => `inset(0 0 0 ${v}%)`);
  const handleLeft = useTransform(pos, (v) => `${v}%`);
  const beforeClip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);

  return (
    <div
      ref={ref}
      data-lenis-prevent
      style={{ touchAction: "none" }}
      className={clsx(
        "relative aspect-[16/9] w-full select-none overflow-hidden rounded-3xl bg-obsidian ring-1 ring-bone/8",
        dragging ? "cursor-grabbing" : "cursor-ew-resize",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Imagen base "after" (cubre todo) */}
      <img src={after} alt={afterLabel} draggable={false} className="absolute inset-0 h-full w-full object-cover" />

      {/* Imagen "before" recortada por la izquierda, encima */}
      <motion.img
        src={before}
        alt={beforeLabel}
        draggable={false}
        style={{ clipPath: beforeClip }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Etiquetas */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-bone/15 bg-night/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-bone/90 backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-magenta/40 bg-magenta/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-magenta backdrop-blur">
        {afterLabel}
      </span>

      {/* Línea divisoria + handle */}
      <motion.div style={{ left: handleLeft }} className="pointer-events-none absolute inset-y-0 z-10 -translate-x-1/2">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-bone/80" style={{ boxShadow: "0 0 16px rgba(255,46,110,0.5)" }} />
        <button
          type="button"
          aria-label="Comparar imágenes"
          onKeyDown={onKey}
          tabIndex={0}
          className="pointer-events-auto absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bone text-night shadow-glow-magenta ring-2 ring-magenta/60 transition-transform active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 6L4 12l5 6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>

      {/* Hint */}
      <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
        Arrastrá para comparar
      </span>
    </div>
  );
}

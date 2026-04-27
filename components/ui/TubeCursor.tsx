"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * TubeCursor — cursor secundario tipo tubo/trail.
 *
 * Composición:
 *  - Dot núcleo: sigue al mouse 1:1 (instant).
 *  - Tubo lagged: 8 segmentos en cadena, cada uno con un spring un poco más blando.
 *    Visualmente leen como un "tube" que se estira en movimiento rápido y se
 *    encoge al detenerse.
 *  - Halo: blob blur con scale en hover sobre elementos interactivos
 *    (data-cursor="hover" en cualquier link/button).
 *
 * Disabled en touch y prefers-reduced-motion. No reemplaza al cursor nativo
 * (lo dejamos visible para no romper accesibilidad/affordance).
 */
const SEGMENTS = 8;

export function TubeCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  // Núcleo: motion values raw del mouse
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Núcleo seguido por un spring duro (sensación responsive)
  const dotX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.4 });

  // Cadena de springs lagged: cada uno alimenta al siguiente con stiffness decreciente.
  // Como hooks no se pueden generar en loop, los declaro fijos.
  const sx1 = useSpring(x, { stiffness: 320, damping: 22, mass: 0.5 });
  const sy1 = useSpring(y, { stiffness: 320, damping: 22, mass: 0.5 });
  const sx2 = useSpring(sx1, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy2 = useSpring(sy1, { stiffness: 260, damping: 22, mass: 0.5 });
  const sx3 = useSpring(sx2, { stiffness: 220, damping: 22, mass: 0.5 });
  const sy3 = useSpring(sy2, { stiffness: 220, damping: 22, mass: 0.5 });
  const sx4 = useSpring(sx3, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy4 = useSpring(sy3, { stiffness: 180, damping: 22, mass: 0.5 });
  const sx5 = useSpring(sx4, { stiffness: 150, damping: 22, mass: 0.5 });
  const sy5 = useSpring(sy4, { stiffness: 150, damping: 22, mass: 0.5 });
  const sx6 = useSpring(sx5, { stiffness: 120, damping: 22, mass: 0.5 });
  const sy6 = useSpring(sy5, { stiffness: 120, damping: 22, mass: 0.5 });
  const sx7 = useSpring(sx6, { stiffness: 95, damping: 22, mass: 0.5 });
  const sy7 = useSpring(sy6, { stiffness: 95, damping: 22, mass: 0.5 });
  const sx8 = useSpring(sx7, { stiffness: 75, damping: 22, mass: 0.5 });
  const sy8 = useSpring(sy7, { stiffness: 75, damping: 22, mass: 0.5 });

  const xs = [sx1, sx2, sx3, sx4, sx5, sx6, sx7, sx8];
  const ys = [sy1, sy2, sy3, sy4, sy5, sy6, sy7, sy8];

  useEffect(() => {
    // Activar solo en pointer fino + sin reduced-motion
    const ok =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
    if (!ok) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest("a, button, [data-cursor='hover']");
      setHover(!!t);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Cadena de segmentos del tubo (de más lejano a más cercano para z-stack) */}
      {[...Array(SEGMENTS)].map((_, i) => {
        const reverseIdx = SEGMENTS - 1 - i; // 7 → 0
        const size = 6 + reverseIdx * 1.8; // segmentos al final más grandes
        const opacity = 0.08 + (i / SEGMENTS) * 0.4;
        return (
          <motion.div
            key={i}
            aria-hidden
            style={{
              x: xs[reverseIdx],
              y: ys[reverseIdx],
              width: size,
              height: size,
              translateX: "-50%",
              translateY: "-50%",
              opacity,
            }}
            className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-magenta mix-blend-screen blur-[2px]"
          />
        );
      })}

      {/* Halo grande que aparece sobre interactivos */}
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[101]"
      >
        <motion.div
          animate={{
            scale: hover ? 2.4 : 1,
            opacity: hover ? 0.55 : 0.0,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/30 blur-xl"
        />
      </motion.div>

      {/* Dot núcleo, siempre visible */}
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[102]"
      >
        <motion.div
          animate={{ scale: hover ? 1.6 : 1, backgroundColor: hover ? "#D4FF3D" : "#FF2E6E" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-2 w-2 rounded-full"
          style={{ boxShadow: "0 0 12px currentColor" }}
        />
      </motion.div>
    </>
  );
}

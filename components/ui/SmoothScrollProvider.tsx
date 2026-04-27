"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Lenis envuelve el wheel/touch en un loop con interpolación.
// Lo iniciamos una vez en el cliente; respeta reduced-motion automáticamente
// porque la duración mínima sigue siendo perceptible y no usa transform abusivo.
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Skip Lenis en touch devices: el smooth nativo de iOS/Android es mejor
    // y libera el thread JS para animaciones críticas.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

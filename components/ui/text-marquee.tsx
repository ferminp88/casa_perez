"use client";

import { useRef, useEffect, forwardRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

// Inlined helpers — evita sumar @motionone/utils y un cn helper extra.
function wrap(min: number, max: number, v: number): number {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}
function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

interface MarqueeProps {
  children: string;
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
}

/**
 * Marquee de texto con velocidad scroll-aware.
 * - baseVelocity negativo = mueve a la izquierda; positivo = derecha.
 * - scrollDependent: invierte dirección al hacer scroll inverso, y acelera con la velocidad del scroll.
 * - delay: ms antes de arrancar la animación (útil cuando entra desde un reveal).
 */
const TextMarquee = forwardRef<HTMLDivElement, MarqueeProps>(function TextMarquee(
  { children, baseVelocity = -3, className, scrollDependent = false, delay = 0 },
  ref,
) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], { clamp: false });

  // wrap entre -20% y -45% mantiene la repetición visualmente continua
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const hasStarted = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => { hasStarted.current = true; }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  useAnimationFrame((_t, delta) => {
    if (!hasStarted.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (scrollDependent) {
      if (velocityFactor.get() < 0) directionFactor.current = -1;
      else if (velocityFactor.get() > 0) directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className="flex flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div className="flex flex-nowrap gap-10 whitespace-nowrap" style={{ x }}>
        <span className={cn("block text-[8vw]", className)}>{children}</span>
        <span className={cn("block text-[8vw]", className)}>{children}</span>
        <span className={cn("block text-[8vw]", className)}>{children}</span>
        <span className={cn("block text-[8vw]", className)}>{children}</span>
      </motion.div>
    </div>
  );
});

export default TextMarquee;

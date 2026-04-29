"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PILARES, BRAND } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function PropuestaValor() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.3"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="propuesta"
      data-nav-theme="light"
      className="relative bg-paper py-10 md:py-14 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-magenta-glow opacity-25" />
      <div className="absolute inset-0 bg-dot-grid opacity-50" />

      <div className="container-x relative">
        {/* Eyebrow + título full-width */}
        <Reveal className="max-w-4xl">
          <Reveal.Item>
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-mustard-deep">
              <span className="block h-px w-6 bg-mustard-deep" />
              Atención personalizada
            </p>
          </Reveal.Item>
          <Reveal.Item>
            <h2 className="font-display text-balance text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
              Cada evento es{" "}
              <span className="font-editorial italic text-mustard-deep">único e irrepetible.</span>
            </h2>
          </Reveal.Item>
        </Reveal>

        {/* Línea de separación scroll-driven */}
        <motion.div
          style={{ scaleX: lineScale, transformOrigin: "0% 50%" }}
          className="mt-9 h-px w-full bg-gradient-to-r from-mustard via-ink to-mustard"
        />

        {/* Grid: 4 pilares chicos a la izquierda · foto del equipo a la derecha */}
        <div className="mt-9 grid gap-9 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-7">
            <Reveal.Item>
              <p className="mb-6 max-w-xl text-pretty text-sm text-ink/75 md:text-base">
                {BRAND.about}
              </p>
            </Reveal.Item>

            <ul className="divide-y divide-ink/15 border-t border-ink/15">
              {PILARES.map((p) => (
                <Reveal.Item key={p.n}>
                  <li className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1.5 py-5 transition-colors md:grid-cols-[4rem_1fr_auto] md:gap-x-7 md:py-5">
                    <span className="font-display text-2xl font-medium leading-none tracking-tight text-mustard-deep transition-colors group-hover:text-ink md:text-4xl">
                      {p.n}
                    </span>
                    <h3 className="font-display text-base font-medium leading-snug tracking-tight text-ink md:text-xl">
                      {p.titulo}
                    </h3>
                    <p className="col-start-2 max-w-xl text-[12.5px] leading-relaxed text-ink/70 md:col-start-2 md:text-[14px]">
                      {p.txt}
                    </p>
                    <span
                      aria-hidden
                      className="hidden md:block md:row-span-2 md:row-start-1 md:col-start-3 md:self-center md:translate-x-0 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-x-1 md:group-hover:opacity-100"
                    >
                      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="text-mustard-deep">
                        <path d="M1 7h19M14 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </li>
                </Reveal.Item>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-5">
            <Reveal.Item>
              <div className="relative">
                <img
                  src="/brand/somosunequipo.png"
                  alt="Equipo Casa Pérez · #SOMOSUNEQUIPO"
                  className="mx-auto w-full max-w-md object-contain md:max-w-full"
                  loading="lazy"
                />
              </div>
            </Reveal.Item>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICIOS } from "@/lib/content";
import { easeOrganic } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

export function Servicios() {
  const [active, setActive] = useState(SERVICIOS[0].id);
  const data = SERVICIOS.find((s) => s.id === active)!;

  return (
    <section id="servicios" className="relative overflow-hidden bg-obsidian py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-violet-glow opacity-50" />
      <div className="absolute inset-0 bg-dot-grid opacity-25" />

      <div className="container-x relative">
        <Reveal className="mb-12 grid gap-8 md:grid-cols-12">
          <Reveal.Item className="md:col-span-7">
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-violet-glow">
              <span className="block h-px w-6 bg-violet" />
              Servicio integral
            </p>
            <h2 className="font-display text-balance text-[clamp(1.65rem,3.8vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
              No hace falta sumar proveedores. <br />
              <span className="font-editorial italic text-fiesta">La fiesta entera, en una casa.</span>
            </h2>
          </Reveal.Item>
          <Reveal.Item className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-sm text-bone/65">
              Cocina propia, DJs, ambientación, beauty y pastelería. Equipo formado en
              la casa, con la misma vara para todos los servicios.
            </p>
          </Reveal.Item>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <ul className="md:col-span-6">
            {SERVICIOS.map((s, i) => {
              const isActive = s.id === active;
              return (
                <li
                  key={s.id}
                  onMouseEnter={() => setActive(s.id)}
                  onClick={() => setActive(s.id)}
                  className="group relative cursor-pointer border-b border-bone/8 py-5 transition-colors"
                >
                  {/* Indicador izquierdo: línea magenta que se traza */}
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: easeOrganic }}
                    className="absolute -left-2 top-1/2 h-px w-12 origin-left -translate-y-1/2 bg-magenta"
                    style={{ boxShadow: "0 0 12px rgba(255,46,110,0.7)" }}
                  />
                  <div className="grid grid-cols-12 items-baseline gap-4">
                    <span className={`col-span-2 font-mono text-xs transition-colors ${isActive ? "text-magenta" : "text-bone/40"}`}>
                      0{i + 1}
                    </span>
                    <div className="col-span-10">
                      <h3
                        className={`font-display text-xl font-medium tracking-tight transition-colors md:text-3xl ${
                          isActive ? "text-bone" : "text-bone/45 group-hover:text-bone/80"
                        }`}
                      >
                        {s.titulo}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: easeOrganic }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 max-w-md text-sm text-bone/65">
                              {s.bajada}
                            </p>
                            {/* Imagen inline solo en mobile (en desktop hay preview sticky al costado) */}
                            <div className="mt-4 md:hidden">
                              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-magenta/30">
                                <img src={s.img} alt={s.titulo} className="h-full w-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </li>
              );
            })}
            <div className="mt-10">
              <a
                href="#contacto"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-lime px-7 py-4 text-sm font-medium text-night transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="relative z-10">Pedir una propuesta</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </ul>

          {/* Preview con borde gradient animado — solo desktop (mobile renderiza imagen inline en el item activo) */}
          <div className="hidden md:col-span-6 md:col-start-7 md:block">
            <div className="md:sticky md:top-28">
              <div className="border-gradient relative rounded-3xl p-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={data.img}
                    initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: easeOrganic }}
                    className="relative aspect-[4/5] w-full overflow-hidden rounded-[calc(1.5rem-4px)]"
                  >
                    <img src={data.img} alt={data.titulo} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                    <div className="absolute inset-x-7 bottom-7 text-bone">
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-magenta">
                        {data.id}
                      </p>
                      <p className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">{data.titulo}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <span className="absolute inset-0 rounded-3xl spin-conic" style={{ ["--angle" as never]: "0deg" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

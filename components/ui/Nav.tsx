"use client";

import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const LINKS = [
  { href: "#espacios", label: "Salones" },
  { href: "#servicios", label: "Servicios" },
  { href: "#catering", label: "Catering" },
  { href: "#galeria", label: "Galería" },
  { href: "#videos", label: "Videos" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={clsx(
          "fixed inset-x-0 top-4 z-50 transition-all duration-500 ease-organic",
          scrolled ? "px-4 md:px-6" : "px-6 md:px-10"
        )}
      >
        <nav
          className={clsx(
            "mx-auto flex max-w-[1400px] items-center justify-between gap-6 rounded-full transition-all duration-500 ease-organic",
            scrolled
              ? "glass-nav px-4 py-3 shadow-deep md:px-5 md:py-3.5"
              : "px-4 py-3 bg-transparent md:px-6 md:py-4"
          )}
        >
          <a href="#" aria-label="Casa Pérez" className="flex items-center gap-2 pl-2">
            <img src="/brand/logo-blanco.svg" alt="Casa Pérez Multiespacio" className="h-10 w-auto md:h-12" />
          </a>

          {/* Indicador líquido + links — Bricolage display, más grandes */}
          <ul
            className="relative hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHover(null)}
          >
            {LINKS.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onMouseEnter={() => setHover(l.href)}
                  className="relative z-10 inline-block rounded-full px-5 py-2.5 font-display text-base font-medium tracking-tight text-bone/80 transition-colors hover:text-bone lg:text-lg"
                >
                  {l.label}
                </a>
                {hover === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-0 rounded-full bg-bone/8"
                    style={{ background: "rgba(244,244,240,0.08)" }}
                  />
                )}
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="hidden md:inline-flex group relative items-center gap-2 overflow-hidden rounded-full bg-magenta px-6 py-3 font-display text-base font-medium tracking-tight text-bone shadow-glow-magenta transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="relative z-10">Pedir presupuesto</span>
            <span className="relative z-10 transition-transform duration-450 group-hover:translate-x-0.5">→</span>
            <span aria-hidden className="absolute inset-0 -z-0 bg-gradient-to-r from-magenta via-violet to-magenta opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </a>

          {/* Hamburger mobile */}
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-bone/5 text-bone md:hidden"
          >
            <span className="block h-px w-5 bg-bone" />
            <span className="mt-1.5 block h-px w-5 bg-bone" />
          </button>
        </nav>
      </motion.header>

      {/* Drawer mobile fullscreen con stagger */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-night text-bone md:hidden"
          >
            <div className="absolute inset-0 bg-fiesta-mesh opacity-50" />
            <div className="relative flex items-center justify-between p-6">
              <img src="/brand/logo-blanco.svg" alt="Casa Pérez" className="h-9" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="grid h-10 w-10 place-items-center rounded-full bg-bone/10 text-2xl"
              >
                ×
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              className="relative px-6 pt-8 font-display text-5xl tracking-tightest"
            >
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="border-b border-bone/10 py-5"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-xs text-magenta">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="absolute bottom-10 left-6 right-6">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-magenta px-6 py-4 text-center font-medium text-bone shadow-glow-magenta"
              >
                Pedir presupuesto →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

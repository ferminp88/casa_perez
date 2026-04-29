"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const minDuration = 600;
    const maxDuration = 3500;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => setDone(true), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const failsafe = setTimeout(() => setDone(true), maxDuration);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-night"
        >
          <div className="absolute inset-0 bg-fiesta-mesh opacity-40" />
          <div className="absolute inset-0 bg-grain opacity-25 mix-blend-overlay" />

          <div className="relative flex flex-col items-center gap-6">
            <motion.img
              src="/brand/logo-blanco.svg"
              alt="Casa Pérez"
              className="h-14 w-auto md:h-16"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="relative h-px w-40 overflow-hidden bg-bone/15 md:w-56">
              <motion.span
                className="absolute inset-y-0 left-0 bg-magenta"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: [0.5, 0, 0.2, 1] }}
                style={{ boxShadow: "0 0 12px rgba(246,189,96,0.6)" }}
              />
            </div>

            <motion.p
              className="font-mono text-xs uppercase tracking-[0.4em] text-bone/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              Preparando la fiesta
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

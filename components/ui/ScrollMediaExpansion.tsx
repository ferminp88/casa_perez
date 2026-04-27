"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Maximize2, Trees, Users } from "lucide-react";

/**
 * ScrollMediaExpansion — patrón "21st.dev scroll media expansion hero".
 *
 * Estructura:
 *  - Outer: alto 250vh para "consumir" scroll
 *  - Inner sticky: 100vh
 *  - Una imagen central que arranca recortada con clip-path inset(38% 32%)
 *    y se expande progresivamente hasta inset(0 0) full-bleed.
 *  - Texto en dos fases:
 *      Fase A (0-40%): título grande "respirando", invita al scroll
 *      Fase B (50-100%): metadata + bullets emergen sobre la imagen ya expandida
 *  - 3 fotos secundarias flotan desde los bordes con parallax al final.
 *
 * Cada salón es una experiencia inmersiva propia. Encadenar 3 instancias
 * crea un viaje secuencial entre los 3 espacios.
 */
type Props = {
  index: number;
  total: number;
  id: string;
  nombre: string;
  metros: string;
  aire: string;
  capacidad: string;
  bullets: string[];
  gallery: string[]; // [hero, float1, float2, float3]
};

export function ScrollMediaExpansion({
  index,
  total,
  id,
  nombre,
  metros,
  aire,
  capacidad,
  bullets,
  gallery,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // — Expansión del clip-path del hero. Más rápida (0 → 0.35) para dejar
  //   más tiempo de "observación" después de abrirse (0.35 → 1).
  const insetTop = useTransform(scrollYProgress, [0, 0.35], ["38%", "0%"]);
  const insetX = useTransform(scrollYProgress, [0, 0.35], ["32%", "0%"]);
  const radius = useTransform(scrollYProgress, [0, 0.35], ["28px", "0px"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35, 1], [1.05, 1, 1.06]);

  // — Título: grande al inicio, se encoge y sube
  const titleScale = useTransform(scrollYProgress, [0, 0.32, 1], [1, 0.55, 0.55]);
  const titleY = useTransform(scrollYProgress, [0, 0.32, 1], ["0%", "-32vh", "-32vh"]);
  const titleColor = useTransform(scrollYProgress, [0.25, 0.45], ["#0A0A0F", "#F4F4F0"]);

  // — Metadata + bullets aparecen después de la expansión
  const detailsOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.35, 0.5], [40, 0]);

  // — Vignette intensifica cuando la imagen está full-bleed
  const vignetteOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  // — Floats: entran desde 6 direcciones distintas. La fase de aparición se
  //   distribuye entre 0.4-0.85 para escalonar visualmente. Después se
  //   quedan visibles durante 0.85-1 para que puedas observarlas tranquilo.
  const float1X = useTransform(scrollYProgress, [0.4, 0.6], ["-60vw", "0vw"]);
  const float1Y = useTransform(scrollYProgress, [0.4, 1], [40, -30]);
  const float2X = useTransform(scrollYProgress, [0.45, 0.65], ["60vw", "0vw"]);
  const float2Y = useTransform(scrollYProgress, [0.45, 1], [60, -50]);
  const float3Y = useTransform(scrollYProgress, [0.5, 0.7], ["50vh", "0vh"]);
  const float4X = useTransform(scrollYProgress, [0.55, 0.75], ["-50vw", "0vw"]);
  const float5X = useTransform(scrollYProgress, [0.6, 0.8], ["50vw", "0vw"]);
  const float6Y = useTransform(scrollYProgress, [0.65, 0.85], ["-40vh", "0vh"]);
  const floatsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      id={`salon-${id}`}
      className="relative h-[420vh] bg-night"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Background neutro detrás del clip */}
        <div className="absolute inset-0 bg-night" />
        <div className="absolute inset-0 bg-fiesta-mesh opacity-25" />
        <div className="absolute inset-0 bg-dot-grid opacity-25" />

        {/* Hero image expansion — clip-path animado por scroll */}
        <motion.div
          style={{
            clipPath: useClipInset(insetTop, insetX),
            borderRadius: radius,
            scale: heroScale,
          }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={gallery[0]}
            alt={nombre}
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          {/* Vignette progresivo */}
          <motion.div
            style={{ opacity: vignetteOpacity }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 50%, transparent 30%, rgba(10,10,15,0.6) 100%)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Frame ring magenta cuando la imagen es chica */}
        <motion.div
          aria-hidden
          style={{
            clipPath: useClipInsetRing(insetTop, insetX),
            opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0]),
          }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 rounded-[28px] ring-1 ring-magenta/40"
            style={{ boxShadow: "0 24px 60px -12px rgba(255,46,110,0.35)" }}
          />
        </motion.div>

        {/* Frame counter / breadcrumb fijo */}
        <div className="pointer-events-none absolute left-6 top-6 z-30 md:left-10 md:top-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
            Salón {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-magenta">
            {id}
          </p>
        </div>

        {/* Título centrado que se transforma con el scroll */}
        <motion.div
          style={{ scale: titleScale, y: titleY }}
          className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-6"
        >
          <motion.h3
            style={{ color: titleColor }}
            className="text-balance text-center font-display text-[clamp(2.5rem,9vw,8rem)] font-medium leading-[0.92] tracking-tightest mix-blend-difference"
          >
            {nombre.split(" ").map((w, i) => (
              <span key={i} className="mr-[0.18em] inline-block">
                {i === nombre.split(" ").length - 1 ? (
                  <span className="font-editorial italic text-magenta-glow">{w}</span>
                ) : (
                  w
                )}
              </span>
            ))}
          </motion.h3>
        </motion.div>

        {/* Floating photos: entran desde los lados hacia el centro, grandes.
            Se posicionan ANTES del bloque de detalles para que queden detrás
            del texto inferior pero encima del hero full-bleed. */}
        <motion.div
          style={{ x: float1X, y: float1Y, opacity: floatsOpacity }}
          className="pointer-events-none absolute left-[6%] top-[14%] z-20 hidden md:block"
        >
          <div className="h-[44vh] w-[20vw] max-h-[420px] min-h-[260px] max-w-[340px] min-w-[200px] overflow-hidden rounded-3xl ring-1 ring-bone/20 shadow-deep -rotate-2">
            <img src={gallery[1]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </motion.div>
        <motion.div
          style={{ x: float2X, y: float2Y, opacity: floatsOpacity }}
          className="pointer-events-none absolute right-[6%] top-[18%] z-20 hidden md:block"
        >
          <div className="h-[48vh] w-[22vw] max-h-[460px] min-h-[280px] max-w-[380px] min-w-[220px] overflow-hidden rounded-3xl ring-1 ring-bone/20 shadow-deep rotate-2">
            <img src={gallery[2]} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </motion.div>
        <motion.div
          style={{ y: float3Y, opacity: floatsOpacity }}
          className="pointer-events-none absolute left-1/2 top-[26%] z-20 hidden -translate-x-1/2 lg:block"
        >
          <div className="relative h-[36vh] w-[24vw] max-h-[340px] min-h-[220px] max-w-[420px] min-w-[260px] overflow-hidden rounded-3xl ring-1 ring-magenta/40 shadow-deep">
            <img src={gallery[3]} alt="" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Float 4: esquina inferior izquierda, viene desde la izquierda */}
        {gallery[4] && (
          <motion.div
            style={{ x: float4X, opacity: floatsOpacity }}
            className="pointer-events-none absolute left-[12%] bottom-[28%] z-20 hidden xl:block"
          >
            <div className="h-[28vh] w-[16vw] max-h-[280px] min-h-[180px] max-w-[260px] min-w-[150px] overflow-hidden rounded-2xl ring-1 ring-lime/40 shadow-deep -rotate-3">
              <img src={gallery[4]} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        )}

        {/* Float 5: esquina derecha media-baja */}
        {gallery[5] && (
          <motion.div
            style={{ x: float5X, opacity: floatsOpacity }}
            className="pointer-events-none absolute right-[14%] bottom-[32%] z-20 hidden xl:block"
          >
            <div className="h-[30vh] w-[18vw] max-h-[300px] min-h-[200px] max-w-[280px] min-w-[170px] overflow-hidden rounded-2xl ring-1 ring-violet/40 shadow-deep rotate-3">
              <img src={gallery[5]} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        )}

        {/* Float 6: arriba al centro, viene desde arriba */}
        {gallery[6] && (
          <motion.div
            style={{ y: float6Y, opacity: floatsOpacity }}
            className="pointer-events-none absolute left-[35%] top-[6%] z-20 hidden xl:block"
          >
            <div className="h-[22vh] w-[14vw] max-h-[220px] min-h-[150px] max-w-[230px] min-w-[130px] overflow-hidden rounded-2xl ring-1 ring-bone/20 shadow-deep -rotate-2">
              <img src={gallery[6]} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        )}

        {/* Detalles que emergen sobre la imagen expandida — ahora más grandes */}
        <motion.div
          style={{ opacity: detailsOpacity, y: detailsY }}
          className="absolute inset-x-0 bottom-0 z-30 pb-12 md:pb-16"
        >
          <div className="container-x">
            {/* Stats row — agrandados, en grilla de 3 columnas dedicada */}
            <div className="grid grid-cols-1 gap-x-10 gap-y-6 border-b border-bone/15 pb-8 sm:grid-cols-3">
              <Stat icon={Maximize2} label="Superficie" value={metros} />
              <Stat icon={Trees} label="Aire libre" value={aire} />
              <Stat icon={Users} label="Capacidad" value={capacidad} />
            </div>

            {/* Bullets + CTA */}
            <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
              <ul className="md:col-span-7 space-y-3">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-4 text-base text-bone/90 md:text-lg"
                  >
                    <span className="mt-3 h-px w-7 flex-none bg-magenta" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
                <a
                  href="#contacto"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-magenta px-8 py-5 text-base font-medium text-bone shadow-glow-magenta transition-transform hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span className="relative z-10">Reservar {nombre}</span>
                  <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint solo en el primer salón */}
        {index === 0 && (
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/45">
            ↓ scroll para entrar
          </div>
        )}
      </div>
    </section>
  );
}

/* — Helpers de clip-path animado.
   Framer no soporta interpolar clipPath directo entre strings con %, así que
   componemos el string a partir de motion values numéricos (motion.div con
   style={{ clipPath: ... }} y los values son MotionValue<string>).
   Trick: ya retornamos los strings desde useTransform de arriba, así que solo
   tenemos que componerlos. Usamos useTransform con array depencency. */
function useClipInset(top: MotionValue<string>, x: MotionValue<string>) {
  return useTransform([top, x] as unknown as MotionValue<string>[], (arr) => {
    const [t, l] = arr as unknown as [string, string];
    return `inset(${t} ${l} ${t} ${l})`;
  });
}

function useClipInsetRing(top: MotionValue<string>, x: MotionValue<string>) {
  // Mismo inset; sirve para máscara del ring (que se ve solo cuando hay frame)
  return useClipInset(top, x);
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-lime" strokeWidth={1.5} />
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/60">
          {label}
        </p>
      </div>
      <p className="font-display text-2xl font-medium leading-tight tracking-tight text-bone md:text-3xl lg:text-4xl">
        {value}
      </p>
    </div>
  );
}

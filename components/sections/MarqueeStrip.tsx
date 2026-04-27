"use client";

import TextMarquee from "@/components/ui/text-marquee";

// Strip dark con dos líneas: tipos de evento (magenta) + servicios (lime).
// Sirve de respiro entre PropuestaValor y Espacios.
export function MarqueeStripDark() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-bone/8 bg-night py-10 md:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-magenta-glow opacity-30" />
      <div className="absolute inset-0 bg-grain opacity-[0.06]" />
      <div className="relative space-y-1 mask-fade-x">
        <TextMarquee
          baseVelocity={-2.8}
          scrollDependent
          delay={300}
          className="font-display font-medium tracking-tightest text-bone"
        >
          Cumpleaños · Bodas · Infantiles · Bautismos · Corporativos · 15 años ·</TextMarquee>
        <TextMarquee
          baseVelocity={2.8}
          scrollDependent
          delay={300}
          className="font-editorial italic tracking-editorial text-magenta"
        >
          Catering · DJ · Ambientación · Pastelería · Salones · Equipo propio ·</TextMarquee>
      </div>
    </section>
  );
}

// Strip de cierre antes del footer: una línea, sign-off de marca con gradiente.
export function MarqueeStripBrand() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden bg-night py-6 md:py-10"
    >
      <div className="mask-fade-x">
        <TextMarquee
          baseVelocity={-1.8}
          scrollDependent
          delay={200}
          className="font-display font-medium tracking-tightest text-fiesta"
        >
          Casa Pérez Multiespacio · ✦ · City Bell · ✦ ·</TextMarquee>
      </div>
    </section>
  );
}

"use client";

import { CONTACT } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-bone border-t border-bone/8">
      <div className="pointer-events-none absolute inset-0 bg-fiesta-mesh opacity-30" />

      <div className="container-x relative pt-24">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img src="/brand/logo-blanco.svg" alt="Casa Pérez" className="h-12" />
            <p className="mt-5 max-w-xs text-sm text-bone/60">
              Multiespacio para eventos. City Bell · La Plata, Argentina.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-3 text-sm md:justify-self-center">
            {[
              ["#espacios", "Salones"],
              ["#servicios", "Servicios"],
              ["#galeria", "Galería"],
              ["#videos", "Videos"],
              ["#contacto", "Contacto"],
              [CONTACT.whatsapp, "WhatsApp"],
            ].map(([href, label]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-bone/60 transition-colors hover:text-magenta"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="md:justify-self-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">Seguinos</p>
            <div className="mt-3 flex gap-4 text-sm">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-bone/85 transition-colors hover:text-magenta">Instagram</a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="text-bone/85 transition-colors hover:text-magenta">Facebook</a>
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">Atención</p>
            <p className="mt-2 text-sm text-bone/80">{CONTACT.hours}</p>
          </div>
        </div>

        <div className="mt-16 border-t border-bone/8 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
          <p>© {new Date().getFullYear()} Casa Pérez Multiespacio · Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}

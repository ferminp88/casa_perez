"use client";

import { Reveal } from "@/components/ui/Reveal";
import { CONTACT } from "@/lib/content";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUpRight } from "lucide-react";

export function Contacto() {
  return (
    <section id="contacto" className="relative bg-obsidian py-12 md:py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-fiesta-mesh opacity-40" />
      <div className="absolute inset-0 bg-dot-grid opacity-25" />

      <div className="container-x relative">
        <Reveal className="grid gap-16 md:grid-cols-12">
          <Reveal.Item className="md:col-span-6">
            <p className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
              <span className="block h-px w-6 bg-lime" />
              Reservar
            </p>
            <h2 className="font-display text-balance text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
              Contanos cómo <br />
              <span className="font-editorial italic text-fiesta">te imaginás la fiesta.</span>
            </h2>
            <p className="mt-8 max-w-md text-pretty text-bone/65">
              Mandanos un mensaje con fecha, cantidad de invitados y tipo de evento.
              Te respondemos en menos de 24 hs y coordinamos una visita.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-magenta px-7 py-4 text-sm font-medium text-bone shadow-glow-magenta transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="relative z-10">Escribir por WhatsApp</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/5 px-6 py-4 text-sm tracking-wide text-bone backdrop-blur transition-all hover:border-lime/60 hover:text-lime"
              >
                Mandar email
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-bone/65">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-magenta">
                <Instagram className="h-4 w-4" strokeWidth={1.5} /> @casaperezmultiespacio
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-magenta">
                <Facebook className="h-4 w-4" strokeWidth={1.5} /> Facebook
              </a>
            </div>
          </Reveal.Item>

          <Reveal.Item className="md:col-span-5 md:col-start-8">
            <ul className="space-y-3">
              {CONTACT.addresses.map((a, i) => (
                <li key={a.label} className="group glass-card relative overflow-hidden rounded-2xl p-6 transition-all hover:bg-bone/8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-magenta">
                        {a.label}
                      </p>
                      <p className="mt-3 font-display text-lg font-medium text-bone">
                        {a.line}
                      </p>
                      <p className="mt-1 text-sm text-bone/60">{a.city}</p>
                    </div>
                    <span className="font-mono text-[10px] text-bone/40">0{i + 1}</span>
                  </div>
                  <MapPin className="absolute -right-3 -bottom-3 h-16 w-16 text-bone/5 transition-colors group-hover:text-magenta/20" strokeWidth={1} />
                </li>
              ))}
            </ul>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a href={`tel:${CONTACT.phoneTel}`} className="glass-card group rounded-2xl p-5 transition-all hover:bg-bone/8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">Teléfono</p>
                <p className="mt-2 flex items-center gap-2 font-display text-base font-medium text-bone">
                  <Phone className="h-4 w-4 text-lime" strokeWidth={1.5} />
                  {CONTACT.phone}
                </p>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="glass-card group rounded-2xl p-5 transition-all hover:bg-bone/8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">Email</p>
                <p className="mt-2 flex items-center gap-2 font-display text-sm font-medium text-bone">
                  <Mail className="h-4 w-4 flex-none text-lime" strokeWidth={1.5} />
                  <span className="break-all">{CONTACT.email}</span>
                </p>
              </a>
            </div>

            <div className="mt-3 glass-card flex items-center gap-3 rounded-2xl p-5">
              <Clock className="h-4 w-4 flex-none text-magenta" strokeWidth={1.5} />
              <p className="text-sm text-bone/85">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">Atención · </span>
                {CONTACT.hours}
              </p>
            </div>
          </Reveal.Item>
        </Reveal>
      </div>
    </section>
  );
}

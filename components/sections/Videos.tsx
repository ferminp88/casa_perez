"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { VIDEOS } from "@/lib/content";
import { easeOrganic } from "@/lib/motion";
import { Play, X } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

type VideoItem = CardStackItem & { youtubeId: string };

const ITEMS: VideoItem[] = VIDEOS.map((id, i) => ({
  id,
  youtubeId: id,
  title: `Festejo ${String(i + 1).padStart(2, "0")}`,
  description: "Una noche en la casa, filmada tal como pasó.",
  imageSrc: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  href: `https://www.youtube.com/watch?v=${id}`,
}));

export function Videos() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 520, h: 320 });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      if (vw < 640) setSize({ w: Math.min(320, vw - 80), h: 200 });
      else if (vw < 1024) setSize({ w: 460, h: 280 });
      else setSize({ w: 580, h: 360 });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <section id="videos" className="relative bg-night py-16 md:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-magenta-glow opacity-40" />
      <div className="container-x relative">
        <Reveal className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <Reveal.Item>
            <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-magenta">
              <span className="block h-px w-6 bg-magenta" />
              En movimiento
            </p>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.025em] text-bone">
              Las fiestas de la casa, <br />
              <span className="font-editorial italic text-magenta-glow">filmadas como pasan.</span>
            </h2>
          </Reveal.Item>
          <Reveal.Item>
            <p className="max-w-xs text-sm text-bone/60">
              Arrastrá la card central, usá las flechas o tocá el play para reproducir
              en pantalla completa.
            </p>
          </Reveal.Item>
        </Reveal>

        <CardStack<VideoItem>
          items={ITEMS}
          cardWidth={size.w}
          cardHeight={size.h}
          maxVisible={5}
          overlap={0.5}
          spreadDeg={32}
          activeLiftPx={28}
          autoAdvance
          intervalMs={4500}
          pauseOnHover
          showDots
          renderCard={(item, { active }) => (
            <VideoCard item={item} active={active} onPlay={() => setOpenId(item.youtubeId)} />
          )}
          className="px-0"
        />
      </div>

      <AnimatePresence>
        {openId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-night/95 p-4 backdrop-blur-md"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOrganic }}
              onClick={(e) => e.stopPropagation()}
              className="border-gradient relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
            >
              <iframe
                src={`https://www.youtube.com/embed/${openId}?autoplay=1`}
                title="Casa Pérez · video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </motion.div>
            <button
              aria-label="Cerrar video"
              onClick={() => setOpenId(null)}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-bone/10 text-bone backdrop-blur transition-colors hover:bg-magenta hover:text-night"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoCard({
  item,
  active,
  onPlay,
}: {
  item: VideoItem;
  active: boolean;
  onPlay: () => void;
}) {
  return (
    <div className="relative h-full w-full bg-night">
      <img
        src={item.imageSrc}
        alt={item.title}
        draggable={false}
        loading="eager"
        className="h-full w-full object-cover saturate-95"
        onError={(e) => {
          const t = e.currentTarget;
          if (!t.dataset.fallback) {
            t.dataset.fallback = "1";
            t.src = `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`;
          }
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
        aria-label={`Reproducir ${item.title}`}
        className="group absolute inset-0 grid place-items-center"
      >
        <span
          className={`relative grid place-items-center rounded-full text-night transition-all duration-500 ease-organic ${
            active ? "h-16 w-16 scale-100 bg-magenta shadow-glow-magenta" : "h-12 w-12 scale-90 bg-bone/95 opacity-90"
          } group-hover:scale-110 group-hover:bg-lime`}
        >
          <Play className={`fill-current ${active ? "h-5 w-5" : "h-4 w-4"} translate-x-[1px]`} strokeWidth={0} />
          {active && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-magenta/60" />}
        </span>
      </button>

      <div className="pointer-events-none absolute inset-x-5 bottom-5 text-bone">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-magenta">Casa Pérez</p>
        <p className="mt-1 truncate font-display text-lg font-medium">{item.title}</p>
      </div>
    </div>
  );
}

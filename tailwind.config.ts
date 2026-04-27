import type { Config } from "tailwindcss";

/**
 * Sistema de diseño Casa Pérez — v3 "fiesta premium"
 *
 * Dark-first. Fondo near-black con hint azul (no warm), tipografía blanco off,
 * tres acentos vibrantes que sostienen el "ánimo de fiesta": magenta eléctrico
 * (CTA), lime ácido (highlights), violet (depth/gradients).
 * Cero terracota, cero pastel, cero naranja.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // — Superficies (dark-first)
        night: "#0A0A0F",       // base
        obsidian: "#13131A",    // surface 1
        graphite: "#1C1C26",    // surface 2
        smoke: "#2A2A36",       // surface 3 (cards)
        chrome: "#3A3A48",      // borders dark
        // — Off-whites (texto sobre dark)
        bone: "#F4F4F0",        // texto primario
        ash: "#A8A8B3",         // texto secundario
        dust: "#6E6E7A",        // texto terciario / muted
        // — Acentos fiesta
        magenta: {
          DEFAULT: "#FF2E6E",
          glow: "#FF5C8A",
          deep: "#C71F52",
        },
        lime: {
          DEFAULT: "#D4FF3D",
          glow: "#E5FF6E",
          deep: "#A8CC22",
        },
        violet: {
          DEFAULT: "#6B2FFF",
          glow: "#8E5BFF",
          deep: "#4A1FCC",
        },
        // — Glass tokens
        glass: {
          light: "rgba(244,244,240,0.06)",
          "light-strong": "rgba(244,244,240,0.12)",
          dark: "rgba(10,10,15,0.55)",
          "dark-strong": "rgba(10,10,15,0.78)",
          edge: "rgba(244,244,240,0.10)",
        },
        // — Aliases legacy (los componentes viejos siguen compilando)
        ivory: "#F4F4F0",
        ink: "#0A0A0F",
        charcoal: "#0A0A0F",     // alias → night
        linen: "#13131A",         // alias → obsidian (sección alterna ahora ES dark)
        sand: "#2A2A36",          // alias → smoke (border dark)
        terracotta: {             // alias → magenta (acento de marca)
          DEFAULT: "#FF2E6E",
          deep: "#C71F52",
        },
        ember: {                  // alias → magenta
          DEFAULT: "#FF2E6E",
          deep: "#C71F52",
          glow: "#FF5C8A",
        },
        gold: "#D4FF3D",          // alias → lime (donde antes era gold ahora es lime)
        olive: "#A8CC22",
        // — shadcn-compat
        foreground: "#F4F4F0",
        "muted-foreground": "rgba(244,244,240,0.55)",
        secondary: "#13131A",
      },
      fontFamily: {
        // Display: Bricolage Grotesque (variable, axes wdth/opsz/wght)
        display: ['var(--font-bricolage)', "system-ui", "sans-serif"],
        // Italic editorial: Instrument Serif (italics dramáticos, palabra "fiesta")
        editorial: ['var(--font-instrument)', "Georgia", "serif"],
        // UI/body: Geist (limpia, técnica)
        sans: ['var(--font-geist-sans)', "system-ui", "sans-serif"],
        // Mono detalles
        mono: ['var(--font-geist-mono)', "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-sm": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(3.5rem, 8vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(4.5rem, 11vw, 9rem)", { lineHeight: "0.88", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(5rem, 14vw, 12rem)", { lineHeight: "0.86", letterSpacing: "-0.05em" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
        editorial: "-0.025em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        micro: "0 1px 2px rgba(0,0,0,0.3), 0 1px 1px rgba(0,0,0,0.2)",
        soft: "0 4px 12px -2px rgba(0,0,0,0.35), 0 2px 6px -2px rgba(0,0,0,0.25)",
        float: "0 12px 32px -8px rgba(0,0,0,0.5), 0 6px 16px -6px rgba(0,0,0,0.3)",
        deep: "0 32px 64px -16px rgba(0,0,0,0.65), 0 16px 32px -12px rgba(0,0,0,0.45)",
        "glow-magenta": "0 0 0 1px rgba(255,46,110,0.3), 0 12px 32px -8px rgba(255,46,110,0.4)",
        "glow-lime": "0 0 0 1px rgba(212,255,61,0.35), 0 12px 32px -8px rgba(212,255,61,0.35)",
        "glow-violet": "0 0 0 1px rgba(107,47,255,0.35), 0 12px 32px -8px rgba(107,47,255,0.4)",
        ring: "inset 0 0 0 1px rgba(244,244,240,0.08)",
        "ring-strong": "inset 0 0 0 1px rgba(244,244,240,0.18)",
      },
      backdropBlur: { xs: "2px", xl2: "32px", xl3: "56px" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at var(--tw-gradient-from-position), var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 220deg at 50% 50%, var(--tw-gradient-stops))",
        "magenta-glow": "radial-gradient(60% 60% at 50% 0%, rgba(255,46,110,0.28) 0%, transparent 70%)",
        "lime-glow": "radial-gradient(60% 60% at 50% 100%, rgba(212,255,61,0.22) 0%, transparent 70%)",
        "violet-glow": "radial-gradient(50% 50% at 80% 50%, rgba(107,47,255,0.25) 0%, transparent 70%)",
        "fiesta-mesh":
          "radial-gradient(at 12% 18%, rgba(255,46,110,0.22) 0px, transparent 50%), radial-gradient(at 88% 12%, rgba(107,47,255,0.22) 0px, transparent 50%), radial-gradient(at 50% 92%, rgba(212,255,61,0.16) 0px, transparent 50%)",
        "ink-fade": "linear-gradient(180deg, transparent 0%, rgba(10,10,15,0.92) 100%)",
        "noise": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"180\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" stitchTiles=\"stitch\"/><feColorMatrix values=\"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/></svg>')",
      },
      transitionTimingFunction: {
        organic: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        crisp: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: { 250: "250ms", 450: "450ms", 600: "600ms", 900: "900ms" },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        "marquee-x": "marquee-x 40s linear infinite",
        "gradient-pan": "gradient-pan 14s ease infinite",
        "spin-slow": "spin 22s linear infinite",
      },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "marquee-x": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "gradient-pan": { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
      },
    },
  },
  plugins: [],
};

export default config;

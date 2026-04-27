import type { Config } from "tailwindcss";

/**
 * Sistema de diseño Casa Pérez — paleta original
 * Blanco #FFFFFF · Negro #1D1D1B · Mostaza #F6BD60
 * Tokens viejos (night/bone/magenta/lime/violet) remapeados a esta tríada
 * para que componentes existentes sigan compilando.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // — Tríada base
        ink: "#1D1D1B",
        paper: "#FFFFFF",
        mustard: {
          DEFAULT: "#F6BD60",
          glow: "#FFD089",
          deep: "#D9A040",
        },
        // — Superficies (mapeo legacy → nueva paleta)
        night: "#1D1D1B",       // dark sections
        obsidian: "#1D1D1B",    // dark alt
        graphite: "#2A2A28",    // dark surface 2
        smoke: "#F4F1EA",       // light card surface
        chrome: "#2A2A28",      // borders dark
        // — Texto
        bone: "#FFFFFF",        // texto blanco sobre dark
        ash: "#6B6B65",         // muted (funciona sobre paper)
        dust: "#9A9A93",        // muted suave
        // — Acentos: todo a mostaza
        magenta: {
          DEFAULT: "#F6BD60",
          glow: "#FFD089",
          deep: "#D9A040",
        },
        lime: {
          DEFAULT: "#F6BD60",
          glow: "#FFD089",
          deep: "#D9A040",
        },
        violet: {
          DEFAULT: "#1D1D1B",
          glow: "#2A2A28",
          deep: "#000000",
        },
        // — Glass tokens
        glass: {
          light: "rgba(29,29,27,0.06)",
          "light-strong": "rgba(29,29,27,0.12)",
          dark: "rgba(29,29,27,0.55)",
          "dark-strong": "rgba(29,29,27,0.78)",
          edge: "rgba(29,29,27,0.10)",
        },
        // — Aliases legacy
        ivory: "#FFFFFF",
        charcoal: "#1D1D1B",
        linen: "#FFFFFF",          // sección alterna ahora light
        sand: "#E5E0D5",           // border light
        terracotta: { DEFAULT: "#F6BD60", deep: "#D9A040" },
        ember: { DEFAULT: "#F6BD60", deep: "#D9A040", glow: "#FFD089" },
        gold: "#F6BD60",
        olive: "#D9A040",
        // — shadcn-compat
        foreground: "#1D1D1B",
        "muted-foreground": "rgba(29,29,27,0.6)",
        secondary: "#F6BD60",
      },
      fontFamily: {
        display: ['var(--font-bricolage)', "system-ui", "sans-serif"],
        editorial: ['var(--font-instrument)', "Georgia", "serif"],
        sans: ['var(--font-geist-sans)', "system-ui", "sans-serif"],
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
        micro: "0 1px 2px rgba(29,29,27,0.08), 0 1px 1px rgba(29,29,27,0.05)",
        soft: "0 4px 12px -2px rgba(29,29,27,0.10), 0 2px 6px -2px rgba(29,29,27,0.06)",
        float: "0 12px 32px -8px rgba(29,29,27,0.18), 0 6px 16px -6px rgba(29,29,27,0.10)",
        deep: "0 32px 64px -16px rgba(29,29,27,0.22), 0 16px 32px -12px rgba(29,29,27,0.14)",
        "glow-magenta": "0 0 0 1px rgba(246,189,96,0.5), 0 12px 32px -8px rgba(246,189,96,0.45)",
        "glow-lime": "0 0 0 1px rgba(246,189,96,0.5), 0 12px 32px -8px rgba(246,189,96,0.45)",
        "glow-violet": "0 0 0 1px rgba(29,29,27,0.25), 0 12px 32px -8px rgba(29,29,27,0.30)",
        ring: "inset 0 0 0 1px rgba(29,29,27,0.10)",
        "ring-strong": "inset 0 0 0 1px rgba(29,29,27,0.20)",
      },
      backdropBlur: { xs: "2px", xl2: "32px", xl3: "56px" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at var(--tw-gradient-from-position), var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 220deg at 50% 50%, var(--tw-gradient-stops))",
        "magenta-glow": "radial-gradient(60% 60% at 50% 0%, rgba(246,189,96,0.32) 0%, transparent 70%)",
        "lime-glow": "radial-gradient(60% 60% at 50% 100%, rgba(246,189,96,0.28) 0%, transparent 70%)",
        "violet-glow": "radial-gradient(50% 50% at 80% 50%, rgba(29,29,27,0.10) 0%, transparent 70%)",
        "fiesta-mesh":
          "radial-gradient(at 12% 18%, rgba(246,189,96,0.30) 0px, transparent 50%), radial-gradient(at 88% 12%, rgba(246,189,96,0.20) 0px, transparent 50%), radial-gradient(at 50% 92%, rgba(29,29,27,0.06) 0px, transparent 50%)",
        "ink-fade": "linear-gradient(180deg, transparent 0%, rgba(29,29,27,0.92) 100%)",
        "noise": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"180\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" stitchTiles=\"stitch\"/><feColorMatrix values=\"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/></svg>')",
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

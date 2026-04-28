Proyecto: Casa Pérez (Casa Pérez Multiespacio) — Visión general

Resumen ejecutivo
- Stack principal: Next.js (App Router), Tailwind CSS, Framer Motion; UI modular con componentes en TypeScript.
- Estructura de código: directorios app/ (Next.js), components/ (UI y secciones), lib/ (contenido), public/ (assets), y app/globals.css para estilos base.
- Script de ejecución: npm run dev (Next.js dev), npm run build, npm run start, npm run lint están definidos en package.json.
- Observaciones iniciales: proyecto con una base sólida de diseño y animaciones; no se detectan tests configurados actualmente.

Eje técnico
- Lenguajes/Plataforma: TypeScript, React (versión indicada en package.json), Next.js 15, Tailwind CSS 3.x, Framer Motion.
- Estructura de archivos clave:
  - app/: layout.tsx, page.tsx, globals.css
  - components/: ui/, sections/
  - lib/: contenido centralizado (BRAND, CONTACT, HERO_IMAGES, PILARES, ESPACIOS, SERVICIOS, TESTIMONIOS, VIDEOS, etc.)
  - public/: assets (galería de imágenes, logos)
- Configs relevantes:
  - tailwind.config.ts con rutas de contenido a app/ y components/
  - next.config.mjs con configuración de imágenes remotas (images.unsplash.com)
  - postcss.config.js para Tailwind y autoprefixer
- Infraestructura de assets: imágenes en public/gallery; archivos de branding en lib/content.ts.
- Riegos/Notas: La versión React en package.json muestra React 19, lo cual podría no ser estable. Verificar compatibilidad con Next.js 15.

Estructura y componentes (alto nivel)
- App Router: layout.tsx gestiona tipografías y envoltorio global; page.tsx es la página de inicio que orquesta secciones.
- Secciones principales: CinematicHero, PropuestaValor, Espacios, GaleriaBento, Servicios, Catering, Videos, Testimonios, MarqueeStrip, Contacto, Footer.
- UI base: Nav, Reveal, SmoothScrollProvider, WhatsappFab, Button/CTA, etc.
- Contenido centralizado: lib/content.ts expone BRAND, CONTACT, HERO_IMAGES, PILARES, ESPACIOS, SERVICIOS, TESTIMONIOS, VIDEOS, BARRA_OPCIONES, etc.
- Estilos: globals.css define tokens de color, tipografías y utilidades Tailwind; usa font-face vía Google Fonts en layout.tsx.

Estado actual y hallazgos rápidos
- Presentes scripts de desarrollo/build en package.json; Next.js 15 utilizado.
- No se detectan tests configurados en el repo (sin jest/vitest). Considerar implementación de tests para componentes y flujos críticos.
- Propuesta de mejora: añadir un README de desarrollo con instrucciones claras, scripts de verificación de dependencias y un overview viviente (ver plan abajo).

Riesgos y deuda técnica (preliminares)
- Dependencias: React versión en package.json podría no ser estable (ver nota anterior).
- Ausencia de pruebas formales: flujo de CI/CD podría beneficiarse de tests unitarios/integración y checks de lint/tsconfig.
- Compatibilidad de SVG/animaciones: Framer Motion y Tailwind son potentes, pero conviene validar en dispositivos límite (mobile, rendimiento).

Plan de acción recomendado (próximos pasos)

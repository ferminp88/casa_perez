# Casa Pérez Multiespacio — Propuesta de sitio

Una experiencia digital de nivel premium pensada para posicionar a Casa Pérez como **el** salón de eventos de City Bell, no uno más en una grilla de Google.

---

## La idea central

El sitio anterior cumplía una función básica: contar qué hace la casa. **El nuevo sitio vende una sensación**: el ánimo de fiesta, la calidez del equipo, la confianza de tres décadas. Mientras alguien lo recorre, ya está imaginándose su evento adentro.

---

## Diferenciales clave

### 1. Identidad visual única en el rubro
Mientras la competencia usa fondos beige y serifs clásicas, Casa Pérez ahora va con un sistema **dark-first** y tres acentos vibrantes — magenta, lima ácido, violeta — que transmiten **energía joven y festiva** sin perder elegancia. Tipografía moderna (Bricolage Grotesque) combinada con itálicas editoriales para los momentos "wow". El resultado se siente más cerca de Spotify Wrapped o una marca de moda que de un folleto de eventos.

### 2. Cinematic Hero
La primera pantalla es un **hero estilo cine**: fotos reales del archivo en ken-burns lento, letterbox negro, parallax con el mouse, timecode lateral, título editorial con la palabra "Festejá" en itálica resaltada en magenta. Convierte el primer scroll en un trailer.

### 3. Salones como experiencia inmersiva
Cada uno de los tres salones (Centenario, Casona, 467) tiene **su propia experiencia de scroll**: la foto principal arranca enmarcada, se expande hasta cubrir toda la pantalla, y aparecen flotando 5 fotos más desde los costados con parallax. Después emergen los datos clave (superficie, capacidad, aire libre) sobre la foto. **No es una grilla de cards** — es una visita virtual narrada.

### 4. "El salón / La fiesta"
Comparador deslizable en el medio de la sección de salones: arrastrás y ves el mismo espacio antes y durante un festejo. Comunica el diferencial central de Casa Pérez (no es solo el lugar, es lo que pasa adentro) en 5 segundos sin texto.

### 5. Catering con menús reales
**24 fotos reales** de los platos + transcripción literal de las 3 opciones de menú y las 2 barras (clásica y premium), en un layout tipo carta editorial. El cliente puede leer exactamente qué incluye cada opción sin pedir un PDF — reduce fricción comercial y consultas repetitivas.

### 6. Galería "Wall of Memories"
Tres filas de fotos en movimiento permanente con direcciones alternas — evoca un feed vivo de Instagram, no un portfolio curado. Click sobre cualquier foto para verla en grande. **Fija el mensaje: "+400 festejos" no es un número, es un archivo.**

### 7. Videos con CardStack
Los 12 videos del canal en una pila tridimensional arrastrable, con flechas para pasar y player embebido. La fiesta se ve sin salir del sitio.

### 8. Testimonios en 3 columnas
Doce testimonios reales en columnas que scrollean automáticamente a velocidades distintas — patrón de Linear/Stripe que comunica volumen de social proof sin requerir scroll del usuario.

### 9. Microinteracciones en todo el sitio
- **Cursor magenta personalizado** que se transforma sobre links/botones
- **Botones magnéticos** que siguen al cursor con halos de gradiente
- **Reveals scroll-driven** letra por letra con efecto blur
- **Border gradient animado** en cards al hover
- Smooth scroll con Lenis

### 10. Optimización mobile real
La versión mobile no es la desktop apretada — es un layout específico, liviano, que pesa menos y carga rápido. Cada salón colapsa a un formato vertical scrolleable, los comparadores funcionan con touch, las imágenes están escaladas para pantallas chicas. **Más del 60% del tráfico de un salón viene de Instagram → mobile. El sitio está construido para esa puerta de entrada.**

---

## Stack técnico (por qué importa)

- **Next.js 15 + React 19** — El framework que usan Vercel, Notion, TikTok. Render rápido, SEO sólido, deploy en Vercel CDN global.
- **Tailwind CSS** — Sistema de diseño consistente, sin "drift" visual entre secciones.
- **Framer Motion 11** — Animaciones de calidad producto, no plantilla.
- **Tipografía variable** servida desde Google Fonts con autoloading optimizado.
- **Imágenes scrapeadas del sitio actual** — la transición es 100% fiel al material que ya existe.
- **Deploy en Vercel** — HTTPS, CDN, redeploy automático con cada push, edge-cached. El sitio carga igual de rápido en Buenos Aires, Córdoba o Madrid.

---

## Lo que el cliente recibe

- **Sitio público completo** con todas las secciones del original (salones, servicios, catering, videos, contacto) reimaginadas
- **Galería de 100+ fotos reales** ya integradas y optimizadas
- **Menús completos** del catering y barra como contenido editable (un archivo, no 8 secciones)
- **Mobile-first**: andar fluido en cualquier celular moderno
- **WhatsApp directo** con mensaje pre-armado en cada CTA
- **Repositorio Git** + deploy automático: cualquier cambio futuro se publica en 90 segundos
- **Performance optimizada**: el sitio es liviano, no pesa megas innecesarios

---

## Posicionamiento

Esta no es una página web. Es **una pieza de marca**. Cuando un cliente potencial compare Casa Pérez con tres salones más, va a recordar este sitio — y eso, en un mercado donde la mayoría de los salones tiene web genérica, es el diferencial que justifica el rango de precio premium.

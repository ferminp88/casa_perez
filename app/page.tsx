import { Nav } from "@/components/ui/Nav";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { PropuestaValor } from "@/components/sections/PropuestaValor";
import { MarqueeStripBrand } from "@/components/sections/MarqueeStrip";
import { Espacios } from "@/components/sections/Espacios";
import { GaleriaBento } from "@/components/sections/GaleriaBento";
import { Servicios } from "@/components/sections/Servicios";
import { CateringPreview } from "@/components/sections/CateringPreview";
import { Videos } from "@/components/sections/Videos";
import { Testimonios } from "@/components/sections/Testimonios";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/ui/Footer";

// Orden:
//  CinematicHero → PropuestaValor → Espacios (incluye ImageComparison)
//  → GaleriaBento → Videos (bajo galería) → Servicios → Catering → Testimonios
//  → MarqueeStripBrand → Contacto → Footer
export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <CinematicHero />
      <Espacios />
      <Videos />
      <GaleriaBento />
      <Servicios />
      <CateringPreview />
      <PropuestaValor />
      <Testimonios />
      <MarqueeStripBrand />
      <Contacto />
      <Footer />
    </main>
  );
}

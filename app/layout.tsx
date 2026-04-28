import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { WhatsappFab } from "@/components/ui/WhatsappFab";
import { Preloader } from "@/components/ui/Preloader";

// Display variable (axes wdth/opsz). Reemplaza Fraunces — más moderna, joven, con personalidad.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["wdth", "opsz"],
});

// Italic editorial puntual: solo para palabras "fiesta", acentos.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Casa Pérez Multiespacio · Eventos en City Bell, La Plata",
  description:
    "Tres espacios para festejar lo que quieras: cumpleaños, bodas, infantiles, corporativos. Catering, DJ y servicio integral en City Bell.",
  metadataBase: new URL("https://casaperez.com.ar"),
  icons: { icon: "/brand/favicon.png" },
  openGraph: {
    title: "Casa Pérez Multiespacio",
    description: "Eventos descontracturados con servicio integral. La Plata.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${instrument.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Preloader />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <WhatsappFab />
      </body>
    </html>
  );
}

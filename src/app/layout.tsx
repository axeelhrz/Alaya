import type { Metadata, Viewport } from "next";
import { Archivo_Narrow, Bebas_Neue, Libre_Baskerville } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const archivo = Archivo_Narrow({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://alayadivision.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alaya Division",
    template: "%s · Alaya Division",
  },
  description:
    "Alaya Division — tienda de tablas y casa de shapers. Built on Connection. Pide cita para crear o elegir tu tabla.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Alaya Division",
    title: "Alaya Division",
    description:
      "Tienda de tablas · cinco shapers · cita en fábrica u online. No un carrito frío.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${bebas.variable} ${libre.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-alaya-white text-alaya-black">
        <AnnouncementBar />
        <Header />
        <main className="w-full min-w-0 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

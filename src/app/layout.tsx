import type { Metadata, Viewport } from "next";
import { Archivo_Narrow, Bebas_Neue, Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://alayadivision.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
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
      "Tienda de tablas · cinco shapers · cita en fábrica u online.",
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
      className={`${geist.variable} ${archivo.variable} ${bebas.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col overflow-x-clip bg-alaya-white text-alaya-black">
        <Providers>
          <Header />
          <main className="w-full min-w-0 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

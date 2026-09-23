import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { New_Rocker, Roboto } from "next/font/google";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import { defaultLocale, isLocale, LOCALE_STORAGE_KEY } from "@/lib/i18n";
import "./globals.css";

const gottak = localFont({
  src: "../fonts/Gottak-SemiBold.woff2",
  variable: "--font-gottak",
  weight: "600",
  display: "swap",
});

const myriad = localFont({
  src: [
    { path: "../fonts/MyriadPro-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/MyriadPro-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/MyriadPro-Semibold.otf", weight: "600", style: "normal" },
    { path: "../fonts/MyriadPro-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-myriad",
  display: "swap",
});

const trebuchet = localFont({
  src: [
    { path: "../fonts/TrebuchetMS.ttf", weight: "400", style: "normal" },
    { path: "../fonts/TrebuchetMS-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-trebuchet",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});

const member = New_Rocker({
  variable: "--font-member",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await cookies()).get(LOCALE_STORAGE_KEY)?.value ?? null;
  const initialLocale = isLocale(cookie) ? cookie : defaultLocale;

  return (
    <html
      lang={initialLocale}
      className={`${gottak.variable} ${myriad.variable} ${trebuchet.variable} ${roboto.variable} ${member.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col overflow-x-clip bg-alaya-white text-alaya-black">
        <Providers initialLocale={initialLocale}>
          <Header />
          <main className="w-full min-w-0 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

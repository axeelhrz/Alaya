import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Alaya Division",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-8 sm:py-24">
      <p className="page-kicker">Company</p>
      <h1 className="mt-4 text-4xl font-light uppercase tracking-[0.16em] sm:text-6xl">
        About Alaya
      </h1>
      <p className="mt-8 text-sm leading-relaxed text-alaya-muted">
        Alaya Division es una tienda de tablas y una casa de shapers. El centro
        es la tabla: catálogo, custom y cita en fábrica u online. Apparel y
        accesorios llegan como coming soon, con lista de espera.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/surf/boards" className="btn-ghost">
          Boards
        </Link>
        <Link href="/pide-cita" className="btn-pill">
          Pide cita
        </Link>
      </div>
    </div>
  );
}

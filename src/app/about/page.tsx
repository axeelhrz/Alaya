import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { differentiators } from "../../../content/differentiators";

export const metadata: Metadata = {
  title: "About Alaya Division",
  description:
    "Alaya Division — tienda de tablas y casa de shapers. Built on Connection.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative min-h-[50vh] overflow-hidden bg-alaya-black">
        <Image
          src="/images/home/cita.jpg"
          alt="About Alaya Division"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl items-end px-4 pb-12 md:px-6">
          <SectionHeading
            light
            label="Company"
            title="About"
            titleDisplay="Alaya"
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-serif text-2xl leading-relaxed text-alaya-black md:text-3xl">
          Alaya Division es una tienda de tablas y una casa de shapers:
          conexión real entre rider, fábrica y ola.
        </p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-alaya-muted">
          <p>
            No competimos como un marketplace anónimo. Competimos como el lugar
            donde eliges shaper, entiendes el proceso y empiezas con una cita —
            presencial u online — antes de cerrar la tabla.
          </p>
          <p>
            Promodels, custom y, en fases posteriores, apparel. El centro
            siempre es la tabla. Built on Connection es el método: conversación,
            craft y comunidad.
          </p>
        </div>
      </section>

      <section className="border-y border-alaya-border bg-alaya-surface">
        <div className="mx-auto grid max-w-7xl gap-1 md:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <div key={item.code} className="bg-alaya-white p-8">
              <p className="font-display text-2xl text-alaya-muted">{item.code}</p>
              <h2 className="mt-3 font-display text-2xl uppercase tracking-wide">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-alaya-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-3xl flex-wrap gap-3 px-4 py-16 md:px-6">
        <Button href="/surf/encuentra-tu-tabla" variant="outline">
          Encuentra tu tabla
        </Button>
        <Button href="/pide-cita" variant="primary">
          Pide Cita
        </Button>
      </section>
    </div>
  );
}

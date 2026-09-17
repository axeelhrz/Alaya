import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "New",
  description: "Novedades, lanzamientos y próximos proyectos de Alaya Division.",
};

const items = [
  {
    tag: "Lanzamiento",
    title: "Web Fase 1 — 25 septiembre",
    text: "Presentamos la primera versión del universo Alaya: marca, surf, shapers y Pide Cita.",
    image: "/images/home/new.jpg",
  },
  {
    tag: "Surf",
    title: "Catálogo de boards y shapers",
    text: "Explora modelos y conoce a Patterson, Arakawa, Mark Phipps, Roberds y Dylan.",
    image: "/images/home/surf.jpg",
  },
  {
    tag: "Próximamente",
    title: "Apparel lookbook",
    text: "La línea textil llega como Coming Soon con foco visual. Tienda online en fases posteriores.",
    image: "/images/home/apparel.jpg",
  },
];

export default function NewPage() {
  return (
    <div>
      <section className="border-b border-alaya-border bg-alaya-black px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            light
            label="New"
            title="What's"
            titleDisplay="Next"
            description="Novedades, lanzamientos y próximos proyectos del universo Alaya."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-1 px-4 py-16 md:px-6">
        {items.map((item, i) => (
          <article
            key={item.title}
            className={`grid gap-0 overflow-hidden md:grid-cols-2 ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative min-h-[280px] md:min-h-[420px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center bg-alaya-surface p-8 md:p-12">
              <p className="section-label">{item.tag}</p>
              <h2 className="mt-3 font-display text-4xl uppercase tracking-wide md:text-5xl">
                {item.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-alaya-muted md:text-base">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-alaya-border px-4 py-16 md:px-6">
        <div className="mx-auto max-w-xl">
          <p className="section-label mb-3">Newsletter</p>
          <h2 className="font-display text-3xl uppercase tracking-wide">
            No te pierdas el drop
          </h2>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}

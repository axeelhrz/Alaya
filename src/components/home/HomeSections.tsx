import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Differentiators } from "@/components/home/Differentiators";
import { AlayaProcess } from "@/components/home/AlayaProcess";
import { BoardMatch } from "@/components/surf/BoardMatch";
import { shapers } from "../../../content/shapers";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const universe = [
  {
    href: "/surf/boards",
    label: "Boards",
    title: "Catálogo",
    image: "/images/home/surf.jpg",
  },
  {
    href: "/surf/shapers",
    label: "Shapers",
    title: "Cinco líneas",
    image: "/images/surf/shapers.jpg",
  },
  {
    href: "/apparel",
    label: "Apparel",
    title: "Coming Soon",
    image: "/images/home/apparel.jpg",
  },
];

export function HomeSections() {
  return (
    <>
      <Differentiators />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-20 md:px-6 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="Match Alaya"
              title="Encuentra"
              titleDisplay="Tu tabla"
              description="Tres preguntas. Una recomendación de modelo + shaper. Luego cita en fábrica u online — la ventaja real frente a comprarla a ciegas."
            />
            <Button
              href="/surf/encuentra-tu-tabla"
              variant="outline"
              className="w-full shrink-0 sm:w-auto"
            >
              Abrir herramienta
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-8 sm:mt-12">
          <BoardMatch />
        </Reveal>
      </section>

      <AlayaProcess light />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-20 md:px-6 md:py-28">
        <Reveal>
          <SectionHeading
            label="Tienda"
            title="Alaya"
            titleDisplay="Surf"
            description="Promodels, custom y apparel en camino. El centro es la tabla — el resto del universo la acompaña."
          />
        </Reveal>
        <div className="mt-8 grid gap-1 sm:mt-12 sm:grid-cols-2 md:grid-cols-3">
          {universe.map((item, i) => (
            <Reveal
              key={item.href}
              delay={i * 100}
              className={i === 2 ? "sm:col-span-2 md:col-span-1" : ""}
            >
              <Link
                href={item.href}
                className="group relative block aspect-[3/4] overflow-hidden bg-alaya-surface"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="img-zoom object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="section-label text-white/70">{item.label}</p>
                  <p className="mt-2 font-display text-3xl uppercase tracking-wide md:text-4xl">
                    {item.title}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-alaya-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20 md:px-6 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                label="Roster"
                title="Five"
                titleDisplay="Shapers"
                description="Patterson, Arakawa, Mark Phipps, Roberds y Dylan. Una casa, cinco firmas — eso no lo tiene una tienda genérica."
              />
              <Button
                href="/surf/shapers"
                variant="outline"
                className="w-full shrink-0 sm:w-auto"
              >
                Ver shapers
              </Button>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-1 sm:mt-12 lg:grid-cols-5">
            {shapers.map((shaper, i) => (
              <Reveal
                key={shaper.slug}
                delay={i * 80}
                className={i === 4 ? "col-span-2 lg:col-span-1" : ""}
              >
                <Link
                  href={`/surf/shapers/${shaper.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-alaya-black"
                >
                  <Image
                    src={shaper.image}
                    alt={shaper.name}
                    fill
                    className="img-zoom object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="font-display text-2xl uppercase tracking-wide">
                      {shaper.name}
                    </p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-white/70">
                      {shaper.role}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-alaya-black text-white">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/home/cita.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <Reveal className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-20 sm:gap-8 sm:py-28 md:px-6 md:py-36">
          <SectionHeading
            light
            label="Fábrica + Online"
            title="Start"
            titleDisplay="Your Board"
            description="Presencial en fábrica u online con el shaper. Sin registro. El primer contacto serio para comprar o customizar tu tabla."
          />
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button href="/pide-cita" variant="secondary" className="w-full sm:w-auto">
              Solicitar cita
            </Button>
            <Button
              href="/surf/encuentra-tu-tabla"
              variant="primary"
              className="w-full !border-white !bg-transparent !text-white hover:!bg-white hover:!text-alaya-black sm:w-auto"
            >
              Match de tabla
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:gap-12 sm:py-20 md:grid-cols-2 md:px-6 md:py-28">
        <Reveal variant="left">
          <SectionHeading
            label="Editorial"
            title="Built on"
            titleDisplay="Connection"
            description="Cultura, procesos y comunidad — el contenido que sostiene la tienda y el posicionamiento de Alaya."
          />
          <Button
            href="/built-on-connection"
            variant="outline"
            className="mt-8 w-full sm:w-auto"
          >
            Leer más
          </Button>
        </Reveal>
        <Reveal delay={120} variant="scale">
          <div className="border border-alaya-border p-6 sm:p-8 md:p-10">
            <p className="section-label mb-4">Newsletter</p>
            <h3 className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
              Drops & shapes
            </h3>
            <p className="mt-3 mb-6 text-sm text-alaya-muted">
              Nuevos modelos, citas de fábrica y cultura Alaya.
            </p>
            <NewsletterForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}

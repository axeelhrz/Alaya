import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AlayaProcess } from "@/components/home/AlayaProcess";

export const metadata: Metadata = {
  title: "Surf",
  description:
    "Tienda de tablas Alaya: catálogo, shapers, match de tabla y cita en fábrica u online.",
};

const links = [
  {
    href: "/surf/boards",
    label: "Boards",
    title: "Catálogo",
    image: "/images/surf/boards.jpg",
  },
  {
    href: "/surf/shapers",
    label: "Shapers",
    title: "Promodels",
    image: "/images/surf/shapers.jpg",
  },
  {
    href: "/surf/encuentra-tu-tabla",
    label: "Match",
    title: "Tu tabla",
    image: "/images/surf/cita.jpg",
  },
];

export default function SurfPage() {
  return (
    <div>
      <section className="relative flex min-h-[50svh] items-end overflow-hidden bg-alaya-black sm:min-h-[55vh]">
        <Image
          src="/images/surf/hub.jpg"
          alt="Surf Alaya Division"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 md:px-6 md:py-20">
          <SectionHeading
            light
            label="Tienda de tablas"
            title="From blank"
            titleDisplay="to wave"
            description="Catálogo, cinco shapers y el proceso Alaya: cita primero, tabla después."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:px-6 md:py-24">
        <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3">
          {links.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative aspect-[3/4] overflow-hidden bg-alaya-surface ${
                i === 2 ? "sm:col-span-2 md:col-span-1" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="img-zoom object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <p className="section-label text-white/70">{item.label}</p>
                <p className="mt-2 font-display text-3xl uppercase tracking-wide sm:text-4xl">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button
            href="/surf/encuentra-tu-tabla"
            variant="outline"
            className="w-full sm:w-auto"
          >
            Encuentra tu tabla
          </Button>
          <Button href="/pide-cita" variant="primary" className="w-full sm:w-auto">
            Pide Cita
          </Button>
        </div>
      </section>

      <AlayaProcess light />
    </div>
  );
}

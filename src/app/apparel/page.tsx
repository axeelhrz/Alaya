import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Apparel",
  description: "Línea textil Alaya Division — Coming Soon. Lookbook visual.",
};

const lookbook = [
  "/images/lookbook/01.jpg",
  "/images/lookbook/02.jpg",
  "/images/lookbook/03.jpg",
  "/images/lookbook/04.jpg",
  "/images/lookbook/05.jpg",
  "/images/lookbook/06.jpg",
];

export default function ApparelPage() {
  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden bg-alaya-black">
        <Image
          src="/images/apparel/hero.jpg"
          alt="Apparel Alaya — Coming Soon"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center text-white md:px-6">
          <p className="section-label text-white/80">Apparel</p>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl">
            <span className="font-serif">Coming </span>
            <span className="font-display uppercase">Soon</span>
          </h1>
          <p className="mt-6 max-w-md text-sm text-white/85 md:text-base">
            Presentación visual de la línea textil. Tienda online en fases
            posteriores.
          </p>
          <Button href="/new" variant="secondary" className="mt-10">
            Ver novedades
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeading
          label="Lookbook"
          title="Visual"
          titleDisplay="First"
          description="Una primera lectura de atmósfera, materiales y actitud Alaya."
        />
        <div className="mt-12 grid grid-cols-2 gap-1 md:grid-cols-3">
          {lookbook.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden bg-alaya-surface ${
                i === 0 || i === 5 ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={`Lookbook Alaya ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

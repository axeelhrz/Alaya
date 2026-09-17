import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getShaper, shapers } from "../../../../../content/shapers";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return shapers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const shaper = getShaper(slug);
  if (!shaper) return { title: "Shaper" };
  return {
    title: shaper.name,
    description: shaper.bio,
  };
}

export default async function ShaperDetailPage({ params }: Props) {
  const { slug } = await params;
  const shaper = getShaper(slug);
  if (!shaper) notFound();

  return (
    <div>
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[50vh] md:min-h-[80vh]">
          <Image
            src={shaper.image}
            alt={shaper.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center bg-alaya-black px-4 py-12 text-white sm:px-6 sm:py-16 md:px-12 lg:px-16">
          <p className="section-label text-white/60">
            {shaper.role} · {shaper.location}
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-wide sm:text-5xl md:text-7xl">
            {shaper.name}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
            {shaper.bio}
          </p>
          <Button
            href={`/pide-cita?shaper=${shaper.slug}`}
            variant="secondary"
            className="mt-8 w-full sm:mt-10 sm:w-fit"
          >
            Pedir cita con {shaper.name}
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:px-6 md:py-24">
        <p className="section-label mb-3">Promodels</p>
        <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl">
          Signature line
        </h2>
        <div className="mt-8 grid gap-1 sm:mt-10 md:grid-cols-2">
          {shaper.promodels.map((model) => (
            <div
              key={model.name}
              className="border border-alaya-border p-6 sm:p-8 md:p-10"
            >
              <h3 className="font-display text-3xl uppercase tracking-wide">
                {model.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-alaya-muted">
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

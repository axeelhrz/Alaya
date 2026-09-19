import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShaper, shapers } from "../../../../../content/shapers";
import { boards } from "../../../../../content/boards";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return shapers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const shaper = getShaper(slug);
  if (!shaper) return { title: "Shaper" };
  return { title: shaper.name, description: shaper.bio };
}

export default async function ShaperDetailPage({ params }: Props) {
  const { slug } = await params;
  const shaper = getShaper(slug);
  if (!shaper) notFound();
  const related = boards.filter((b) => b.shaper === shaper.name).slice(0, 4);

  return (
    <article className="lg:flex">
      <div className="relative -mt-14 h-[100svh] bg-alaya-black sm:-mt-16 lg:mt-0 lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)] lg:w-[46%]">
        <Image
          src={shaper.image}
          alt={shaper.name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 46vw"
        />
      </div>
      <div className="lg:w-[54%]">
        <div className="mx-auto max-w-xl px-5 py-12 sm:px-10 sm:py-16">
          <p className="page-kicker">
            {shaper.role} · {shaper.location}
          </p>
          <h1 className="mt-4 text-4xl font-light uppercase tracking-[0.14em] sm:text-5xl">
            {shaper.name}
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-alaya-muted">
            {shaper.bio}
          </p>
          <Link
            href={`/pide-cita?shaper=${shaper.slug}`}
            className="btn-pill mt-8 inline-flex"
          >
            Pedir cita
          </Link>

          <section className="mt-14">
            <p className="page-kicker">Promodels</p>
            <ul className="mt-5 space-y-5">
              {shaper.promodels.map((model) => (
                <li key={model.name}>
                  <h2 className="text-lg uppercase tracking-[0.12em]">{model.name}</h2>
                  <p className="mt-1 text-sm text-alaya-muted">{model.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {related.length ? (
            <section className="mt-14">
              <p className="page-kicker">Tablas</p>
              <div className="mt-5 flex flex-wrap gap-4">
                {related.map((board) => (
                  <Link
                    key={board.slug}
                    href={`/surf/boards/${board.slug}`}
                    className="text-[0.7rem] uppercase tracking-[0.14em] underline-offset-4 hover:underline"
                  >
                    {board.name}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}

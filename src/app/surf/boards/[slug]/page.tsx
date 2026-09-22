import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  boardCitaHref,
  boards,
  getBoard,
  getRelatedBoards,
} from "../../../../../content/boards";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BoardPhoto } from "@/components/surf/BoardPhoto";
import { BoardSilhouette } from "@/components/surf/BoardSilhouette";
import { BoardSpecs } from "@/components/surf/BoardSpecs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return boards.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const board = getBoard(slug);
  if (!board) return { title: "Board" };
  return { title: board.name, description: board.description };
}

export default async function BoardPage({ params }: Props) {
  const { slug } = await params;
  const board = getBoard(slug);
  if (!board) notFound();
  const related = getRelatedBoards(slug);

  return (
    <div className="lg:flex">
      <div className="relative flex min-h-[70vh] items-center justify-center bg-alaya-white lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)] lg:w-[48%]">
        <BoardPhoto
          src={board.image}
          alt={board.name}
          className="h-[68vh] w-[min(96%,560px)] lg:h-[82vh]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="lg:w-[52%]">
        <div className="mx-auto max-w-lg px-5 py-12 sm:px-10 sm:py-16">
          <Breadcrumb
            items={[
              { href: "/surf/boards", label: "Boards" },
              { href: `/surf/boards?cat=${board.categorySlug}`, label: board.category },
              { label: board.name },
            ]}
          />
          <h1 className="mt-8 text-3xl font-light uppercase tracking-[0.14em] sm:text-4xl">
            {board.name}
          </h1>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-alaya-muted">
            {board.shaper} · {board.dimensions}
            {board.volume ? ` · ${board.volume}` : ""}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-alaya-muted">
            {board.description}
          </p>
          <BoardSpecs board={board} />
          <Link href={boardCitaHref(board)} className="btn-pill mt-10 inline-flex">
            Pide cita
          </Link>

          <section className="mt-16">
            <p className="page-kicker">Artículos relacionados</p>
            <div className="mt-6 grid grid-cols-2 gap-5">
              {related.map((item) => (
                <Link key={item.slug} href={`/surf/boards/${item.slug}`} className="text-center">
                  <div className="relative flex aspect-square items-center justify-center bg-alaya-white">
                    {item.image.includes("/roberts/") ? (
                      <BoardPhoto
                        src={item.image}
                        alt={item.name}
                        className="h-[78%] w-[78%]"
                        sizes="160px"
                      />
                    ) : (
                      <BoardSilhouette className="h-24 w-auto text-alaya-black/70" />
                    )}
                  </div>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.14em]">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

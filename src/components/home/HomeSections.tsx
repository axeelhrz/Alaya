"use client";

import Image from "next/image";
import Link from "next/link";
import { boards } from "../../../content/boards";
import { useLocale } from "@/components/i18n/LocaleContext";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";
import { BoardPhoto } from "@/components/surf/BoardPhoto";

export function HomeSections() {
  const { open } = useSubscribe();
  const { t } = useLocale();
  const featured = boards.filter((board) => board.shaper === "Roberts").slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10">
          {featured.map((board) => (
            <Link
              key={board.slug}
              href={`/surf/boards/${board.slug}`}
              className="group text-center"
            >
              <BoardPhoto
                src={board.image}
                alt={board.name}
                className="h-52 transition duration-500 group-hover:scale-[1.03] sm:h-60"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.16em]">
                {board.name}
              </p>
              <p className="mt-1 text-[0.65rem] text-alaya-muted">
                {board.shaper}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative min-h-[56vh] overflow-hidden bg-alaya-black text-white">
        <Image
          src="/images/home/cita.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex min-h-[56vh] max-w-[1400px] flex-col items-center justify-center px-4 py-20 text-center">
          <h2 className="text-3xl font-light uppercase tracking-[0.18em] sm:text-5xl">
            {t.home.bookShaper}
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/80">
            {t.home.bookShaperText}
          </p>
          <Link href="/pide-cita" className="btn-ghost mt-8 text-white">
            {t.home.bookNow}
          </Link>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] bg-alaya-surface lg:min-h-[640px]">
          <Image
            src="/images/home/apparel.jpg"
            alt="Colección textil Alaya"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
          <p className="page-kicker">{t.home.apparelKicker}</p>
          <h2 className="mt-4 text-3xl font-light uppercase tracking-[0.16em] sm:text-5xl">
            {t.home.nextUp}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-alaya-muted">
            {t.home.apparelBody}
          </p>
          <button
            type="button"
            className="btn-ghost mt-8 w-fit"
            onClick={() => open("apparel")}
          >
            {t.home.subscribe}
          </button>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:order-1 lg:px-16">
          <p className="page-kicker">{t.home.accessoriesKicker}</p>
          <h2 className="mt-4 text-3xl font-light uppercase tracking-[0.16em] sm:text-5xl">
            {t.home.nextUp}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-alaya-muted">
            {t.home.accessoriesBody}
          </p>
          <button
            type="button"
            className="btn-ghost mt-8 w-fit"
            onClick={() => open("accessories")}
          >
            {t.home.subscribe}
          </button>
        </div>
        <div className="relative order-1 min-h-[360px] bg-alaya-black lg:order-2 lg:min-h-[560px]">
          <Image
            src="/images/home/surf.jpg"
            alt="Accesorios Alaya"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>
    </>
  );
}

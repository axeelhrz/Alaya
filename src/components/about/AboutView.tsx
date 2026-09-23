"use client";

import Image from "next/image";
import { about } from "../../../content/about";
import { useLocale } from "@/components/i18n/LocaleContext";

export function AboutView() {
  const { t } = useLocale();
  const copy = t.about;

  return (
    <article className="lg:flex">
      <div className="hero-full relative -mt-14 bg-alaya-black sm:-mt-16 lg:mt-0 lg:h-[calc(100svh-3.5rem)] lg:min-h-0 lg:sticky lg:top-14 lg:w-[46%]">
        <Image
          src={about.image}
          alt={`${copy.title} — ${copy.subtitle}`}
          fill
          priority
          className="object-cover object-[center_70%]"
          sizes="(max-width: 1024px) 100vw, 46vw"
        />
      </div>
      <div className="lg:w-[54%]">
        <div className="mx-auto max-w-xl px-5 py-12 sm:px-10 sm:py-16">
          <p className="page-kicker">{copy.kicker}</p>
          <h1 className="mt-4 text-4xl font-light uppercase tracking-[0.14em] sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.2em] text-alaya-muted">
            {copy.subtitle}
          </p>

          <div className="mt-10 space-y-5 text-sm leading-relaxed text-alaya-muted">
            <p>{copy.p1}</p>
            <p>{copy.p2}</p>
            <p>
              {copy.p3a}
              <strong className="font-medium text-alaya-black">{copy.p3b}</strong>
            </p>
            <p>{copy.p4}</p>
            <div className="space-y-2">
              {copy.list.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p>{copy.p5}</p>
            <p>{copy.p6}</p>
            <p>{copy.p7}</p>
            <p>{copy.p8}</p>
            <div className="space-y-2">
              {copy.list2.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p>{copy.p9}</p>
            <p>{copy.p10}</p>
            <p>{copy.p11}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

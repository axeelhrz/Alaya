"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleContext";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

export default function ApparelPage() {
  const { open } = useSubscribe();
  const { t } = useLocale();

  return (
    <div className="grid lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2">
      <div className="hero-full relative -mt-14 bg-alaya-black sm:-mt-16 lg:mt-0 lg:h-auto lg:min-h-full">
        <Image
          src="/images/home/apparel.jpg"
          alt="Apparel Alaya"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
        <p className="page-kicker">{t.pages.apparelKicker}</p>
        <h1 className="mt-4 text-4xl font-light uppercase tracking-[0.16em] sm:text-6xl">
          {t.pages.apparelTitle}
        </h1>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-alaya-muted">
          {t.pages.apparelText}
        </p>
        <button type="button" className="btn-pill mt-8 w-fit" onClick={() => open("apparel")}>
          {t.home.subscribe}
        </button>
      </div>
    </div>
  );
}

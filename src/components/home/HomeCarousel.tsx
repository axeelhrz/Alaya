"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleContext";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

const slideMeta = [
  {
    id: "roberts",
    image: "/images/home/hero-roberts.jpg",
    imageAlt: "Roberts",
    overlay: "bg-gradient-to-t from-black/55 via-black/20 to-black/25",
    position: "object-[72%_center]",
    contrast: false,
    href: "/pide-cita?shaper=roberds" as const,
    subscribe: undefined as undefined | "apparel" | "accessories",
  },
  {
    id: "apparel",
    image: "/images/home/hero-apparel.jpg",
    imageAlt: "Alaya apparel",
    overlay: "bg-gradient-to-t from-black/35 via-black/10 to-black/5",
    position: "object-[20%_center]",
    contrast: false,
    href: undefined,
    subscribe: "apparel" as const,
  },
  {
    id: "accessories",
    image: "/images/home/hero-accessories.jpg",
    imageAlt: "Alaya accessories",
    overlay: "bg-gradient-to-r from-black/80 via-black/45 to-transparent",
    position: "object-[center_center]",
    contrast: true,
    href: undefined,
    subscribe: "accessories" as const,
  },
];

export function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const { open } = useSubscribe();
  const { t } = useLocale();
  const slides = [
    {
      ...slideMeta[0],
      title: t.home.robertsTitle,
      line: t.home.robertsLine,
      text: t.home.robertsText,
      label: t.home.robertsCta,
    },
    {
      ...slideMeta[1],
      title: t.home.apparelTitle,
      line: t.home.apparelLine,
      text: t.home.apparelText,
      label: t.home.subscribe,
    },
    {
      ...slideMeta[2],
      title: t.home.accessoriesTitle,
      line: t.home.accessoriesLine,
      text: t.home.accessoriesText,
      label: t.home.subscribe,
    },
  ];
  const slide = slides[index];

  return (
    <section className="hero-full relative isolate -mt-14 w-full overflow-hidden bg-alaya-black text-white sm:-mt-16 lg:!max-h-[100svh]">
      {slides.map((item, i) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            priority={i === 0}
            unoptimized
            className={`h-full w-full object-cover ${item.position}`}
            sizes="100vw"
          />
          <div className={`absolute inset-0 ${item.overlay}`} />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-start justify-center px-6 text-left sm:px-10 lg:px-16">
        <h1 className="max-w-[12ch] font-light text-5xl uppercase leading-[0.95] tracking-[0.18em] [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] sm:text-7xl md:text-[5.75rem] lg:text-[6.75rem]">
          {slide.title}
        </h1>
        <p className="mt-5 font-light text-[0.8rem] uppercase tracking-[0.42em] [text-shadow:0_2px_18px_rgba(0,0,0,0.5)] sm:text-base sm:tracking-[0.5em]">
          {slide.line}
        </p>
        <p
          className={`mt-6 max-w-[20rem] font-light text-[0.62rem] uppercase leading-[1.85] tracking-[0.2em] sm:max-w-sm sm:text-[0.7rem] ${
            slide.contrast
              ? "text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.7)]"
              : "text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
          }`}
        >
          {slide.text}
        </p>
        <div className="mt-8">
          {slide.subscribe ? (
            <button
              type="button"
              className="btn-ghost text-white"
              onClick={() => open(slide.subscribe)}
            >
              {slide.label}
            </button>
          ) : (
            <Link href={slide.href || "/"} className="btn-ghost text-white">
              {slide.label}
            </Link>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2.5 pb-[env(safe-area-inset-bottom)]">
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.title}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full border transition ${
                i === index
                  ? "border-white bg-white/50"
                  : "border-white/80 bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

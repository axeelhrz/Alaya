"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleContext";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

const slideMeta = [
  {
    id: "roberts",
    image: "/images/home/surf.jpg",
    imageAlt: "Roberts",
    href: "/pide-cita?shaper=roberds" as const,
    subscribe: undefined as undefined | "apparel" | "accessories",
  },
  {
    id: "apparel",
    image: "/images/home/apparel.jpg",
    imageAlt: "Alaya apparel",
    href: undefined,
    subscribe: "apparel" as const,
  },
  {
    id: "accessories",
    image: "/images/home/hero.jpg",
    imageAlt: "Alaya accessories",
    href: undefined,
    subscribe: "accessories" as const,
  },
];

const INTERVAL = 5500;

export function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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
  const timer = useRef<number>(0);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const start = window.setTimeout(() => {
      timer.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % slideMeta.length);
      }, INTERVAL);
    }, 8000);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section className="hero-full relative isolate -mt-14 w-full shrink-0 overflow-hidden bg-alaya-black text-white sm:-mt-16 lg:!max-h-[100svh]">
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
            className="h-full w-full object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-center justify-center px-6 pb-10 text-center">
        <h1 className="font-display text-[2.35rem] uppercase leading-none tracking-[0.28em] sm:text-6xl md:text-[4.5rem]">
          {slide.title}
        </h1>
        <p className="mt-3 font-display text-base uppercase tracking-[0.42em] sm:text-xl">
          {slide.line}
        </p>
        <p className="mx-auto mt-6 max-w-[16rem] font-sans text-[0.62rem] uppercase leading-[1.7] tracking-[0.2em] text-white/90 sm:max-w-xs sm:text-[0.68rem]">
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
              onClick={() => {
                setPaused(true);
                setIndex(i);
              }}
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

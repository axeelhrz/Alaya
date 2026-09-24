"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleContext";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

const slideMeta = [
  {
    id: "roberts",
    image: "/images/home/hero-roberts.jpg",
    imageAlt: "Roberts",
    overlay: "bg-gradient-to-r from-black/75 via-black/35 to-black/10",
    position: "object-[72%_center]",
    ink: "light" as const,
    align: "left" as const,
    href: "/pide-cita?shaper=roberds" as const,
    subscribe: undefined as undefined | "apparel" | "accessories",
  },
  {
    id: "apparel",
    image: "/images/home/hero-apparel.jpg",
    imageAlt: "Alaya apparel",
    overlay: "",
    position: "object-[center_top]",
    ink: "dark" as const,
    align: "right" as const,
    href: undefined,
    subscribe: "apparel" as const,
  },
  {
    id: "minimal",
    image: "/images/banner_minimal.jpg",
    imageAlt: "Alaya minimal",
    overlay: "",
    position: "object-[center_center]",
    ink: "light" as const,
    align: "left" as const,
    href: undefined,
    subscribe: "apparel" as const,
  },
  {
    id: "accessories",
    image: "/images/home/hero-accessories.jpg",
    imageAlt: "Alaya accessories",
    overlay: "bg-gradient-to-r from-black/80 via-black/45 to-transparent",
    position: "object-[center_center]",
    ink: "light" as const,
    align: "left" as const,
    href: undefined,
    subscribe: "accessories" as const,
  },
];

const SLIDE_MS = 6500;

export function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { open } = useSubscribe();
  const { t } = useLocale();

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideMeta.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [index, paused]);
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
      title: t.home.nextUp,
      line: t.home.apparelKicker,
      text: t.home.apparelBody,
      label: t.home.subscribe,
    },
    {
      ...slideMeta[2],
      title: t.home.nextUp,
      line: t.home.minimalKicker,
      text: t.home.apparelBody,
      label: t.home.subscribe,
    },
    {
      ...slideMeta[3],
      title: t.home.accessoriesTitle,
      line: t.home.accessoriesLine,
      text: t.home.accessoriesText,
      label: t.home.subscribe,
    },
  ];
  const slide = slides[index];
  const dark = slide.ink === "dark";
  const right = slide.align === "right";

  return (
    <section
      className={`relative isolate w-full overflow-hidden ${
        dark ? "bg-alaya-white" : "bg-alaya-black"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[calc(100svh-3.5rem)] w-full sm:h-[calc(100svh-4rem)]">
        <div className="absolute inset-0 z-0">
          {slides.map((item, i) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
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
              {item.overlay ? (
                <div className={`absolute inset-0 ${item.overlay}`} />
              ) : null}
            </div>
          ))}
        </div>

        <div
          className={`absolute inset-0 z-20 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 sm:px-10 lg:px-16 ${
            right
              ? "items-start text-left lg:items-end lg:text-right"
              : "items-start text-left"
          } ${dark ? "text-alaya-black" : "text-white"}`}
        >
          <p
            className={`font-light text-[0.72rem] uppercase tracking-[0.38em] sm:text-[0.8rem] sm:tracking-[0.42em] ${
              dark
                ? ""
                : "[text-shadow:0_2px_18px_rgba(0,0,0,0.5)]"
            }`}
          >
            {slide.line}
          </p>
          <h1
            className={`mt-3 max-w-[12ch] font-light uppercase leading-[0.95] tracking-[0.18em] sm:text-7xl md:text-[5.75rem] ${
              dark
                ? "text-5xl lg:text-[5.5rem]"
                : "text-5xl [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] lg:text-[6.75rem]"
            }`}
          >
            {slide.title}
          </h1>
          <p
            className={`mt-6 max-w-[20rem] font-light text-[0.62rem] uppercase leading-[1.85] tracking-[0.2em] sm:max-w-sm sm:text-[0.7rem] ${
              dark
                ? ""
                : "text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
            }`}
          >
            {slide.text}
          </p>
          <div className={`mt-8 ${right ? "lg:self-end" : ""}`}>
            {slide.subscribe ? (
              <button
                type="button"
                className={dark ? "btn-ghost" : "btn-ghost text-white"}
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
        </div>

        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-black/40 px-3 py-1.5">
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${item.line} ${item.title}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full border border-white transition ${
                i === index ? "bg-white" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

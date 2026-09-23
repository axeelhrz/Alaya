"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

type Slide = {
  id: string;
  title: string;
  line: string;
  text: string;
  image: string;
  imageAlt: string;
  cta: { label: string; href?: string; subscribe?: "apparel" | "accessories" };
};

const slides: Slide[] = [
  {
    id: "roberts",
    title: "Roberts",
    line: "está aquí",
    text: "Tu oportunidad para crear tu tabla a medida con uno de los mejores shapers del mundo.",
    image: "/images/home/surf.jpg",
    imageAlt: "Ola al atardecer",
    cta: { label: "Pide cita", href: "/pide-cita?shaper=roberds" },
  },
  {
    id: "apparel",
    title: "Nueva",
    line: "colección textil",
    text: "Dentro de poco lanzamos nuestra primera colección. Suscríbete y te avisamos el día del drop.",
    image: "/images/home/apparel.jpg",
    imageAlt: "Colección textil Alaya",
    cta: { label: "Suscríbete", subscribe: "apparel" },
  },
  {
    id: "accessories",
    title: "Accesorios",
    line: "next up",
    text: "Pads, grips y el resto de la línea. Deja tu email y sé el primero en el line-up.",
    image: "/images/home/hero.jpg",
    imageAlt: "Línea de costa",
    cta: { label: "Suscríbete", subscribe: "accessories" },
  },
];

const INTERVAL = 5500;

export function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { open } = useSubscribe();
  const slide = slides[index];
  const timer = useRef<number>(0);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const start = window.setTimeout(() => {
      timer.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
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
          {slide.cta.subscribe ? (
            <button
              type="button"
              className="btn-ghost text-white"
              onClick={() => open(slide.cta.subscribe)}
            >
              {slide.cta.label}
            </button>
          ) : (
            <Link href={slide.cta.href || "/"} className="btn-ghost text-white">
              {slide.cta.label}
            </Link>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2.5 pb-[env(safe-area-inset-bottom)]">
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Ir a ${item.title}`}
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

type Slide = {
  id: string;
  eyebrow?: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  tone: "dark" | "light";
  cta: { label: string; href?: string; subscribe?: "apparel" | "accessories" };
};

const slides: Slide[] = [
  {
    id: "roberts",
    eyebrow: "Team",
    title: "Roberts está aquí",
    text: "Del 25 de septiembre hasta el 3 de octubre tienes la oportunidad de crear tu tabla a medida con uno de los mejores shapers del mundo.",
    image: "/images/shapers/mark-phipps.jpg",
    imageAlt: "Roberts en Alaya Division",
    tone: "dark",
    cta: { label: "Pide cita", href: "/pide-cita?shaper=roberds" },
  },
  {
    id: "apparel",
    eyebrow: "Apparel",
    title: "Nueva colección textil",
    text: "Dentro de poco lanzamos nuestra primera colección. Suscríbete y te avisamos el día del drop.",
    image: "/images/home/apparel.jpg",
    imageAlt: "Colección textil Alaya",
    tone: "light",
    cta: { label: "Suscríbete", subscribe: "apparel" },
  },
  {
    id: "accessories",
    eyebrow: "Accesorios",
    title: "Pads, grips y más",
    text: "La línea de accesorios llega como coming soon. Deja tu email y sé el primero en el line-up.",
    image: "/images/home/surf.jpg",
    imageAlt: "Accesorios Alaya",
    tone: "dark",
    cta: { label: "Suscríbete", subscribe: "accessories" },
  },
];

const INTERVAL = 4500;

export function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const { open } = useSubscribe();
  const slide = slides[index];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative isolate h-[calc(100svh-3.5rem)] overflow-hidden bg-alaya-black text-white sm:h-[calc(100svh-4rem)]">
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
            className="scale-[1.02] object-cover object-center"
            sizes="100vw"
          />
          <div
            className={`absolute inset-0 ${
              item.tone === "dark"
                ? "bg-gradient-to-t from-black/80 via-black/35 to-black/20"
                : "bg-gradient-to-t from-black/55 via-black/20 to-transparent"
            }`}
          />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-10 pt-20 sm:px-8 sm:pb-14">
        <p className="page-kicker text-white/70">{slide.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-light uppercase leading-[0.95] tracking-[0.12em] sm:text-6xl md:text-7xl">
          {slide.title}
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
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

        <div className="mt-10 flex gap-2">
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Ir a ${item.title}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-8 transition ${
                i === index ? "bg-white" : "bg-white/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

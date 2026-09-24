"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const FADE_MS = 1200;

export function Hero() {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<"a" | "b">("a");
  const swappingRef = useRef(false);
  const [useVideo, setUseVideo] = useState(true);
  const [front, setFront] = useState<"a" | "b">("a");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setUseVideo(false);
      return;
    }

    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let cancelled = false;

    const softPlay = async (video: HTMLVideoElement) => {
      try {
        await video.play();
      } catch {
        if (!cancelled) setUseVideo(false);
      }
    };

    const crossfade = async () => {
      if (swappingRef.current || cancelled) return;
      swappingRef.current = true;

      const current = activeRef.current === "a" ? a : b;
      const next = activeRef.current === "a" ? b : a;
      const nextKey = activeRef.current === "a" ? "b" : "a";

      next.currentTime = 0;
      await softPlay(next);
      setFront(nextKey);

      window.setTimeout(() => {
        if (cancelled) return;
        current.pause();
        current.currentTime = 0;
        activeRef.current = nextKey;
        swappingRef.current = false;
      }, FADE_MS);
    };

    const onTimeUpdate = (video: HTMLVideoElement) => () => {
      if (!video.duration || swappingRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_MS / 1000 + 0.05) {
        void crossfade();
      }
    };

    const onA = onTimeUpdate(a);
    const onB = onTimeUpdate(b);
    a.addEventListener("timeupdate", onA);
    b.addEventListener("timeupdate", onB);

    a.currentTime = 0;
    void softPlay(a);

    return () => {
      cancelled = true;
      a.removeEventListener("timeupdate", onA);
      b.removeEventListener("timeupdate", onB);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-alaya-black md:min-h-[88vh]">
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero-roberts.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%] sm:object-center"
          sizes="100vw"
          aria-hidden
        />

        {useVideo ? (
          <>
            <video
              ref={aRef}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out ${
                front === "a" ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDuration: `${FADE_MS}ms` }}
              muted
              playsInline
              preload="auto"
              poster="/images/home/hero-roberts.jpg"
              onError={() => setUseVideo(false)}
            >
              <source src="/videos/hero-wave.mp4" type="video/mp4" />
            </video>
            <video
              ref={bRef}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out ${
                front === "b" ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDuration: `${FADE_MS}ms` }}
              muted
              playsInline
              preload="auto"
              aria-hidden
            >
              <source src="/videos/hero-wave.mp4" type="video/mp4" />
            </video>
          </>
        ) : null}
      </div>

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 md:py-28">
        <p className="mb-5 animate-hero-in flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-sm uppercase tracking-[0.22em] text-white [animation-delay:120ms] sm:mb-7 sm:text-base sm:tracking-[0.28em] md:text-lg">
          <span className="hidden h-px w-8 bg-white/70 sm:block" aria-hidden />
          <span>Tienda de tablas</span>
          <span className="text-white/50" aria-hidden>
            ·
          </span>
          <span>Casa de shapers</span>
          <span className="hidden h-px w-8 bg-white/70 sm:block" aria-hidden />
        </p>
        <h1 className="max-w-4xl animate-hero-in text-[2.75rem] leading-[0.95] text-white [animation-delay:280ms] sm:text-5xl md:text-7xl lg:text-8xl">
          <span className="font-serif font-normal tracking-normal">Built on </span>
          <span className="font-display uppercase">Connection</span>
        </h1>
        <p className="mt-5 max-w-lg animate-hero-in px-1 text-sm leading-relaxed text-white/85 [animation-delay:440ms] sm:mt-6 md:text-base">
          No es un carrito frío. Es fábrica, cinco shapers y una cita para crear
          — o elegir — la tabla que vas a surfear.
        </p>
        <div className="mt-8 flex w-full max-w-md animate-hero-in flex-col gap-3 [animation-delay:600ms] sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <Button
            href="/surf/encuentra-tu-tabla"
            variant="primary"
            className="w-full !border-alaya-black !bg-alaya-black sm:w-auto"
          >
            Encuentra tu tabla
          </Button>
          <Button href="/pide-cita" variant="secondary" className="w-full sm:w-auto">
            Pide Cita
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce-slow md:bottom-8 md:block">
        <span className="block h-8 w-px bg-white/50" />
      </div>
    </section>
  );
}

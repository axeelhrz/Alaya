"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FlameMark({
  className = "h-7 w-auto",
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Image
      src="/images/brand/logo.png"
      alt=""
      width={301}
      height={400}
      className={`${className} ${invert ? "invert" : ""}`}
      unoptimized
    />
  );
}

export function Logo({
  href = "/",
  light = false,
  withWord = false,
  stacked = false,
  onClick,
}: {
  href?: string;
  light?: boolean;
  withWord?: boolean;
  stacked?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`inline-flex ${
        stacked ? "flex-col items-start gap-3" : "items-center gap-2"
      } ${light ? "text-white" : "text-alaya-black"}`}
      aria-label="Alaya Division"
      onClick={(event) => {
        onClick?.();
        if (href !== "/") return;
        if (pathname !== "/") return;
        event.preventDefault();
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      <FlameMark
        className={stacked ? "h-14 w-auto sm:h-16" : "h-8 w-auto sm:h-9"}
        invert={!light}
      />
      {withWord ? (
        <span
          className={
            stacked
              ? "text-[0.7rem] font-medium uppercase leading-tight tracking-[0.28em]"
              : "text-[0.65rem] font-medium uppercase tracking-[0.22em]"
          }
        >
          Alaya
          <span
            className={
              stacked
                ? "block tracking-[0.22em]"
                : "block tracking-[0.28em] text-[0.55rem] opacity-70"
            }
          >
            Division
          </span>
        </span>
      ) : null}
    </Link>
  );
}

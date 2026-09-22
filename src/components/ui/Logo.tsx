"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FlameMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 64"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 0c2.8 9.4-2.2 15.6-7.4 22.2C11.2 28.6 5 36.4 5 46.2 5 56.2 13.4 64 24 64s19-7.8 19-17.8c0-7.4-4.2-13.6-8.8-19.4C29.4 21.2 24.8 15.6 24 0Zm0 57.2c-6.4 0-11.4-4.4-11.4-11 0-6.4 4-11.2 8.2-16.2.8 5.6 3.6 8.8 7.2 8.8 2.2 0 4-1.4 4-4.2 0-1.6-.6-3.2-1.4-4.6 4.2 3.8 7 8.6 7 14 0 7.2-5.8 13.2-13.6 13.2Z" />
    </svg>
  );
}

export function Logo({
  href = "/",
  light = false,
  withWord = false,
  onClick,
}: {
  href?: string;
  light?: boolean;
  withWord?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 ${
        light ? "text-white" : "text-alaya-black"
      }`}
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
      <FlameMark className="h-6 w-6 sm:h-7 sm:w-7" />
      {withWord ? (
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em]">
          Alaya
          <span className="block tracking-[0.28em] text-[0.55rem] opacity-70">
            Division
          </span>
        </span>
      ) : null}
    </Link>
  );
}

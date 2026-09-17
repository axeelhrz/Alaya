"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const surfLinks = [
  { href: "/surf/boards", label: "Boards" },
  { href: "/surf/shapers", label: "Shapers" },
  { href: "/surf/encuentra-tu-tabla", label: "Encuentra tu tabla" },
  { href: "/pide-cita", label: "Pide Cita" },
];

const mainLinks = [
  { href: "/new", label: "New" },
  { href: "/apparel", label: "Apparel" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [surfOpen, setSurfOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-alaya-border bg-alaya-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 md:h-[4.25rem] md:px-6">
        <Link
          href="/"
          className="font-display text-xl uppercase tracking-[0.08em] text-alaya-black transition-[letter-spacing] duration-300 hover:tracking-[0.14em] sm:text-2xl md:text-[1.75rem]"
          onClick={() => setOpen(false)}
        >
          Alaya
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setSurfOpen(true)}
            onMouseLeave={() => setSurfOpen(false)}
          >
            <Link href="/surf" className="nav-link inline-flex items-center gap-1">
              Surf
              <span
                className={`text-[0.6rem] transition-transform duration-300 ${
                  surfOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </Link>
            <div
              className={`absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 border border-alaya-border bg-alaya-white py-2 shadow-sm transition-all duration-300 ${
                surfOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              {surfLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link block px-4 py-2.5 hover:bg-alaya-surface"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/built-on-connection" className="nav-link">
            Connection
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline-flex">
            <Link
              href="/pide-cita"
              className="btn-primary !px-3 !py-2 text-[0.6rem] sm:!px-4 sm:!py-2.5 sm:text-[0.65rem]"
            >
              Pide Cita
            </Link>
          </span>
          <button
            type="button"
            className="nav-link min-h-11 min-w-11 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mobile-nav-enter absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-alaya-border bg-alaya-white lg:hidden">
          <nav className="flex flex-col px-4 py-4 pb-8">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link border-b border-alaya-border py-3.5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="nav-link pt-3.5 text-alaya-muted">Surf</p>
            {surfLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link border-b border-alaya-border py-3.5 pl-3"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/built-on-connection"
              className="nav-link border-b border-alaya-border py-3.5"
              onClick={() => setOpen(false)}
            >
              Built on Connection
            </Link>
            <Link
              href="/pide-cita"
              className="btn-primary mt-5 w-full text-center"
              onClick={() => setOpen(false)}
            >
              Pide Cita
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

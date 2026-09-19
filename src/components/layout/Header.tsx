"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

const surfLinks = [
  { href: "/surf/boards", label: "Boards" },
  { href: "/surf/boards?cat=shortboard", label: "Shortboard" },
  { href: "/surf/boards?cat=fish", label: "Fish / Twin" },
  { href: "/surf/boards?cat=mid", label: "Mid-Length" },
  { href: "/surf/boards?cat=custom", label: "Custom" },
  { href: "/surf/shapers", label: "Shapers" },
];

const links = [
  { href: "/new", label: "New" },
  { href: "/surf", label: "Surf", children: surfLinks },
  { href: "/pide-cita", label: "Pide Cita" },
  { href: "/surf/shapers", label: "Team" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [surfOpen, setSurfOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-alaya-black text-white">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-16 md:px-8">
        <Logo light />

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setSurfOpen(true)}
                onMouseLeave={() => setSurfOpen(false)}
              >
                <Link
                  href={link.href}
                  className="header-link inline-flex items-center gap-1"
                >
                  {link.label}
                </Link>
                <div
                  className={`absolute top-full left-1/2 z-50 w-48 -translate-x-1/2 bg-alaya-black py-3 transition-all duration-300 ${
                    surfOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="header-link block px-5 py-2 text-white/80 hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} className="header-link">
                {link.label}
              </Link>
            ),
          )}
          <span className="header-link cursor-default text-white/70">€ Esp</span>
        </nav>

        <button
          type="button"
          className="header-link min-h-11 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open ? (
        <div className="mobile-nav-enter max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-white/10 bg-alaya-black lg:hidden">
          <nav className="flex flex-col px-4 py-4 pb-10">
            {links.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="header-link block border-b border-white/10 py-3.5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="header-link block border-b border-white/10 py-3 pl-4 text-white/70"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

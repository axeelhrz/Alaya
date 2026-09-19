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
  const [mobileSurfOpen, setMobileSurfOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setMobileSurfOpen(false);
  }, [open]);

  let mobileIndex = 0;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] bg-alaya-black text-white">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-16 sm:gap-6 md:px-8">
          <Logo light />

          <nav className="hidden min-w-0 items-center gap-4 md:flex lg:gap-8">
            {links.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative shrink-0"
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
                <Link
                  key={link.href}
                  href={link.href}
                  className="header-link shrink-0"
                >
                  {link.label}
                </Link>
              ),
            )}
            <span className="header-link hidden shrink-0 cursor-default text-white/70 lg:inline">
              € Esp
            </span>
          </nav>

          <button
            type="button"
            className="header-link min-h-11 md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </header>
      <div className="h-14 sm:h-16" aria-hidden />

      <div
        className={`mobile-nav fixed inset-x-0 top-14 bottom-0 z-[55] overflow-y-auto bg-alaya-black text-white sm:top-16 md:hidden ${
          open ? "is-open" : ""
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col px-4 py-2 pb-16">
          {links.map((link) => {
            const index = mobileIndex++;
            return (
              <div key={link.href}>
                {link.children ? (
                  <>
                    <button
                      type="button"
                      className="mobile-nav-link header-link flex w-full items-center justify-between border-b border-white/10 py-4 text-left"
                      style={{ "--i": index } as React.CSSProperties}
                      aria-expanded={mobileSurfOpen}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setMobileSurfOpen((value) => !value)}
                    >
                      {link.label}
                      <span className="text-white/45" aria-hidden>
                        {mobileSurfOpen ? "–" : "+"}
                      </span>
                    </button>
                    {mobileSurfOpen
                      ? link.children.map((child) => {
                          const childIndex = mobileIndex++;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              tabIndex={open ? 0 : -1}
                              className="mobile-nav-link header-link block border-b border-white/10 py-3 pl-4 text-white/70"
                              style={
                                { "--i": childIndex } as React.CSSProperties
                              }
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          );
                        })
                      : null}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    className="mobile-nav-link header-link block border-b border-white/10 py-4"
                    style={{ "--i": index } as React.CSSProperties}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}

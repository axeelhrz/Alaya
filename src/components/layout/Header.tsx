"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { boardCategories } from "../../../content/boards";
import { shapers } from "../../../content/shapers";

const boardLinks = boardCategories
  .filter((c) => c.slug !== "roberts")
  .map((c) => ({
    href: c.slug === "all" ? "/surf/boards" : `/surf/boards?cat=${c.slug}`,
    label: c.label,
  }));

const shaperLinks = shapers.map((s) => ({
  href: `/surf/shapers/${s.slug}`,
  label: s.name,
}));

const citaLinks = [
  { href: "/pide-cita?shaper=roberds", label: "Roberts" },
  { href: "/pide-cita?choice=alaya", label: "Alaya Division" },
];

const surfColumns = [
  { title: "Boards", href: "/surf/boards", links: boardLinks },
  { title: "Shapers", href: "/surf/shapers", links: shaperLinks },
  { title: "Pide cita", href: "/pide-cita", links: citaLinks },
];

const links = [
  { href: "/new", label: "New" },
  { href: "/surf", label: "Surf", mega: true },
  { href: "/pide-cita", label: "Pide Cita" },
  { href: "/team", label: "Team" },
];

function MegaLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block text-[0.62rem] uppercase tracking-[0.16em] text-white/70 transition hover:text-white ${className}`}
    >
      {children}
    </Link>
  );
}

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
      <header
        className={`site-header fixed inset-x-0 top-0 z-[60] bg-alaya-black text-white ${
          surfOpen ? "is-surf-open" : ""
        }`}
        onMouseLeave={() => setSurfOpen(false)}
      >
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-16 sm:gap-6 md:px-8">
          <Logo light onClick={() => setOpen(false)} />

          <nav className="hidden min-w-0 items-center gap-4 md:flex lg:gap-8">
            {links.map((link) =>
              link.mega ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="surf-trigger header-link shrink-0"
                  onMouseEnter={() => setSurfOpen(true)}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="header-link shrink-0"
                  onMouseEnter={() => setSurfOpen(false)}
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

        <div
          className="surf-mega hidden overflow-hidden transition-[max-height,opacity] duration-300 md:block"
        >
          <nav
            aria-label="Surf"
            className="mx-auto grid max-w-[720px] grid-cols-3 gap-10 px-4 pb-10 pt-2 sm:px-8"
          >
            {surfColumns.map((col) => (
              <div key={col.title}>
                <Link
                  href={col.href}
                  className="mb-3 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  {col.title}
                </Link>
                <ul className="space-y-2">
                  {col.links.map((item) => (
                    <li key={item.href + item.label}>
                      <MegaLink href={item.href}>{item.label}</MegaLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
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
                {link.mega ? (
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
                      ? surfColumns.map((col) => (
                          <div key={col.title} className="border-b border-white/10 py-3 pl-1">
                            <MegaLink
                              href={col.href}
                              onClick={() => setOpen(false)}
                              className="mb-2 text-white"
                            >
                              {col.title}
                            </MegaLink>
                            {col.links.map((child) => {
                              const childIndex = mobileIndex++;
                              return (
                                <Link
                                  key={child.href + child.label}
                                  href={child.href}
                                  tabIndex={open ? 0 : -1}
                                  className="mobile-nav-link header-link block py-2 pl-3 text-white/70"
                                  style={
                                    { "--i": childIndex } as React.CSSProperties
                                  }
                                  onClick={() => setOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        ))
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

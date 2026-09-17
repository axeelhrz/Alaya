import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const customerService = [
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/contact", label: "Contact Us" },
  { href: "/customer-service", label: "Customer Service" },
];

const company = [
  { href: "/about", label: "About Alaya Division" },
  { href: "/built-on-connection", label: "Built on Connection" },
];

export function Footer() {
  return (
    <footer className="border-t border-alaya-border bg-alaya-black text-alaya-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:gap-12 sm:py-16 md:px-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="font-display text-3xl uppercase tracking-[0.08em]"
          >
            Alaya
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Built on Connection. Surf, shapers y comunidad desde la fábrica hasta
            la ola.
          </p>
        </div>

        <div>
          <p className="section-label mb-4 text-white/50">Customer Service</p>
          <ul className="space-y-3">
            {customerService.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link text-white/80 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label mb-4 text-white/50">Company</p>
          <ul className="space-y-3">
            {company.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link text-white/80 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label mb-4 text-white/50">Newsletter</p>
          <p className="mb-4 text-sm text-white/70">
            Novedades, lanzamientos y cultura Alaya.
          </p>
          <NewsletterForm variant="dark" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs uppercase tracking-[0.12em] text-white/50 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} Alaya Division</p>
          <p>Fase 1 · Lanzamiento 25 septiembre</p>
        </div>
      </div>
    </footer>
  );
}

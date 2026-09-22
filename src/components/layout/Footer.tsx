"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const service = [
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "Company" },
];

const company = [
  { href: "/about", label: "About Alaya Division" },
  { href: "/built-on-connection", label: "Built on Connection" },
];

export function Footer() {
  return (
    <footer className="bg-alaya-black text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-14 sm:px-8 lg:grid-cols-2 lg:py-16">
        <div>
          <Logo light withWord />
          <div className="mt-10 space-y-6 text-[0.7rem] uppercase tracking-[0.16em] text-white/75">
            <div>
              <p className="mb-2 text-white/45">Customer Service</p>
              <ul className="space-y-1.5">
                {service.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white">
                      — {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {company.map((item) => (
                <p key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </p>
              ))}
            </div>
          </div>
          <p className="mt-12 text-4xl font-light tracking-[0.18em] uppercase sm:text-5xl">
            Follow us
          </p>
          <div className="mt-4 flex gap-5 text-sm text-white/70">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>
          </div>
        </div>

        <div className="lg:text-right">
          <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] sm:text-5xl">
            Division
            <span className="block">Member</span>
          </p>
          <p className="mt-10 text-[0.7rem] uppercase tracking-[0.16em] text-white/70">
            Sign up to get the latest news and exclusive offers.
          </p>
          <FooterNewsletter />
        </div>
      </div>

      <div className="border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-5 text-[0.6rem] uppercase tracking-[0.16em] text-white/45 sm:px-8 md:flex-row md:justify-between">
          <p>Privacy Policy · Terms & Conditions</p>
          <p>Alaya Division · © {new Date().getFullYear()} · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

function FooterNewsletter() {
  return (
    <form
      className="mt-6 flex items-center justify-end gap-3 border-b border-white/30 pb-2 lg:ml-auto lg:max-w-sm"
      action="/api/newsletter"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = new FormData(form).get("email");
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        form.reset();
      }}
    >
      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className="w-full bg-transparent py-2 text-left text-sm text-white outline-none placeholder:text-white/40 lg:text-right"
        aria-label="Email"
      />
      <button type="submit" className="shrink-0 text-lg" aria-label="Suscribirse">
        →
      </button>
    </form>
  );
}

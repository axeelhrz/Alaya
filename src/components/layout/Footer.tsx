"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleContext";
import { Logo } from "@/components/ui/Logo";

const social = [
  { href: "https://facebook.com", label: "Facebook", icon: FacebookIcon },
  { href: "https://pinterest.com", label: "Pinterest", icon: PinterestIcon },
  { href: "https://instagram.com", label: "Instagram", icon: InstagramIcon },
  { href: "https://youtube.com", label: "YouTube", icon: YoutubeIcon },
];

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-5 w-5 fill-current"
    >
      {children}
    </svg>
  );
}

function FacebookIcon() {
  return (
    <Icon>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.859-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-1.934 0-2.677.934-2.677 2.68v1.291h3.557l-.488 3.667h-3.069v7.98H9.101z" />
    </Icon>
  );
}

function PinterestIcon() {
  return (
    <Icon>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.012-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.226 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12.013C24.007 5.367 18.641.001 12.017.001z" />
    </Icon>
  );
}

function InstagramIcon() {
  return (
    <Icon>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.789.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.163c3.204 0 3.584.012 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.68c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </Icon>
  );
}

function YoutubeIcon() {
  return (
    <Icon>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </Icon>
  );
}

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();
  const service = [
    { href: "/aviso-legal", label: t.footer.legal },
    { href: "/contact", label: t.footer.contact },
    { href: "/about", label: t.footer.company },
  ];
  const company = [
    { href: "/about", label: t.footer.about },
    { href: "/built-on-connection", label: t.footer.built },
  ];

  return (
    <footer className="bg-alaya-black text-white">
      <div className="mx-auto grid max-w-[1400px] items-start gap-16 px-4 py-16 sm:px-8 md:grid-cols-2 lg:py-20">
        <div>
          <Logo light withWord stacked />
          <div className="mt-12 space-y-8 text-[0.68rem] uppercase tracking-[0.16em] text-white/70">
            <div>
              <p className="mb-3 text-white/40">{t.footer.customerService}</p>
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
            <div className="space-y-1.5">
              {company.map((item) => (
                <p key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </p>
              ))}
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4">
            <p className="text-5xl font-light uppercase tracking-[0.2em] sm:text-6xl">
              {t.footer.follow}
            </p>
            <div className="flex items-center gap-5 text-white">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="hover:text-white"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:pt-2">
          <Image
            src="/images/brand/division-member.png"
            alt="Division Member"
            width={720}
            height={360}
            className="w-full max-w-md"
          />
          <p className="mt-14 text-[0.68rem] uppercase leading-relaxed tracking-[0.16em] text-white/70">
            {t.footer.signup}
          </p>
          <FooterNewsletter />
          <p className="mt-4 max-w-md text-[0.58rem] uppercase leading-relaxed tracking-[0.12em] text-white/40">
            <Link href="/aviso-legal" className="underline underline-offset-2">
              {t.footer.terms}
            </Link>
            {" · "}
            <Link href="/aviso-legal" className="underline underline-offset-2">
              {t.footer.privacy}
            </Link>
          </p>
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom)]">
        <div className="font-serif mx-auto max-w-[1400px] px-4 pb-8 text-[0.58rem] uppercase leading-relaxed tracking-[0.14em] text-white/35 sm:px-8">
          <p>
            <Link href="/aviso-legal" className="hover:text-white/60">
              {t.footer.privacy}
            </Link>{" "}
            <Link href="/aviso-legal" className="hover:text-white/60">
              {t.footer.terms}
            </Link>
          </p>
          <p className="mt-1">
            {t.footer.rights.replace("{year}", String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterNewsletter() {
  const { t } = useLocale();
  return (
    <form
      className="mt-6 flex items-center gap-3 border-b border-white/30 pb-2"
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
      <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.16em] text-white/55">
        {t.footer.email}
      </span>
      <input
        name="email"
        type="email"
        required
        className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/30"
        aria-label="Email"
      />
      <button type="submit" className="shrink-0 text-lg" aria-label={t.footer.subscribe}>
        →
      </button>
    </form>
  );
}

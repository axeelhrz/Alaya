"use client";

import { useLocale } from "@/components/i18n/LocaleContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function CustomerServiceView() {
  const { t } = useLocale();
  const items = [
    {
      title: t.pages.serviceBoard,
      text: t.pages.serviceBoardText,
      href: "/pide-cita",
      cta: t.nav.book,
    },
    {
      title: t.pages.serviceGeneral,
      text: t.pages.serviceGeneralText,
      href: "/contact",
      cta: t.pages.serviceContact,
    },
    {
      title: t.pages.serviceLegal,
      text: t.pages.serviceLegalText,
      href: "/aviso-legal",
      cta: t.footer.legal,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        label={t.pages.serviceLabel}
        title={t.pages.serviceTitle}
        titleDisplay={t.pages.serviceTitle2}
        description={t.pages.serviceLead}
      />
      <ul className="mt-12 space-y-1">
        {items.map((item) => (
          <li
            key={item.href}
            className="flex flex-col gap-4 border border-alaya-border p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wide">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-alaya-muted">{item.text}</p>
            </div>
            <Button href={item.href} variant="outline" className="shrink-0">
              {item.cta}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

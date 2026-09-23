"use client";

import { useLocale } from "@/components/i18n/LocaleContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ContactView() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        label={t.pages.contactLabel}
        title={t.pages.contactTitle}
        titleDisplay={t.pages.contactTitle2 || undefined}
        description={t.pages.contactLead}
      />
      <div className="mt-12 space-y-6 border border-alaya-border p-8">
        <div>
          <p className="section-label">Email</p>
          <a
            href="mailto:hola@alayadivision.com"
            className="mt-2 block font-display text-2xl uppercase tracking-wide"
          >
            hola@alayadivision.com
          </a>
        </div>
        <div>
          <p className="section-label">{t.pages.contactProjects}</p>
          <p className="mt-2 text-sm text-alaya-muted">
            {t.pages.contactProjectsText}
          </p>
          <Button href="/pide-cita" variant="outline" className="mt-4">
            {t.nav.book}
          </Button>
        </div>
      </div>
    </div>
  );
}

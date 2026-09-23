"use client";

import { useLocale } from "@/components/i18n/LocaleContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LegalView() {
  const { t } = useLocale();
  const sections = [
    { title: t.pages.legalHolder, text: t.pages.legalHolderText },
    { title: t.pages.legalPurpose, text: t.pages.legalPurposeText },
    { title: t.pages.legalData, text: t.pages.legalDataText },
    { title: t.pages.legalIp, text: t.pages.legalIpText },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        label={t.pages.legalLabel}
        title={t.pages.legalTitle}
        titleDisplay={t.pages.legalTitle2}
      />
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-alaya-muted">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl uppercase tracking-wide text-alaya-black">
              {section.title}
            </h2>
            <p className="mt-3">{section.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

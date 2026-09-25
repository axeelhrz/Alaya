"use client";

import { useLocale } from "@/components/i18n/LocaleContext";

export function CitaHeading() {
  const { t } = useLocale();
  return (
    <div className="text-center">
      <h1 className="max-w-full break-words text-4xl font-light uppercase tracking-[0.12em] sm:text-7xl sm:tracking-[0.28em]">
        {t.cita.title}
      </h1>
      <p className="mx-auto mt-6 max-w-md text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-alaya-muted">
        {t.cita.lead}
      </p>
    </div>
  );
}

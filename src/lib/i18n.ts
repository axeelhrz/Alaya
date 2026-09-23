export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<
  Locale,
  { currency: "USD" | "EUR"; symbol: string; short: string; label: string }
> = {
  en: { currency: "USD", symbol: "$", short: "Eng", label: "$ Eng" },
  es: { currency: "EUR", symbol: "€", short: "Esp", label: "€ Esp" },
};

export const defaultLocale: Locale = "en";
export const LOCALE_STORAGE_KEY = "alaya-locale";

export function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "es";
}

export function formatMoney(amount: number, locale: Locale) {
  const { currency } = localeMeta[locale];
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleContext";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

export function SubscribeModal() {
  const { isOpen, close, source } = useSubscribe();
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const copy =
    source === "apparel"
      ? { title: t.subscribe.apparelTitle, text: t.subscribe.apparelText }
      : source === "accessories"
        ? {
            title: t.subscribe.accessoriesTitle,
            text: t.subscribe.accessoriesText,
          }
        : { title: t.subscribe.generalTitle, text: t.subscribe.generalText };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.subscribe.fail);
      setStatus("success");
      setMessage(t.subscribe.success);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t.subscribe.error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-title"
    >
      <div
        className="relative w-full max-w-md bg-white p-8 text-center sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 text-lg leading-none text-alaya-muted hover:text-alaya-black"
          aria-label={t.subscribe.close}
        >
          ×
        </button>
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-alaya-muted">
          Alaya Division
        </p>
        <h2
          id="subscribe-title"
          className="mt-3 text-3xl font-light uppercase tracking-[0.16em]"
        >
          {copy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-alaya-muted">
          {copy.text}
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.footer.email.replace(":", "")}
            className="input-block w-full text-center"
            aria-label={t.footer.email.replace(":", "")}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-pill w-full disabled:opacity-60"
          >
            {status === "loading" ? "..." : t.home.subscribe}
          </button>
        </form>
        {message ? (
          <p
            className={`mt-4 text-sm ${
              status === "error" ? "text-red-600" : "text-alaya-black"
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}

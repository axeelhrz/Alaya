"use client";

import { useEffect, useState } from "react";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

const titles: Record<string, { title: string; text: string }> = {
  apparel: {
    title: "Apparel",
    text: "Suscríbete y te avisamos cuando lancemos la primera colección textil.",
  },
  accessories: {
    title: "Accesorios",
    text: "Pads, grips y el resto de la línea. Sé el primero en saberlo.",
  },
  general: {
    title: "Suscríbete",
    text: "Novedades, lanzamientos y citas con shapers. Directo a tu email.",
  },
};

export function SubscribeModal() {
  const { isOpen, close, source } = useSubscribe();
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

  const copy = titles[source] || titles.general;

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
      if (!res.ok) throw new Error(data.error || "No se pudo suscribir");
      setStatus("success");
      setMessage("Listo. Te avisamos en el lanzamiento.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Algo salió mal");
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
          aria-label="Cerrar"
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
            placeholder="Email"
            className="input-block w-full text-center"
            aria-label="Email"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-pill w-full disabled:opacity-60"
          >
            {status === "loading" ? "..." : "Suscríbete"}
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

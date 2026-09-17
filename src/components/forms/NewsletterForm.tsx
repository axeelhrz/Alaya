"use client";

import { useState } from "react";
import Link from "next/link";

type NewsletterFormProps = {
  variant?: "light" | "dark";
};

export function NewsletterForm({ variant = "light" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al suscribirse");
      setStatus("success");
      setMessage("Gracias. Estás en la lista Alaya.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Algo salió mal");
    }
  }

  const isDark = variant === "dark";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email"
          className={`input-field ${
            isDark
              ? "border-white/30 bg-transparent text-white placeholder:text-white/40 focus:border-white"
              : ""
          }`}
          aria-label="Email para newsletter"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            isDark
              ? "btn-secondary w-full shrink-0 disabled:opacity-60 sm:w-auto"
              : "btn-primary w-full shrink-0 disabled:opacity-60 sm:w-auto"
          }
        >
          {status === "loading" ? "..." : "Suscribirme"}
        </button>
      </div>
      <p
        className={`text-xs leading-relaxed ${
          isDark ? "text-white/50" : "text-alaya-muted"
        }`}
      >
        Al suscribirte aceptas el{" "}
        <Link href="/aviso-legal" className="underline underline-offset-2">
          Aviso Legal
        </Link>
        .
      </p>
      {message ? (
        <p
          className={`text-sm ${
            status === "error" ? "text-red-500" : isDark ? "text-white" : "text-alaya-black"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

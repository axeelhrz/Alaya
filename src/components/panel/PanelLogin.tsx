"use client";

import { useState } from "react";
import { FlameMark } from "@/components/ui/Logo";

export function PanelLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/panel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo entrar");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-alaya-black px-4 text-white">
      <form onSubmit={onSubmit} className="w-full max-w-sm text-center">
        <FlameMark className="mx-auto h-8 w-8 text-white" />
        <p className="mt-8 text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
          Alaya Division
        </p>
        <h1 className="mt-3 text-3xl font-light uppercase tracking-[0.18em]">
          Reservas
        </h1>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          aria-label="Contraseña"
          className="input-block mt-10 text-alaya-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-ghost mt-6 w-full text-white disabled:opacity-60"
        >
          {loading ? "…" : "Entrar"}
        </button>
        {error ? (
          <p className="mt-4 text-sm text-white/70" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}

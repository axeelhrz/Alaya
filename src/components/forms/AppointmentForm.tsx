"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { shapers } from "../../../content/shapers";
import {
  appointmentTimeSlots,
  appointmentTypes,
} from "../../../content/appointment-slots";

type FormState = {
  name: string;
  email: string;
  phone: string;
  choice: "alaya" | "shaper" | "";
  shaperSlug: string;
  boardInfo: string;
  appointmentType: "presencial" | "online" | "";
  date: string;
  time: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  choice: "shaper",
  shaperSlug: "",
  boardInfo: "",
  appointmentType: "",
  date: "",
  time: "",
};

export function AppointmentForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const shaperParam = searchParams.get("shaper");
    const choiceParam = searchParams.get("choice");
    if (shaperParam && shapers.some((s) => s.slug === shaperParam)) {
      setForm((prev) => ({
        ...prev,
        choice: "shaper",
        shaperSlug: shaperParam,
      }));
    } else if (choiceParam === "alaya") {
      setForm((prev) => ({ ...prev, choice: "alaya", shaperSlug: "" }));
    }
  }, [searchParams]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          choice: form.shaperSlug ? "shaper" : form.choice || "alaya",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo enviar");
      setStatus("success");
      setMessage("Solicitud enviada. Te confirmaremos fecha y hora.");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Algo salió mal");
    }
  }

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-4">
      <input
        required
        className="input-block"
        placeholder="Nombre y apellidos"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        aria-label="Nombre y apellidos"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="email"
          required
          className="input-block"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          aria-label="Email"
        />
        <input
          type="tel"
          required
          className="input-block"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          aria-label="Teléfono"
        />
        <input
          type="date"
          required
          min={minDate}
          className="input-block"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          aria-label="Fecha"
        />
        <select
          required
          className="input-block"
          value={form.time}
          onChange={(e) => update("time", e.target.value)}
          aria-label="Hora"
        >
          <option value="">Hora</option>
          {appointmentTimeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <select
          required
          className="input-block"
          value={form.choice === "alaya" ? "alaya" : form.shaperSlug}
          onChange={(e) => {
            if (e.target.value === "alaya") {
              update("choice", "alaya");
              update("shaperSlug", "");
            } else {
              update("choice", "shaper");
              update("shaperSlug", e.target.value);
            }
          }}
          aria-label="Selecciona el shaper"
        >
          <option value="">Selecciona el shaper</option>
          <option value="alaya">Alaya</option>
          {shapers.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        <select
          required
          className="input-block"
          value={form.appointmentType}
          onChange={(e) =>
            update("appointmentType", e.target.value as FormState["appointmentType"])
          }
          aria-label="Tipo de cita"
        >
          <option value="">Tipo de cita</option>
          {appointmentTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <textarea
        required
        rows={6}
        className="input-block resize-y normal-case tracking-normal"
        placeholder="Comentarios / información inicial sobre la tabla"
        value={form.boardInfo}
        onChange={(e) => update("boardInfo", e.target.value)}
        aria-label="Comentarios"
      />
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-pill min-w-40 disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Enviar"}
        </button>
      </div>
      {message ? (
        <p
          className={`text-center text-sm ${
            status === "error" ? "text-red-600" : "text-alaya-black"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

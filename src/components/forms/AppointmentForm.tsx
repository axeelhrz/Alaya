"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { shapers } from "../../../content/shapers";
import {
  appointmentChoices,
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
  choice: "",
  shaperSlug: "",
  boardInfo: "",
  appointmentType: "",
  date: "",
  time: "",
};

export function AppointmentForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initial);

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
      setForm((prev) => ({
        ...prev,
        choice: "alaya",
        shaperSlug: "",
      }));
    }
  }, [searchParams]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

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
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo enviar la solicitud");
      setStatus("success");
      setMessage(
        "Solicitud enviada. Te contactaremos para confirmar fecha y hora.",
      );
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Algo salió mal");
    }
  }

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-field">
            Nombre
          </label>
          <input
            id="name"
            required
            className="input-field"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="label-field">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="input-field"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="label-field">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            required
            className="input-field"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="choice" className="label-field">
            Elección
          </label>
          <select
            id="choice"
            required
            className="input-field"
            value={form.choice}
            onChange={(e) => {
              update("choice", e.target.value as FormState["choice"]);
              if (e.target.value !== "shaper") update("shaperSlug", "");
            }}
          >
            <option value="">Selecciona</option>
            {appointmentChoices.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {form.choice === "shaper" ? (
          <div className="md:col-span-2">
            <label htmlFor="shaper" className="label-field">
              Shaper
            </label>
            <select
              id="shaper"
              required
              className="input-field"
              value={form.shaperSlug}
              onChange={(e) => update("shaperSlug", e.target.value)}
            >
              <option value="">Selecciona shaper</option>
              {shapers.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="md:col-span-2">
          <label htmlFor="boardInfo" className="label-field">
            Información inicial sobre la tabla
          </label>
          <textarea
            id="boardInfo"
            required
            rows={4}
            className="input-field resize-y"
            placeholder="Nivel, olas que surfeas, medidas aproximadas, estilo..."
            value={form.boardInfo}
            onChange={(e) => update("boardInfo", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="appointmentType" className="label-field">
            Tipo de cita
          </label>
          <select
            id="appointmentType"
            required
            className="input-field"
            value={form.appointmentType}
            onChange={(e) =>
              update(
                "appointmentType",
                e.target.value as FormState["appointmentType"],
              )
            }
          >
            <option value="">Selecciona</option>
            {appointmentTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="label-field">
            Fecha
          </label>
          <input
            id="date"
            type="date"
            required
            min={minDate}
            className="input-field"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="time" className="label-field">
            Hora disponible
          </label>
          <select
            id="time"
            required
            className="input-field"
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
          >
            <option value="">Selecciona franja</option>
            {appointmentTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Enviando..." : "Solicitar cita"}
      </button>

      {message ? (
        <p
          className={`text-sm ${
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

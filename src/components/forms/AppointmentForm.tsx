"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { shapers } from "../../../content/shapers";
import {
  appointmentTimeSlots,
  appointmentTypes,
} from "../../../content/appointment-slots";
import { DateCalendar, todayKey } from "@/components/forms/DateCalendar";
import { SelectMenu } from "@/components/forms/SelectMenu";

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
    if (!form.date) {
      setStatus("error");
      setMessage("Elige una fecha en el calendario.");
      return;
    }
    if (!form.time || !form.appointmentType || (!form.shaperSlug && form.choice !== "alaya")) {
      setStatus("error");
      setMessage("Completa hora, shaper y tipo de cita.");
      return;
    }
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
        <DateCalendar
          required
          min={todayKey()}
          value={form.date}
          onChange={(next) => update("date", next)}
        />
        <SelectMenu
          required
          name="time"
          placeholder="Hora"
          label="Hora"
          value={form.time}
          onChange={(next) => update("time", next)}
          options={appointmentTimeSlots.map((slot) => ({
            value: slot,
            label: slot,
          }))}
        />
        <SelectMenu
          required
          name="shaper"
          placeholder="Selecciona el shaper"
          label="Selecciona el shaper"
          value={form.choice === "alaya" ? "alaya" : form.shaperSlug}
          onChange={(next) => {
            if (next === "alaya") {
              update("choice", "alaya");
              update("shaperSlug", "");
            } else {
              update("choice", "shaper");
              update("shaperSlug", next);
            }
          }}
          options={[
            { value: "alaya", label: "Alaya" },
            ...shapers.map((s) => ({ value: s.slug, label: s.name })),
          ]}
        />
        <SelectMenu
          required
          name="appointmentType"
          placeholder="Tipo de cita"
          label="Tipo de cita"
          value={form.appointmentType}
          onChange={(next) =>
            update("appointmentType", next as FormState["appointmentType"])
          }
          options={appointmentTypes.map((t) => ({
            value: t.value,
            label: t.label,
          }))}
        />
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

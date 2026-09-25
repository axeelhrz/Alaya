"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getBoard } from "../../../content/boards";
import { shapers } from "../../../content/shapers";
import {
  appointmentTimeSlots,
  appointmentTypes,
} from "../../../content/appointment-slots";
import { DateCalendar, todayKey } from "@/components/forms/DateCalendar";
import { SelectMenu } from "@/components/forms/SelectMenu";
import { useLocale } from "@/components/i18n/LocaleContext";

type FormState = {
  name: string;
  email: string;
  phone: string;
  choice: "alaya" | "shaper" | "";
  shaperSlug: string;
  boardSlug: string;
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
  boardSlug: "",
  boardInfo: "",
  appointmentType: "",
  date: "",
  time: "",
};

export function AppointmentForm() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const shaperParam = searchParams.get("shaper");
    const choiceParam = searchParams.get("choice");
    const boardParam = searchParams.get("board");
    const board = boardParam ? getBoard(boardParam) : undefined;
    setForm((prev) => {
      const next = { ...prev };
      if (shaperParam && shapers.some((s) => s.slug === shaperParam)) {
        next.choice = "shaper";
        next.shaperSlug = shaperParam;
      } else if (choiceParam === "alaya") {
        next.choice = "alaya";
        next.shaperSlug = "";
      }
      if (board) next.boardSlug = board.slug;
      return next;
    });
  }, [searchParams]);

  const selectedBoard = form.boardSlug ? getBoard(form.boardSlug) : undefined;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.date) {
      setStatus("error");
      setMessage(t.cita.pickDate);
      return;
    }
    if (!form.time || !form.appointmentType || (!form.shaperSlug && form.choice !== "alaya")) {
      setStatus("error");
      setMessage(t.cita.completeFields);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus("error");
      setMessage(t.cita.invalidEmail);
      return;
    }
    if (form.boardInfo.trim().length < 10) {
      setStatus("error");
      setMessage(t.cita.moreAboutBoard);
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
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          boardInfo: form.boardInfo.trim(),
          boardSlug: form.boardSlug || undefined,
          choice: form.shaperSlug ? "shaper" : form.choice || "alaya",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo enviar");
      setStatus("success");
      setMessage(t.cita.success);
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Algo salió mal");
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-4">
      <input
        required
        autoComplete="name"
        className="input-block"
        placeholder={t.cita.name}
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        aria-label={t.cita.name}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="email"
          required
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="input-block is-plain"
          placeholder={t.cita.email}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          aria-label={t.cita.email}
        />
        <input
          type="tel"
          required
          autoComplete="tel"
          className="input-block is-plain"
          placeholder={t.cita.phone}
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          aria-label={t.cita.phone}
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
          placeholder={t.cita.time}
          label={t.cita.time}
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
          placeholder={t.cita.shaper}
          label={t.cita.shaper}
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
          placeholder={t.cita.type}
          label={t.cita.type}
          value={form.appointmentType}
          onChange={(next) =>
            update("appointmentType", next as FormState["appointmentType"])
          }
          options={appointmentTypes.map((item) => ({
            value: item.value,
            label: item.value === "presencial" ? t.cita.inPerson : t.cita.online,
          }))}
        />
      </div>
      {selectedBoard ? (
        <div className="flex flex-wrap items-baseline justify-between gap-3 border border-alaya-border px-4 py-3">
          <p className="text-[0.7rem] uppercase tracking-[0.14em]">
            <span className="text-alaya-muted">{t.cita.interestedIn} · </span>
            <Link
              href={`/surf/boards/${selectedBoard.slug}`}
              className="text-alaya-black underline-offset-4 hover:underline"
            >
              {selectedBoard.name}
            </Link>
            <span className="text-alaya-muted"> · {selectedBoard.shaper}</span>
          </p>
          <button
            type="button"
            onClick={() => update("boardSlug", "")}
            className="text-[0.65rem] uppercase tracking-[0.16em] text-alaya-muted hover:text-alaya-black"
          >
            {t.cita.changeBoard}
          </button>
        </div>
      ) : null}
      <textarea
        required
        rows={6}
        className="input-block is-plain resize-y"
        placeholder={t.cita.comments}
        value={form.boardInfo}
        onChange={(e) => update("boardInfo", e.target.value)}
        aria-label={t.cita.comments}
      />
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-pill min-w-40 disabled:opacity-60"
        >
          {status === "loading" ? t.cita.sending : t.cita.send}
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

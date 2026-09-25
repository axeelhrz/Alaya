"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { shapers } from "../../../content/shapers";
import { SelectMenu } from "@/components/forms/SelectMenu";
import { FlameMark } from "@/components/ui/Logo";
import { downloadXlsx } from "@/lib/write-xlsx";
import type { Reserva, ReservaStatus } from "@/lib/reservas";

type StatusFilter = "todas" | ReservaStatus;
type WhenFilter = "todas" | "proximas" | "pasadas" | "semana";
type TypeFilter = "todas" | "presencial" | "online";
type BoardFilter = "todas" | "con" | "sin";
type SortKey = "cita" | "entrada" | "nombre";

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "pendiente", label: "Pendientes" },
  { value: "confirmada", label: "Confirmadas" },
  { value: "cancelada", label: "Canceladas" },
];

function todayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function weekEndKey() {
  const now = new Date();
  now.setDate(now.getDate() + 7);
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDay(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatCreated(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function typeLabel(type: Reserva["appointmentType"]) {
  return type === "presencial" ? "Presencial" : "Online";
}

function statusLabel(status: ReservaStatus) {
  if (status === "pendiente") return "Pendiente";
  if (status === "confirmada") return "Confirmada";
  return "Cancelada";
}

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

function whatsappHref(phone: string) {
  const raw = digits(phone);
  if (raw.length < 8) return null;
  return `https://wa.me/${raw}`;
}

function matchesSearch(reserva: Reserva, query: string) {
  if (!query) return true;
  const hay = [
    reserva.name,
    reserva.email,
    reserva.phone,
    reserva.shaperName,
    reserva.boardName,
    reserva.boardSlug,
    reserva.boardInfo,
    reserva.notes,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(query);
}

export function ReservasPanel({ initial }: { initial: Reserva[] }) {
  const [reservas, setReservas] = useState(initial);
  const [status, setStatus] = useState<StatusFilter>("todas");
  const [when, setWhen] = useState<WhenFilter>("todas");
  const [type, setType] = useState<TypeFilter>("todas");
  const [shaper, setShaper] = useState("todas");
  const [board, setBoard] = useState<BoardFilter>("todas");
  const [sort, setSort] = useState<SortKey>("cita");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});

  const today = todayKey();
  const weekEnd = weekEndKey();

  const pending = reservas.filter((r) => r.status === "pendiente").length;
  const confirmed = reservas.filter((r) => r.status === "confirmada").length;
  const thisWeek = reservas.filter(
    (r) =>
      r.status !== "cancelada" && r.date >= today && r.date <= weekEnd,
  ).length;

  const shaperOptions = useMemo(() => {
    const names = new Set(reservas.map((r) => r.shaperName).filter(Boolean));
    shapers.forEach((item) => names.add(item.name));
    names.add("Alaya");
    return [...names].sort((a, b) => a.localeCompare(b, "es"));
  }, [reservas]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = reservas.filter((r) => {
      if (status !== "todas" && r.status !== status) return false;
      if (type !== "todas" && r.appointmentType !== type) return false;
      if (shaper !== "todas" && r.shaperName !== shaper) return false;
      if (board === "con" && !r.boardSlug && !r.boardName) return false;
      if (board === "sin" && (r.boardSlug || r.boardName)) return false;
      if (when === "proximas" && r.date < today) return false;
      if (when === "pasadas" && r.date >= today) return false;
      if (when === "semana" && (r.date < today || r.date > weekEnd)) return false;
      return matchesSearch(r, q);
    });

    return list.sort((a, b) => {
      if (sort === "nombre") return a.name.localeCompare(b.name, "es");
      if (sort === "entrada") return b.createdAt.localeCompare(a.createdAt);
      const day = a.date.localeCompare(b.date);
      if (day !== 0) return day;
      const time = a.time.localeCompare(b.time);
      if (time !== 0) return time;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [board, query, reservas, shaper, sort, status, today, type, weekEnd, when]);

  async function patch(id: string, body: { status?: ReservaStatus; notes?: string }) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/reservas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReservas((prev) =>
        prev.map((item) => (item.id === id ? data.reserva : item)),
      );
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/panel/logout", { method: "POST" });
    window.location.reload();
  }

  function exportXlsx() {
    downloadXlsx(`reservas-${today}.xlsx`, "Reservas", [
      [
        "Fecha",
        "Hora",
        "Estado",
        "Nombre",
        "Email",
        "Teléfono",
        "Tipo",
        "Shaper",
        "Tabla",
        "Comentario",
        "Notas",
        "Entrada",
      ],
      ...visible.map((r) => [
        r.date,
        r.time,
        statusLabel(r.status),
        r.name,
        r.email,
        r.phone,
        typeLabel(r.appointmentType),
        r.shaperName,
        r.boardName || "",
        r.boardInfo,
        r.notes || "",
        formatCreated(r.createdAt),
      ]),
    ]);
  }

  return (
    <div className="min-h-svh bg-alaya-white text-alaya-black">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-alaya-black px-4 py-4 text-white sm:px-8">
        <div className="flex items-center gap-3">
          <FlameMark className="h-6 w-6" />
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.2em]">Reservas</p>
            <p className="text-[0.6rem] uppercase tracking-[0.16em] text-white/45">
              {pending === 1 ? "1 pendiente" : `${pending} pendientes`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={exportXlsx}
            className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70 hover:text-white"
          >
            Exportar
          </button>
          <button
            type="button"
            onClick={logout}
            className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70 hover:text-white"
          >
            Salir
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8">
        <div className="grid grid-cols-3 gap-3 text-[0.65rem] uppercase tracking-[0.14em] sm:gap-6">
          <div className="border border-alaya-border px-3 py-3">
            <p className="text-alaya-muted">Pendientes</p>
            <p className="mt-1 text-lg tracking-[0.08em]">{pending}</p>
          </div>
          <div className="border border-alaya-border px-3 py-3">
            <p className="text-alaya-muted">Confirmadas</p>
            <p className="mt-1 text-lg tracking-[0.08em]">{confirmed}</p>
          </div>
          <div className="border border-alaya-border px-3 py-3">
            <p className="text-alaya-muted">Esta semana</p>
            <p className="mt-1 text-lg tracking-[0.08em]">{thisWeek}</p>
          </div>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar nombre, email, teléfono, tabla…"
          className="input-block is-plain mt-8"
          aria-label="Buscar reservas"
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SelectMenu
            label="Estado"
            placeholder="Estado"
            value={status}
            onChange={(next) => setStatus(next as StatusFilter)}
            options={statusFilters}
          />
          <SelectMenu
            label="Fecha"
            placeholder="Fecha"
            value={when}
            onChange={(next) => setWhen(next as WhenFilter)}
            options={[
              { value: "todas", label: "Todas las fechas" },
              { value: "proximas", label: "Próximas" },
              { value: "semana", label: "Esta semana" },
              { value: "pasadas", label: "Pasadas" },
            ]}
          />
          <SelectMenu
            label="Tipo"
            placeholder="Tipo"
            value={type}
            onChange={(next) => setType(next as TypeFilter)}
            options={[
              { value: "todas", label: "Presencial y online" },
              { value: "presencial", label: "Presencial" },
              { value: "online", label: "Online" },
            ]}
          />
          <SelectMenu
            label="Shaper"
            placeholder="Shaper"
            value={shaper}
            onChange={setShaper}
            options={[
              { value: "todas", label: "Todos los shapers" },
              ...shaperOptions.map((name) => ({ value: name, label: name })),
            ]}
          />
          <SelectMenu
            label="Tabla"
            placeholder="Tabla"
            value={board}
            onChange={(next) => setBoard(next as BoardFilter)}
            options={[
              { value: "todas", label: "Cualquier tabla" },
              { value: "con", label: "Con modelo" },
              { value: "sin", label: "Sin modelo" },
            ]}
          />
          <SelectMenu
            label="Orden"
            placeholder="Orden"
            value={sort}
            onChange={(next) => setSort(next as SortKey)}
            options={[
              { value: "cita", label: "Orden: cita" },
              { value: "entrada", label: "Orden: más nuevas" },
              { value: "nombre", label: "Orden: nombre" },
            ]}
          />
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-sm text-alaya-muted">
            No hay reservas en este filtro. Las solicitudes de Pide Cita aparecen
            aquí.
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-alaya-border border-y border-alaya-border">
            {visible.map((reserva) => {
              const open = openId === reserva.id;
              const wa = whatsappHref(reserva.phone);
              const notes = draftNotes[reserva.id] ?? reserva.notes ?? "";
              return (
                <li key={reserva.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId(open ? null : reserva.id)
                    }
                    className="flex w-full flex-col gap-2 py-5 text-left sm:grid sm:grid-cols-[9rem_1fr_1fr_7rem] sm:items-baseline sm:gap-4"
                  >
                    <span className="text-sm uppercase tracking-[0.12em]">
                      {formatDay(reserva.date)} · {reserva.time}
                    </span>
                    <span>
                      <span className="block text-sm">{reserva.name}</span>
                      <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.14em] text-alaya-muted">
                        {reserva.boardName || "Sin modelo concreto"}
                      </span>
                    </span>
                    <span className="text-[0.7rem] uppercase tracking-[0.14em] text-alaya-muted">
                      {reserva.shaperName} · {typeLabel(reserva.appointmentType)}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.16em] text-alaya-muted">
                      {statusLabel(reserva.status)}
                    </span>
                  </button>
                  {open ? (
                    <div className="grid gap-6 pb-8 sm:grid-cols-2">
                      <div className="space-y-3 text-sm">
                        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-alaya-muted">
                          Contacto
                        </p>
                        <p>
                          <a
                            href={`mailto:${reserva.email}`}
                            className="hover:underline"
                          >
                            {reserva.email}
                          </a>
                        </p>
                        <p>
                          <a href={`tel:${digits(reserva.phone)}`} className="hover:underline">
                            {reserva.phone}
                          </a>
                          {wa ? (
                            <>
                              {" · "}
                              <a
                                href={wa}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                              >
                                WhatsApp
                              </a>
                            </>
                          ) : null}
                        </p>
                        <p className="text-alaya-muted">
                          Entró el {formatCreated(reserva.createdAt)}
                        </p>
                        <p>
                          {typeLabel(reserva.appointmentType)} · {reserva.shaperName}
                        </p>
                      </div>

                      <div className="space-y-3 text-sm">
                        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-alaya-muted">
                          Tabla
                        </p>
                        {reserva.boardSlug && reserva.boardName ? (
                          <p>
                            <Link
                              href={`/surf/boards/${reserva.boardSlug}`}
                              className="uppercase tracking-[0.12em] hover:underline"
                            >
                              {reserva.boardName}
                            </Link>
                          </p>
                        ) : (
                          <p className="text-alaya-muted">
                            No eligió un modelo del catálogo.
                          </p>
                        )}
                        <p className="whitespace-pre-wrap text-alaya-black">
                          {reserva.boardInfo}
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[0.65rem] uppercase tracking-[0.16em] text-alaya-muted">
                          Notas internas
                          <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) =>
                              setDraftNotes((prev) => ({
                                ...prev,
                                [reserva.id]: e.target.value,
                              }))
                            }
                            className="input-block is-plain mt-2 resize-y"
                          />
                        </label>
                        {notes !== (reserva.notes || "") ? (
                          <button
                            type="button"
                            disabled={busyId === reserva.id}
                            onClick={() => patch(reserva.id, { notes })}
                            className="btn-ghost mt-3 disabled:opacity-60"
                          >
                            Guardar notas
                          </button>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-3 sm:col-span-2">
                        {reserva.status !== "confirmada" && (
                          <button
                            type="button"
                            disabled={busyId === reserva.id}
                            onClick={() =>
                              patch(reserva.id, { status: "confirmada" })
                            }
                            className="btn-pill disabled:opacity-60"
                          >
                            Confirmar
                          </button>
                        )}
                        {reserva.status !== "pendiente" && (
                          <button
                            type="button"
                            disabled={busyId === reserva.id}
                            onClick={() =>
                              patch(reserva.id, { status: "pendiente" })
                            }
                            className="btn-ghost disabled:opacity-60"
                          >
                            Pendiente
                          </button>
                        )}
                        {reserva.status !== "cancelada" && (
                          <button
                            type="button"
                            disabled={busyId === reserva.id}
                            onClick={() =>
                              patch(reserva.id, { status: "cancelada" })
                            }
                            className="btn-ghost disabled:opacity-60"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-6 text-[0.65rem] uppercase tracking-[0.14em] text-alaya-muted">
          {visible.length === 1
            ? "1 reserva"
            : `${visible.length} reservas`}
        </p>
      </div>
    </div>
  );
}

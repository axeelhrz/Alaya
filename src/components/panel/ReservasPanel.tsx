"use client";

import { useMemo, useState } from "react";
import { FlameMark } from "@/components/ui/Logo";
import type { Reserva, ReservaStatus } from "@/lib/reservas";

const filters: { value: "todas" | ReservaStatus; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "pendiente", label: "Pendientes" },
  { value: "confirmada", label: "Confirmadas" },
  { value: "cancelada", label: "Canceladas" },
];

function formatDay(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function ReservasPanel({ initial }: { initial: Reserva[] }) {
  const [reservas, setReservas] = useState(initial);
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("todas");
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      filter === "todas" ? reservas : reservas.filter((r) => r.status === filter),
    [filter, reservas],
  );

  const pending = reservas.filter((r) => r.status === "pendiente").length;

  async function setStatus(id: string, status: ReservaStatus) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/reservas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
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
        <button
          type="button"
          onClick={logout}
          className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70 hover:text-white"
        >
          Salir
        </button>
      </header>

      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8">
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.16em] text-alaya-muted">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={
                filter === item.value ? "text-alaya-black" : "hover:text-alaya-black"
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        {visible.length === 0 ? (
          <p className="mt-16 text-sm text-alaya-muted">
            No hay reservas en este filtro. Las solicitudes de Pide Cita aparecen aquí.
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-alaya-border border-y border-alaya-border">
            {visible.map((reserva) => {
              const open = openId === reserva.id;
              return (
                <li key={reserva.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : reserva.id)}
                    className="flex w-full flex-col gap-2 py-5 text-left sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="text-sm uppercase tracking-[0.12em]">
                      {formatDay(reserva.date)} · {reserva.time}
                    </span>
                    <span className="text-sm">{reserva.name}</span>
                    <span className="text-[0.7rem] uppercase tracking-[0.14em] text-alaya-muted">
                      {reserva.shaperName} · {reserva.appointmentType}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.16em] text-alaya-muted">
                      {reserva.status}
                    </span>
                  </button>
                  {open ? (
                    <div className="pb-6 text-sm text-alaya-muted">
                      <p>{reserva.email}</p>
                      <p className="mt-1">{reserva.phone}</p>
                      <p className="mt-4 whitespace-pre-wrap text-alaya-black">
                        {reserva.boardInfo}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {reserva.status !== "confirmada" && (
                          <button
                            type="button"
                            disabled={busyId === reserva.id}
                            onClick={() => setStatus(reserva.id, "confirmada")}
                            className="btn-pill disabled:opacity-60"
                          >
                            Confirmar
                          </button>
                        )}
                        {reserva.status !== "pendiente" && (
                          <button
                            type="button"
                            disabled={busyId === reserva.id}
                            onClick={() => setStatus(reserva.id, "pendiente")}
                            className="btn-ghost disabled:opacity-60"
                          >
                            Pendiente
                          </button>
                        )}
                        {reserva.status !== "cancelada" && (
                          <button
                            type="button"
                            disabled={busyId === reserva.id}
                            onClick={() => setStatus(reserva.id, "cancelada")}
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
      </div>
    </div>
  );
}

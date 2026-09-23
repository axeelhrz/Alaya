"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function todayKey() {
  const now = new Date();
  return dateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month: month - 1, day };
}

function formatLabel(key: string) {
  const { year, month, day } = parseKey(key);
  return `${pad(day)} ${MONTHS[month].slice(0, 3)} ${year}`;
}

function monthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ key: string; day: number; inMonth: boolean }> = [];

  const prevDays = new Date(year, month, 0).getDate();
  for (let i = startPad; i > 0; i--) {
    const d = prevDays - i + 1;
    const date = new Date(year, month - 1, d);
    cells.push({
      key: dateKey(date.getFullYear(), date.getMonth(), d),
      day: d,
      inMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ key: dateKey(year, month, d), day: d, inMonth: true });
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    const date = new Date(year, month + 1, nextDay);
    cells.push({
      key: dateKey(date.getFullYear(), date.getMonth(), nextDay),
      day: nextDay,
      inMonth: false,
    });
    nextDay += 1;
  }

  return cells;
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  min?: string;
  name?: string;
};

export function DateCalendar({
  value,
  onChange,
  required,
  min = todayKey(),
  name = "date",
}: Props) {
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const initial = value ? parseKey(value) : parseKey(min);
  const [view, setView] = useState({ year: initial.year, month: initial.month });

  useEffect(() => {
    if (!open) return;
    const next = value ? parseKey(value) : parseKey(min);
    setView({ year: next.year, month: next.month });
  }, [open, value, min]);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cells = useMemo(
    () => monthCells(view.year, view.month),
    [view.year, view.month],
  );

  const minView = parseKey(min);
  const canGoPrev =
    view.year > minView.year ||
    (view.year === minView.year && view.month > minView.month);

  function shift(delta: number) {
    const date = new Date(view.year, view.month + delta, 1);
    setView({ year: date.getFullYear(), month: date.getMonth() });
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        className={`input-block w-full text-left ${value ? "text-alaya-black" : "text-alaya-muted"}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={labelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ? formatLabel(value) : "Fecha"}
      </button>
      {open ? (
        <div
          id={labelId}
          role="dialog"
          aria-label="Calendario"
          className="absolute left-0 right-0 z-30 mt-1 border border-alaya-black bg-alaya-white p-4 shadow-none sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              className="px-2 text-xs tracking-[0.16em] text-alaya-black disabled:text-alaya-muted"
              disabled={!canGoPrev}
              onClick={() => shift(-1)}
              aria-label="Mes anterior"
            >
              ←
            </button>
            <p className="text-[0.65rem] uppercase tracking-[0.2em]">
              {MONTHS[view.month]} {view.year}
            </p>
            <button
              type="button"
              className="px-2 text-xs tracking-[0.16em]"
              onClick={() => shift(1)}
              aria-label="Mes siguiente"
            >
              →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="pb-2 text-[0.58rem] uppercase tracking-[0.16em] text-alaya-muted"
              >
                {day}
              </span>
            ))}
            {cells.map((cell) => {
              const disabled = cell.key < min;
              const selected = cell.key === value;
              const today = cell.key === todayKey();
              return (
                <button
                  key={cell.key}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(cell.key);
                    setOpen(false);
                  }}
                  className={[
                    "mx-auto flex h-8 w-8 items-center justify-center text-[0.7rem] tracking-wide",
                    !cell.inMonth && !selected ? "text-alaya-muted/40" : "",
                    disabled ? "cursor-not-allowed text-alaya-muted/30" : "hover:bg-alaya-black hover:text-white",
                    selected ? "bg-alaya-black text-white" : "",
                    today && !selected ? "underline decoration-alaya-black underline-offset-4" : "",
                  ].join(" ")}
                  aria-pressed={selected}
                  aria-current={today ? "date" : undefined}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

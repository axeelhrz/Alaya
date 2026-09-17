"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  matchBoard,
  matchOptions,
  type MatchAnswers,
} from "../../../content/board-match";

const empty: MatchAnswers = {
  level: "intermediate",
  wave: "average",
  style: "fun",
};

export function BoardMatch({ compact = false }: { compact?: boolean }) {
  const [answers, setAnswers] = useState<MatchAnswers>(empty);
  const [revealed, setRevealed] = useState(false);
  const result = useMemo(() => matchBoard(answers), [answers]);

  return (
    <div
      className={
        compact ? "" : "border border-alaya-border p-4 sm:p-6 md:p-10"
      }
    >
      <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
        {(
          [
            ["level", "Nivel", matchOptions.level],
            ["wave", "Olas", matchOptions.wave],
            ["style", "Estilo", matchOptions.style],
          ] as const
        ).map(([key, label, options]) => (
          <fieldset key={key}>
            <legend className="label-field mb-3">{label}</legend>
            <div className="space-y-2">
              {options.map((opt) => {
                const selected = answers[key] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [key]: opt.value }));
                      setRevealed(false);
                    }}
                    className={`min-h-11 w-full border px-4 py-3 text-left text-sm transition ${
                      selected
                        ? "border-alaya-black bg-alaya-black text-white"
                        : "border-alaya-border bg-white hover:border-alaya-black"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          className="btn-primary w-full sm:w-auto"
          onClick={() => setRevealed(true)}
        >
          Ver recomendación
        </button>
        <Link
          href="/surf/boards"
          className="btn-outline w-full text-center sm:w-auto"
        >
          Ver catálogo
        </Link>
      </div>

      {revealed ? (
        <div
          key={`${result.boardSlug}-${result.shaperName}`}
          className="animate-result-in mt-6 border border-alaya-black bg-alaya-surface p-5 sm:mt-8 sm:p-6 md:p-8"
        >
          <p className="section-label">Tu match Alaya</p>
          <h3 className="mt-2 font-display text-3xl uppercase tracking-wide sm:text-4xl">
            {result.boardName}
          </h3>
          <p className="mt-1 text-sm uppercase tracking-[0.14em] text-alaya-muted">
            Shaper · {result.shaperName}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-alaya-muted">
            {result.reason}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={`/pide-cita${result.citaQuery}`}
              className="btn-primary w-full text-center sm:w-auto"
            >
              Pedir cita con este match
            </Link>
            {result.shaperSlug ? (
              <Link
                href={`/surf/shapers/${result.shaperSlug}`}
                className="btn-outline w-full text-center sm:w-auto"
              >
                Ver shaper
              </Link>
            ) : (
              <Link
                href="/surf/boards"
                className="btn-outline w-full text-center sm:w-auto"
              >
                Ver custom
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export type MatchAnswers = {
  level: "beginner" | "intermediate" | "advanced";
  wave: "small" | "average" | "power";
  style: "fun" | "performance" | "travel";
};

export type MatchResult = {
  boardSlug: string;
  boardName: string;
  shaperSlug: string | null;
  shaperName: string;
  reason: string;
  citaQuery: string;
};

const matrix: Record<
  string,
  { boardSlug: string; boardName: string; shaperSlug: string | null; shaperName: string; reason: string }
> = {
  "beginner-small-fun": {
    boardSlug: "dyn-aspen",
    boardName: "DYN Aspen",
    shaperSlug: "dylan",
    shaperName: "Dylan",
    reason:
      "Más volumen y perdón: ideal para progresar en olas pequeñas sin pelear la tabla.",
  },
  "beginner-small-travel": {
    boardSlug: "rb-keel",
    boardName: "RB Keel",
    shaperSlug: "roberds",
    shaperName: "Roberds",
    reason:
      "Fish con glide: fácil de remar y divertida en trips con swell suave.",
  },
  "beginner-average-fun": {
    boardSlug: "ara-mid",
    boardName: "ARA Mid",
    shaperSlug: "arakawa",
    shaperName: "Arakawa",
    reason:
      "Mid-length versátil: paddle fácil y trim limpio cuando la ola ya tiene cara.",
  },
  "intermediate-small-fun": {
    boardSlug: "rb-keel",
    boardName: "RB Keel",
    shaperSlug: "roberds",
    shaperName: "Roberds",
    reason:
      "Keels y outline fish: speed en días flat y maniobras suaves.",
  },
  "intermediate-average-performance": {
    boardSlug: "ap-twin",
    boardName: "AP Twin",
    shaperSlug: "patterson",
    shaperName: "Patterson",
    reason:
      "Twin contemporáneo con drive: responde cuando la ola tiene sección.",
  },
  "intermediate-average-fun": {
    boardSlug: "dyn-aspen",
    boardName: "DYN Aspen",
    shaperSlug: "dylan",
    shaperName: "Dylan",
    reason:
      "All-round equilibrado para el día a día atlántico.",
  },
  "intermediate-power-performance": {
    boardSlug: "mp-hyper",
    boardName: "MP Hyper",
    shaperSlug: "mark-phipps",
    shaperName: "Mark Phipps",
    reason:
      "Shortboard agresivo para beach breaks con punch.",
  },
  "advanced-average-performance": {
    boardSlug: "ap-twin",
    boardName: "AP Twin",
    shaperSlug: "patterson",
    shaperName: "Patterson",
    reason:
      "Precisión Patterson: control y salida limpia en paredes medias.",
  },
  "advanced-power-performance": {
    boardSlug: "mp-hyper",
    boardName: "MP Hyper",
    shaperSlug: "mark-phipps",
    shaperName: "Mark Phipps",
    reason:
      "Respuesta inmediata bajo el pie cuando el swell aprieta.",
  },
  "advanced-power-travel": {
    boardSlug: "alaya-custom",
    boardName: "Alaya Custom",
    shaperSlug: null,
    shaperName: "Alaya",
    reason:
      "Para trips serios o spots concretos, custom es la ventaja real de Alaya.",
  },
  "advanced-average-travel": {
    boardSlug: "ara-mid",
    boardName: "ARA Mid",
    shaperSlug: "arakawa",
    shaperName: "Arakawa",
    reason:
      "Un mid que cubre rangos amplios sin llenar la funda de tablas.",
  },
};

const fallback = {
  boardSlug: "alaya-custom",
  boardName: "Alaya Custom",
  shaperSlug: null as string | null,
  shaperName: "Alaya",
  reason:
    "Tu combo pide un brief a medida. En cita afinamos blank, rocker y glass contigo.",
};

export function matchBoard(answers: MatchAnswers): MatchResult {
  const key = `${answers.level}-${answers.wave}-${answers.style}`;
  const hit = matrix[key] || fallback;
  const citaQuery = hit.shaperSlug
    ? `?shaper=${hit.shaperSlug}`
    : "?choice=alaya";

  return { ...hit, citaQuery };
}

export const matchOptions = {
  level: [
    { value: "beginner" as const, label: "Inicio / progresión" },
    { value: "intermediate" as const, label: "Intermedio" },
    { value: "advanced" as const, label: "Avanzado" },
  ],
  wave: [
    { value: "small" as const, label: "Olas pequeñas" },
    { value: "average" as const, label: "Hombro a overhead" },
    { value: "power" as const, label: "Potentes / hollow" },
  ],
  style: [
    { value: "fun" as const, label: "Diversión / trim" },
    { value: "performance" as const, label: "Performance" },
    { value: "travel" as const, label: "Versátil / travel" },
  ],
};

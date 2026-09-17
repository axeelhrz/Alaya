/** Franjas horarias disponibles (Fase 1 — confirmación manual por el equipo). */
export const appointmentTimeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "16:00",
  "17:00",
  "18:00",
] as const;

export const appointmentTypes = [
  { value: "presencial", label: "Presencial en fábrica" },
  { value: "online", label: "Online" },
] as const;

export const appointmentChoices = [
  { value: "alaya", label: "Alaya" },
  { value: "shaper", label: "Shaper" },
] as const;

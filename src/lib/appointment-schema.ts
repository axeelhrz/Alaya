import { z } from "zod";
import { appointmentTimeSlots } from "../../content/appointment-slots";

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "El nombre es demasiado corto."),
  email: z.string().trim().toLowerCase().email("El e-mail no es válido."),
  phone: z
    .string()
    .trim()
    .min(6, "El teléfono no es válido."),
  choice: z.enum(["alaya", "shaper"]),
  shaperSlug: z.string().trim().optional(),
  boardSlug: z.string().trim().max(80).optional(),
  boardInfo: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más sobre la tabla."),
  appointmentType: z.enum(["presencial", "online"], {
    error: "Elige el tipo de cita.",
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Elige una fecha."),
  time: z.enum(appointmentTimeSlots, { error: "Elige una hora." }),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

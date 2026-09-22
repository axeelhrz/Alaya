import { z } from "zod";
import { appointmentTimeSlots } from "../../content/appointment-slots";

export const appointmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  choice: z.enum(["alaya", "shaper"]),
  shaperSlug: z.string().optional(),
  boardInfo: z.string().min(10),
  appointmentType: z.enum(["presencial", "online"]),
  date: z.string().min(1),
  time: z.enum(appointmentTimeSlots),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

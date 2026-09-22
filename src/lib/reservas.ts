import { get, put } from "@vercel/blob";
import type { AppointmentInput } from "@/lib/appointment-schema";

export type ReservaStatus = "pendiente" | "confirmada" | "cancelada";

export type Reserva = {
  id: string;
  createdAt: string;
  status: ReservaStatus;
  name: string;
  email: string;
  phone: string;
  choice: "alaya" | "shaper";
  shaperSlug?: string;
  shaperName: string;
  boardInfo: string;
  appointmentType: "presencial" | "online";
  date: string;
  time: string;
};

const BLOB_PATH = "reservas.json";

function requireBlobToken() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Falta BLOB_READ_WRITE_TOKEN. Las reservas solo se guardan en Vercel Blob.");
  }
}

async function load(): Promise<Reserva[]> {
  requireBlobToken();
  const file = await get(BLOB_PATH, { access: "private", useCache: false });
  if (!file?.stream) return [];
  const text = await new Response(file.stream).text();
  if (!text.trim()) return [];
  const parsed = JSON.parse(text) as Reserva[];
  return Array.isArray(parsed) ? parsed : [];
}

async function persist(list: Reserva[]) {
  requireBlobToken();
  await put(BLOB_PATH, JSON.stringify(list), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

export async function listReservas() {
  const list = await load();
  return [...list].sort((a, b) => {
    const day = a.date.localeCompare(b.date);
    if (day !== 0) return day;
    const time = a.time.localeCompare(b.time);
    if (time !== 0) return time;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export async function createReserva(
  data: AppointmentInput,
  shaperName: string,
): Promise<Reserva> {
  const list = await load();
  const reserva: Reserva = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pendiente",
    name: data.name,
    email: data.email,
    phone: data.phone,
    choice: data.choice,
    shaperSlug: data.shaperSlug,
    shaperName,
    boardInfo: data.boardInfo,
    appointmentType: data.appointmentType,
    date: data.date,
    time: data.time,
  };
  await persist([reserva, ...list]);
  return reserva;
}

export async function updateReservaStatus(id: string, status: ReservaStatus) {
  const list = await load();
  const index = list.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = { ...list[index], status };
  list[index] = next;
  await persist(list);
  return next;
}

import { get, put } from "@vercel/blob";
import { getBoard } from "../../content/boards";
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
  boardSlug?: string;
  boardName?: string;
  boardInfo: string;
  appointmentType: "presencial" | "online";
  date: string;
  time: string;
  notes?: string;
};

export type ReservaPatch = {
  status?: ReservaStatus;
  notes?: string;
};

function hydrate(reserva: Reserva): Reserva {
  if (reserva.boardSlug && !reserva.boardName) {
    const board = getBoard(reserva.boardSlug);
    if (board) return { ...reserva, boardName: board.name };
  }
  return reserva;
}

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
  return Array.isArray(parsed) ? parsed.map(hydrate) : [];
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
  const board = data.boardSlug ? getBoard(data.boardSlug) : undefined;
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
    boardSlug: board?.slug,
    boardName: board?.name,
    boardInfo: data.boardInfo,
    appointmentType: data.appointmentType,
    date: data.date,
    time: data.time,
    notes: "",
  };
  await persist([reserva, ...list]);
  return reserva;
}

export async function updateReserva(id: string, patch: ReservaPatch) {
  const list = await load();
  const index = list.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = hydrate({ ...list[index], ...patch });
  list[index] = next;
  await persist(list);
  return next;
}

export async function updateReservaStatus(id: string, status: ReservaStatus) {
  return updateReserva(id, { status });
}

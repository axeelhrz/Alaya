import type { Metadata } from "next";
import { SurfHub } from "@/components/surf/SurfHub";

export const metadata: Metadata = {
  title: "Surf",
  description: "Boards, shapers and bookings at Alaya Division.",
};

export default function SurfPage() {
  return <SurfHub />;
}

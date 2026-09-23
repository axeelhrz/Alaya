import type { Metadata } from "next";
import { LegalView } from "@/components/pages/LegalView";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Alaya Division legal notice.",
};

export default function AvisoLegalPage() {
  return <LegalView />;
}

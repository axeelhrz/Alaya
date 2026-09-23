import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Alaya Division.",
};

export default function ContactPage() {
  return <ContactView />;
}

import type { Metadata } from "next";
import { CustomerServiceView } from "@/components/pages/CustomerServiceView";

export const metadata: Metadata = {
  title: "Customer Service",
  description: "Alaya Division customer service.",
};

export default function CustomerServicePage() {
  return <CustomerServiceView />;
}

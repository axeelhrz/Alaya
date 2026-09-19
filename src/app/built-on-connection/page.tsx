import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Built on Connection",
};

export default function BuiltOnConnectionPage() {
  redirect("/new");
}

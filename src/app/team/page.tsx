import type { Metadata } from "next";
import { TeamListView } from "@/components/team/TeamListView";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Alaya Division team: Manuel Lezcano, Laura Coviella, Luis Díaz, Melania Suárez and Gabri Salazar.",
};

export default function TeamPage() {
  return <TeamListView />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservas",
  robots: { index: false, follow: false },
};

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-alaya-white">
      {children}
    </div>
  );
}

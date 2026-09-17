import Link from "next/link";

export function AnnouncementBar() {
  const items = [
    "Lanzamiento 25·09",
    "Tienda de tablas",
    "Casa de shapers",
    "Pide cita en fábrica u online",
    "Encuentra tu tabla",
    "Built on Connection",
  ];
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-alaya-black text-alaya-white">
      <div className="animate-marquee flex w-max gap-8 py-2 pr-4 pl-4 whitespace-nowrap sm:gap-10 sm:pr-28">
        {loop.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="inline-flex items-center gap-8 text-[0.6rem] font-semibold uppercase tracking-[0.14em] sm:gap-10 sm:text-[0.65rem] sm:tracking-[0.16em]"
          >
            <span>{text}</span>
            <span className="text-white/30" aria-hidden>
              /
            </span>
          </span>
        ))}
      </div>
      <Link
        href="/pide-cita"
        className="absolute top-0 right-0 z-10 hidden h-full items-center bg-gradient-to-l from-alaya-black via-alaya-black to-transparent pl-8 pr-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em] underline-offset-2 hover:underline sm:flex"
      >
        Pide cita
      </Link>
    </div>
  );
}

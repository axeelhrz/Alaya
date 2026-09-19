import Link from "next/link";

export type Crumb = { href?: string; label: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-[0.65rem] uppercase tracking-[0.18em] text-alaya-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>—</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-alaya-black">
                {item.label}
              </Link>
            ) : (
              <span className="text-alaya-black">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

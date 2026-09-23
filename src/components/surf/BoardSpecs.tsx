"use client";

import type { Board } from "../../../content/boards";
import { boardCopy } from "../../../content/catalog-i18n";
import { useLocale } from "@/components/i18n/LocaleContext";

function Spec({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="border-t border-alaya-border py-3">
      <p className="page-kicker">{label}</p>
      <p className="mt-2 text-sm leading-relaxed">{value}</p>
    </div>
  );
}

export function BoardSpecs({ board }: { board: Board }) {
  const { locale, t } = useLocale();
  const copy = boardCopy(board, locale);
  const hasDetail = Boolean(copy.wave || copy.body || board.sizes?.length);
  if (!hasDetail) return null;

  const paragraphs = copy.body?.split("\n").filter(Boolean) ?? [];

  return (
    <div className="mt-10">
      <Spec label={t.boards.wave} value={copy.wave} />
      <Spec label={t.boards.rider} value={copy.rider} />

      {paragraphs.map((p) => (
        <p key={p.slice(0, 24)} className="mt-5 text-sm leading-relaxed text-alaya-muted">
          {p}
        </p>
      ))}

      {(copy.rocker || copy.rails || copy.bottom || copy.fins || board.volume) && (
        <section className="mt-10">
          <p className="page-kicker">{t.boards.specs}</p>
          <dl className="mt-4">
            <Spec label="Rocker" value={copy.rocker} />
            <Spec label="Rails" value={copy.rails} />
            <Spec label="Bottom" value={copy.bottom} />
            <Spec label={t.boards.fins} value={copy.fins} />
            <Spec label={t.boards.volume} value={board.volume} />
          </dl>
        </section>
      )}

      {board.sizes && board.sizes.length > 0 && (
        <section className="mt-10">
          <p className="page-kicker">{t.boards.stock}</p>
          <p className="mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-alaya-muted">
            {t.boards.weights}
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-[0.7rem] uppercase tracking-[0.08em]">
              <thead>
                <tr className="border-b border-alaya-border text-alaya-muted">
                  <th className="py-2 pr-3 font-medium">Dims</th>
                  <th className="py-2 pr-3 font-medium">L</th>
                  <th className="py-2 pr-3 font-medium">Adv</th>
                  <th className="py-2 pr-3 font-medium">Int</th>
                  <th className="py-2 font-medium">Nov</th>
                </tr>
              </thead>
              <tbody>
                {board.sizes.map((row) => (
                  <tr key={row.dims} className="border-b border-alaya-border/70">
                    <td className="py-2 pr-3 whitespace-nowrap">{row.dims}</td>
                    <td className="py-2 pr-3">{row.liters.toFixed(1)}</td>
                    <td className="py-2 pr-3">{row.advKg}</td>
                    <td className="py-2 pr-3">{row.intKg}</td>
                    <td className="py-2">{row.novKg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {copy.sizing && (
        <section className="mt-10">
          <p className="page-kicker">{t.boards.howToSize}</p>
          <p className="mt-3 text-sm leading-relaxed text-alaya-muted">{copy.sizing}</p>
        </section>
      )}
    </div>
  );
}

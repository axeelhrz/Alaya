"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleContext";
import { BoardPhoto } from "@/components/surf/BoardPhoto";

export function BoardGallery({
  name,
  image,
  back,
  composite,
}: {
  name: string;
  image: string;
  back?: string;
  composite?: string;
}) {
  const [view, setView] = useState<"front" | "back" | "composite">("front");
  const src =
    view === "composite" && composite
      ? composite
      : view === "back" && back
        ? back
        : image;
  const wide = view === "composite" && Boolean(composite);
  const hasViews = Boolean(back || composite);
  const { t } = useLocale();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      <BoardPhoto
        src={src}
        alt={name}
        className={
          wide
            ? "h-[min(52svh,420px)] w-[min(96%,720px)] lg:h-[78vh]"
            : "h-[min(56svh,480px)] w-[min(96%,560px)] lg:h-[82vh]"
        }
        sizes={wide ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 50vw"}
      />
      {hasViews ? (
        <div className="mt-4 flex gap-6 text-[0.65rem] uppercase tracking-[0.16em] text-alaya-muted">
          <button
            type="button"
            onClick={() => setView("front")}
            className={view === "front" ? "text-alaya-black" : "hover:text-alaya-black"}
          >
            {t.boards.front}
          </button>
          {back ? (
            <button
              type="button"
              onClick={() => setView("back")}
              className={view === "back" ? "text-alaya-black" : "hover:text-alaya-black"}
            >
              {t.boards.back}
            </button>
          ) : null}
          {composite ? (
            <button
              type="button"
              onClick={() => setView("composite")}
              className={view === "composite" ? "text-alaya-black" : "hover:text-alaya-black"}
            >
              {t.boards.composite}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BoardSilhouette } from "@/components/surf/BoardSilhouette";
import { robertsPhotoCandidates } from "@/lib/robertsPhoto";

export function BoardPhoto({
  src,
  alt,
  className = "h-44 sm:h-52",
  sizes = "200px",
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const candidates = useMemo(
    () => (src ? robertsPhotoCandidates(src) : []),
    [src],
  );
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(src);
  if (seen !== src) {
    setSeen(src);
    setIndex(0);
  }
  const current = candidates[Math.min(index, Math.max(candidates.length - 1, 0))];

  return (
    <div className={`relative mx-auto w-full bg-transparent ${className}`}>
      {current ? (
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          unoptimized
          quality={95}
          className="bg-transparent object-contain object-center"
          sizes={sizes}
          onError={() => {
            setIndex((i) => (i + 1 < candidates.length ? i + 1 : i));
          }}
        />
      ) : (
        <BoardSilhouette className="mx-auto h-full w-auto text-alaya-black/75" />
      )}
    </div>
  );
}

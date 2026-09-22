import Image from "next/image";
import { BoardSilhouette } from "@/components/surf/BoardSilhouette";

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
  const hasPhoto = Boolean(src?.includes("/roberts/"));

  return (
    <div className={`relative mx-auto w-full ${className}`}>
      {hasPhoto && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          quality={95}
          className="object-contain object-center"
          sizes={sizes}
        />
      ) : (
        <BoardSilhouette className="mx-auto h-full w-auto text-alaya-black/75" />
      )}
    </div>
  );
}

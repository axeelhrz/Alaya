"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleContext";
import { useSubscribe } from "@/components/subscribe/SubscribeContext";

const looks = [
  { src: "/images/apparel/look-01.png", alt: "Alaya tees", aspect: "aspect-[1536/1024]", span: "col-span-2" },
  { src: "/images/apparel/look-02.png", alt: "Alaya long sleeve", aspect: "aspect-[1117/1409]" },
  { src: "/images/apparel/look-03.png", alt: "Alaya tank", aspect: "aspect-[1086/1449]" },
  { src: "/images/apparel/look-04.png", alt: "Alaya white tee", aspect: "aspect-[1041/1510]" },
  { src: "/images/apparel/look-05.png", alt: "Alaya flame back", aspect: "aspect-[1129/1393]" },
  { src: "/images/apparel/look-06.png", alt: "Alaya bones tee", aspect: "aspect-[1023/1537]" },
];

export default function ApparelPage() {
  const { open } = useSubscribe();
  const { t } = useLocale();

  return (
    <>
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[1280/735] -mt-14 bg-alaya-black sm:-mt-16 lg:mt-0 lg:aspect-auto lg:min-h-[calc(100svh-4rem)]">
          <Image
            src="/images/apparel/loosers.jpg"
            alt="Apparel Alaya"
            fill
            priority
            quality={95}
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
          <p className="page-kicker">{t.pages.apparelKicker}</p>
          <h1 className="mt-4 max-w-full break-words text-3xl font-light uppercase tracking-[0.1em] sm:text-6xl sm:tracking-[0.16em]">
            {t.pages.apparelTitle}
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-alaya-muted">
            {t.pages.apparelText}
          </p>
          <button type="button" className="btn-pill mt-8 w-fit" onClick={() => open("apparel")}>
            {t.home.subscribe}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {looks.map((look) => (
          <div key={look.src} className={`relative bg-alaya-black ${look.aspect} ${look.span ?? ""}`}>
            <Image
              src={look.src}
              alt={look.alt}
              fill
              quality={95}
              className="object-contain object-center"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </>
  );
}

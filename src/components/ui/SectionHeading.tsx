type SectionHeadingProps = {
  label?: string;
  title: string;
  titleDisplay?: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  titleDisplay,
  description,
  light = false,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {label ? (
        <p className={`section-label mb-3 ${light ? "text-white/70" : ""}`}>
          {label}
        </p>
      ) : null}
      <h2
        className={`text-[2.15rem] leading-[0.95] break-words sm:text-4xl md:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-alaya-black"
        }`}
      >
        {titleDisplay ? (
          <>
            <span className="font-serif font-normal tracking-normal">
              {title}{" "}
            </span>
            <span className="font-display uppercase">{titleDisplay}</span>
          </>
        ) : (
          <span className="font-display uppercase tracking-wide">{title}</span>
        )}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-xl text-sm leading-relaxed sm:text-base ${
            light ? "text-white/80" : "text-alaya-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

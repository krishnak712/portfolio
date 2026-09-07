export default function SectionHeader({ index, eyebrow, title, meta, description }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-container-highest/40 pb-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-code text-xs sm:text-[12px] text-primary">{index} // {eyebrow}</span>
          <span className="text-outline-variant">/</span>
          {meta && <span className="font-code text-xs sm:text-[12px] text-on-surface-variant">{meta}</span>}
        </div>
        <h2 className="font-headline text-xl sm:text-2xl lg:text-[32px] leading-10 text-on-surface tracking-tight font-bold">{title}</h2>
        {description && <p className="font-body text-xs sm:text-sm text-on-surface-variant">{description}</p>}
      </div>
    </div>
  );
}

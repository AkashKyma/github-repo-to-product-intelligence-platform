type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{eyebrow}</p>
      <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

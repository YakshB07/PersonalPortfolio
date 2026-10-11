interface SectionHeaderProps {
  index: string;
  title: string;
  headingId: string;
  /** Optional mono note on the right, e.g. a date. */
  note?: string;
}

export function SectionHeader({ index, title, headingId, note }: SectionHeaderProps) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-3 md:mb-14">
      <h2 id={headingId} className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight md:text-5xl">
        <span className="font-mono text-base font-normal text-accent-ink md:text-lg">{index} /</span>
        {title}
      </h2>
      {note && <p className="label">{note}</p>}
    </header>
  );
}

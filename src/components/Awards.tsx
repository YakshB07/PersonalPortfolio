import { awards } from '../data/resume';
import { SectionHeader } from './ui/SectionHeader';

export default function Awards() {
  return (
    <section id="awards" aria-labelledby="awards-heading" className="sheet py-14 md:py-20">
      <SectionHeader index="05" title="Awards & Scholarships" headingId="awards-heading" />
      <ol className="md:ml-[25%]">
        {awards.map((award, i) => (
          <li key={award.title} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-ink/30 py-4 first:border-t first:border-ink">
            <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6">
              <p className="text-xl font-medium">{award.title}</p>
              <p className="font-mono text-sm text-accent-ink">
                {[award.detail, award.year].filter(Boolean).join(' · ')}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

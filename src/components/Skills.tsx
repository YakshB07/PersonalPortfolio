import { skills } from '../data/resume';
import { SectionHeader } from './ui/SectionHeader';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-y border-ink/15 bg-paper-deep/60 py-14 md:py-20">
      <div className="sheet">
        <SectionHeader index="04" title="Skills" headingId="skills-heading" />
        <div className="grid border-l border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <div key={group.label} className="border-b border-r border-ink p-5">
              <h3 className={`font-mono text-xs uppercase tracking-[0.12em] ${i === 0 ? 'text-accent-ink' : 'text-ink-soft'}`}>
                {group.label}
              </h3>
              <ul className="mt-4 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className={i === 0 ? 'text-lg font-medium' : 'text-base'}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

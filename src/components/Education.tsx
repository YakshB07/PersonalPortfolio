import { education } from '../data/resume';
import { SectionHeader } from './ui/SectionHeader';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="sheet py-14 md:py-20">
      <SectionHeader index="01" title="Education" headingId="education-heading" />
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-2xl font-semibold md:text-3xl">{education.school}</p>
          <p className="mt-1 text-lg text-ink-soft">{education.degree}</p>
        </div>
        <dl className="grid grid-cols-2 gap-4 self-end font-mono text-sm md:col-span-5">
          <div>
            <dt className="label">Graduation</dt>
            <dd className="mt-1">{education.graduation}</dd>
          </div>
          <div>
            <dt className="label">Location</dt>
            <dd className="mt-1">{education.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

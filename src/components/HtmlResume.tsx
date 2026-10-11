import { awards, contact, education, experience, profile, projects, skills } from '../data/resume';

function ResumeHeading({ children }: { children: string }) {
  return <h4 className="mt-6 border-b border-ink pb-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em]">{children}</h4>;
}

/** One-page HTML rendering of the resume, built from the same data as the rest of the site. */
export default function HtmlResume() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <article aria-label="Resume" className="text-[0.92rem] leading-snug text-ink">
      <header className="text-center">
        <h3 className="text-2xl font-semibold">{profile.name}</h3>
        <p className="mt-1 break-words font-mono text-[0.72rem] text-ink-soft">
          {contact.email} · {contact.phone} · github.com/{contact.github} · {contact.linkedin}
        </p>
      </header>

      <ResumeHeading>Education</ResumeHeading>
      <div className="mt-2 flex flex-wrap justify-between gap-x-4">
        <p>
          <strong>{education.school}</strong>, {education.degree}
        </p>
        <p className="font-mono text-xs text-ink-soft">
          Grad. {education.graduation} · {education.location}
        </p>
      </div>

      <ResumeHeading>Experience</ResumeHeading>
      {experience.map((role) => (
        <section key={role.id} className="mt-3">
          <div className="flex flex-wrap justify-between gap-x-4">
            <p>
              <strong>{role.title}</strong>, {role.company}
            </p>
            {(role.dates || role.location) && (
              <p className="font-mono text-xs text-ink-soft">{[role.dates, role.location].filter(Boolean).join(' · ')}</p>
            )}
          </div>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {role.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ))}

      <ResumeHeading>Projects</ResumeHeading>
      {featured.map((p) => (
        <section key={p.id} className="mt-3">
          <div className="flex flex-wrap justify-between gap-x-4">
            <p>
              <strong>{p.title}</strong>, {p.tag}
            </p>
            <p className="font-mono text-xs text-ink-soft">{p.tech.join(', ')}</p>
          </div>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-2">
        <strong>Also:</strong> {others.map((p) => p.title).join(' · ')}
      </p>

      <ResumeHeading>Skills</ResumeHeading>
      <dl className="mt-2 space-y-1">
        {skills.map((g) => (
          <div key={g.label}>
            <dt className="inline font-semibold">{g.label}: </dt>
            <dd className="inline">{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>

      <ResumeHeading>Awards</ResumeHeading>
      <ul className="mt-2 list-disc pl-5">
        {awards.map((a) => (
          <li key={a.title}>
            {a.title}
            {(a.detail || a.year) && ` (${[a.detail, a.year].filter(Boolean).join(', ')})`}
          </li>
        ))}
      </ul>
    </article>
  );
}

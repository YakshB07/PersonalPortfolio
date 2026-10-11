import { contact, education, LAST_UPDATED, profile, RESUME_PDF } from '../data/resume';

const TITLE_BLOCK = [
  { label: 'Drawn by', value: profile.name },
  { label: 'Discipline', value: profile.discipline },
  { label: 'Institution', value: education.school },
  { label: 'Location', value: profile.location },
  { label: 'Rev', value: LAST_UPDATED },
  { label: 'Sheet', value: '1 / 1' },
];

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="grid-paper border-b border-ink/15 pt-14">
      <div className="sheet grid gap-8 pb-10 pt-10 md:pt-20 lg:grid-cols-12 lg:gap-x-12 lg:pb-16">
        <div className="lg:col-span-9">
          <p className="label">
            {education.degree} · {education.school}
          </p>
          <h1 id="hero-name" className="mt-3 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.5rem]">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-snug text-ink sm:text-3xl">{profile.headline}</p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">{profile.bio}</p>

          <p className="mt-8 max-w-xl border-l-2 border-accent pl-3 text-base text-ink-soft">{profile.availability}</p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <a href={RESUME_PDF} download className="btn-primary col-span-2">
              Download Resume
            </a>
            <a href="#projects" className="btn-ghost">
              View Projects
            </a>
            <a href={`mailto:${contact.email}`} className="btn-ghost">
              Email Me
            </a>
          </div>
        </div>

        {profile.photo && (
          <div className="lg:col-span-3 lg:self-end">
            <img
              src={profile.photo}
              alt={`Photo of ${profile.name}`}
              width={480}
              height={600}
              className="aspect-[4/5] w-48 border border-ink object-cover lg:w-full"
            />
          </div>
        )}
      </div>

      {/* Title block, as in the corner of a drawing sheet. */}
      <div className="sheet pb-8">
        <dl className="grid grid-cols-2 border-l border-t border-ink sm:grid-cols-3 lg:grid-cols-6">
          {TITLE_BLOCK.map((cell) => (
            <div key={cell.label} className="border-b border-r border-ink bg-paper px-3 py-2">
              <dt className="label text-[0.62rem]">{cell.label}</dt>
              <dd className="truncate font-mono text-sm">{cell.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

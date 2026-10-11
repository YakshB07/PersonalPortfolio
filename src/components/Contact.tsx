import { contact, profile, RESUME_PDF } from '../data/resume';
import { SectionHeader } from './ui/SectionHeader';

export default function Contact() {
  return (
    <>
      <section id="contact" aria-labelledby="contact-heading" className="sheet py-14 md:py-20">
        <SectionHeader index="07" title="Contact" headingId="contact-heading" />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="max-w-lg text-lg text-ink-soft">{profile.availability}</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-6 inline-block break-all text-2xl font-semibold text-accent-ink underline decoration-2 underline-offset-[6px] hover:text-ink sm:text-4xl"
            >
              {contact.email}
            </a>
            <p className="mt-4 font-mono text-sm">
              <a href={contact.phoneHref} className="hover:text-accent-ink">
                {contact.phone}
              </a>
            </p>
          </div>

          <ul className="grid gap-2 self-end sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <li>
              <a href={`mailto:${contact.email}`} className="btn-primary w-full">
                Email me
              </a>
            </li>
            <li>
              <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={RESUME_PDF} download className="btn-ghost w-full">
                Download resume
              </a>
            </li>
          </ul>
        </div>
      </section>

      <footer className="border-t border-ink pb-24 pt-6 md:pb-8">
        <div className="sheet flex flex-wrap justify-between gap-2 font-mono text-xs text-ink-soft">
          <p>© 2026 {profile.name}</p>
          <p className="hidden md:block">
            Press <kbd className="border border-ink/40 px-1">`</kbd> for a terminal
          </p>
        </div>
      </footer>
    </>
  );
}

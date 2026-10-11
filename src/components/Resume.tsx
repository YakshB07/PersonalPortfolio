import { LAST_UPDATED, RESUME_PDF } from '../data/resume';
import HtmlResume from './HtmlResume';
import { SectionHeader } from './ui/SectionHeader';

export default function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="border-y border-ink/15 bg-paper-deep/60 py-14 md:py-20">
      <div className="sheet">
        <SectionHeader index="06" title="Resume" headingId="resume-heading" note={`Last updated ${LAST_UPDATED}`} />

        <div className="mb-8 flex flex-wrap gap-2">
          <a href={RESUME_PDF} download className="btn-primary">
            Download PDF
          </a>
          <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Open in new tab ↗
          </a>
        </div>

        <div className="relative mx-auto max-w-[52rem]">
          {/* Two offset sheets underneath read as a document stack. */}
          <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 border border-ink/30 bg-white/60" />
          <div className="relative border border-ink bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-10">
            <HtmlResume />
          </div>
        </div>
      </div>
    </section>
  );
}

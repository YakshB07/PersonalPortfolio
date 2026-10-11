import { useEffect, useState, type ReactNode } from 'react';
import { LAST_UPDATED, RESUME_PDF } from '../data/resume';
import { DESKTOP, FINE_POINTER, useMediaQuery } from '../hooks/useMediaQuery';
import HtmlResume from './HtmlResume';
import { SectionHeader } from './ui/SectionHeader';

type PdfStatus = 'checking' | 'available' | 'missing';

/** Checks that the PDF actually exists so we never embed a 404 page. */
function usePdfStatus(enabled: boolean): PdfStatus {
  const [status, setStatus] = useState<PdfStatus>('checking');

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    fetch(RESUME_PDF, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        const type = res.headers.get('content-type') ?? '';
        setStatus(res.ok && type.includes('pdf') ? 'available' : 'missing');
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setStatus('missing');
      });
    return () => controller.abort();
  }, [enabled]);

  return status;
}

function PaperSheet({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto max-w-[52rem]">
      {/* Two offset sheets underneath read as a document stack. */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 border border-ink/30 bg-white/60" />
      <div className="relative border border-ink bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-10">{children}</div>
    </div>
  );
}

export default function Resume() {
  // Large touch tablets pass the width check but render PDF embeds badly, so require a mouse too.
  const isDesktop = useMediaQuery(`${DESKTOP} and ${FINE_POINTER}`);
  const pdfStatus = usePdfStatus(isDesktop);
  const showPdf = isDesktop && pdfStatus === 'available';

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

        {showPdf ? (
          <div className="relative mx-auto max-w-[56rem]">
            <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 border border-ink/30 bg-white/60" />
            <object
              data={`${RESUME_PDF}#view=FitH`}
              type="application/pdf"
              aria-label="Yaksh Butani resume (PDF)"
              className="relative block h-[1150px] w-full border border-ink bg-white"
            >
              <PaperSheet>
                <HtmlResume />
              </PaperSheet>
            </object>
          </div>
        ) : (
          <PaperSheet>
            <HtmlResume />
          </PaperSheet>
        )}
      </div>
    </section>
  );
}

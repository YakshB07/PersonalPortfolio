import { useLayoutEffect, useRef } from 'react';
import type { CaseStudy, Project } from '../data/resume';
import { useTilt } from '../hooks/useTilt';
import { gsap, MOTION_OK } from '../lib/gsap';
import { TechChips } from './ui/TechChips';

interface CaseStudyCardProps {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
  isLead?: boolean;
}

/** Drafting registration marks that slide into the thumbnail corners on hover. */
const CORNERS = [
  'left-3 top-3 border-l border-t -translate-x-1 -translate-y-1',
  'right-3 top-3 border-r border-t translate-x-1 -translate-y-1',
  'left-3 bottom-3 border-l border-b -translate-x-1 translate-y-1',
  'right-3 bottom-3 border-r border-b translate-x-1 translate-y-1',
];

function ResultBody({ cs, numberRef }: { cs: CaseStudy; numberRef: React.RefObject<HTMLSpanElement> }) {
  if (!cs.figure) return <p className="mt-1 font-medium text-accent-ink">{cs.result}</p>;
  const { value, suffix, label, note } = cs.figure;
  return (
    <>
      <p className="sr-only">{cs.result}</p>
      <div aria-hidden="true" className="mt-1 flex items-baseline gap-3">
        <span className="font-mono text-5xl font-semibold leading-none tracking-tighter text-accent">
          <span ref={numberRef} className="inline-block min-w-[2ch] text-right tabular-nums">
            {value}
          </span>
          {suffix}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">{label}</span>
      </div>
      <p aria-hidden="true" className="mt-2 text-ink-soft">
        {note}
      </p>
    </>
  );
}

/** Whole card is clickable via the stretched button; tilt is applied to the outer article. */
export function CaseStudyCard({ project, index, onOpen, isLead = false }: CaseStudyCardProps) {
  const tiltRef = useTilt<HTMLElement>();
  const rowsRef = useRef<HTMLDListElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const cs = project.caseStudy;
  const figureValue = cs?.figure?.value;
  const number = String(index + 1).padStart(2, '0');

  // Rules draw in like pen strokes, then each row's text settles; the result figure counts up.
  useLayoutEffect(() => {
    const rows = rowsRef.current;
    if (!rows) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: rows, start: 'top 82%', once: true } });
      tl.from(rows.querySelectorAll('[data-rule]'), {
        scaleX: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.15,
      }).from(
        rows.querySelectorAll('[data-row-body]'),
        { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out', stagger: 0.15 },
        0.25,
      );

      if (figureValue !== undefined && numberRef.current) {
        const counter = { value: 0 };
        const render = () => {
          if (numberRef.current) numberRef.current.textContent = String(Math.round(counter.value));
        };
        render();
        tl.to(counter, { value: figureValue, duration: 1.4, ease: 'power3.out', onUpdate: render }, 0.6);
        return () => {
          counter.value = figureValue;
          render();
        };
      }
    });
    return () => mm.revert();
  }, [figureValue]);

  const rows = cs
    ? [
        { term: 'Problem', body: <p className="mt-1">{cs.problem}</p> },
        { term: 'What I built', body: <p className="mt-1">{cs.built}</p> },
        { term: 'Result', body: <ResultBody cs={cs} numberRef={numberRef} /> },
      ]
    : [];

  return (
    <article
      ref={tiltRef}
      className="group relative flex h-full flex-col border border-ink bg-paper transition-[transform,box-shadow] duration-200 ease-out will-change-transform hover:shadow-[6px_6px_0_0_rgb(23_21_15)]"
    >
      {project.thumb && (
        <div className="relative overflow-hidden border-b border-ink">
          <img
            src={project.thumb}
            alt=""
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {CORNERS.map((pos) => (
            <span
              key={pos}
              aria-hidden="true"
              className={`absolute h-4 w-4 border-accent opacity-0 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 ${pos}`}
            />
          ))}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 border-r border-t border-ink bg-paper px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider"
          >
            Fig. {number}
          </span>
        </div>
      )}

      <div className={isLead ? 'flex flex-1 flex-col p-6 md:p-8' : 'flex flex-1 flex-col p-6'}>
        <p className="label flex justify-between gap-2">
          <span>Case study {number}</span>
          <span className="truncate">{project.tag}</span>
        </p>
        <h3 className={`mt-2 font-semibold tracking-tight ${isLead ? 'text-3xl md:text-4xl' : 'text-2xl md:text-[1.75rem]'}`}>
          {project.title}
        </h3>

        {cs && (
          <dl ref={rowsRef} className={`mt-6 text-[0.95rem] leading-snug ${isLead ? 'md:text-base' : ''}`}>
            {rows.map(({ term, body }, i) => (
              <div key={term} className="relative grid grid-cols-[2rem_1fr] gap-x-3 py-3.5">
                <span data-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-ink/25" />
                <span aria-hidden="true" className="pt-px font-mono text-xs text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div data-row-body>
                  <dt className="label">{term}</dt>
                  <dd>{body}</dd>
                </div>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto pt-4">
          <TechChips items={project.tech} />
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 font-mono text-sm font-medium text-accent-ink underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
          >
            Open case study
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
            <span className="sr-only">: {project.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

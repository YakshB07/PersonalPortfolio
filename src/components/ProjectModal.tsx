import { useEffect, useRef, useState } from 'react';
import type { Media, Project } from '../data/resume';
import { TechChips } from './ui/TechChips';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

function MediaViewer({ media, title }: { media: Media[]; title: string }) {
  const [index, setIndex] = useState(0);
  const current = media[index];
  const step = (delta: number) => setIndex((i) => (i + delta + media.length) % media.length);

  return (
    <figure className="border-b border-ink bg-ink">
      <div className="flex h-[32vh] w-full items-center justify-center sm:h-[40vh]">
        {current.type === 'image' ? (
          <img key={current.url} src={current.url} alt={current.alt} className="max-h-full max-w-full object-contain" />
        ) : (
          <video
            key={current.url}
            src={current.url}
            aria-label={current.alt}
            className="max-h-full max-w-full"
            controls
            muted
            playsInline
            preload="metadata"
          />
        )}
      </div>
      {media.length > 1 && (
        <figcaption className="flex items-center justify-between border-t border-paper/20 px-3 py-1 font-mono text-xs text-paper">
          <button type="button" onClick={() => step(-1)} className="min-h-[44px] px-2 hover:text-accent">
            ← Prev<span className="sr-only"> {title} media</span>
          </button>
          <span aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => step(1)} className="min-h-[44px] px-2 hover:text-accent">
            Next →<span className="sr-only"> {title} media</span>
          </button>
        </figcaption>
      )}
    </figure>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock scroll, move focus in, trap Tab, close on Escape, restore focus on close.
  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;
  const cs = project.caseStudy;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="animate-sheet-in relative flex max-h-[92vh] w-full max-w-4xl flex-col border border-ink bg-paper shadow-[8px_8px_0_0_rgb(23_21_15)]"
      >
        <div className="flex items-center justify-between border-b border-ink px-4 py-2">
          <p className="label truncate">
            {cs ? 'Case study' : 'Project'} · {project.tag}
            {project.dates && ` · ${project.dates}`}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-2 font-mono text-xs uppercase tracking-wider hover:text-accent-ink"
          >
            Close ✕
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain" tabIndex={0} role="region" aria-labelledby="project-modal-title">
          {/* Media slot: rendered only when there is media to show. */}
          {project.media.length > 0 && <MediaViewer media={project.media} title={project.title} />}

          <div className="p-5 md:p-8">
            <h2 id="project-modal-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
              {project.title}
            </h2>

            {cs ? (
              <dl className="mt-6 grid border-l border-t border-ink md:grid-cols-3">
                {[
                  { term: 'Problem', body: cs.problem },
                  { term: 'What I built', body: cs.built },
                  { term: 'Result', body: cs.result },
                ].map(({ term, body }) => (
                  <div key={term} className="border-b border-r border-ink p-4">
                    <dt className="label">{term}</dt>
                    <dd className={`mt-1.5 leading-snug ${term === 'Result' ? 'font-medium text-accent-ink' : ''}`}>
                      {body}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              project.overview && <p className="mt-4 max-w-2xl text-lg leading-snug text-ink-soft">{project.overview}</p>
            )}

            <h3 className="label mt-8">Details</h3>
            <ul className="mt-3 space-y-2 leading-relaxed">
              {project.bullets.map((b) => (
                <li key={b} className="grid grid-cols-[1rem_1fr]">
                  <span aria-hidden="true" className="font-mono text-ink-faint">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h3 className="label mb-3 mt-8">Tech used</h3>
            <TechChips items={project.tech} />

            {project.github && (
              <p className="mt-8 border-t border-ink/20 pt-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="link font-mono text-sm">
                  View on GitHub ↗
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

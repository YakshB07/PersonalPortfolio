import { useLayoutEffect, useRef } from 'react';
import { experience, findProject, type Role } from '../data/resume';
import { gsap, MOTION_OK } from '../lib/gsap';
import CycleTimeStat from './CycleTimeStat';
import { Emphasized } from './ui/Emphasized';
import { SectionHeader } from './ui/SectionHeader';

interface ExperienceProps {
  onOpenProject: (id: string) => void;
}

function RoleMeta({ role }: { role: Role }) {
  return (
    <div className="font-mono text-xs leading-relaxed text-ink-soft md:pt-1.5 md:text-right">
      {role.dates && <p className="text-ink">{role.dates}</p>}
      {role.location && <p>{role.location}</p>}
      {role.featured && <p className="mt-1 text-accent-ink">Most recent</p>}
    </div>
  );
}

function StatChips({ stats }: { stats: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Key results">
      {stats.map((stat) => (
        <li key={stat} className="chip border-accent-ink/40 font-semibold text-accent-ink">
          {stat}
        </li>
      ))}
    </ul>
  );
}

function RoleEntry({ role, onOpenProject }: { role: Role; onOpenProject: (id: string) => void }) {
  const related = role.relatedProjectId ? findProject(role.relatedProjectId) : undefined;

  return (
    <li className="timeline-entry relative grid gap-3 pb-12 md:grid-cols-12 md:gap-8">
      <div className="pl-6 md:col-span-3 md:pl-0">
        <RoleMeta role={role} />
      </div>

      <div className="relative pl-6 md:col-span-9 md:pl-8">
        <span
          aria-hidden="true"
          className={`absolute left-[-5px] top-2 h-[11px] w-[11px] border-2 border-ink ${role.featured ? 'bg-accent' : 'bg-paper'}`}
        />
        <h3 className={role.featured ? 'text-2xl font-semibold md:text-4xl' : 'text-xl font-semibold md:text-2xl'}>
          {role.title}
        </h3>
        <p className="mt-0.5 text-lg text-ink-soft">{role.company}</p>

        {role.stats.length > 0 && <StatChips stats={role.stats} />}

        <div className={role.featured ? 'mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-8' : 'mt-5'}>
          {role.featured && (
            <div className="xl:order-last">
              <CycleTimeStat />
            </div>
          )}
          <ul className="max-w-3xl space-y-2.5 text-[0.98rem] leading-relaxed">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="grid grid-cols-[1rem_1fr]">
                <span aria-hidden="true" className="font-mono text-ink-faint">–</span>
                <span>
                  <Emphasized text={bullet} phrases={role.metrics} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {related && (
          <button
            type="button"
            onClick={() => onOpenProject(related.id)}
            className="link mt-4 inline-flex min-h-[44px] items-center font-mono text-sm"
          >
            Also here: {related.title} →
          </button>
        )}
      </div>
    </li>
  );
}

export default function Experience({ onOpenProject }: ExperienceProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // The accent rule fills as you read down the timeline.
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 75%', scrub: true } },
      );
      list.querySelectorAll('.timeline-entry').forEach((entry) => {
        gsap.from(entry, {
          x: -28,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: entry, start: 'top 85%', once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="experience" aria-labelledby="experience-heading" className="sheet py-14 md:py-20">
      <SectionHeader index="02" title="Experience" headingId="experience-heading" note="Newest first" />

      <div className="relative">
        {/* Timeline rule: grey track + accent progress. Offset matches the marker column. */}
        <div aria-hidden="true" className="absolute bottom-12 top-2 left-0 w-px bg-ink/20 md:left-[calc(25%+0.5rem)]">
          <div ref={progressRef} className="h-full w-full origin-top bg-accent" />
        </div>
        <ol ref={listRef}>
          {experience.map((role) => (
            <RoleEntry key={role.id} role={role} onOpenProject={onOpenProject} />
          ))}
        </ol>
      </div>
    </section>
  );
}

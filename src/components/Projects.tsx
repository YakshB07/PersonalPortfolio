import { projects, type Project } from '../data/resume';
import { useTilt } from '../hooks/useTilt';
import { SectionHeader } from './ui/SectionHeader';
import { TechChips } from './ui/TechChips';

interface ProjectsProps {
  onOpenProject: (id: string) => void;
}

interface CardProps {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
  isLead?: boolean;
}

/** Whole card is clickable via the stretched button; tilt is applied to the outer article. */
function CaseStudyCard({ project, index, onOpen, isLead = false }: CardProps) {
  const tiltRef = useTilt<HTMLElement>();
  const cs = project.caseStudy;

  return (
    <article
      ref={tiltRef}
      className={`group relative flex h-full flex-col border border-ink bg-paper transition-[transform,box-shadow] duration-200 ease-out will-change-transform hover:shadow-[6px_6px_0_0_rgb(23_21_15)] ${
        ''
      }`}
    >
      {project.thumb && (
        <img
          src={project.thumb}
          alt=""
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full border-b border-ink object-cover object-top"
        />
      )}

      <div className={isLead ? 'flex flex-1 flex-col p-6 md:p-8' : 'flex flex-1 flex-col p-5'}>
        <p className="label flex justify-between gap-2">
          <span>Case study {String(index + 1).padStart(2, '0')}</span>
          <span className="truncate">{project.tag}</span>
        </p>
        <h3 className={`mt-2 font-semibold tracking-tight ${isLead ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
          {project.title}
        </h3>

        {cs && (
          <dl className={`mt-5 space-y-3 text-[0.95rem] leading-snug ${isLead ? 'md:text-base' : ''}`}>
            {isLead && (
              <>
                <div>
                  <dt className="label">Problem</dt>
                  <dd className="mt-0.5">{cs.problem}</dd>
                </div>
                <div>
                  <dt className="label">What I built</dt>
                  <dd className="mt-0.5">{cs.built}</dd>
                </div>
              </>
            )}
            <div>
              <dt className="label">Result</dt>
              <dd className="mt-0.5 font-medium text-accent-ink">{cs.result}</dd>
            </div>
          </dl>
        )}

        <div className="mt-auto pt-6">
          <TechChips items={project.tech} />
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="mt-5 inline-flex min-h-[44px] items-center font-mono text-sm font-medium text-accent-ink underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
          >
            Open case study →<span className="sr-only">: {project.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectRegister({ items, onOpen }: { items: Project[]; onOpen: (id: string) => void }) {
  return (
    <div className="mt-16">
      <h3 className="label mb-3">Other work: drawing register</h3>
      <ol className="border-t border-ink">
        {items.map((project, i) => (
          <li key={project.id} className="border-b border-ink/30">
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              className="grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 gap-y-1 py-4 text-left hover:bg-paper-deep md:grid-cols-[3.5rem_minmax(0,1.3fr)_minmax(0,1.7fr)_8rem_4rem] md:gap-x-6 md:px-2"
            >
              <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(3, '0')}</span>
              <span className="text-lg font-medium">{project.title}</span>
              <span className="font-mono text-xs text-accent-ink md:order-last md:text-right">Open →</span>
              <span className="col-[2/4] font-mono text-xs text-ink-soft md:col-auto">{project.tech.join(' · ')}</span>
              <span className="col-[2/4] font-mono text-xs text-ink-faint md:col-auto">{project.tag}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Projects({ onOpenProject }: ProjectsProps) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const [lead, ...rest] = featured;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-y border-ink/15 bg-paper-deep/60 py-14 md:py-20">
      <div className="sheet">
        <SectionHeader index="03" title="Projects" headingId="projects-heading" note="Robotics & controls first" />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:sticky lg:top-20 lg:col-span-7 lg:self-start">
            <CaseStudyCard project={lead} index={0} onOpen={onOpenProject} isLead />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((project, i) => (
              <CaseStudyCard key={project.id} project={project} index={i + 1} onOpen={onOpenProject} />
            ))}
          </div>
        </div>

        <ProjectRegister items={others} onOpen={onOpenProject} />
      </div>
    </section>
  );
}

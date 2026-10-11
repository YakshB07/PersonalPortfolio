import { projects, type Project } from '../data/resume';
import { CaseStudyCard } from './CaseStudyCard';
import { SectionHeader } from './ui/SectionHeader';

interface ProjectsProps {
  onOpenProject: (id: string) => void;
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

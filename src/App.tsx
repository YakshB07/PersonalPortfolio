import { useCallback, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import Awards from './components/Awards';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import StickyEmail from './components/StickyEmail';
import { findProject } from './data/resume';

function App() {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const openProject = useCallback((id: string) => setOpenProjectId(id), []);
  const closeProject = useCallback(() => setOpenProjectId(null), []);
  const openProjectData = openProjectId ? findProject(openProjectId) ?? null : null;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <Education />
        <Experience onOpenProject={openProject} />
        <Projects onOpenProject={openProject} />
        <Skills />
        <Awards />
        <Resume />
        <Contact />
      </main>

      <StickyEmail />

      <ProjectModal project={openProjectData} onClose={closeProject} />
      <Terminal />
    </>
  );
}

export default App;

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Awards />
      <Contact />
    </div>
  );
}

export default App;

import { useEffect, useRef } from 'react';
import { ExternalLink, Award } from 'lucide-react';

interface Project {
  title: string;
  description: string[];
  technologies: string[];
  github: string;
  award?: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.project-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      title: 'Plastic Detection AI & Website',
      description: [
        'Built an AI model to detect plastics in water bodies with 80% accuracy',
        'Created a website to showcase the model',
        'Won a hackathon award',
      ],
      technologies: ['Python', 'TensorFlow', 'YOLO', 'Web Dev'],
      github: 'https://github.com/YakshB07',
      award: 'Hackathon Winner',
    },
    {
      title: 'Apple Website Clone',
      description: [
        'Developed a fully custom Apple website clone using React, Tailwind CSS, and GSAP',
        'Implemented smooth scroll animations, hover effects, and dynamic transitions',
        'Solo project',
      ],
      technologies: ['React', 'Tailwind CSS', 'GSAP'],
      github: 'https://github.com/YakshB07',
    },
    {
      title: '2D God of War Remake',
      description: [
        'Recreated the game in Java/Processing with 50+ assets and 10 core mechanics',
        'Team project',
      ],
      technologies: ['Java', 'Processing'],
      github: 'https://github.com/YakshB07',
    },
    {
      title: 'Clash Royale AI Game',
      description: [
        'Developed AI opponent with smart path planning and object detection',
        'Team project in Python',
      ],
      technologies: ['Python', 'AI/ML'],
      github: 'https://github.com/YakshB07',
    },
    {
      title: '4-Way Traffic Light System',
      description: [
        'Built and programmed a physical Arduino circuit replicating a 4-way traffic light',
        'Solo project',
      ],
      technologies: ['Arduino', 'C++', 'Electronics'],
      github: 'https://github.com/YakshB07',
    },
    {
      title: '3-DOF Drone Stabilization',
      description: [
        'Stabilized a Quanser drone using PID controllers in MATLAB',
        'Research project at University of Windsor',
      ],
      technologies: ['MATLAB', 'Control Systems', 'Robotics'],
      github: 'https://github.com/YakshB07',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-950 text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Projects</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          A collection of robotics, AI, and web development projects showcasing my technical skills
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card opacity-0 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-6xl opacity-20">💻</div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.award && (
                    <Award className="text-yellow-500 flex-shrink-0 ml-2" size={20} />
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  {project.description.map((desc, i) => (
                    <p key={i} className="text-gray-400 text-sm">
                      • {desc}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-800 text-blue-400 text-xs rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  View on GitHub
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

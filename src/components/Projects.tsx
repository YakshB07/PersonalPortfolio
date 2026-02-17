import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Award, Eye } from 'lucide-react';
import ProjectModal, { ProjectDetail } from './ProjectModal';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const projectsData: ProjectDetail[] = [
    {
      id: 'apple-website',
      title: 'Apple Website Clone',
      collaborators: 'Solo project',
      dates: 'July 10, 2024 – Nov 11, 2024',
      overview: 'Recreated Apple\'s website from scratch, building a fully interactive and responsive web experience with smooth animations and dynamic content.',
      keyFeatures: [
        '100% custom React components for dynamic content rendering',
        'Tailwind CSS for responsive, consistent design across devices',
        'GSAP animations for smooth scrolling, hover effects, and transitions',
        'Interactive product cards with hover and click animations',
        'Custom navigation with responsive layout and menu interactions',
        'Performance optimizations for smooth page loading',
        'Fully tested across multiple browsers and devices',
      ],
      technologies: ['React', 'Tailwind CSS', 'GSAP', 'JavaScript', 'HTML5', 'CSS3'],
      github: 'https://github.com/YakshB07/Apple-website',
      demo: '',
      media: [
        { type: 'image', url: '/apple1.png', caption: 'Apple Website Clone - Homepage' },
        { type: 'image', url: '/apple2.png', caption: 'Product Section with Animations' },
        { type: 'image', url: '/apple3.png', caption: 'Responsive Mobile View' },
      ],

    },
    {
      id: 'plastic-detection',
      title: 'Plastic Detection AI & Website',
      collaborators: 'Group Project',
      dates: 'May 5, 2024',
      overview: 'Built an AI model to detect plastic underwater and created a website to visualize its functionality, aiming to aid cleanup efforts and potential AUV integration.',
      keyFeatures: [
        'Real-time plastic detection using YOLO and TensorFlow',
        'Data preprocessing and augmentation for improved accuracy',
        'Achieved ~80% detection accuracy on underwater images',
        'Website displays live AI detection with interactive visualization',
        'Team collaboration for combining AI model and web interface',
        'Awarded first place at a hackathon for innovation and impact',
      ],
      technologies: ['Python', 'TensorFlow', 'YOLO', 'Web Development', 'OpenCV', 'NumPy'],
      github: 'https://github.com/YakshB07/OWP-Object-Detection-Model',
      award: 'Hackathon Winner',
      media: [
        { type: 'image', url: '', caption: 'AI Model Detection Interface' },
        { type: 'image', url: '', caption: 'Website Dashboard' },
        { type: 'image', url: '', caption: 'Live Detection Demo' },
      ],
    },
    {
      id: 'god-of-war',
      title: '2D God of War Remake',
      collaborators: 'Group Project',
      dates: 'May 20, 2024 – June 17, 2024',
      overview: 'Recreated a 2D version of "God of War" in Processing (Java), implementing core gameplay mechanics and character interactions.',
      keyFeatures: [
        'Combat system with responsive player movement and attack mechanics',
        'Over 50 custom assets integrated into the game environment',
        'Smooth animations for fighting, movement, and environmental interactions',
        'Collision detection for character-environment and character-enemy interactions',
        'Implemented multiple levels with progressive difficulty',
        'Optimized game loop for smooth performance',
      ],
      technologies: ['Java', 'Processing', 'Game Design', 'OOP'],
      github: 'https://github.com/YakshB07',
      media: [
        { type: 'image', url: '/godofwar1.png', caption: 'Gameplay Screenshot - Combat' },
        { type: 'image', url: '/godofwar2.png', caption: 'Character Sprites & Assets' },
        { type: 'video', url: '/godofwar3.mp4', caption: 'Gameplay Demo' },
      ],
    },
    {
      id: 'clash-royale',
      title: 'Clash Royale Remake Game',
      collaborators: 'Group Project',
      dates: 'May 15, 2025 – June 18, 2025',
      overview: 'Created a Python version of Clash Royale with AI-controlled opponents, including smart path planning for computer characters.',
      keyFeatures: [
        'AI path planning and combat strategy for computer characters',
        'Custom game board layout with strategic unit placement',
        'Real-time interactions between player and AI units',
        'Game mechanics to handle multiple units, attacks, and defenses simultaneously',
        'Implemented scoring, health, and win-condition logic',
        'Optimized AI decision-making for fast, responsive gameplay',
      ],
      technologies: ['Python', 'AI/ML', 'Pathfinding Algorithms', 'Pygame'],
      github: 'https://github.com/YakshB07/CR-Grade11FSE',
      media: [
        { type: 'image', url: '/clash1.png', caption: 'Game Board Layout' },
        { type: 'image', url: '/clash2.png', caption: 'AI Path Planning Visualization' },
        { type: 'image', url: '/clash3.png', caption: 'Gameplay with AI Opponent' },
      ],
    },
    {
      id: 'traffic-light',
      title: '4-Way Traffic Light System',
      collaborators: 'Group Project',
      dates: 'June 2 – June 15, 2024',
      overview: 'Built a real-world 4-way traffic light system using Arduino, simulating realistic traffic signals and pedestrian crossings.',
      keyFeatures: [
        'Circuit design with LEDs, switches, and realistic signal layout',
        'Arduino program implementing timed traffic light sequences',
        'Pedestrian crossing logic and interactive start/stop controls',
        'Realistic simulation of traffic flow and light transitions',
        'Circuit wiring optimized for durability and presentation',
        'Fully tested system for consistent performance',
      ],
      technologies: ['Arduino', 'C++', 'Electronics', 'Circuit Design'],
      github: 'https://github.com/YakshB07/4-way-traffic-light',
      media: [
        { type: 'image', url: '/traffic1.png', caption: 'Circuit Design & Wiring' },
        { type: 'image', url: '/traffic2.png', caption: 'Final Assembly' },
      ],
    },
    {
      id: 'drone-stabilization',
      title: '3-DOF Drone Stabilization',
      collaborators: 'Solo project',
      dates: 'June 24 – July 4, 2024',
      overview: 'Stabilized a 3-DOF drone in mid-air using MATLAB and PID controllers, focusing on precise positioning and responsive flight control.',
      keyFeatures: [
        'Tuned PID controllers for stable flight with minimal overshoot',
        'Real-time MATLAB simulation integrated with hardware feedback',
        'Maintained drone at desired X, Y, Z coordinates with high accuracy',
        'Logged flight data for performance evaluation and error analysis',
        'Adjusted controller gains to handle drift, wind, and minor disturbances',
        'Video demonstration showing precise hovering and stability',
        'Fully documented process for reproducibility',
      ],
      technologies: ['MATLAB', 'Control Systems', 'Robotics', 'PID Controllers', 'Signal Processing'],
      github: 'https://github.com/YakshB07',
      media: [
        { type: 'video', url: '3dof3.mp4', caption: 'Drone Stabilization Demo' },
        { type: 'image', url: '3dof.JPEG', caption: 'MATLAB Control Interface' },
        { type: 'image', url: '3dof2.JPEG', caption: 'PID Tuning Results' },
      ],
    },
  ];

  const openModal = (project: ProjectDetail) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section id="projects" className="py-20 bg-gray-950 text-white" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Projects</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            A collection of robotics, AI, and web development projects showcasing my technical skills
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="project-card opacity-0 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer group"
                data-testid={`project-card-${project.id}`}
              >
                {/* Card Image/Thumbnail */}
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">💻</div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
                      <Eye size={18} className="text-white" />
                      <span className="text-white text-sm font-medium">View Details</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    {project.award && (
                      <Award className="text-yellow-500 flex-shrink-0 ml-2" size={20} />
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.overview}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-800 text-blue-400 text-xs rounded-full border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-800 text-gray-500 text-xs rounded-full border border-gray-700">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{project.collaborators}</span>
                    <span className="inline-flex items-center text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                      Learn more
                      <ExternalLink size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Projects;

import { useEffect, useRef } from 'react';
import { Code, Wrench, Lightbulb } from 'lucide-react';

const Skills = () => {
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

    const cards = sectionRef.current?.querySelectorAll('.skill-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: 'Programming',
      skills: ['C++', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      icon: <Wrench size={32} />,
      title: 'Frameworks & Tools',
      skills: [
        'React',
        'Tailwind CSS',
        'GSAP',
        'TensorFlow',
        'YOLO',
        'MATLAB',
        'Unity',
        'Git',
      ],
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Other',
      skills: [
        'AI/ML',
        'Web Development',
        'Robotics Coding',
        'Electrical Wiring',
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-black text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Skills</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Technical expertise spanning software development, robotics, and AI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card opacity-0 bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-blue-500 transition-all duration-300"
            >
              <div className="text-blue-400 mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Users } from 'lucide-react';

const Experience = () => {
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

    const cards = sectionRef.current?.querySelectorAll('.experience-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      icon: <Users size={28} />,
      title: 'Programming Lead & Operator',
      organization: 'FIRST Robotics Teams 4903 & 1229',
      achievements: [
        'Programmed swerve drive, turret, shooters, and robotic arm in C++',
        'Designed 4 autonomous routines → reduced cycle times 30%',
        'Implemented AprilTag auto-align → ±3 cm accuracy',
        'Competed in 12+ official matches',
      ],
    },
    {
      icon: <GraduationCap size={28} />,
      title: 'Research Assistant Intern',
      organization: 'University of Windsor',
      achievements: [
        'Stabilized 3-DOF drone and programmed robotic arm for automated pick-and-place',
        'Improved workflow throughput by 30%, achieved 95% accuracy',
        'Trained TensorFlow models and designed the automation system with a partner',
      ],
    },
    {
      icon: <Briefcase size={28} />,
      title: 'Course Developer',
      organization: 'OBOTZ Robotics & Coding',
      achievements: [
        'Designed Scratch programming curriculum for children 8–13',
        'Created interactive lessons and activities for problem-solving and coding fundamentals',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-950 text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Experience</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Leadership roles and professional experience in robotics, research, and education
        </p>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card opacity-0 bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-blue-400 flex-shrink-0 mt-1">{exp.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-blue-400 mb-4 font-medium">{exp.organization}</p>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-3 text-gray-300">
                        <span className="text-blue-400 mt-1.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

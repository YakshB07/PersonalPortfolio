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
        'Led robot software development in C++, programming advanced subsystems including swerve drive, turret targeting, and multi-joint robotic arm control',
        'Designed and tested 5+ autonomous routines using trajectory planning and sensor fusion, reducing match cycle times by 30%',
        'Implemented AprilTag-based vision auto-alignment with ±3 cm accuracy using camera calibration and PID control',
        'Integrated gyroscopes, encoders, and vision systems for real-time positional tracking and field-relative control',
        "Competed in 40+ official matches as team's Co-Pilot, making real-time strategic and mechanical adjustments under pressure",
      ],
    },
    {
      icon: <GraduationCap size={28} />,
      title: 'Research Assistant Intern',
      organization: 'University of Windsor',
      achievements: [
        'Stabilized a 3-DOF drone using PID controllers in MATLAB with real-time feedback tuning, overshoot reduction, and disturbance compensation',
        'Programmed a robotic arm for automated pick-and-place operations using inverse kinematics and trajectory planning algorithms',
        'Designed and built an automated conveyor-based sorting system using a camera, computer vision model, and robotic arm to classify and separate ripe vs. rotten tomatoes',
        'Integrated TensorFlow object detection with real-time image processing to trigger robotic sorting actions with high accuracy',
        'Improved full-system workflow throughput by 30% while achieving 95% classification and placement accuracy through calibration and optimization',
        'Collaborated on complete automation system integration, connecting mechanical, vision, and control subsystems into one synchronized pipeline',
      ],
    },
    {
      icon: <Briefcase size={28} />,
      title: 'Course Developer',
      organization: 'OBOTZ Robotics & Coding',
      achievements: [
        'Designed structured Scratch programming curriculum for students aged 8–13, covering logic, loops, conditionals, and event-driven programming',
        'Developed interactive coding challenges and project-based learning activities to strengthen problem-solving skills',
        'Created beginner-friendly robotics and automation concepts to bridge visual programming with real-world applications',
        'Mentored students through guided debugging sessions and hands-on coding demonstrations',
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

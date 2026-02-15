import { useEffect, useRef } from 'react';
import { Award, Trophy } from 'lucide-react';

const Awards = () => {
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

    const cards = sectionRef.current?.querySelectorAll('.award-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const awards = [
    {
      title: 'DECA Ontario Provincial Champion',
      description: '2× Winner',
      icon: <Trophy size={32} />,
    },
    {
      title: 'MasseyHacks Hackathon Winner',
      description: 'First Place',
      icon: <Award size={32} />,
    },
  ];

  return (
    <section id="awards" className="py-20 bg-black text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Awards</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Recognition for excellence in competitions and hackathons
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {awards.map((award, index) => (
            <div
              key={index}
              className="award-card opacity-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-yellow-500 mb-4">{award.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{award.title}</h3>
              <p className="text-gray-400">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;

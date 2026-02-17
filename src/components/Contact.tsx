import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'yakshbutani07@gmail.com',
      href: 'mailto:yakshbutani07@gmail.com',
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '519-992-2170',
      href: 'tel:+15199922170',
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      value: 'YakshB07',
      href: 'https://github.com/YakshB07',
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'Yaksh Butani',
      href: 'https://linkedin.com/in/yaksh-butani-813973328',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Let's connect and discuss opportunities in robotics, AI, and software engineering
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 flex items-center space-x-4"
              >
                <div className="text-blue-400">{info.icon}</div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="mailto:yakshbutani07@gmail.com"
              className="inline-block px-12 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>&copy; 2024 Yaksh Butani. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;

// Single source of truth for all portfolio + resume content.
// Every section of the site (and the HTML resume) reads from here.
// Rule: only facts Yaksh has provided. Unknowns are marked TODO, never guessed.

import apple1 from '../assets/optimized/apple1.webp';
import apple1Thumb from '../assets/optimized/apple1-thumb.webp';
import apple2 from '../assets/optimized/apple2.webp';
import apple3 from '../assets/optimized/apple3.webp';
import dof from '../assets/optimized/dof.webp';
import dof2 from '../assets/optimized/dof2.webp';
import dof2Thumb from '../assets/optimized/dof2-thumb.webp';
import dof3 from '../assets/dof3.mp4';
import clash1 from '../assets/optimized/clash1.webp';
import clash1Thumb from '../assets/optimized/clash1-thumb.webp';
import clash2 from '../assets/optimized/clash2.webp';
import clash3 from '../assets/optimized/clash3.webp';
import godofwar1 from '../assets/optimized/godofwar1.webp';
import godofwar1Thumb from '../assets/optimized/godofwar1-thumb.webp';
import godofwar2 from '../assets/optimized/godofwar2.webp';
import godofwar3 from '../assets/godofwar3.mp4';
import traffic1 from '../assets/optimized/traffic1.webp';
import traffic1Thumb from '../assets/optimized/traffic1-thumb.webp';
import traffic2 from '../assets/optimized/traffic2.webp';
import plastic1 from '../assets/optimized/plastic1.webp';
import plastic1Thumb from '../assets/optimized/plastic1-thumb.webp';
import plastic2 from '../assets/optimized/plastic2.webp';
import plastic4 from '../assets/optimized/plastic4.webp';

/* ------------------------------------------------------------------ types */

export interface Media {
  type: 'image' | 'video';
  url: string;
  alt: string;
}

export interface Role {
  id: string;
  company: string;
  title: string;
  /** Omitted when not known — never guessed. */
  dates?: string;
  location?: string;
  bullets: string[];
  /** Substrings of bullets to render as bold accent metrics. */
  metrics: string[];
  /** Short stat chips shown next to the role. Built only from bullet facts. */
  stats: string[];
  /** Project id this role links to, if any. */
  relatedProjectId?: string;
  featured?: boolean;
}

export interface CaseStudy {
  problem: string;
  built: string;
  result: string;
  /** Headline number pulled from `result`. Only set when the result actually states one. */
  figure?: {
    value: number;
    suffix: string;
    label: string;
    /** The rest of the result, minus the number. */
    note: string;
  };
}

export interface Project {
  id: string;
  title: string;
  /** Small context tag shown on the card, e.g. employer or "Group project". */
  tag: string;
  dates?: string;
  caseStudy?: CaseStudy;
  /** Used for non-case-study projects. */
  overview?: string;
  bullets: string[];
  tech: string[];
  github?: string;
  media: Media[];
  thumb?: string;
  featured: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface AwardItem {
  title: string;
  detail?: string;
  year?: string;
}

/* ---------------------------------------------------------------- profile */

export const LAST_UPDATED = '2026-10-10';

export const RESUME_PDF = `${import.meta.env.BASE_URL}Yaksh_Butani_Resume.pdf`;

export const profile = {
  name: 'Yaksh Butani',
  headline: 'Engineering student building robots end to end: controls, PLC logic, and vision.',
  bio:
    "Hi, I'm Yaksh. I study Engineering Science at Western University in London, Ontario. I'm most interested in robotics, controls, and embedded systems, especially the part where code actually makes something move. I like building things end to end, from the wiring and mechanical design to the software that runs them. Long term, I want to build robots and automation systems that do real work outside the lab.",
  availability:
    'Seeking Summer 2027 internships in robotics, controls & embedded systems. Based in London, ON, open to relocating.',
  discipline: 'Engineering Science',
  location: 'London, ON',
  // TODO(Yaksh): add a headshot. Drop the file in src/assets/ and import it here,
  // e.g. `photo: headshot`. The hero renders the photo frame only when this is set.
  photo: null as string | null,
};

export const contact = {
  email: 'yakshbutani07@gmail.com',
  phone: '519-992-2170',
  phoneHref: 'tel:+15199922170',
  github: 'YakshB07',
  githubUrl: 'https://github.com/YakshB07',
  linkedin: 'linkedin.com/in/yaksh-butani-813973328',
  linkedinUrl: 'https://linkedin.com/in/yaksh-butani-813973328',
};

export const education = {
  school: 'Western University',
  degree: 'Bachelor of Engineering Science',
  graduation: 'April 2030',
  location: 'London, ON',
};

/** The single hero proof point. */
export const heroStat = {
  from: 35,
  to: 2,
  unit: 's',
  sub: '2,000 to 4,000 parts/shift',
};

/* ------------------------------------------------------------- experience */

export const experience: Role[] = [
  {
    id: 'spirol',
    company: 'Spirol',
    title: 'Jr Controls Engineer Intern',
    dates: 'Jun 2026 – Aug 2026',
    location: 'Windsor, ON',
    featured: true,
    bullets: [
      'Independently designed and programmed a pass/fail inspection cell on an Epson C8 6-axis robot, owning mechanical design, wiring diagrams, and PLC/robot control logic.',
      'Cut cycle time from 35s to 2s (2,000 to 4,000 parts/shift) by programming pick, controlled-drop, sensor-based detection, and sort sequencing in Epson RC+, including tool offsets and point teaching.',
      'Converted AU-870 tolerance specs into a sensor-based detection method that catches sub-millimetre part sink.',
      'Integrated Keyence GC-1000 safety controllers and radar-based guarding into the RC700 system, meeting CSA compliance across production lines.',
      'Built an operator HMI with live part counts, fault display, logging, sort-type selection, and cycle start/stop control.',
    ],
    metrics: ['35s to 2s', '2,000 to 4,000 parts/shift', 'sub-millimetre', 'CSA compliance'],
    stats: ['sub-mm detection', 'CSA compliance'],
  },
  {
    id: 'uwindsor',
    company: 'University of Windsor',
    title: 'Research Assistant Intern',
    dates: 'Jun 2025 – Aug 2025',
    location: 'Windsor, ON',
    relatedProjectId: 'drone',
    bullets: [
      'Programmed a Universal Robots arm (URScript/PolyScope) with trajectory planning for collision-free pick-and-place on a moving conveyor.',
      'Designed a conveyor sorting line using a high-resolution camera, with grayscale conversion and thresholding to preprocess images.',
      'Trained a TensorFlow vision model to classify ripe vs. rotten tomatoes in real time, triggering arm motion as fruit entered the pick zone (96% accuracy).',
      'Synchronized conveyor speed, arm timing, and vision feedback, increasing throughput by 30%.',
      'Debugged the vision pipeline through systematic testing, isolating failure points across camera input, preprocessing, and model output.',
    ],
    metrics: ['96% accuracy', 'increasing throughput by 30%'],
    stats: ['96% accuracy', '+30% throughput'],
  },
  {
    id: 'first',
    company: 'FIRST Robotics Team 4903 & 1229',
    title: 'Programming Lead & Operator',
    dates: 'Sept 2023 – Apr 2026',
    location: 'Windsor, ON',
    bullets: [
      'Programmed robot software in C++, including swerve drive with field-oriented control, vision and encoder-based turret PID loops, and a motion-profiled multi-joint arm.',
      'Built 10+ autonomous routines using sensor fusion and trajectory planning, cutting cycle times year-over-year by 30%.',
      'Developed a Limelight 4 and AprilTag localization system for field positioning and autonomous navigation.',
      'Tuned PID gains across drivetrain and arm subsystems through iterative field testing to balance speed and precision.',
      'Led a team of 7 student programmers through subsystem ownership and code reviews to maintain reliability under competition deadlines.',
    ],
    metrics: ['10+ autonomous routines', 'cutting cycle times year-over-year by 30%', 'team of 7 student programmers'],
    stats: ['10+ autonomous routines', '−30% cycle time YoY', 'led 7 programmers'],
  },
  {
    id: 'obotz',
    company: 'OBOTZ Robotics & Coding',
    title: 'Course Developer',
    dates: 'Jun 2024 – Aug 2024',
    location: 'Windsor, ON',
    bullets: [
      'Designed structured Scratch programming curriculum for students aged 8–13, covering logic, loops, conditionals, and event-driven programming',
      'Developed interactive coding challenges and project-based learning activities to strengthen problem-solving skills',
      'Created beginner-friendly robotics and automation concepts to bridge visual programming with real-world applications',
      'Mentored students through guided debugging sessions and hands-on coding demonstrations',
    ],
    metrics: [],
    stats: [],
  },
];

/* --------------------------------------------------------------- projects */

export const projects: Project[] = [
  {
    id: 'drone',
    title: '3-DOF Drone Stabilization',
    tag: 'University of Windsor',
    dates: 'Jun 2025 – Aug 2025',
    featured: true,
    caseStudy: {
      problem:
        'Keep a 3-DOF drone stable across roll, pitch, and yaw during multi-directional maneuvers.',
      built:
        'PID loops tuned against real-time MATLAB simulation fed by onboard sensors, for live feedback control and trajectory tracking.',
      result:
        'Reduced overshoot and improved responsiveness, with precise positioning under variable load and environmental conditions.',
    },
    bullets: [
      'Tuned PID loops to stabilize the drone across roll, pitch, and yaw axes, reducing overshoot and improving responsiveness during multi-directional maneuvers.',
      'Integrated real-time MATLAB simulations with onboard sensors, allowing live feedback control and precise trajectory tracking under variable load and environmental conditions.',
      'Monitored sensor outputs and flight performance to fine-tune control parameters, ensuring precise positioning and stable maneuvers under varying conditions.',
      'Analyzed sensor data and flight logs to identify instability sources and adjust controller gains accordingly.',
    ],
    tech: ['MATLAB', 'Simulink', 'PID Controllers'],
    github: 'https://github.com/YakshB07',
    thumb: dof2Thumb,
    media: [
      { type: 'image', url: dof2, alt: 'Simulink model with encoder inputs, PID controller blocks, and saturation for the drone axes' },
      { type: 'image', url: dof, alt: 'Simulink block diagram of the drone control loop on a laptop screen' },
      { type: 'video', url: dof3, alt: 'Video of the 3-DOF drone holding position' },
    ],
  },
  {
    id: 'plastic',
    title: 'Ocean Plastic Waste Detection',
    tag: 'Group project',
    dates: 'May 5, 2024',
    featured: true,
    caseStudy: {
      problem: 'Plastic waste underwater is hard to find, which slows cleanup efforts.',
      built:
        'A TensorFlow object detection model trained on an open-source underwater plastic dataset, with data augmentation and a reproducible training, evaluation, and deployment pipeline.',
      result: '96% detection accuracy, with potential applications for autonomous underwater vehicles (AUVs).',
      figure: {
        value: 96,
        suffix: '%',
        label: 'detection accuracy',
        note: 'With potential applications for autonomous underwater vehicles (AUVs).',
      },
    },
    bullets: [
      'Developed and trained a TensorFlow object detection model on an open-source underwater plastic dataset, accurately identifying plastics of various sizes, shapes, and colors under challenging lighting conditions.',
      'Applied data preprocessing and augmentation (rotation, scaling, color correction) to improve model robustness for underwater imagery.',
      'Achieved 96% detection accuracy, providing reliable recognition of plastic waste, with potential applications for autonomous underwater vehicles (AUVs) in environmental cleanup.',
      'Fully documented the training, evaluation, and deployment workflow, creating a reproducible pipeline for future research and teaching purposes.',
    ],
    // TODO(Yaksh): the old site called this a "Hackathon Winner". Your awards list says
    // MasseyHacks was "Best Beginner". If this was that project, add it back here.
    tech: ['Python', 'TensorFlow', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/YakshB07/OWP-Object-Detection-Model',
    thumb: plastic1Thumb,
    media: [
      { type: 'image', url: plastic1, alt: 'Ocean Plastic Object Detection project website landing page' },
      { type: 'image', url: plastic2, alt: 'Ocean plastic detection project screenshot' },
      { type: 'image', url: plastic4, alt: 'Ocean plastic detection project screenshot' },
    ],
  },
  {
    id: 'traffic-light',
    title: '4-Way Traffic Light System',
    tag: 'Group project',
    dates: 'June 2 – June 15, 2024',
    featured: false,
    overview:
      'Built a real-world 4-way traffic light system using Arduino, simulating realistic traffic signals and pedestrian crossings.',
    bullets: [
      'Circuit design with LEDs, switches, and realistic signal layout',
      'Arduino program implementing timed traffic light sequences',
      'Pedestrian crossing logic and interactive start/stop controls',
      'Realistic simulation of traffic flow and light transitions',
      'Circuit wiring optimized for durability and presentation',
      'Fully tested system for consistent performance',
    ],
    tech: ['Arduino', 'C++', 'Electronics', 'Circuit Design'],
    github: 'https://github.com/YakshB07/4-way-traffic-light',
    thumb: traffic1Thumb,
    media: [
      { type: 'image', url: traffic1, alt: 'Arduino on a breadboard wired to four LED traffic signals' },
      { type: 'image', url: traffic2, alt: '4-way traffic light circuit' },
    ],
  },
  {
    id: 'apple-website',
    title: 'Apple Website Clone',
    tag: 'Solo project',
    dates: 'July 10, 2024 – Nov 11, 2024',
    featured: false,
    overview:
      "Recreated Apple's website from scratch, building a fully interactive and responsive web experience with smooth animations and dynamic content.",
    bullets: [
      '100% custom React components for dynamic content rendering',
      'Tailwind CSS for responsive, consistent design across devices',
      'GSAP animations for smooth scrolling, hover effects, and transitions',
      'Interactive product cards with hover and click animations',
      'Custom navigation with responsive layout and menu interactions',
      'Performance optimizations for smooth page loading',
      'Fully tested across multiple browsers and devices',
    ],
    tech: ['React', 'Tailwind CSS', 'GSAP', 'JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/YakshB07/Apple-website',
    thumb: apple1Thumb,
    media: [
      { type: 'image', url: apple1, alt: 'Apple website clone hero section' },
      { type: 'image', url: apple2, alt: 'Apple website clone product section' },
      { type: 'image', url: apple3, alt: 'Apple website clone feature section' },
    ],
  },
  {
    id: 'god-of-war',
    title: '2D God of War Remake',
    tag: 'Group project',
    dates: 'May 20, 2024 – June 17, 2024',
    featured: false,
    overview:
      'Recreated a 2D version of "God of War" in Processing (Java), implementing core gameplay mechanics and character interactions.',
    bullets: [
      'Combat system with responsive player movement and attack mechanics',
      'Over 50 custom assets integrated into the game environment',
      'Smooth animations for fighting, movement, and environmental interactions',
      'Collision detection for character-environment and character-enemy interactions',
      'Implemented multiple levels with progressive difficulty',
      'Optimized game loop for smooth performance',
    ],
    tech: ['Java', 'Processing', 'Game Design', 'OOP'],
    github: 'https://github.com/YakshB07',
    thumb: godofwar1Thumb,
    media: [
      { type: 'image', url: godofwar1, alt: '2D God of War remake gameplay' },
      { type: 'image', url: godofwar2, alt: '2D God of War remake gameplay' },
      { type: 'video', url: godofwar3, alt: '2D God of War remake gameplay video' },
    ],
  },
  {
    id: 'clash-royale',
    title: 'Clash Royale Remake',
    tag: 'Group project',
    dates: 'May 15, 2025 – June 18, 2025',
    featured: false,
    overview:
      'Created a Python version of Clash Royale with AI-controlled opponents, including smart path planning for computer characters.',
    bullets: [
      'AI path planning and combat strategy for computer characters',
      'Custom game board layout with strategic unit placement',
      'Real-time interactions between player and AI units',
      'Game mechanics to handle multiple units, attacks, and defenses simultaneously',
      'Implemented scoring, health, and win-condition logic',
      'Optimized AI decision-making for fast, responsive gameplay',
    ],
    tech: ['Python', 'AI/ML', 'Pathfinding Algorithms', 'Pygame'],
    github: 'https://github.com/YakshB07/CR-Grade11FSE',
    thumb: clash1Thumb,
    media: [
      { type: 'image', url: clash1, alt: 'Clash Royale remake game board' },
      { type: 'image', url: clash2, alt: 'Clash Royale remake gameplay' },
      { type: 'image', url: clash3, alt: 'Clash Royale remake gameplay' },
    ],
  },
];

/* ----------------------------------------------------------------- skills */

export const skills: SkillGroup[] = [
  {
    label: 'Robotics & Controls',
    items: ['PLC programming', 'Epson RC+ / SPEL+', 'URScript / PolyScope', 'ROS2', 'PID tuning', 'Modbus RS485', 'Safety controllers', 'HMI design'],
  },
  {
    label: 'Languages',
    items: ['C++', 'Python', 'Java', 'MATLAB', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    label: 'ML & Vision',
    items: ['TensorFlow', 'PyTorch', 'YOLOv8', 'OpenCV', 'NumPy', 'Matplotlib'],
  },
  {
    label: 'Tools & CAD',
    items: ['Git', 'Linux', 'SolidWorks', 'Onshape', 'Solid Edge', 'Raspberry Pi', 'Arduino', 'React', 'Tailwind CSS', 'GSAP', 'Unity'],
  },
];

/* ----------------------------------------------------------------- awards */

export const awards: AwardItem[] = [
  { title: 'Spirol Scholarship', year: '2026' },
  { title: 'DECA Ontario Provincial Champion', detail: '2× Champion' },
  { title: 'MasseyHacks Hackathon Winner', detail: 'Best Beginner' },
];

export function findProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

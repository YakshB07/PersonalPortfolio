import { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, Github, Award, Calendar, Users, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export interface ProjectDetail {
  id: string;
  title: string;
  collaborators: string;
  dates: string;
  overview: string;
  keyFeatures: string[];
  technologies: string[];
  github: string;
  demo?: string;
  award?: string;
  media: {
    type: 'image' | 'video';
    url: string;
  }[];
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentMediaIndex(0);
      setIsVideoPlaying(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const nextMedia = () => {
    if (project) {
      setCurrentMediaIndex((prev) => (prev + 1) % project.media.length);
      setIsVideoPlaying(false);
    }
  };

  const prevMedia = () => {
    if (project) {
      setCurrentMediaIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  if (!isOpen || !project) return null;

  const currentMedia = project.media[currentMediaIndex];

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      data-testid="project-modal-overlay"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal Container */}
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl shadow-blue-500/10 animate-modal-in"
        data-testid="project-modal-content"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-110 group"
          data-testid="project-modal-close"
          aria-label="Close modal"
        >
          <X size={24} className="text-gray-400 group-hover:text-white transition-colors" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
            
        {/* Media Section */}
        <div className="relative w-full bg-gradient-to-b from-gray-800/50 to-gray-900 p-6 md:p-8">
        {project.media.length > 0 && currentMedia.url ? (
            <>
            {/* Device Frame Container */}
            <div className="relative mx-auto max-w-4xl">
              {/* Browser/Device Mockup Frame */}
              <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                {/* Browser Top Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-gray-700/50">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-700/50 rounded-md px-3 py-1 text-xs text-gray-400 text-center max-w-md mx-auto truncate">
                      {project.title}
                    </div>
                  </div>
                </div>
                
                {/* Image/Video Content */}
                <div className="relative bg-gray-950 flex items-center justify-center overflow-hidden" style={{ minHeight: '300px', maxHeight: '60vh' }}>
                  {currentMedia.type === 'image' ? (
                    <img
                      src={currentMedia.url}
                      className="w-full h-full object-contain"
                      style={{ maxHeight: '60vh' }}
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video
                        ref={videoRef}
                        src={currentMedia.url}
                        className="w-full h-full object-contain"
                        style={{ maxHeight: '60vh' }}
                        loop
                        muted
                        playsInline
                      />
                      <button
                        onClick={toggleVideoPlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                      >
                        <div className={`p-4 rounded-full bg-blue-500/90 backdrop-blur-sm transition-transform ${isVideoPlaying ? 'scale-90' : 'scale-100 hover:scale-110'}`}>
                          {isVideoPlaying ? (
                            <Pause size={32} className="text-white" />
                          ) : (
                            <Play size={32} className="text-white ml-1" />
                          )}
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
            </div>

            {/* Media Navigation */}
            {project.media.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 hover:bg-gray-800 border border-gray-700 rounded-full transition-all hover:scale-110 backdrop-blur-sm group"
                  aria-label="Previous media"
                >
                  <ChevronLeft size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 hover:bg-gray-800 border border-gray-700 rounded-full transition-all hover:scale-110 backdrop-blur-sm group"
                  aria-label="Next media"
                >
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>

                {/* Media Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-gray-900/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-700/50">
                  {project.media.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentMediaIndex(index);
                        setIsVideoPlaying(false);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentMediaIndex 
                          ? 'bg-blue-400 w-6' 
                          : 'bg-gray-500 hover:bg-gray-400 w-2'
                      }`}
                      aria-label={`Go to media ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
            </>
        ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 mb-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center border border-gray-600/30">
                <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm font-medium">No media available</p>
              <p className="text-gray-500 text-xs mt-1">Screenshots coming soon</p>
            </div>
        )}
        </div>




          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white" data-testid="project-modal-title">
                  {project.title}
                </h2>
                {project.award && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                    <Award size={16} className="text-yellow-500" />
                    <span className="text-yellow-400 text-sm font-medium">{project.award}</span>
                  </div>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-400" />
                  <span>{project.collaborators}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-400" />
                  <span>{project.dates}</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed" data-testid="project-modal-overview">
                {project.overview}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                Key Features & Achievements
              </h3>
              <ul className="space-y-2" data-testid="project-modal-features">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-800 text-blue-400 text-sm rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 hover:scale-105 group"
                data-testid="project-modal-github"
              >
                <Github size={18} className="group-hover:text-blue-400 transition-colors" />
                <span>View on GitHub</span>
                <ExternalLink size={14} className="opacity-50" />
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 hover:scale-105"
                  data-testid="project-modal-demo"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

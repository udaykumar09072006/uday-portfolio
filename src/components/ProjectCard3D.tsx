import React, { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Code2 } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectCard3DProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, onSelectProject }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle 3D tilt angle
    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? 'translateZ(12px)' : 'translateZ(0px)'
        }`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
      className={`relative rounded-2xl bg-[#0b0f19] border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
        isHovered
          ? 'border-cyan-400/50 shadow-[0_12px_40px_rgba(0,240,255,0.15)]'
          : 'border-slate-800/80 shadow-lg'
      }`}
    >
      {/* Top Banner / Image Slot */}
      <div
        onClick={() => onSelectProject(project)}
        className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer bg-slate-950"
      >
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-top transition-transform duration-500 ease-out ${
            isHovered ? 'scale-105 -translate-y-1' : 'scale-100 translate-y-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-black/30" />

        {/* Project Number badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-1 rounded bg-[#090d15]/90 border border-emerald-500/30 backdrop-blur-sm shadow-md">
            PROJECT {project.number}
          </span>
          <span className="font-mono text-[10px] text-cyan-300 px-2 py-0.5 rounded bg-slate-900/80 border border-cyan-500/20 backdrop-blur-sm">
            {project.status}
          </span>
        </div>

        {/* View Specs hover badge */}
        <div
          className={`absolute top-3 right-3 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-xs text-white px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-400/40 backdrop-blur-sm flex items-center gap-1">
            <span>INSPECT</span>
            <ArrowUpRight className="w-3 h-3 text-cyan-400" />
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div
            onClick={() => onSelectProject(project)}
            className="cursor-pointer group-hover:text-cyan-300 transition-colors"
          >
            <h3 className="font-cyber font-bold text-lg sm:text-xl text-white tracking-wide">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-emerald-400 mt-0.5">{project.tagline}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech, idx) => (
              <span
                key={tech}
                style={{
                  transitionDelay: `${idx * 25}ms`,
                }}
                className={`px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900/80 border text-slate-300 transition-colors ${
                  isHovered ? 'border-cyan-500/30 text-cyan-200' : 'border-slate-800'
                }`}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900/50 text-slate-500">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold border border-emerald-500/30 transition-all duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>LIVE DEMO</span>
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span>GITHUB</span>
              </a>
            </div>

            <button
              onClick={() => onSelectProject(project)}
              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors text-[11px]"
            >
              <span>SPECS</span>
              <ArrowUpRight className="w-3 h-3 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

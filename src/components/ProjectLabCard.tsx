import React, { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Sparkles, Cpu, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectLabCardProps {
  project: Project;
  index: number;
  isActive?: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectLabCard: React.FC<ProjectLabCardProps> = ({
  project,
  index,
  isActive = false,
  onSelectProject,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [floatOffset, setFloatOffset] = useState<number>(0);

  // Natural continuous floating bobbing animation
  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now() + index * 850;

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      // Staggered sine oscillation
      const bob = Math.sin(elapsed * 1.8) * 7;
      setFloatOffset(bob);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth 3D tilt
    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

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

  // Holographic accent color by project
  const getAccentColor = (id: string) => {
    switch (id) {
      case 'scalecheck':
        return {
          primary: '#00f0ff',
          glow: 'rgba(0, 240, 255, 0.45)',
          border: 'border-cyan-500/40',
          badge: 'bg-cyan-950/70 text-cyan-300 border-cyan-500/30',
        };
      case 'riskora':
        return {
          primary: '#fb7185',
          glow: 'rgba(251, 113, 133, 0.45)',
          border: 'border-rose-500/40',
          badge: 'bg-rose-950/70 text-rose-300 border-rose-500/30',
        };
      case 'resumebuilder':
        return {
          primary: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.45)',
          border: 'border-sky-500/40',
          badge: 'bg-sky-950/70 text-sky-300 border-sky-500/30',
        };
      case 'medicare':
        return {
          primary: '#2dd4bf',
          glow: 'rgba(45, 212, 191, 0.45)',
          border: 'border-teal-500/40',
          badge: 'bg-teal-950/70 text-teal-300 border-teal-500/30',
        };
      case 'studyassistant':
        return {
          primary: '#c084fc',
          glow: 'rgba(192, 132, 252, 0.45)',
          border: 'border-purple-500/40',
          badge: 'bg-purple-950/70 text-purple-300 border-purple-500/30',
        };
      case 'consultbot':
      default:
        return {
          primary: '#00ff88',
          glow: 'rgba(0, 255, 136, 0.45)',
          border: 'border-emerald-500/40',
          badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30',
        };
    }
  };

  const accent = getAccentColor(project.id);

  return (
    <div
      className="relative flex justify-center perspective-[1200px]"
      style={{
        transform: `translateY(${floatOffset}px)`,
        transition: 'transform 0.05s linear',
      }}
    >
      {/* 3D Holo-Podium Base Shadow */}
      <div
        className="absolute -bottom-6 w-3/4 h-8 rounded-full blur-xl pointer-events-none transition-all duration-300 opacity-60"
        style={{
          background: isHovered
            ? `radial-gradient(ellipse at center, ${accent.glow}, transparent 70%)`
            : 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.8), transparent 70%)',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        }}
      />

      {/* Floating 3D Card Vessel */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? 'translateZ(35px) scale(1.03)' : 'translateZ(0px) scale(1)'
          }`,
          boxShadow: isHovered
            ? `0 20px 45px -10px ${accent.glow}, 0 0 25px 2px ${accent.glow}, inset 0 1px 2px rgba(255, 255, 255, 0.2)`
            : '0 15px 35px -10px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
          transition: isHovered
            ? 'transform 0.08s ease-out, box-shadow 0.25s ease-out, border-color 0.25s'
            : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s ease-out, border-color 0.45s',
        }}
        className={`w-full max-w-sm sm:max-w-md rounded-2xl bg-[#080d1a]/85 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group cursor-pointer ${
          isHovered ? accent.border : 'border-slate-800/90'
        }`}
      >
        {/* Holographic Scanline Overlay on Hover */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Ambient Corner Sci-Fi Bracket Marks */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-600/60 z-20 pointer-events-none group-hover:border-cyan-400/80 transition-colors" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-600/60 z-20 pointer-events-none group-hover:border-cyan-400/80 transition-colors" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-600/60 z-20 pointer-events-none group-hover:border-cyan-400/80 transition-colors" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-600/60 z-20 pointer-events-none group-hover:border-cyan-400/80 transition-colors" />

        {/* TOP: Screenshot / Hologram Slot */}
        <div
          onClick={() => onSelectProject(project)}
          className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 border-b border-slate-800/80"
        >
          {/* Visual Screenshot */}
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              isHovered ? 'scale-108 brightness-110 contrast-105' : 'scale-100 brightness-90 contrast-95 opacity-90'
            }`}
          />

          {/* Holographic light sweep gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-black/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-70' : 'opacity-90'
            }`}
          />

          {/* Pod Header Badges */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
            <span className="font-mono text-xs font-bold text-slate-100 px-2.5 py-1 rounded-md bg-black/80 border border-slate-700/80 backdrop-blur-md shadow-md">
              LAB [{project.number}]
            </span>
            <span
              className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border backdrop-blur-md ${accent.badge}`}
            >
              {project.status}
            </span>
          </div>

          {/* Hover Hologram Signal */}
          <div
            className={`absolute top-3.5 right-3.5 z-10 transition-all duration-300 transform ${
              isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-90'
            }`}
          >
            <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>HOLO ACTIVE</span>
            </span>
          </div>
        </div>

        {/* CONTENT AREA: Name, Short Description, Tech Stack */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            {/* PROJECT NAME */}
            <div
              onClick={() => onSelectProject(project)}
              className="group-hover:text-cyan-300 transition-colors"
            >
              <h3 className="text-xl sm:text-2xl font-cyber font-bold text-white tracking-wide flex items-center justify-between">
                <span>{project.title}</span>
                <Sparkles className="w-4 h-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors" />
              </h3>
              <p className="text-xs font-mono text-cyan-400/90 mt-1 line-clamp-1">
                {project.tagline}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3 pt-1">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900/90 border text-slate-300 transition-all ${
                    isHovered ? 'border-cyan-500/40 text-cyan-200' : 'border-slate-800'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* THREE REQUIRED BUTTONS: [ LIVE DEMO ] | [ GITHUB ] | [ VIEW DETAILS ] */}
          <div className="pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* [ LIVE DEMO ] */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 min-w-[95px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)] whitespace-nowrap"
                title="Launch Live Application Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>
            )}

            {/* [ GITHUB ] */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors whitespace-nowrap"
              title="Inspect Source Code Repository"
            >
              <Github className="w-3.5 h-3.5 text-emerald-400" />
              <span>GITHUB</span>
            </a>

            {/* [ VIEW DETAILS ] */}
            <button
              onClick={() => onSelectProject(project)}
              className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-[0_0_12px_rgba(0,255,136,0.15)] whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>VIEW DETAILS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

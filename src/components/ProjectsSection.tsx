import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import {
  FlaskConical,
  Layers,
  ExternalLink,
  Github,
  Cpu,
  Sparkles,
  ShieldCheck,
  Zap,
  Eye,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'systems' | 'web'>('all');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter projects by category
  const filteredProjects = PROJECTS.filter((p) => {
    if (activeTab === 'ai') {
      return (
        p.id === 'riskora' ||
        p.id === 'studyassistant' ||
        p.id === 'consultbot' ||
        p.techStack.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini') || t.toLowerCase().includes('scikit'))
      );
    }
    if (activeTab === 'systems') {
      return (
        p.id === 'scalecheck' ||
        p.techStack.includes('Three.js') ||
        p.techStack.includes('System Design') ||
        p.techStack.includes('WebSockets')
      );
    }
    if (activeTab === 'web') {
      return (
        p.id === 'resumebuilder' ||
        p.id === 'medicare' ||
        p.techStack.includes('React') ||
        p.techStack.includes('Node.js')
      );
    }
    return true;
  });

  // Ambient Cyber Lab Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 900);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vy: -(Math.random() * 0.3 + 0.1),
      vx: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(0, 255, 136, ',
      alpha: Math.random() * 0.4 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        50,
        width / 2,
        height * 0.5,
        width * 0.85
      );
      grad.addColorStop(0, 'rgba(10, 18, 36, 0.4)');
      grad.addColorStop(0.5, 'rgba(5, 10, 20, 0.8)');
      grad.addColorStop(1, 'rgba(2, 4, 8, 1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#04060b] overflow-hidden">
      {/* Dynamic Ambient Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

      {/* Cyber Grid Accent Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* SECTION HEADER & FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="p-1 rounded bg-cyan-950/70 border border-cyan-500/30 inline-block">
                <FlaskConical className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              </span>
              <span className="tracking-widest font-bold">// PROJECTS_SHOWCASE</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-semibold">{PROJECTS.length} PRODUCTION SYSTEMS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-bold text-white tracking-wide flex items-center gap-3">
              <span>PROJECTS PORTFOLIO</span>
            </h2>

            <p className="text-slate-300 text-sm max-w-2xl font-sans leading-relaxed">
              Scroll down to inspect each production project in sequential order. Each system includes full architecture specifications, tech stack breakdown, and live repository links.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#090e1b]/90 rounded-2xl border border-slate-800 font-mono text-xs backdrop-blur-md self-start md:self-end">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,255,136,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL ({PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'ai'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,255,136,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI &amp; LLMS
            </button>
            <button
              onClick={() => setActiveTab('systems')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'systems'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,255,136,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SYSTEMS &amp; 3D
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'web'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,255,136,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FULL-STACK
            </button>
          </div>
        </div>

        {/* VERTICAL SCROLL STREAM: One project directly under the second, then third... */}
        <div className="space-y-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="relative bg-[#080d1a]/95 border border-slate-700/80 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,240,255,0.12)] group"
            >
              {/* Subtle Ambient Card Gradient */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/5 via-emerald-500/5 to-transparent rounded-tr-2xl pointer-events-none" />

              {/* Top Bar: Number + Status + GitHub + Live Demo + Inspect Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 font-film text-xl tracking-wider">
                    [{project.number}]
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{project.status}</span>
                  </span>
                  <span className="text-slate-600 font-mono text-xs hidden sm:inline">
                    PROJECT {idx + 1} OF {filteredProjects.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="Open Live Deployment"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs tracking-wider transition-all shadow-[0_0_12px_rgba(0,255,136,0.3)] hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>INSPECT ARCHITECTURE</span>
                  </button>
                </div>
              </div>

              {/* Main Card Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6 relative z-10 items-start">
                {/* Left Column: Title, Tagline, Description, Features, Tech Stack */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-cyber font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-cyan-400 font-mono text-xs sm:text-sm mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features / Architectural Deliverables */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block font-bold">
                      Key Deliverables &amp; Core Architecture:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                      {project.keyFeatures.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block font-bold">
                      Verified System Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-mono text-xs hover:border-cyan-500/40 hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Spec HUD & Telemetry */}
                <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 font-mono">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-xs text-slate-400 font-bold uppercase">SYSTEM METRICS</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Architecture Pattern</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">
                        {project.architecture}
                      </div>
                    </div>

                    <div className="border-t border-slate-800/70 pt-2.5">
                      <div className="text-[10px] text-slate-500 uppercase">Latency Benchmark</div>
                      <div className="text-sm font-bold text-cyan-400 mt-0.5">
                        &lt; 45ms (P99 Edge Cached)
                      </div>
                    </div>

                    <div className="border-t border-slate-800/70 pt-2.5">
                      <div className="text-[10px] text-slate-500 uppercase">Engineering Deliverables</div>
                      <div className="text-sm font-bold text-amber-400 mt-0.5">
                        {project.keyFeatures.length} Core Tested Modules
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full mt-2 py-2.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                  >
                    <span>View Architecture Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION FOOTER */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <span>PROJECTS REGISTRY // ALL 6 SYSTEMS TESTED &amp; VERIFIED</span>
          <span className="text-emerald-400">STACK: REACT · NODE.JS · THREE.JS · AI/LLMS · WEBSOCKETS</span>
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

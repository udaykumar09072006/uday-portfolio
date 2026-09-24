import React from 'react';
import { PROJECTS, Project } from '../../data/portfolioData';
import { ExternalLink, Github, Eye, ArrowUpRight, Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface GallerySceneProps {
  onOpenProject: (projectId: string) => void;
}

export const GalleryScene: React.FC<GallerySceneProps> = ({ onOpenProject }) => {
  return (
    <section id="gallery" className="relative min-h-screen bg-[#05070c] py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-hidden select-none">
      {/* Background cyber accent lighting */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full border-b border-slate-800/80 pb-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="font-oswald text-xs uppercase tracking-[0.3em] text-cyan-400">
              SCENE 04 // ENGINEERING SHOWCASE
            </p>
            <div className="flex items-baseline gap-4 flex-wrap">
              <h2 className="font-film text-3xl sm:text-4xl lg:text-5xl tracking-wide text-white uppercase">
                FEATURED PROJECTS STREAM
              </h2>
              <span className="font-film text-xl sm:text-2xl text-emerald-400">
                {PROJECTS.length} VERIFIED SYSTEMS
              </span>
            </div>
            <p className="font-oswald text-xs sm:text-sm text-slate-400 tracking-wider">
              Scroll to explore each production architecture · One under the other
            </p>
          </div>

          {/* Quick Jump Bar for all 6 projects */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="text-slate-500 text-[11px] mr-1 hidden sm:inline">JUMP TO:</span>
            {PROJECTS.map((p) => (
              <a
                key={p.id}
                href={`#project-item-${p.id}`}
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-cyan-950/70 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {p.number}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout: Sticky Sidebar Anchor + Vertical Scrolling Project Cards */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sticky Column: Author Anchor with photo & quick stats */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="bg-[#080d1a]/90 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none" />

            {/* Profile Cutout Image */}
            <div className="relative h-64 sm:h-72 flex items-end justify-center mb-4 group">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/15 via-transparent to-transparent rounded-2xl pointer-events-none" />
              <img
                src="/images/uday-profile.png"
                alt="Uday Kumar Developer Photo"
                className="h-full w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="text-center space-y-2 border-t border-slate-800/80 pt-4">
              <h3 className="font-film text-xl text-white tracking-wider uppercase">
                UDAY KUMAR
              </h3>
              <p className="font-mono text-xs text-emerald-400">
                SOFTWARE ENGINEER · B.TECH CSE
              </p>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Architecting real-world web applications, AI integrations, and distributed tools.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-slate-800/80 font-mono text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
                <div className="text-[10px] text-slate-500 uppercase">Projects Live</div>
                <div className="text-base font-bold text-cyan-400">06 Systems</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
                <div className="text-[10px] text-slate-500 uppercase">Architecture</div>
                <div className="text-base font-bold text-emerald-400">100% Code</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Stacked Projects (One directly under the second, then third...) */}
        <div className="lg:col-span-8 space-y-8">
          {PROJECTS.map((proj, idx) => (
            <article
              id={`project-item-${proj.id}`}
              key={proj.id}
              className="group relative bg-[#080d1a]/95 border border-slate-700/80 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,240,255,0.15)] scroll-mt-28"
            >
              {/* Subtle Project Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 rounded-tr-2xl pointer-events-none" />

              {/* Header Bar: Number + Status + Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 font-film text-lg tracking-wider">
                    [{proj.number}]
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-oswald text-xs uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{proj.status}</span>
                  </span>
                  <span className="text-slate-600 font-mono text-xs hidden sm:inline">
                    PROJECT {idx + 1} OF {PROJECTS.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
                      title="View GitHub Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="Open Live Deployment"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => onOpenProject(proj.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-oswald font-bold text-xs tracking-wider transition-all shadow-[0_0_12px_rgba(0,255,136,0.3)] hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>INSPECT ARCHITECTURE</span>
                  </button>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mt-5 relative z-10">
                <h3 className="font-film text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="font-oswald text-sm sm:text-base text-cyan-300 tracking-wide">
                  {proj.tagline}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed pt-1">
                  {proj.description}
                </p>
              </div>

              {/* Metrics HUD Strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 mt-5 bg-slate-900/80 rounded-xl border border-slate-800 text-center font-mono relative z-10">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Architecture</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 truncate px-1">
                    {proj.architecture.split(' ')[0]} Microservice
                  </div>
                </div>
                <div className="border-x border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">System Status</div>
                  <div className="text-xs sm:text-sm font-bold text-cyan-400">{proj.status}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Deliverables</div>
                  <div className="text-xs sm:text-sm font-bold text-amber-400">
                    {proj.keyFeatures.length} Core Modules
                  </div>
                </div>
              </div>

              {/* Key Features Bullet Points */}
              <div className="mt-5 space-y-2 relative z-10">
                <span className="font-oswald text-xs text-slate-400 uppercase tracking-widest block">
                  KEY DELIVERABLES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                  {proj.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-5 space-y-2 relative z-10">
                <span className="font-oswald text-xs text-slate-400 uppercase tracking-widest block">
                  VERIFIED SYSTEM STACK:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-slate-300 font-mono text-xs hover:border-cyan-500/40 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Link */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-oswald text-slate-400 relative z-10">
                <span className="font-mono text-[11px] text-slate-500">
                  REF ID: {proj.id.toUpperCase()} // LATENCY: 24ms
                </span>
                <button
                  onClick={() => onOpenProject(proj.id)}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold transition-colors cursor-pointer"
                >
                  <span>Open Deep Technical Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

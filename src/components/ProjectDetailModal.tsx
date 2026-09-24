import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Github,
  Layers,
  AlertCircle,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Terminal,
  Info,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Project } from '../data/portfolioData';

export interface ProjectDetailModalProps {
  project: Project | null;
  overview?: string;
  features?: string[];
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  overview,
  features,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'tech' | 'all'>('all');
  const [selectedArchStep, setSelectedArchStep] = useState<number | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset interactive state when project changes
  useEffect(() => {
    setSelectedArchStep(0);
    setActiveTechFilter(null);
  }, [project]);

  if (!project) return null;

  // Resolve dynamic values with clean fallbacks
  const activeOverview = overview || project.overview || project.description;
  const activeFeatures = features || project.features || project.keyFeatures || [];
  const architectureSteps = project.architecture
    ? project.architecture.split('->').map((step) => step.trim())
    : [];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(label);
    setTimeout(() => setCopiedUrl(null), 2200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#090e1a]/95 rounded-2xl border border-cyan-500/30 shadow-[0_0_60px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* TOP STATUS BAR */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#060a14] border-b border-slate-800/90 select-none">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-cyan-300 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/40">
              LAB [{project.number}]
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cyber text-lg sm:text-xl font-bold text-white tracking-wide">
                  {project.title}
                </h2>
                <span className="text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/50">
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{project.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Close [ESC]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* INTERACTIVE NAVIGATION TABS */}
        <div className="px-5 sm:px-6 py-2.5 bg-[#080d19] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950/70 border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              COMPLETE BRIEF
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'overview'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              OVERVIEW &amp; CAPABILITIES
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ARCHITECTURE PIPELINE
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'tech'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              TECH STACK ({project.techStack.length})
            </button>
          </div>

          {/* Quick Copy Link Badges */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <button
                onClick={() => handleCopy(project.liveUrl!, 'Live Demo URL')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] transition-colors"
                title="Copy Live Deployment URL"
              >
                {copiedUrl === 'Live Demo URL' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                )}
                <span>{copiedUrl === 'Live Demo URL' ? 'COPIED' : 'COPY DEMO URL'}</span>
              </button>
            )}
            <button
              onClick={() => handleCopy(project.githubUrl, 'GitHub URL')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] transition-colors"
              title="Copy GitHub Repository URL"
            >
              {copiedUrl === 'GitHub URL' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{copiedUrl === 'GitHub URL' ? 'COPIED' : 'COPY REPO URL'}</span>
            </button>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* VISUAL BANNER & LIVE REPO ACTIONS */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-52 sm:h-72 object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-transparent to-black/30" />

            {/* Float Action Launchers */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex flex-wrap items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>OPEN LIVE DEMO</span>
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900/95 hover:bg-slate-800 text-slate-100 border border-slate-700 font-mono text-xs transition-colors shadow-lg"
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span>GITHUB REPO</span>
              </a>
            </div>
          </div>

          {/* SECTION 1: OVERVIEW & KEY FEATURES */}
          {(activeTab === 'all' || activeTab === 'overview') && (
            <div className="space-y-4">
              {/* Dynamic Overview */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-cyan-400" />
                    PROJECT OVERVIEW
                  </span>
                  <span className="text-slate-500 text-[11px]">VERIFIED SYSTEM SPECIFICATION</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {activeOverview}
                </p>
              </div>

              {/* Dynamic Key Features List */}
              {activeFeatures.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      KEY SYSTEM CAPABILITIES ({activeFeatures.length})
                    </span>
                    <span className="text-slate-500 text-[11px]">FUNCTIONAL MODULES</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: INTERACTIVE ARCHITECTURE PIPELINE */}
          {(activeTab === 'all' || activeTab === 'architecture') && architectureSteps.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  INTERACTIVE ARCHITECTURE PIPELINE
                </span>
                <span className="text-slate-500 text-[11px]">Click nodes to inspect stage</span>
              </div>

              {/* Flow Stepper Bar */}
              <div className="p-3 bg-[#070b13] rounded-xl border border-slate-800/80 overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max text-xs font-mono">
                  {architectureSteps.map((step, idx) => {
                    const isSelected = selectedArchStep === idx;
                    return (
                      <React.Fragment key={idx}>
                        <button
                          onClick={() => setSelectedArchStep(idx)}
                          className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-2 ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isSelected
                                ? 'bg-cyan-400 text-slate-950'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </button>
                        {idx < architectureSteps.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-emerald-400/70 shrink-0" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Stage Context Card */}
              {selectedArchStep !== null && (
                <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <div className="font-mono text-cyan-300 font-semibold flex items-center gap-2">
                      <span>STAGE {selectedArchStep + 1} OF {architectureSteps.length}:</span>
                      <span className="text-white">{architectureSteps[selectedArchStep]}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      Data pipeline transition executing &quot;{architectureSteps[selectedArchStep]}&quot; within the end-to-end {project.title} system flow.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: TECHNOLOGY STACK */}
          {(activeTab === 'all' || activeTab === 'tech') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  TECHNOLOGY STACK
                </span>
                <span className="text-slate-500 text-[11px]">Select a tech to filter</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => {
                  const isFiltered = activeTechFilter === tech;
                  return (
                    <button
                      key={tech}
                      onClick={() =>
                        setActiveTechFilter(isFiltered ? null : tech)
                      }
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                        isFiltered
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(0,255,136,0.25)]'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>

              {activeTechFilter && (
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                  <span>Selected Stack Module: <strong>{activeTechFilter}</strong></span>
                  <button
                    onClick={() => setActiveTechFilter(null)}
                    className="text-[11px] underline text-slate-400 hover:text-white"
                  >
                    Clear selection
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: ENGINEERING CHALLENGES & SOLUTIONS */}
          {(activeTab === 'all' || activeTab === 'overview') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  TECHNICAL CHALLENGE
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {project.challenges}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ENGINEERED SOLUTION
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {project.solutions}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3 bg-[#060a14] border-t border-slate-800 text-xs font-mono text-slate-500 select-none">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">VERIFIED ARCHITECTURE &amp; SOURCE REPO</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

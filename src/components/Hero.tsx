import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ThreeNetworkSphere } from './ThreeNetworkSphere';
import { InteractiveTerminal } from './InteractiveTerminal';
import { LeetCodeIcon } from './LeetCodeIcon';
import { ArrowDown, Github, FileDown, Mail, Code2, Zap, Terminal, ExternalLink, Film, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenInterviewMode: () => void;
  onSelectProjectId?: (projectId: string) => void;
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResumeModal,
  onOpenInterviewMode,
  onSelectProjectId,
  onReplayIntro,
}) => {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background Cyber Grid & subtle ambient lighting */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-12">
        {/* Main Hero Split: Left Content + Right 3D Network Sphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* System Status Indicators */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span>● SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                <span>● AI MODULE ACTIVE</span>
              </div>
              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-emerald-950/50 border border-slate-700/80 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  title="Watch cinematic 3D developer walk introduction"
                >
                  <Film className="w-3 h-3 text-emerald-400" />
                  <span>3D INTRO</span>
                </button>
              )}
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              {/* Photo & Identity Status Pill */}
              <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-xl">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_12px_rgba(0,255,136,0.35)] shrink-0 bg-slate-800">
                  <img
                    src="/images/uday_portrait.jpg"
                    alt="Uday Kumar - Software Engineer"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="font-mono text-left">
                  <div className="flex items-center gap-1.5 text-xs text-white font-semibold">
                    <span>UDAY KUMAR</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono tracking-wider">
                    VERIFIED DEVELOPER ENTITY
                  </div>
                </div>
              </div>

              <div>
                <h1 className="font-cyber font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                  UDAY KUMAR
                </h1>
                <div className="font-cyber font-semibold text-2xl sm:text-3xl text-emerald-400 tracking-wide mt-1">
                  SOFTWARE ENGINEER
                </div>
                <div className="font-mono text-xs sm:text-sm text-cyan-300 pt-1 tracking-wide">
                  Full-Stack Developer • AI • DSA • Scalable Systems
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              &ldquo;Hi, I&apos;m Uday Kumar &mdash; a Computer Science developer passionate about DSA, full-stack engineering, scalable systems, and AI. I build real-world software that turns complex problems into practical solutions.&rdquo;
            </p>

            {/* Action Buttons: VIEW PROJECTS | GITHUB | RESUME */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs pt-1">
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.25)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)]"
              >
                <Code2 className="w-4 h-4" />
                <span>VIEW PROJECTS</span>
              </a>

              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>GITHUB</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={DEVELOPER_INFO.leetcode}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-amber-500/40 transition-colors"
              >
                <LeetCodeIcon className="w-4 h-4 text-amber-400" />
                <span>LEETCODE</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <button
                onClick={onOpenResumeModal}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>RESUME</span>
              </button>

              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>CONTACT</span>
              </a>
            </div>

            {/* Interviewer Quick Switch Callout */}
            <div className="pt-2">
              <button
                onClick={onOpenInterviewMode}
                className="w-full sm:w-auto flex items-center justify-between gap-4 p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-900 border border-emerald-500/30 hover:border-emerald-400/60 transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-white block">
                      Conducting a Technical Interview?
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Switch to Interview Mode for rapid briefing &amp; direct metrics →
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-emerald-400 shrink-0 font-bold px-2 py-1 rounded bg-emerald-950 border border-emerald-500/40">
                  LAUNCH
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Prominent Developer Hero Cutout with 3D Cyber Stage */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[540px]">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] sm:aspect-[4/5] flex items-end justify-center">
              
              {/* Background 3D Network Sphere Depth Effect */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 scale-90 pointer-events-none">
                <ThreeNetworkSphere />
              </div>

              {/* Glowing Cyber Hologram Stage Rings beneath feet */}
              <div className="absolute bottom-2 inset-x-6 h-20 pointer-events-none flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute w-64 sm:w-80 h-14 rounded-[100%] border border-cyan-500/40 bg-cyan-500/5 shadow-[0_0_35px_rgba(0,240,255,0.25)] animate-pulse" />
                {/* Inner Ring */}
                <div className="absolute w-44 sm:w-56 h-9 rounded-[100%] border border-emerald-400/50 bg-emerald-400/10 shadow-[0_0_25px_rgba(0,255,136,0.3)]" />
                {/* Core Glow */}
                <div className="absolute w-36 h-5 rounded-[100%] bg-cyan-400/30 blur-md" />
                {/* Floor Shadow */}
                <div className="absolute w-44 h-4 rounded-[100%] bg-black/85 blur-sm" />
              </div>

              {/* Prominent Full-Body Cutout of Uday */}
              <div className="relative z-10 w-full h-full flex items-end justify-center">
                <img
                  src="/images/uday-profile.png"
                  alt="Uday Kumar - Software Engineer"
                  className="h-full max-h-[520px] sm:max-h-[560px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,255,136,0.25)] hover:drop-shadow-[0_15px_45px_rgba(0,240,255,0.45)] transition-all duration-700 select-none pointer-events-none transform hover:scale-[1.02]"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Cyber HUD Badges */}
              <div className="absolute top-2 right-2 sm:right-4 z-20 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 shadow-xl backdrop-blur-md flex items-center gap-2 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-bold">STATUS: ONLINE</span>
              </div>

              <div className="absolute bottom-6 left-2 sm:left-4 z-20 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-cyan-500/40 shadow-xl backdrop-blur-md flex flex-col gap-0.5 text-left font-mono">
                <div className="flex items-center gap-1.5 text-xs text-white font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>UDAY KUMAR</span>
                </div>
                <div className="text-[10px] text-cyan-300 flex items-center gap-2">
                  <span>DSA 450+ SOLVED</span>
                  <span>•</span>
                  <span>FULL-STACK SDE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Terminal Embed */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>INTERACTIVE DEVELOPER CONSOLE // EXPLORE VIA COMMAND LINE</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">TYPE 'help' FOR CMDS</span>
          </div>

          <InteractiveTerminal
            onOpenProject={(pId) => onSelectProjectId && onSelectProjectId(pId)}
            onOpenResume={onOpenResumeModal}
            onReplayIntro={onReplayIntro}
            onOpenContact={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { DEVELOPER_INFO } from '../../data/portfolioData';
import { LeetCodeIcon } from '../LeetCodeIcon';
import { Github, Linkedin, Instagram, Mail, FileDown, ArrowUp, Film, Zap, Send } from 'lucide-react';

interface FinaleSceneProps {
  onOpenResume: () => void;
  onOpenInterviewMode: () => void;
  onReplayWalkIntro: () => void;
}

export const FinaleScene: React.FC<FinaleSceneProps> = ({
  onOpenResume,
  onOpenInterviewMode,
  onReplayWalkIntro,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="finale" className="relative min-h-screen bg-[#04060a] py-20 px-4 sm:px-8 border-t border-slate-800/80 overflow-hidden flex flex-col justify-between select-none">
      {/* Cinematic Vignette and Background Beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      {/* Top Editorial Labels */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-2 sm:grid-cols-4 gap-4 font-oswald text-xs uppercase tracking-widest text-slate-500 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-emerald-400 block font-bold">IDEAS · DESIGNS</span>
          <span>SYSTEM ARCHITECTURES</span>
        </div>
        <div>
          <span className="text-cyan-400 block font-bold">REAL IMPACT</span>
          <span>HIGH-THROUGHPUT CODE</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-slate-300 block font-bold">AN ENGINEER’S WORLD</span>
          <span>PRODUCTION-READY</span>
        </div>
        <div className="text-right">
          <span className="text-emerald-400 block font-bold">SCENE 05 // FINALE</span>
          <span>PORTFOLIO MMXXVI</span>
        </div>
      </div>

      {/* Central Dramatic Stage: Quote + Portrait */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-12 flex flex-col items-center justify-center text-center space-y-8">
        {/* Monumental Architectural Quote */}
        <blockquote className="space-y-3">
          <div className="font-film text-4xl sm:text-6xl lg:text-7xl text-white tracking-wide uppercase leading-tight drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
            &ldquo;CLEAN ARCHITECTURE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300">
              SPEAKS LOUDER.
            </span>&rdquo;
          </div>
          <p className="font-oswald text-xs sm:text-sm text-slate-400 tracking-[0.25em] uppercase">
            Designing distributed systems with mathematical clarity and zero fluff
          </p>
        </blockquote>

        {/* Central Portrait Cutout with Ambient Halo */}
        <div className="relative h-64 sm:h-80 lg:h-96 flex items-end justify-center group">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />
          <img
            src="/images/uday-profile.png"
            alt="Uday Kumar Developer"
            className="h-full w-auto object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute -bottom-3 inset-x-8 h-6 bg-black/90 rounded-full blur-md -z-10" />
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-oswald text-xs tracking-wider">
          <button
            onClick={onOpenInterviewMode}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-105"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>ENTER INTERVIEW MODE</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-all hover:scale-105"
          >
            <FileDown className="w-4 h-4 text-purple-400" />
            <span>DOWNLOAD RESUME</span>
          </button>

          <button
            onClick={onReplayWalkIntro}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-all hover:scale-105"
          >
            <Film className="w-4 h-4 text-emerald-400" />
            <span>REPLAY 3D INTRO</span>
          </button>
        </div>
      </div>

      {/* Footer Closing Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <a
            href={DEVELOPER_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4 text-emerald-400" />
          </a>
          <a
            href={DEVELOPER_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-cyan-400" />
          </a>
          <a
            href={DEVELOPER_INFO.leetcode}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white transition-colors"
            title="LeetCode Profile"
          >
            <LeetCodeIcon className="w-4 h-4 text-amber-400" />
          </a>
          {DEVELOPER_INFO.instagram && (
            <a
              href={DEVELOPER_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-white transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
            </a>
          )}
          <a
            href={`mailto:${DEVELOPER_INFO.email}`}
            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
          </a>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">{DEVELOPER_INFO.email}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-500">© 2026 Uday Kumar — All rights reserved</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Scroll to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

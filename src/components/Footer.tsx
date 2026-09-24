import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { LeetCodeIcon } from './LeetCodeIcon';
import { Github, Linkedin, Instagram, Mail, FileDown, ArrowUp, Film } from 'lucide-react';

interface FooterProps {
  onOpenResumeModal: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal, onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#05070c] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Brand & Identity */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span className="font-cyber font-bold text-lg text-white tracking-wider">
                UDAY KUMAR
              </span>
              <span className="text-xs text-slate-500 font-mono">·</span>
              <span className="text-xs text-emerald-400 font-mono">SOFTWARE ENGINEER</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md font-sans">
              Designing scalable distributed software and AI systems. Production-ready code, verified metrics, zero fluff.
            </p>
          </div>

          {/* Social Channels & Back to Top */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <a
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4 text-emerald-400" />
            </a>

            <a
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
            </a>

            <a
              href={DEVELOPER_INFO.leetcode}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/40 transition-colors"
              title="LeetCode (450+ Problems Solved)"
            >
              <LeetCodeIcon className="w-4 h-4 text-amber-400" />
            </a>

            {DEVELOPER_INFO.instagram && (
              <a
                href={DEVELOPER_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-pink-500/40 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>
            )}

            <a
              href={`mailto:${DEVELOPER_INFO.email}`}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
            </a>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors flex items-center gap-1.5"
                title="Watch cinematic 3D developer walk intro"
              >
                <Film className="w-4 h-4 text-emerald-400" />
                <span>3D INTRO</span>
              </button>
            )}

            <button
              onClick={onOpenResumeModal}
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/40 transition-colors flex items-center gap-1.5"
            >
              <FileDown className="w-4 h-4 text-purple-400" />
              <span>RESUME</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright */}
        <div className="pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2">
          <span>© {new Date().getFullYear()} Uday Kumar. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>Built with React 19, Three.js &amp; Tailwind CSS</span>
            <span>·</span>
            <span className="text-emerald-400">Deployed &amp; Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

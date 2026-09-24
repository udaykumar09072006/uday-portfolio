import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, Terminal, FileDown, ShieldCheck, Film, Layers, Sparkles } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { LeetCodeIcon } from './LeetCodeIcon';

interface NavbarProps {
  onOpenInterviewMode: () => void;
  onOpenResumeModal: () => void;
  onReplayIntro?: () => void;
  currentMode?: 'cinematic' | 'technical';
  onToggleMode?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInterviewMode,
  onOpenResumeModal,
  onReplayIntro,
  currentMode = 'cinematic',
  onToggleMode,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SYSTEM', href: '#system-design' },
    { name: 'CERTIFICATES', href: '#certificates' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#06080d]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="font-cyber font-bold text-lg sm:text-xl text-white tracking-wider flex items-center gap-2 group whitespace-nowrap"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:shadow-[0_0_12px_#00ff88] transition-shadow inline-block" />
          <span>UDAY KUMAR</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors py-1 relative hover:text-white ${
                  isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_#00ff88]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Film Mode / Full Spec View Switcher */}
          {onToggleMode && (
            <button
              onClick={onToggleMode}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-mono transition-colors whitespace-nowrap"
              title={currentMode === 'cinematic' ? 'Switch to Full Technical Spec View' : 'Switch to 5-Scene Cinematic Film View'}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentMode === 'cinematic' ? 'FULL SPEC' : 'CINEMATIC FILM'}</span>
            </button>
          )}

          {/* Replay 3D Intro Button */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/30 text-xs font-mono transition-colors whitespace-nowrap"
              title="Replay cinematic 3D developer walk sequence"
            >
              <Film className="w-3.5 h-3.5 text-emerald-400" />
              <span>3D INTRO</span>
            </button>
          )}

          {/* Quick Resume Button */}
          <button
            onClick={onOpenResumeModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-mono transition-colors whitespace-nowrap"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>RESUME</span>
          </button>

          {/* LeetCode Button */}
          <a
            href={DEVELOPER_INFO.leetcode}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/40 text-xs font-mono transition-colors whitespace-nowrap"
            title="LeetCode (450+ Solved)"
          >
            <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>LEETCODE</span>
          </a>

          {/* Prominent Interview Mode button */}
          <button
            onClick={onOpenInterviewMode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-mono text-xs font-bold border border-emerald-500/40 transition-all duration-150 shadow-[0_0_15px_rgba(0,255,136,0.2)] hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>⚡ INTERVIEW MODE</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b13]/95 border-b border-slate-800 px-6 py-5 backdrop-blur-xl animate-fadeIn font-mono text-xs space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-emerald-400 py-1 transition-colors flex items-center justify-between border-b border-slate-800/50 pb-2"
              >
                <span>{link.name}</span>
                <span className="text-slate-600">→</span>
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {onReplayIntro && (
              <button
                onClick={() => {
                  onReplayIntro();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-700/80 flex items-center justify-center gap-2"
              >
                <Film className="w-4 h-4 text-emerald-400" />
                <span>REPLAY 3D INTRO</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenResumeModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-700 flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4 text-cyan-400" />
              <span>VIEW RESUME</span>
            </button>

            <a
              href={DEVELOPER_INFO.leetcode}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-slate-900 text-amber-400 border border-slate-700 hover:border-amber-500/40 flex items-center justify-center gap-2"
            >
              <LeetCodeIcon className="w-4 h-4 text-amber-400" />
              <span>LEETCODE PROFILE (450+)</span>
            </a>

            <button
              onClick={() => {
                onOpenInterviewMode();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>ENTER INTERVIEW MODE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

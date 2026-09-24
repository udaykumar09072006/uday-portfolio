import React, { useState, useEffect } from 'react';
import { HeroFilmStage } from './HeroFilmStage';
import { UniverseScene } from './UniverseScene';
import { ChronoScene } from './ChronoScene';
import { GalleryScene } from './GalleryScene';
import { FinaleScene } from './FinaleScene';
import { Film, Zap, Layers, ChevronDown } from 'lucide-react';

interface CinematicFilmViewProps {
  onOpenProject: (projectId: string) => void;
  onOpenResume: () => void;
  onOpenInterviewMode: () => void;
  onReplayWalkIntro: () => void;
  onSwitchToClassicView: () => void;
}

export const CinematicFilmView: React.FC<CinematicFilmViewProps> = ({
  onOpenProject,
  onOpenResume,
  onOpenInterviewMode,
  onReplayWalkIntro,
  onSwitchToClassicView,
}) => {
  const [activeScene, setActiveScene] = useState<string>('hero');

  const scrollToScene = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active scene based on scroll position
  useEffect(() => {
    const scenes = ['hero', 'universe', 'chrono', 'gallery', 'finale'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const scene of scenes) {
        const el = document.getElementById(scene);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveScene(scene);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sceneList = [
    { id: 'hero', label: '01 HERO STAGE' },
    { id: 'universe', label: '02 UNIVERSE' },
    { id: 'chrono', label: '03 CHRONOLOGY' },
    { id: 'gallery', label: '04 PROJECTS DECK' },
    { id: 'finale', label: '05 FINALE' },
  ];

  return (
    <div className="relative w-full bg-[#05070c] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Floating Right Scene Director HUD */}
      <aside className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2 pointer-events-auto">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 text-[11px] font-oswald tracking-wider">
          {sceneList.map((sc) => {
            const isActive = activeScene === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => scrollToScene(sc.id)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all text-left ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,255,136,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-slate-950' : 'bg-slate-600'
                  }`}
                />
                <span>{sc.label}</span>
              </button>
            );
          })}
        </div>

        {/* View switcher trigger */}
        <button
          onClick={onSwitchToClassicView}
          className="mt-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 text-[11px] font-oswald tracking-wider transition-all shadow-lg flex items-center gap-1.5"
          title="Switch to detailed technical specification view"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>FULL SPEC VIEW</span>
        </button>
      </aside>

      {/* Floating View Switcher Bar for Mobile & Quick Access */}
      <div className="fixed bottom-4 inset-x-4 z-40 md:hidden flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 bg-[#080d1a]/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl font-oswald text-xs">
          <button
            onClick={onOpenInterviewMode}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold flex items-center gap-1"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>INTERVIEW</span>
          </button>
          <button
            onClick={onSwitchToClassicView}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SPEC</span>
          </button>
        </div>
      </div>

      {/* Five-Scene Interactive Film Sections */}
      <main>
        {/* Scene 01: Hero Stage */}
        <section id="hero">
          <HeroFilmStage
            onEnterUniverse={() => scrollToScene('universe')}
            onOpenResume={onOpenResume}
            onOpenInterviewMode={onOpenInterviewMode}
            onReplayWalkIntro={onReplayWalkIntro}
          />
        </section>

        {/* Scene 02: The Creative & Engineering Universe */}
        <UniverseScene />

        {/* Scene 03: A Journey Through Time (Chrono Timeline) */}
        <ChronoScene />

        {/* Scene 04: The Projects Gallery Deck */}
        <GalleryScene onOpenProject={onOpenProject} />

        {/* Scene 05: The Finale & Closing */}
        <FinaleScene
          onOpenResume={onOpenResume}
          onOpenInterviewMode={onOpenInterviewMode}
          onReplayWalkIntro={onReplayWalkIntro}
        />
      </main>
    </div>
  );
};

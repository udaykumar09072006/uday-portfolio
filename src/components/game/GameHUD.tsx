import React from 'react';
import { Compass, Menu, Briefcase, FileText, ChevronRight, Eye, Sparkles, Volume2, VolumeX, Shield, Play, Layers } from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/portfolioData';

interface GameHUDProps {
  currentSector: string;
  interactPrompt: string | null;
  onInteract: () => void;
  onOpenFastTravel: () => void;
  onOpenInterviewMode: () => void;
  onOpenResumeModal: () => void;
  onToggleClassicMode: () => void;
  playerCoords: { x: number; z: number };
  isRunning: boolean;
  onToggleRun?: () => void;
  isAudioMuted?: boolean;
  onToggleAudio?: () => void;
  onReplayIntro: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  currentSector,
  interactPrompt,
  onInteract,
  onOpenFastTravel,
  onOpenInterviewMode,
  onOpenResumeModal,
  onToggleClassicMode,
  playerCoords,
  isRunning,
  isAudioMuted,
  onToggleAudio,
  onReplayIntro
}) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-3 sm:p-5 select-none font-mono">
      {/* Top Header Bar */}
      <div className="flex items-start justify-between gap-3">
        {/* Top-Left: OS Status */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,136,0.15)] flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#00ff88]" />
            <div>
              <div className="font-cyber font-bold text-xs sm:text-sm text-white tracking-wider">
                UDAY_OS <span className="text-emerald-400 font-normal text-[11px]">v2.4</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono tracking-widest">
                SYSTEM ONLINE
              </div>
            </div>
          </div>

          {/* Current Sector Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 backdrop-blur-md text-xs text-slate-300">
            <span className="text-slate-500">SECTOR:</span>
            <span className="text-cyan-300 font-bold tracking-wider uppercase">
              {currentSector}
            </span>
          </div>
        </div>

        {/* Top-Right: Quick Actions & Player Identity */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          {/* Fast Travel / Menu Button */}
          <button
            onClick={onOpenFastTravel}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] active:scale-95 text-xs font-bold"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">FAST TRAVEL</span>
          </button>

          {/* Interview Mode Button */}
          <button
            onClick={onOpenInterviewMode}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] active:scale-95 text-xs"
          >
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">INTERVIEW MODE</span>
          </button>

          {/* View Resume Button */}
          <button
            onClick={onOpenResumeModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-md transition-colors text-xs"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>RESUME</span>
          </button>

          {/* Switch to Classic Web Layout Button */}
          <button
            onClick={onToggleClassicMode}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 border border-slate-700/80 backdrop-blur-md transition-colors text-xs"
            title="Switch to Classic Web Layout"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="hidden xl:inline">WEB VIEW</span>
          </button>

          {/* Player Identity Tag */}
          <div className="hidden sm:flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-400/50 bg-slate-900">
              <img
                src="/images/uday_portrait.jpg"
                alt="Player Avatar"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left text-xs">
              <div className="text-white font-bold tracking-tight">UDAY KUMAR</div>
              <div className="text-[10px] text-emerald-400">SOFTWARE ENGINEER</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Center: Dynamic Proximity Interaction Callout */}
      {interactPrompt && (
        <div className="pointer-events-auto mx-auto my-auto animate-bounce">
          <button
            onClick={onInteract}
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 text-slate-950 font-cyber font-extrabold text-sm sm:text-base tracking-wider shadow-[0_0_35px_rgba(0,255,136,0.6)] border-2 border-white/80 transition-transform active:scale-95 cursor-pointer"
          >
            <span className="px-2 py-0.5 rounded bg-black/30 border border-black/20 text-xs font-mono font-black">
              PRESS [E]
            </span>
            <span>{interactPrompt}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Bottom Bar: Controls, Telemetry & Minimap */}
      <div className="flex items-end justify-between gap-3">
        {/* Bottom-Left: Keyboard / Movement Controls Info */}
        <div className="pointer-events-auto space-y-2">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-md shadow-xl text-xs space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>NAVIGATION CONTROLS</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1 font-mono text-[11px] font-bold">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white shadow-sm">W</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white shadow-sm">A</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white shadow-sm">S</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white shadow-sm">D</span>
              </div>
              <span className="text-slate-400 text-[11px]">MOVE</span>
            </div>

            <div className="flex items-center justify-between gap-3 text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              <span>MOUSE: ORBIT CAMERA</span>
              <span className={isRunning ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                [SHIFT] RUN
              </span>
            </div>
          </div>
        </div>

        {/* Bottom-Center: Live Location Indicator */}
        <div className="pointer-events-auto hidden sm:flex flex-col items-center">
          <div className="px-4 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">{currentSector}</span>
            <span className="text-slate-600">│</span>
            <span>COORDS: [{playerCoords.x.toFixed(1)}, {playerCoords.z.toFixed(1)}]</span>
          </div>
        </div>

        {/* Bottom-Right: Context Interact & Quick Action */}
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          {/* Replay 3D Intro Quick Trigger */}
          <button
            onClick={onReplayIntro}
            className="px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800 text-[10px] font-mono transition-colors"
          >
            REPLAY INTRO
          </button>

          {/* Quick Context [E] INTERACT Box */}
          <button
            onClick={onInteract}
            className={`p-3.5 sm:p-4 rounded-2xl backdrop-blur-md border transition-all flex items-center gap-3 active:scale-95 cursor-pointer ${
              interactPrompt
                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-400 shadow-[0_0_25px_rgba(0,255,136,0.3)] animate-pulse'
                : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">
                ACTION
              </span>
              <span className="font-cyber font-bold text-xs sm:text-sm text-white">
                {interactPrompt ? interactPrompt.slice(0, 16) : 'INTERACT'}
              </span>
            </div>
            <div className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-cyber font-extrabold text-sm sm:text-base">
              E
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

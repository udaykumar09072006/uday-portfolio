import React from 'react';
import { X, Trophy, Award, CheckCircle2, Flame, Star, Code2, ExternalLink } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/portfolioData';

interface AchievementModalProps {
  onClose: () => void;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl cyber-glass rounded-2xl border border-yellow-500/40 shadow-[0_0_50px_rgba(234,179,8,0.18)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f18] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider">
                ACHIEVEMENT ARENA // VERIFIED BENCHMARKS
              </div>
              <h2 className="font-cyber text-xl font-bold text-white tracking-wide">
                TECHNICAL MERIT & MILESTONES
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close [ESC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 gap-3.5">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-yellow-500/40 transition-colors space-y-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                        {ach.platform}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-950/50 text-yellow-300 border border-yellow-500/30">
                        {ach.verificationBadge}
                      </span>
                    </div>
                    <h3 className="font-cyber font-bold text-lg text-white group-hover:text-yellow-300 transition-colors">
                      {ach.title}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="font-cyber font-extrabold text-xl text-yellow-400 tracking-wide">
                      {ach.metric}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {ach.description}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400 border-t border-slate-800/80">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    RELIABLE VERIFIED DATA
                  </span>
                  <span>CATEGORY: {ach.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            <div className="text-white font-semibold flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>CORE ARCHITECTURAL PRINCIPLE:</span>
            </div>
            <p className="text-slate-400 font-sans">
              "No fabricated metrics or placeholder accomplishments. Every problem solved, certification completed, and system deployed reflects actual engineering commitment."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0f18] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>PRESS [ESC] TO CLOSE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/40 transition-colors font-bold"
          >
            RETURN TO ARENA
          </button>
        </div>
      </div>
    </div>
  );
};

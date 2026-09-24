import React from 'react';
import { X, Cpu, CheckCircle2, Award, Zap, Terminal } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

interface SkillDetailModalProps {
  categoryName: string | null;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ categoryName, onClose }) => {
  if (!categoryName) return null;

  const currentCategory = SKILL_CATEGORIES.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
  ) || SKILL_CATEGORIES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl cyber-glass rounded-2xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f18] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                SKILL CENTER // TELEMETRY NODE
              </div>
              <h2 className="font-cyber text-xl font-bold text-white tracking-wide">
                {currentCategory.name}
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
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-2 text-emerald-400">
              <Zap className="w-4 h-4" />
              <span>CATEGORY PROFICIENCY</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold">
              VERIFIED IN PRODUCTION
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCategory.skills.map((skill) => {
              const isExpert = skill.level === 'Expert';
              const isAdvanced = skill.level === 'Advanced';

              return (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isExpert
                          ? 'bg-emerald-400 shadow-[0_0_8px_rgba(0,255,136,0.6)]'
                          : isAdvanced
                          ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                          : 'bg-purple-400'
                      }`}
                    />
                    <span className="font-semibold text-sm text-slate-200 group-hover:text-white">
                      {skill.name}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      isExpert
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                        : isAdvanced
                        ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                        : 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Info Terminal Callout */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
            <div className="text-slate-400 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>PRACTICAL APPLICATION CONTEXT:</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans text-xs">
              Demonstrated across distributed production applications, real-time algorithmic pipelines (450+ LeetCode problems solved), and responsive microservices architecture.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0f18] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>PRESS [ESC] OR CLICK CLOSE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors font-bold"
          >
            RETURN TO 3D WORLD
          </button>
        </div>
      </div>
    </div>
  );
};

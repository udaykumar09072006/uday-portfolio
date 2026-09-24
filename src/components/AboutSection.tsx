import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { LeetCodeIcon } from './LeetCodeIcon';
import { Terminal, UserCheck, Code, ShieldCheck, GraduationCap, Laptop, ExternalLink } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>&gt; SYSTEM_PROFILE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cyber font-bold text-white tracking-wide">
              ENGINEERING IDENTITY
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl font-sans">
              Core background, engineering principles, and production focus.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400">
            <span>LOCATION // REMOTE READY</span>
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Profile Terminal Card */}
          <div className="lg:col-span-8 cyber-glass rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="font-cyber text-2xl font-bold text-white tracking-wide">
                    {DEVELOPER_INFO.name}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 mt-0.5">
                    {DEVELOPER_INFO.titleKicker}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {DEVELOPER_INFO.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <GraduationCap className="w-4 h-4" />
                    ACADEMIC STATUS
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    B.Tech in CSE (Batch 2023 – 2027)
                  </div>
                  <p className="text-xs text-slate-400">
                    Graduation 2027. Rigorous education in distributed computing, algorithmic complexity, and scalable software systems.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Code className="w-4 h-4" />
                    CORE FOCUS AREAS
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    Full-Stack &amp; Scalable AI
                  </div>
                  <p className="text-xs text-slate-400">
                    Constructing low-latency APIs, resilient data pipelines, and responsive frontend systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Invariants */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                NO FABRICATED METRICS OR EXPERIENCE
              </span>
              <span>EST. 2026 // COMMITTED CODE</span>
            </div>
          </div>

          {/* Quick Technical Profile Specs Panel */}
          <div className="lg:col-span-4 rounded-2xl bg-[#090d16] border border-slate-800 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  PROFILE_INSPECTOR
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">ID: 0907200635</span>
              </div>

              {/* Verified Photograph Card */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 group">
                <div className="aspect-[3/4] max-h-[460px] w-full overflow-hidden flex items-center justify-center bg-[#02050c]">
                  <img
                    src="/images/uday_full_stage.jpg"
                    alt="Uday Kumar - Software Engineer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded bg-slate-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/40 shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AUTHENTICATED
                  </span>
                  <span className="text-cyan-300 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-500/30 font-semibold">
                    ORIGINAL IDENTITY
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-500">ENGINEER:</span>
                  <span className="text-slate-200 font-semibold">{DEVELOPER_INFO.name}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-500">ROLE:</span>
                  <span className="text-cyan-400 font-semibold">{DEVELOPER_INFO.role}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-500">BATCH:</span>
                  <span className="text-cyan-400 font-semibold">2023 – 2027 (Grad: 2027)</span>
                </div>
                <a
                  href={DEVELOPER_INFO.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/40 flex justify-between items-center transition-colors group"
                  title="Open LeetCode Profile"
                >
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>DSA / LEETCODE:</span>
                  </span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1 group-hover:text-amber-300">
                    450+ Solved
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  </span>
                </a>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-500">CLOUD CERT:</span>
                  <span className="text-purple-400 font-semibold">Oracle AI Found.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-500">AVAILABILITY:</span>
                  <span className="text-emerald-400 font-semibold">Ready for Hire</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
              ⚡ Prepared to contribute immediately to backend scaling, frontend interfaces, or full-stack feature cycles.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { CERTIFICATES, ACHIEVEMENTS, Certificate } from '../data/portfolioData';
import { LeetCodeIcon } from './LeetCodeIcon';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Lock,
  BrainCircuit,
  TestTube2,
  Calendar,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Cloud & AI',
    'Cloud & Security',
    'Software Engineering',
    'Testing & QA',
  ];

  const filteredCertificates = selectedCategory === 'ALL'
    ? CERTIFICATES
    : CERTIFICATES.filter((cert) => cert.category === selectedCategory);

  // Helper for dynamic icon & theme by issuer/category
  const getCertStyling = (cert: Certificate) => {
    if (cert.issuer.includes('Oracle')) {
      return {
        badgeBorder: 'border-amber-500/40',
        badgeBg: 'bg-amber-950/40 text-amber-300',
        cardHover: 'hover:border-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.15)]',
        accentColor: 'text-amber-400',
        tagBg: 'bg-amber-950/60 border-amber-500/30 text-amber-200',
        icon: Cpu,
      };
    }
    if (cert.issuer.includes('Microsoft') && cert.category.includes('Security')) {
      return {
        badgeBorder: 'border-cyan-500/40',
        badgeBg: 'bg-cyan-950/40 text-cyan-300',
        cardHover: 'hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.15)]',
        accentColor: 'text-cyan-400',
        tagBg: 'bg-cyan-950/60 border-cyan-500/30 text-cyan-200',
        icon: Lock,
      };
    }
    if (cert.issuer.includes('Microsoft')) {
      return {
        badgeBorder: 'border-blue-500/40',
        badgeBg: 'bg-blue-950/40 text-blue-300',
        cardHover: 'hover:border-blue-500/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]',
        accentColor: 'text-blue-400',
        tagBg: 'bg-blue-950/60 border-blue-500/30 text-blue-200',
        icon: BrainCircuit,
      };
    }
    if (cert.issuer.includes('Simplilearn')) {
      return {
        badgeBorder: 'border-emerald-500/40',
        badgeBg: 'bg-emerald-950/40 text-emerald-300',
        cardHover: 'hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(0,255,136,0.15)]',
        accentColor: 'text-emerald-400',
        tagBg: 'bg-emerald-950/60 border-emerald-500/30 text-emerald-200',
        icon: TestTube2,
      };
    }
    // Scaler Topic / Java OOP
    return {
      badgeBorder: 'border-purple-500/40',
      badgeBg: 'bg-purple-950/40 text-purple-300',
      cardHover: 'hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]',
      accentColor: 'text-purple-400',
      tagBg: 'bg-purple-950/60 border-purple-500/30 text-purple-200',
      icon: Code2,
    };
  };

  return (
    <section id="certificates" className="py-20 relative bg-[#070a12]/70 scroll-mt-20">
      {/* Anchor for backwards compatibility */}
      <span id="achievements" className="block relative -top-24 invisible" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
              <span>&gt; VERIFIED_CERTIFICATIONS_INDEX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cyber font-bold text-white tracking-wide">
              OFFICIAL CERTIFICATES &amp; CREDENTIALS
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl font-sans">
              Verified certifications from Oracle, Microsoft, Simplilearn, and Scaler, validating technical competency in enterprise Cloud, AI systems, network security, software testing, and object-oriented engineering.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>5 VERIFIED CREDENTIALS</span>
          </div>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-slate-500 mr-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            FILTER:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = cat === 'ALL'
              ? CERTIFICATES.length
              : CERTIFICATES.filter((c) => c.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat.toUpperCase()} ({count})
              </button>
            );
          })}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => {
            const style = getCertStyling(cert);
            const IconComponent = style.icon;

            return (
              <div
                key={cert.id}
                className={`cyber-glass rounded-2xl p-6 border border-slate-800/90 ${style.cardHover} transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden`}
              >
                {/* Decorative background glow node */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Icon, Category & Verification Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`p-2.5 rounded-xl bg-slate-900/90 border ${style.badgeBorder}`}>
                      <IconComponent className={`w-5 h-5 ${style.accentColor}`} />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {cert.verificationBadge}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <div>
                    <h3 className="text-base sm:text-lg font-cyber font-bold text-white leading-snug group-hover:text-cyan-200 transition-colors">
                      {cert.title}
                    </h3>

                    {/* Issuer & Period Info */}
                    <div className="mt-2 space-y-1">
                      <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-semibold">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{cert.issuer}</span>
                      </div>
                      {cert.period && (
                        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                          <span>{cert.period}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certificate Description */}
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {cert.description}
                  </p>

                  {/* Verified Skill Modules */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/70">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      VALIDATED COMPETENCIES:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="text-slate-500">{cert.category}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPLEMENTARY DSA & PROBLEM SOLVING BENCHMARKS */}
        <div className="pt-8 border-t border-slate-800/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-purple-400">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>COMPETITIVE PROGRAMMING BENCHMARKS</span>
              </div>
              <h3 className="font-cyber font-bold text-xl text-white mt-1">
                ALGORITHMIC PROBLEM SOLVING RECORDS
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              LeetCode &amp; HackerRank Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.filter((ach) => ach.id !== 'oracle-cloud').map((ach) => (
              <div
                key={ach.id}
                className="cyber-glass rounded-2xl p-6 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:shadow-[0_0_30px_rgba(251,191,36,0.12)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/20 flex items-center gap-1.5">
                      {ach.id === 'leetcode' && <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{ach.platform}</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {ach.verificationBadge}
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-cyber font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                      {ach.metric}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-200 mt-1">
                      {ach.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {ach.description}
                  </p>

                  {ach.url && (
                    <div className="pt-2">
                      <a
                        href={ach.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-white text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                      >
                        <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>OPEN LEETCODE PROFILE</span>
                        <ExternalLink className="w-3 h-3 text-amber-400" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>CATEGORY: {ach.category}</span>
                  <span className="text-emerald-400">ACTIVE PRACTICE</span>
                </div>
              </div>
            ))}
          </div>

          {/* DSA Methodology Terminal Strip */}
          <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2.5">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                SYSTEMATIC_DSA_OPTIMIZATION_FRAMEWORK
              </span>
              <span className="text-slate-500">Big-O Benchmark Standards</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-slate-300">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Time Complexity</span>
                <span className="text-slate-400 text-[11px]">Strict targeting of O(1), O(log N), or O(N) constraints</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Space Overhead</span>
                <span className="text-slate-400 text-[11px]">In-place transformations and memory recycling</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Graph Traversal</span>
                <span className="text-slate-400 text-[11px]">BFS, DFS, Dijkstra, Topological Sort &amp; Union-Find</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Dynamic Programming</span>
                <span className="text-slate-400 text-[11px]">Memoization, Tabulation, Bitmasking &amp; State reduction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

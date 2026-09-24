import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Sparkles, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MilestoneCard {
  year: string;
  phase: string;
  headline: string;
  description: string;
  achievements: string[];
  metrics: string;
  badge: string;
  accent: string;
}

const MILESTONES: MilestoneCard[] = [
  {
    year: '2022',
    phase: 'GENESIS & CORE CS',
    headline: 'Algorithmic Foundations & Core Systems',
    description:
      'Immersed deeply into core Computer Science fundamentals: computational complexity, memory management, pointers, and object-oriented architecture.',
    achievements: [
      'Mastered core C++ & Python syntax and memory layout',
      'Implemented foundational algorithms (Sorting, Trees, Graphs)',
      'Built early full-stack prototypes and database schemas',
    ],
    metrics: '150+ DSA Solutions Solved',
    badge: 'FOUNDATIONS',
    accent: '#38bdf8',
  },
  {
    year: '2023',
    phase: 'B.TECH CSE INCEPTION',
    headline: 'Batch 2023–2027 & Web Architectures',
    description:
      'Commenced B.Tech in Computer Science & Engineering (Batch 2023–2027). Engineered distributed client-server systems, RESTful APIs, transactional SQL schemas, and responsive UX.',
    achievements: [
      'Commenced B.Tech Computer Science curriculum (Graduation: 2027)',
      'Engineered production React & Node.js web applications',
      'Architected PostgreSQL normalized relational databases',
    ],
    metrics: 'Batch 2023–2027 Inception',
    badge: 'B.TECH CSE',
    accent: '#4ade80',
  },
  {
    year: '2024',
    phase: 'DSA MASTERY & CLOUD AI',
    headline: '450+ Algorithmic Milestones & Cloud Certification',
    description:
      'Achieved competitive programming milestones across LeetCode & GeeksforGeeks while earning official Oracle Cloud Infrastructure (OCI) AI Foundations credentials.',
    achievements: [
      'Crossed 450+ verified LeetCode & algorithmic problems',
      'Earned Oracle Cloud Infrastructure Certified AI Foundations Associate',
      'Completed Scaler OOP in Java & Simplilearn Software Testing certifications',
    ],
    metrics: '450+ Problems Solved // Top 15%',
    badge: 'OCI CERTIFIED',
    accent: '#facc15',
  },
  {
    year: '2025',
    phase: 'AI & SCALABLE SYSTEMS',
    headline: 'High-Throughput Engines & AI Compliance',
    description:
      'Architected Riskora AI (automated multimodal regulatory compliance auditor) and ScaleCheck (distributed load testing visualizer with real-time WebSockets).',
    achievements: [
      'Built multi-agent AI auditor utilizing Gemini API and RAG',
      'Engineered multi-threaded synthetic load generation engine',
      'Reduced p99 latency to 18ms under 50,000 synthetic requests',
    ],
    metrics: '50K+ Concurrent RPS Handled',
    badge: 'ENTERPRISE AI',
    accent: '#00f0ff',
  },
  {
    year: '2026',
    phase: 'PRODUCTION-GRADE SCALE',
    headline: 'Distributed Systems & Multi-Cloud Credentials',
    description:
      'Delivering end-to-end full-stack software with microservices, automated testing, container orchestration, and real-time WebGL spatial rendering.',
    achievements: [
      'Earned Microsoft Azure Storage Security & Microsoft AI Fundamentals credentials',
      'Engineered interactive 3D WebGL architecture analyzers with Three.js',
      'Delivered production-grade real-time systems with automated STLC test coverage',
    ],
    metrics: '5 Industry Certifications Earned',
    badge: 'SENIOR GRADE',
    accent: '#00ff88',
  },
  {
    year: '2027',
    phase: 'B.TECH GRADUATION',
    headline: 'Graduation Class of 2027 & Engineering Leadership',
    description:
      'Official graduation with B.Tech in Computer Science & Engineering (Batch 2023–2027), ready to drive scalable distributed backends, modern AI infrastructure, and resilient full-stack systems.',
    achievements: [
      'B.Tech Degree in Computer Science & Engineering Conferral',
      'Full-Stack & Cloud AI System Engineering Competency',
      'Available for full-time Software Engineer (SDE) roles worldwide',
    ],
    metrics: 'Class of 2027 // Graduated',
    badge: 'GRADUATION 2027',
    accent: '#e879f9',
  },
];

export const ChronoScene: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(MILESTONES.length - 1);
  const current = MILESTONES[activeIndex];

  return (
    <section id="chrono" className="relative min-h-screen bg-[#06070c] py-20 px-4 sm:px-8 border-t border-slate-800/80 overflow-hidden flex flex-col justify-between">
      {/* Background timeline rail pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute inset-0 cyber-grid" />
      </div>

      {/* Top Header Rail */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="space-y-1.5">
          <p className="font-oswald text-xs uppercase tracking-[0.3em] text-emerald-400">
            SCENE 03 // TEMPORAL CHRONOLOGY
          </p>
          <h2 className="font-film text-3xl sm:text-4xl lg:text-5xl tracking-wide text-white uppercase">
            A JOURNEY THROUGH TIME
          </h2>
          <p className="font-oswald text-xs sm:text-sm text-slate-400 tracking-wider">
            Ideas · Experiences · Architecture · Systems · Uday
          </p>
        </div>

        {/* Chrono Navigation Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 font-oswald text-xs">
          {MILESTONES.map((m, idx) => (
            <button
              key={m.year}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeIndex === idx
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,255,136,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {m.year}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chrono Deck with Spatial Character Presence */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Side Editorial Cues & Persona */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="space-y-1">
            <span className="font-oswald text-xs tracking-[0.25em] text-cyan-400 uppercase">
              • CHRONO LOG {current.year} •
            </span>
            <div className="font-film text-5xl sm:text-6xl text-white tracking-wider">
              {current.year}
            </div>
            <div className="font-oswald text-sm text-emerald-400 tracking-widest font-semibold uppercase">
              {current.phase}
            </div>
          </div>

          {/* Persona Silhouette with Verified Photo */}
          <div className="relative w-48 sm:w-56 h-64 sm:h-72 flex justify-center items-end bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent rounded-2xl border border-slate-800/80 p-3 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent opacity-60" />
            <img
              src="/images/uday-profile.png"
              alt="Uday Kumar in formal suit"
              className="h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-2 inset-x-2 px-2 py-1 bg-black/80 backdrop-blur rounded border border-slate-700/60 text-center font-mono text-[10px] text-slate-300">
              UDAY KUMAR · {current.year}
            </div>
          </div>

          <div className="space-y-2 text-xs font-oswald text-slate-400 tracking-wider">
            <p className="italic text-slate-300">
              &ldquo;Same curiosity, a brighter tomorrow. Still engineering what&rsquo;s next.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Milestone Card with 3D Depth Stack */}
        <div className="lg:col-span-7">
          <div className="relative bg-[#080d1a]/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-6">
            {/* Header of Card */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span
                  className="px-2.5 py-0.5 rounded font-oswald text-[11px] font-bold tracking-widest uppercase border"
                  style={{
                    backgroundColor: `${current.accent}15`,
                    color: current.accent,
                    borderColor: `${current.accent}40`,
                  }}
                >
                  {current.badge}
                </span>
                <h3 className="font-film text-2xl sm:text-3xl text-white tracking-wide mt-2">
                  {current.headline}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 font-oswald text-xs">
                <button
                  onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeIndex === 0}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                  aria-label="Previous year"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => Math.min(MILESTONES.length - 1, prev + 1))}
                  disabled={activeIndex === MILESTONES.length - 1}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                  aria-label="Next year"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              {current.description}
            </p>

            {/* Key Shipped Milestones */}
            <div className="space-y-2.5">
              <span className="font-oswald text-xs text-slate-400 uppercase tracking-widest">
                VERIFIED DELIVERABLES &amp; IMPACT:
              </span>
              <div className="space-y-2">
                {current.achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-sans text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Banner */}
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">TELEMETRY KEY:</span>
              <span className="text-cyan-300 font-bold">{current.metrics}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Progress Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-500">
        <span>TIMELINE RAIL // DRAG OR CLICK YEAR TO ADVANCE</span>
        <span className="text-emerald-400 font-bold">STAGE {activeIndex + 1} OF {MILESTONES.length}</span>
      </div>
    </section>
  );
};

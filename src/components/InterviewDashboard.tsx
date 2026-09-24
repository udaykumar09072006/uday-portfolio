import React, { useState } from 'react';
import {
  Zap,
  X,
  FileDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Award,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { DEVELOPER_INFO, PROJECTS, ACHIEVEMENTS } from '../data/portfolioData';
import { LeetCodeIcon } from './LeetCodeIcon';

interface InterviewDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const InterviewDashboard: React.FC<InterviewDashboardProps> = ({
  isOpen,
  onClose,
  onNavigateToSection,
  onOpenResume,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const menuItems = [
    {
      num: "01",
      label: "PROJECTS",
      desc: "5 Production Applications (Riskora AI, ScaleCheck 3D, MediCare, etc.)",
      target: "projects",
      icon: Code2,
    },
    {
      num: "02",
      label: "TECHNICAL SKILLS",
      desc: "C++, Python, TypeScript, React, FastAPI, Node.js, System Architecture",
      target: "skills",
      icon: Cpu,
    },
    {
      num: "03",
      label: "SYSTEM DESIGN",
      desc: "Distributed Pipeline Architecture & Interactive Latency Simulator",
      target: "system-design",
      icon: Database,
    },
    {
      num: "04",
      label: "CERTIFICATES & DSA",
      desc: "5 Enterprise Certifications (Oracle, Azure, MSFT AI, Simplilearn, Scaler) & 450+ LeetCode",
      target: "certificates",
      icon: Award,
    },
    {
      num: "05",
      label: "RESUME",
      desc: "Official Software Engineer Curriculum Vitae (PDF)",
      target: "resume",
      icon: FileDown,
      action: onOpenResume,
    },
    {
      num: "06",
      label: "CONTACT",
      desc: "Email, GitHub, LinkedIn Direct Endpoints",
      target: "contact",
      icon: Mail,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl cyber-glass rounded-2xl border border-emerald-500/30 shadow-[0_0_50px_rgba(0,255,136,0.15)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f18] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cyber font-bold text-lg text-white tracking-wide">
                  INTERVIEW MODE
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/40">
                  STATUS: READY
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Executive briefing & fast-track navigation for engineering interviewers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Interview Mode [ESC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Action Bar for Interviewers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                onOpenResume();
                onClose();
              }}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.5)]"
            >
              <FileDown className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </button>

            <a
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-medium text-sm transition-colors"
            >
              <Github className="w-4 h-4 text-emerald-400" />
              <span>VIEW GITHUB</span>
              <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
            </a>

            <a
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-medium text-sm transition-colors"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <span>VIEW LINKEDIN</span>
              <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
            </a>

            <a
              href={DEVELOPER_INFO.leetcode}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-amber-500/40 font-medium text-sm transition-colors"
            >
              <LeetCodeIcon className="w-4 h-4 text-amber-400" />
              <span>LEETCODE (450+)</span>
              <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
            </a>
          </div>

          {/* Quick Developer Card for Recruiter */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{DEVELOPER_INFO.name}</span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-emerald-400 font-mono">B.Tech CSE (Batch 2023–2027 · Grad 2027)</span>
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                Specialized in scalable full-stack applications, AI/ML inference workflows, distributed backend systems, and competitive problem solving.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 transition-colors"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'COPIED!' : DEVELOPER_INFO.email}</span>
              </button>
            </div>
          </div>

          {/* Rapid Navigation Grid */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              INTERVIEW SECTION FAST-TRACK
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.num}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        onNavigateToSection(item.target);
                      }
                      onClose();
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#0c111a] hover:bg-[#121927] border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs font-bold text-emerald-400 px-2 py-1 rounded bg-slate-900 border border-emerald-500/20">
                        {item.num} →
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center gap-1.5">
                          <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                          <span>{item.label}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 font-mono text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
              <div className="text-emerald-400 font-bold text-sm">450+</div>
              <div className="text-slate-400 text-[11px]">LeetCode DSA</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
              <div className="text-cyan-400 font-bold text-sm">5-Star</div>
              <div className="text-slate-400 text-[11px]">HackerRank Solving</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
              <div className="text-purple-400 font-bold text-sm">5 Certs</div>
              <div className="text-slate-400 text-[11px]">Oracle, Azure, MSFT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

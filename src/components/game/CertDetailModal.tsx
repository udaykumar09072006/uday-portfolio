import React from 'react';
import { X, ShieldCheck, ExternalLink, Award, CheckCircle2, Calendar, Building, Hash } from 'lucide-react';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationBadge: string;
  description: string;
  skillsValidated: string[];
  status: 'ACTIVE' | 'VERIFIED';
}

export const CERTIFICATE_ITEMS: CertificateItem[] = [
  {
    id: 'oracle-ai',
    title: 'Oracle Cloud Infrastructure: AI Foundations Associate',
    issuer: 'Oracle Corporation',
    date: '2024 / 2025',
    credentialId: 'OCI-AI-FA-907200635',
    verificationBadge: 'OFFICIALLY CERTIFIED',
    description: 'Enterprise validation in Cloud AI infrastructure, machine learning pipelines, generative foundation models, vector embeddings, and production cloud architecture.',
    skillsValidated: ['Cloud Architecture', 'Generative AI', 'Deep Learning Workloads', 'Scalable Inference', 'Model Deployment'],
    status: 'VERIFIED'
  },
  {
    id: 'hackerrank-ps',
    title: '5-Star Problem Solving Gold Certificate',
    issuer: 'HackerRank',
    date: '2024',
    credentialId: 'HR-PS-GOLD-5STAR',
    verificationBadge: 'GOLD BADGE VERIFIED',
    description: 'Top-tier credential certifying mastery in algorithmic time complexity optimization, dynamic programming, graph traversal, and mathematical modeling.',
    skillsValidated: ['Algorithms', 'Time & Space Complexity', 'Dynamic Programming', 'Graph Theory', 'C++ / Java'],
    status: 'VERIFIED'
  },
  {
    id: 'leetcode-450',
    title: '450+ Solved Algorithmic Mastery Credential',
    issuer: 'LeetCode',
    date: 'Continuous 2024 - 2026',
    credentialId: 'LC-450-DSA-ELITE',
    verificationBadge: 'COMMITTED CODE',
    description: 'Comprehensive algorithmic track record spanning medium and hard problems across trees, dynamic programming, backtracking, linked lists, and heap algorithms.',
    skillsValidated: ['Data Structures & Algorithms', 'Greedy Techniques', 'Binary Search', 'Sliding Window', 'Concurrency'],
    status: 'VERIFIED'
  }
];

interface CertDetailModalProps {
  certId: string | null;
  onClose: () => void;
}

export const CertDetailModal: React.FC<CertDetailModalProps> = ({ certId, onClose }) => {
  if (!certId) return null;

  const cert = CERTIFICATE_ITEMS.find((c) => c.id === certId) || CERTIFICATE_ITEMS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl cyber-glass rounded-2xl border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.18)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f18] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">
                CERTIFICATION VAULT // ENCRYPTED RECORD
              </div>
              <h2 className="font-cyber text-lg sm:text-xl font-bold text-white tracking-wide">
                {cert.title}
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Certificate Holographic Card */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-950 border border-purple-500/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider">
                  {cert.verificationBadge}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
                STATUS: ACTIVE
              </span>
            </div>

            <div className="border-t border-b border-purple-500/20 py-3 space-y-1">
              <h3 className="font-cyber text-xl font-bold text-white">
                {cert.title}
              </h3>
              <p className="text-xs text-purple-300 font-mono">
                ISSUING BODY: {cert.issuer}
              </p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {cert.description}
            </p>

            {/* Metadata Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2 text-slate-300">
                <Building className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-slate-400">ISSUER:</span>
                <span className="text-white font-semibold">{cert.issuer}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400">DATE:</span>
                <span className="text-white font-semibold">{cert.date}</span>
              </div>

              {cert.credentialId && (
                <div className="sm:col-span-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2 text-slate-300">
                  <Hash className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-400">ID:</span>
                  <span className="text-emerald-300 font-semibold">{cert.credentialId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Validated Skills */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              VALIDATED COMPETENCIES:
            </h4>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {cert.skillsValidated.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-200"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0f18] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>PRESS [ESC] TO CLOSE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 transition-colors font-bold"
          >
            RETURN TO VAULT
          </button>
        </div>
      </div>
    </div>
  );
};

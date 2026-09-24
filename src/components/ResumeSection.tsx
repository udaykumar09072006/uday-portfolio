import React from 'react';
import { FileDown, Eye, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const handleDownload = () => {
    const resumeText = `
UDAY KUMAR
Software Engineer | Full-Stack Developer • AI • DSA • Scalable Systems
Email: ${DEVELOPER_INFO.email}
GitHub: ${DEVELOPER_INFO.github}
LinkedIn: ${DEVELOPER_INFO.linkedin}
LeetCode: ${DEVELOPER_INFO.leetcode}

EDUCATION
${DEVELOPER_INFO.education.degree}
Batch: ${DEVELOPER_INFO.education.batch} | Graduation: ${DEVELOPER_INFO.education.graduationYear}
Focus: ${DEVELOPER_INFO.education.focus}
Status: ${DEVELOPER_INFO.education.status}

TECHNICAL SKILLS
Languages: C++, Java, Python, JavaScript, TypeScript
Frontend: React, Next.js, HTML, CSS, Tailwind CSS
Backend: Node.js, Express.js, FastAPI, REST APIs, WebSockets
Database: MongoDB, MySQL, SQL, NoSQL
AI & Modern Tech: LLMs, Agents, Prompt Engineering, RAG
CS Fundamentals: DSA, OOP, OS, DBMS, Computer Networks, System Design
Developer Tools: Git, GitHub, Linux, Postman, VS Code, Vercel

KEY ENGINEERING PROJECTS
- Riskora AI: Real-time fraud prevention & investigation engine (FastAPI, React, Scikit-Learn)
- ScaleCheck 3D: Web scalability and 3D architectural pipeline analyzer
- MediCare: Full-stack clinical management platform with granular RBAC
- Intervexa: Synchronized real-time interview collaboration and test runner
- Resume Builder with ATS Checker: Rule-based ATS validator and vector PDF generator

OFFICIAL CERTIFICATIONS
- Oracle Cloud Infrastructure Certified AI Foundations Associate (Oracle University — Sep 2025 – Sep 2027)
- Configure Network Security for Azure Storage (Microsoft Learn, Microsoft Azure — Jun 2026)
- Introduction to AI Concepts (Microsoft Learn, Microsoft AI Fundamentals — Jun 2026)
- Introduction to Software Testing (Simplilearn SkillUp)
- Object Oriented Programming in Java (Scaler Topic)

VERIFIED ALGORITHMIC MILESTONES (DSA)
- 450+ LeetCode DSA Problems Solved
- 5-Star HackerRank Problem Solving Rating
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Uday_Kumar_Software_Engineer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="resume" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>&gt; DOCUMENT_DISPATCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cyber font-bold text-white tracking-wide">
              CURRICULUM VITAE
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl font-sans">
              Verified software engineering credentials, academic records, tech stack competencies, and project portfolio summary.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>ORIGINAL SOURCE VERIFIED</span>
          </div>
        </div>

        {/* Dedicated Resume Card Display */}
        <div className="cyber-glass rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-[0_0_40px_rgba(0,255,136,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-400 shrink-0 shadow-inner">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1.5 font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg sm:text-xl text-white">
                  RESUME.pdf
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-500/40">
                  STATUS: AVAILABLE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Official resume for Uday Kumar — Software Engineer (Updated 2026).
              </p>
              <div className="text-[11px] text-slate-500 flex items-center gap-3">
                <span>FORMAT: PDF / TEXT</span>
                <span>·</span>
                <span>SHA-256 VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-mono text-xs">
            <button
              onClick={onOpenResumeModal}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 font-semibold transition-all hover:border-cyan-500/50"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>VIEW RESUME</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_25px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
            >
              <FileDown className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

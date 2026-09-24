import React from 'react';
import { X, FileDown, Printer, ExternalLink, CheckCircle2, ShieldCheck, Mail, Github, Linkedin } from 'lucide-react';
import { LeetCodeIcon } from './LeetCodeIcon';
import { DEVELOPER_INFO, PROJECTS, SKILL_CATEGORIES, ACHIEVEMENTS, CERTIFICATES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generates a clean structured text/markdown representation or triggers print-to-pdf
    const resumeText = `
UDAY KUMAR
Software Engineer | Full-Stack Developer • AI • DSA • Scalable Systems
Email: ${DEVELOPER_INFO.email}
GitHub: ${DEVELOPER_INFO.github}
LinkedIn: ${DEVELOPER_INFO.linkedin}
LeetCode: ${DEVELOPER_INFO.leetcode}

--------------------------------------------------------------------------------
EDUCATION
${DEVELOPER_INFO.education.degree}
Batch: ${DEVELOPER_INFO.education.batch} | Graduation: ${DEVELOPER_INFO.education.graduationYear}
Focus: ${DEVELOPER_INFO.education.focus}
Status: ${DEVELOPER_INFO.education.status}

--------------------------------------------------------------------------------
TECHNICAL SKILLS
Languages: C++, Java, Python, JavaScript, TypeScript
Frontend: React, Next.js, HTML, CSS, Tailwind CSS
Backend: Node.js, Express.js, FastAPI, REST APIs, WebSockets
Database: MongoDB, MySQL, SQL, NoSQL
AI & Modern Tech: LLMs, Agents, Prompt Engineering, RAG
CS Fundamentals: DSA, OOP, OS, DBMS, Computer Networks, System Design
Developer Tools: Git, GitHub, Linux, Postman, VS Code, Vercel

--------------------------------------------------------------------------------
KEY ENGINEERING PROJECTS

1. Riskora AI - AI-Powered Fraud Detection & Investigation Platform
Live Demo: https://riskora-3.onrender.com | GitHub: https://github.com/udaykumar09072006/Riskora
- Real-time transaction anomaly radar analyzing velocity and behavioral entropy
- Multi-vector fraud risk scoring with sub-millisecond evaluation heuristics
- Full analyst investigation UI with linked-entity graph inspection

2. ScaleCheck 3D - Website Scalability & System Analysis Platform
GitHub: https://github.com/udaykumar09072006/ScaleCheck-3D
- 3D interactive pipeline visualization of distributed microservice hops
- Caching audits, rate limiting threshold simulation, and system optimization recommendations

3. MediCare - Smart Healthcare Management Platform
GitHub: https://github.com/udaykumar09072006/MediCare
- Role-based portal for Doctors, Patients, and Staff with encrypted health records
- Interactive appointment conflict solver and digital prescription dispatch

4. Intervexa - Full-Stack Technical Interview Suite
GitHub: https://github.com/udaykumar09072006/Intervexa
- Multi-user synchronized code editor with WebSocket broadcast and syntax analysis
- Test assertion runner and candidate evaluation rubric system

5. Resume Builder with ATS Checker
GitHub: https://github.com/udaykumar09072006/Resume-Builder-ATS
- Deterministic rule-based ATS keyword analysis and vector PDF export

--------------------------------------------------------------------------------
OFFICIAL CERTIFICATIONS
- Oracle Cloud Infrastructure Certified AI Foundations Associate (Oracle University — Sep 2025 – Sep 2027)
- Configure Network Security for Azure Storage (Microsoft Learn, Microsoft Azure — Jun 2026)
- Introduction to AI Concepts (Microsoft Learn, Microsoft AI Fundamentals — Jun 2026)
- Introduction to Software Testing (Simplilearn SkillUp)
- Object Oriented Programming in Java (Scaler Topic)

--------------------------------------------------------------------------------
VERIFIED ALGORITHMIC MILESTONES (DSA)
- 450+ LeetCode Problems Solved (Dynamic Programming, Graphs, Trees, System Design)
- 5-Star Problem Solving Rating on HackerRank
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl cyber-glass rounded-2xl border border-emerald-500/40 shadow-[0_0_60px_rgba(0,255,136,0.15)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f18] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/30 font-mono text-xs text-emerald-400 font-bold">
              RESUME.pdf
            </div>
            <div>
              <h2 className="font-cyber font-bold text-lg text-white">
                CURRICULUM VITAE PREVIEW
              </h2>
              <p className="text-xs text-slate-400 font-mono">STATUS: AVAILABLE // VERIFIED</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono transition-colors"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PRINT</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)]"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-950/90 text-slate-200 font-sans space-y-6">
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-6 space-y-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-cyber font-bold text-white tracking-wide">
                UDAY KUMAR
              </h1>
              <span className="text-emerald-400 font-mono text-xs font-semibold">
                SOFTWARE ENGINEER
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Full-Stack Developer • Scalable Systems • AI Applications • Data Structures &amp; Algorithms
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono pt-1">
              <a href={`mailto:${DEVELOPER_INFO.email}`} className="hover:text-emerald-400 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {DEVELOPER_INFO.email}
              </a>
              <a href={DEVELOPER_INFO.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                <Github className="w-3.5 h-3.5" />
                github.com/udaykumar09072006
              </a>
              <a href={DEVELOPER_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a href={DEVELOPER_INFO.leetcode} target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1">
                <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
                LeetCode
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              EDUCATION
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
              <span className="font-semibold text-white">{DEVELOPER_INFO.education.degree}</span>
              <span className="text-xs font-mono text-emerald-400">{DEVELOPER_INFO.education.status}</span>
            </div>
            <p className="text-xs text-slate-400">{DEVELOPER_INFO.education.focus}</p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              TECHNICAL PROFICIENCIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div><span className="text-slate-400 font-medium">Languages:</span> <span className="text-slate-200">C++, Java, Python, JavaScript, TypeScript</span></div>
              <div><span className="text-slate-400 font-medium">Frontend:</span> <span className="text-slate-200">React, Next.js, HTML, CSS, Tailwind CSS</span></div>
              <div><span className="text-slate-400 font-medium">Backend:</span> <span className="text-slate-200">Node.js, Express.js, FastAPI, REST APIs, WebSockets</span></div>
              <div><span className="text-slate-400 font-medium">Databases:</span> <span className="text-slate-200">MongoDB, MySQL, SQL, NoSQL</span></div>
              <div><span className="text-slate-400 font-medium">AI &amp; ML:</span> <span className="text-slate-200">LLMs, Agents, Prompt Engineering, RAG</span></div>
              <div><span className="text-slate-400 font-medium">CS Fundamentals:</span> <span className="text-slate-200">DSA, OOP, OS, DBMS, Computer Networks, System Design</span></div>
              <div><span className="text-slate-400 font-medium">Tools &amp; DevOps:</span> <span className="text-slate-200">Git, GitHub, Linux, Postman, VS Code, Vercel</span></div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              KEY ENGINEERING PROJECTS
            </h3>
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="font-bold text-sm text-white">{proj.title}</span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {proj.techStack.slice(0, 4).join(' · ')}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{proj.description}</p>
                <div className="text-slate-400">
                  <span className="text-emerald-400 font-mono">Architecture:</span> {proj.architecture}
                </div>
              </div>
            ))}
          </div>

          {/* Official Certifications */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              OFFICIAL CERTIFICATIONS (5)
            </h3>
            <div className="space-y-2 text-xs">
              {CERTIFICATES.map((cert) => (
                <div key={cert.id} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200">{cert.title}</span>
                    <span className="text-slate-400"> — {cert.issuer} {cert.period ? `(${cert.period})` : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified DSA Achievements */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              ALGORITHMIC &amp; PROBLEM SOLVING BENCHMARKS
            </h3>
            <div className="space-y-2 text-xs">
              {ACHIEVEMENTS.filter((ach) => ach.id !== 'oracle-cloud').map((ach) => (
                <div key={ach.id} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200">{ach.platform} ({ach.metric})</span>
                    <span className="text-slate-400"> — {ach.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

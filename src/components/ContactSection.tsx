import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { LeetCodeIcon } from './LeetCodeIcon';
import { Mail, Github, Linkedin, Instagram, FileText, Send, Check, Copy, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResumeModal }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'dispatched'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    // Create mailto link with prefilled subject and body
    const subject = encodeURIComponent(`Engineering Opportunity / Inquiry from ${senderName || 'Tech Recruiter'}`);
    const body = encodeURIComponent(`From: ${senderName} (${senderEmail})\n\nMessage:\n${message}`);
    window.location.href = `mailto:${DEVELOPER_INFO.email}?subject=${subject}&body=${body}`;

    setSendStatus('dispatched');
    setTimeout(() => setSendStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="py-20 relative bg-[#070a12]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>&gt; CONNECTION_REQUEST</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cyber font-bold text-white tracking-wide">
              DISPATCH COMMUNICATION
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl font-sans">
              Connect directly for software engineering roles, technical interviews, or scalable AI initiatives.
            </p>
          </div>

          <div className="font-mono text-xs text-emerald-400 px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>STATUS: READY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Endpoint Buttons */}
          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            <div className="cyber-glass rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="text-slate-400 uppercase tracking-wider font-bold flex items-center gap-2 border-b border-slate-800 pb-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                VERIFIED CHANNELS
              </div>

              {/* Email Direct */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">PRIMARY EMAIL</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${DEVELOPER_INFO.email}`}
                  className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{DEVELOPER_INFO.email}</span>
                </a>
              </div>

              {/* GitHub */}
              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 text-emerald-400">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-bold block text-sm group-hover:text-emerald-300">
                      GitHub
                    </span>
                    <span className="text-slate-500 text-[11px]">github.com/udaykumar09072006</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={DEVELOPER_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 text-cyan-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-bold block text-sm group-hover:text-cyan-300">
                      LinkedIn
                    </span>
                    <span className="text-slate-500 text-[11px]">linkedin.com/in/uday-kumar-08934628b</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>

              {/* LeetCode */}
              <a
                href={DEVELOPER_INFO.leetcode}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/40 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 text-amber-400">
                    <LeetCodeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-bold block text-sm group-hover:text-amber-300">
                      LeetCode
                    </span>
                    <span className="text-slate-500 text-[11px]">leetcode.com/u/udaykumar09072006</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </a>

              {/* Instagram */}
              <a
                href={DEVELOPER_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-pink-500/40 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 text-pink-400">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-bold block text-sm group-hover:text-pink-300">
                      Instagram
                    </span>
                    <span className="text-slate-500 text-[11px]">@yadav_udayy001</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
              </a>

              {/* Resume Quick Trigger */}
              <button
                onClick={onOpenResumeModal}
                className="w-full p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-purple-500/40 flex items-center justify-between transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 text-purple-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-bold block text-sm group-hover:text-purple-300">
                      Resume Document
                    </span>
                    <span className="text-slate-500 text-[11px]">Inspect official PDF Curriculum Vitae</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Column: Transmission Console */}
          <div className="lg:col-span-7 cyber-glass rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <span className="font-cyber font-bold text-lg text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                TRANSMIT INQUIRY
              </span>
              <span className="text-xs font-mono text-slate-500">ENCRYPTED DISPATCH</span>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g., Jane Smith (Tech Lead)"
                    className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 uppercase">Message Content</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Discuss role opportunity, technical interview, or project collaboration..."
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 resize-none font-sans text-xs sm:text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct mailto client dispatch</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.5)]"
                >
                  <Send className="w-4 h-4" />
                  <span>{sendStatus === 'dispatched' ? 'DISPATCHED!' : 'DISPATCH MESSAGE'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

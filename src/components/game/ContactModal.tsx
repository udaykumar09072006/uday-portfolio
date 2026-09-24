import React, { useState } from 'react';
import { X, Mail, Github, Linkedin, Send, CheckCircle2, Radio, ExternalLink } from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/portfolioData';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl cyber-glass rounded-2xl border border-emerald-500/40 shadow-[0_0_50px_rgba(0,255,136,0.18)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f18] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                CONTACT STATION // QUANTUM RELAY
              </div>
              <h2 className="font-cyber text-xl font-bold text-white tracking-wide">
                INITIATE TRANSMISSION
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
          {/* Direct Communication Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`mailto:${DEVELOPER_INFO.email}`}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors flex flex-col items-center justify-center text-center group"
            >
              <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="font-mono text-xs font-bold text-white">EMAIL</span>
              <span className="text-[10px] text-slate-400 font-mono truncate w-full mt-0.5">
                {DEVELOPER_INFO.email}
              </span>
            </a>

            <a
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors flex flex-col items-center justify-center text-center group"
            >
              <Github className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="font-mono text-xs font-bold text-white flex items-center gap-1">
                GITHUB <ExternalLink className="w-3 h-3 text-slate-500" />
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate w-full mt-0.5">
                @udaykumar09072006
              </span>
            </a>

            <a
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors flex flex-col items-center justify-center text-center group"
            >
              <Linkedin className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="font-mono text-xs font-bold text-white flex items-center gap-1">
                LINKEDIN <ExternalLink className="w-3 h-3 text-slate-500" />
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate w-full mt-0.5">
                uday-kumar-dev
              </span>
            </a>
          </div>

          {/* Direct Message Form */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              DIRECT DISPATCH DISPATCHER
            </h3>

            {isSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-cyber font-bold text-emerald-300 text-base">
                  MESSAGE DISPATCHED SUCCESSFULLY
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  Transmitted to Uday Kumar's inbox ({DEVELOPER_INFO.email}). Response anticipated promptly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">INTERVIEWER / RECRUITER NAME</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Sarah Connor / Google Talent"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">CONTACT EMAIL</label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">MESSAGE / OPPORTUNITY DETAILS</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide role description, scheduling inquiry, or technical review notes..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH TRANSMISSION</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0f18] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>PRESS [ESC] TO RETURN TO 3D WORLD</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors font-bold"
          >
            CLOSE COMMS
          </button>
        </div>
      </div>
    </div>
  );
};

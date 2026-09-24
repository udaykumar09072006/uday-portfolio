import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2, Copy, Check, Sparkles } from 'lucide-react';
import { DEVELOPER_INFO, PROJECTS, SKILL_CATEGORIES, ACHIEVEMENTS, CERTIFICATES } from '../data/portfolioData';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  content: string | React.ReactNode;
}

interface InteractiveTerminalProps {
  onOpenProject?: (projectId: string) => void;
  onOpenResume?: () => void;
  onOpenContact?: () => void;
  onReplayIntro?: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  onOpenProject,
  onOpenResume,
  onOpenContact,
  onReplayIntro,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: 'system',
      content: 'UDAY_OS v1.0 [Interactive Command Terminal Initialized]',
    },
    {
      type: 'system',
      content: 'Type "help" to view available developer inspection commands.',
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add to input history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const newHistory: TerminalLine[] = [
      ...history,
      { type: 'input', content: `visitor@uday:~$ ${cmd}` },
    ];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-1 my-1">
              <div className="text-emerald-400 font-semibold mb-2">AVAILABLE COMMANDS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                <div><span className="text-cyan-400 font-bold w-24 inline-block">about</span> Developer background & engineering focus</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">projects</span> 5 featured engineering projects</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">skills</span> Languages, frameworks & system stack</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">experience</span> Engineering philosophy & education</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">certificates</span> 5 verified industry certifications</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">achievements</span> DSA milestones & problem solving</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">contact</span> Developer communication channels</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">resume</span> View / Download official resume</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">intro</span> Replay 3D cinematic developer walk</div>
                <div><span className="text-cyan-400 font-bold w-24 inline-block">clear</span> Clear terminal buffer</div>
              </div>
            </div>
          ),
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2 my-1 text-xs sm:text-sm">
              <div className="text-emerald-400 font-semibold">{DEVELOPER_INFO.name} — {DEVELOPER_INFO.role}</div>
              <div className="text-cyan-300">{DEVELOPER_INFO.titleKicker}</div>
              <p className="text-slate-300 leading-relaxed">{DEVELOPER_INFO.bio}</p>
              <div className="pt-1 text-slate-400 flex flex-wrap gap-4">
                <span>Degree: {DEVELOPER_INFO.education.degree}</span>
                <span>Batch: {DEVELOPER_INFO.education.batch}</span>
                <span>Graduation: {DEVELOPER_INFO.education.graduationYear}</span>
                <span>Focus: {DEVELOPER_INFO.education.focus}</span>
              </div>
            </div>
          ),
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2.5 my-1">
              <div className="text-emerald-400 font-semibold">FEATURED ENGINEERING PROJECTS:</div>
              <div className="space-y-2 text-xs">
                {PROJECTS.map((proj) => (
                  <div key={proj.id} className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-bold">[{proj.number}] {proj.title}</span>
                      <span className="text-emerald-400 text-[10px] uppercase font-mono">{proj.status}</span>
                    </div>
                    <p className="text-slate-300 mt-1">{proj.tagline}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-slate-400">
                      <span className="text-slate-500">Stack:</span>
                      <span className="text-slate-300">{proj.techStack.slice(0, 4).join(', ')}</span>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 underline ml-auto hover:text-cyan-300"
                        >
                          Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2 my-1 text-xs">
              <div className="text-emerald-400 font-semibold">TECHNICAL SKILLS INVENTORY:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.name} className="p-2 bg-slate-900/50 rounded border border-slate-800/80">
                    <span className="text-cyan-400 font-bold block mb-1">{cat.name}</span>
                    <span className="text-slate-300">{cat.skills.map((s) => s.name).join(' · ')}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2 my-1 text-xs sm:text-sm">
              <div className="text-emerald-400 font-semibold">ACADEMIC & SYSTEM BACKGROUND:</div>
              <div className="p-2.5 bg-slate-900/50 rounded border border-slate-800 space-y-1.5">
                <div className="text-cyan-300 font-medium">
                  {DEVELOPER_INFO.education.degree} (Batch: {DEVELOPER_INFO.education.batch} · Graduating: {DEVELOPER_INFO.education.graduationYear})
                </div>
                <div className="text-slate-400">{DEVELOPER_INFO.education.focus}</div>
                <p className="text-slate-300 mt-1">
                  Practicing test-driven engineering, scalable server architecture with Node.js and FastAPI,
                  strict relational/NoSQL data schemas, and modern AI/LLM agent flows.
                </p>
              </div>
            </div>
          ),
        });
        break;

      case 'certificates':
      case 'certificate':
      case 'certs':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2 my-1 text-xs">
              <div className="text-emerald-400 font-semibold">5 OFFICIAL VERIFIED CERTIFICATES:</div>
              <div className="space-y-1.5">
                {CERTIFICATES.map((cert, idx) => (
                  <div key={cert.id} className="p-2.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-cyan-400 font-bold">[{idx + 1}] {cert.title}</span>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-mono shrink-0">
                        {cert.verificationBadge}
                      </span>
                    </div>
                    <div className="text-slate-300 font-mono text-[11px]">
                      Issuer: <span className="text-amber-300">{cert.issuer}</span> {cert.period ? `(${cert.period})` : ''}
                    </div>
                    <p className="text-slate-400 text-[11px]">{cert.description}</p>
                    <div className="text-slate-500 text-[10px] font-mono">
                      Skills: {cert.skills.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;

      case 'achievements':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2 my-1 text-xs">
              <div className="text-emerald-400 font-semibold">VERIFIED ALGORITHMIC & CLOUD CREDENTIALS:</div>
              <div className="space-y-1.5">
                {ACHIEVEMENTS.map((ach) => (
                  <div key={ach.id} className="p-2 bg-slate-900/60 rounded border border-slate-800 flex items-start justify-between">
                    <div>
                      <span className="text-cyan-400 font-bold">{ach.title}: </span>
                      <span className="text-slate-200 font-semibold">{ach.metric}</span>
                      <p className="text-slate-400 mt-0.5">{ach.description}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-mono shrink-0 ml-2">
                      {ach.verificationBadge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-1.5 my-1 text-xs">
              <div className="text-emerald-400 font-semibold">COMMUNICATION ENDPOINTS:</div>
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800 space-y-1 text-slate-300">
                <div><span className="text-cyan-400 font-bold w-20 inline-block">Email:</span> {DEVELOPER_INFO.email}</div>
                <div><span className="text-cyan-400 font-bold w-20 inline-block">GitHub:</span> <a href={DEVELOPER_INFO.github} target="_blank" rel="noreferrer" className="underline hover:text-cyan-300">{DEVELOPER_INFO.github}</a></div>
                <div><span className="text-cyan-400 font-bold w-20 inline-block">LinkedIn:</span> <a href={DEVELOPER_INFO.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-cyan-300">{DEVELOPER_INFO.linkedin}</a></div>
                <div><span className="text-amber-400 font-bold w-20 inline-block">LeetCode:</span> <a href={DEVELOPER_INFO.leetcode} target="_blank" rel="noreferrer" className="underline hover:text-amber-300">{DEVELOPER_INFO.leetcode}</a></div>
                {DEVELOPER_INFO.instagram && (
                  <div><span className="text-pink-400 font-bold w-20 inline-block">Instagram:</span> <a href={DEVELOPER_INFO.instagram} target="_blank" rel="noreferrer" className="underline hover:text-pink-300">{DEVELOPER_INFO.instagram}</a></div>
                )}
              </div>
            </div>
          ),
        });
        if (onOpenContact) onOpenContact();
        break;

      case 'resume':
        newHistory.push({
          type: 'success',
          content: 'Resume dispatcher triggered. Opening resume preview & download console...',
        });
        if (onOpenResume) onOpenResume();
        break;

      case 'intro':
      case 'cinematic':
        newHistory.push({
          type: 'success',
          content: 'Mounting 3D Spatial Walk sequence // Replaying cinematic intro reel...',
        });
        if (onReplayIntro) onReplayIntro();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          content: `Command not found: "${cmd}". Type "help" to see available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const copyTerminalOutput = () => {
    const textLines = history
      .map((h) => (typeof h.content === 'string' ? h.content : ''))
      .filter(Boolean)
      .join('\n');
    navigator.clipboard.writeText(textLines || 'UDAY_OS Terminal');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const quickCommands = ['help', 'about', 'projects', 'skills', 'achievements', 'resume'];

  return (
    <div
      className={`cyber-glass rounded-xl border border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 font-mono text-xs sm:text-sm ${
        isExpanded ? 'fixed inset-4 z-50 max-w-none flex flex-col' : 'w-full'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d121c] border-b border-slate-800/90 select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:opacity-100 cursor-pointer" onClick={() => setHistory([])} title="Clear terminal" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block hover:opacity-100 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} title="Expand terminal" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 font-semibold tracking-wider text-xs ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            UDAY_TERMINAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick command pills */}
          <div className="hidden md:flex items-center gap-1">
            {quickCommands.slice(0, 4).map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2 py-0.5 text-[11px] rounded bg-slate-900 border border-slate-700/60 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          <button
            onClick={copyTerminalOutput}
            className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors rounded hover:bg-slate-800/60"
            title="Copy Terminal Logs"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors rounded hover:bg-slate-800/60"
            title={isExpanded ? "Collapse" : "Maximize"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        onClick={() => inputRef.current?.focus()}
        className={`p-4 bg-[#090d15]/90 overflow-y-auto space-y-2 text-slate-200 cursor-text ${
          isExpanded ? 'flex-1' : 'h-[320px]'
        }`}
      >
        {history.map((line, index) => (
          <div key={index} className="leading-relaxed">
            {line.type === 'input' && (
              <div className="text-cyan-400 font-semibold">{line.content}</div>
            )}
            {line.type === 'output' && (
              <div className="text-slate-300">{line.content}</div>
            )}
            {line.type === 'system' && (
              <div className="text-slate-500 text-xs italic">{line.content}</div>
            )}
            {line.type === 'error' && (
              <div className="text-rose-400 font-medium">{line.content}</div>
            )}
            {line.type === 'success' && (
              <div className="text-emerald-400 font-medium">{line.content}</div>
            )}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold shrink-0">visitor@uday:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' for command list..."
            className="flex-1 bg-transparent text-slate-100 outline-none border-none font-mono text-xs sm:text-sm focus:ring-0 placeholder:text-slate-600"
            autoFocus
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1 text-slate-500 hover:text-emerald-400 transition-colors shrink-0"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Footer shortcut hints */}
      <div className="px-4 py-2 bg-[#0b0f18] border-t border-slate-800/60 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span>Enter: Execute</span>
          <span>↑ / ↓: History</span>
          <span>Tab: Autocomplete</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>TERMINAL LIVE</span>
        </div>
      </div>
    </div>
  );
};

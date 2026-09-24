import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: "UDAY_OS v1.0 [KERNEL 6.1.4-CYBER]", delay: 250 },
    { text: "INITIALIZING PORTFOLIO SUBSYSTEMS...", delay: 350 },
    { text: "LOADING DEVELOPER PROFILE: UDAY KUMAR...", delay: 350 },
    { text: "MOUNTING FEATURED ENGINEERING PROJECTS...", delay: 350 },
    { text: "AI MODULE: ONLINE", delay: 250, highlight: true },
    { text: "SYSTEM STATUS: ALL SERVICES ONLINE (100%)", delay: 250, success: true },
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, steps[currentStep].delay);
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 350);
      return () => clearTimeout(exitTimer);
    }
  }, [currentStep, onComplete]);

  // Allow ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#06080d] flex flex-col items-center justify-center p-4 select-none">
      {/* Subtle cyber background grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-xl relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e131d] border border-slate-800 rounded-t-lg">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-slate-400 font-medium tracking-wide flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              UDAY_BOOT_CONSOLE
            </span>
          </div>

          <button
            onClick={onComplete}
            className="text-xs font-mono text-slate-400 hover:text-emerald-400 px-2 py-1 rounded border border-slate-700/60 hover:border-emerald-500/40 transition-colors flex items-center gap-1"
          >
            <Zap className="w-3 h-3" />
            <span>SKIP [ESC]</span>
          </button>
        </div>

        {/* Boot Terminal Body */}
        <div className="bg-[#090d15]/95 border-x border-b border-slate-800/90 rounded-b-lg p-5 font-mono text-sm shadow-2xl backdrop-blur-md min-h-[220px]">
          <div className="space-y-2.5">
            {steps.slice(0, currentStep + 1).map((step, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 transition-all duration-150 ${
                  idx === currentStep ? 'opacity-100' : 'opacity-80'
                }`}
              >
                <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span
                  className={
                    step.success
                      ? 'text-emerald-400 font-semibold flex items-center gap-1.5'
                      : step.highlight
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-300'
                  }
                >
                  {step.text}
                  {step.success && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />}
                </span>
              </div>
            ))}
          </div>

          {/* Pulsing prompt cursor */}
          {currentStep < steps.length && (
            <div className="mt-4 flex items-center gap-2 text-emerald-400">
              <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-500">Processing boot sequence...</span>
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-6 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
              <span>SYSTEM BOOT</span>
              <span>{Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100))}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-400 transition-all duration-200"
                style={{ width: `${Math.min(100, ((currentStep + 1) / steps.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

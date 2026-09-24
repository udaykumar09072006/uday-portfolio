import React, { useState, useEffect, useRef } from 'react';
import { DEVELOPER_INFO } from '../../data/portfolioData';
import { Play, Sparkles, ArrowDown, Zap, FileDown, ShieldCheck, Terminal } from 'lucide-react';

interface HeroFilmStageProps {
  onEnterUniverse: () => void;
  onOpenResume: () => void;
  onOpenInterviewMode: () => void;
  onReplayWalkIntro: () => void;
}

export const HeroFilmStage: React.FC<HeroFilmStageProps> = ({
  onEnterUniverse,
  onOpenResume,
  onOpenInterviewMode,
  onReplayWalkIntro,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bootProgress, setBootProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Boot sequence simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 6;
      if (current >= 100) {
        current = 100;
        setBootProgress(100);
        setIsBooted(true);
        clearInterval(interval);
      } else {
        setBootProgress(current);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Background subtle canvas particles & cyber light sweep
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, width, height);

      // Subtle radial cyber beam in center
      const grad = ctx.createRadialGradient(
        width / 2 + mousePos.x * 40,
        height * 0.45 + mousePos.y * 30,
        50,
        width / 2,
        height * 0.5,
        width * 0.6
      );
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
      grad.addColorStop(0.4, 'rgba(0, 255, 136, 0.03)');
      grad.addColorStop(1, 'rgba(5, 7, 12, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Perspective floor grid lines
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const horizonY = height * 0.72;
      const numLines = 24;
      const centerX = width / 2 + mousePos.x * 30;

      for (let i = 0; i < numLines; i++) {
        const xFloor = ((i - numLines / 2) / (numLines / 2)) * width * 1.5 + centerX;
        ctx.beginPath();
        ctx.moveTo(centerX, horizonY);
        ctx.lineTo(xFloor, height);
        ctx.stroke();
      }

      // Horizontal horizon scan lines
      for (let y = horizonY; y < height; y += (y - horizonY + 10) * 0.4 + 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Cyber particles
      ctx.fillStyle = '#00ff88';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#05070c] text-slate-100 select-none flex flex-col justify-between">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Top Architectural Header */}
      <header className="relative z-30 pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Polyline Rule Border */}
        <div className="relative pb-3 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#hero" className="flex items-center gap-2 group">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:shadow-[0_0_12px_#00ff88] transition-shadow" />
              <span className="font-film text-xl sm:text-2xl tracking-wider text-white">UDAY KUMAR</span>
            </a>
            <span className="hidden md:inline-block w-px h-4 bg-slate-700/80" />
            <div className="hidden md:flex items-center gap-2 font-oswald text-xs uppercase text-slate-400 tracking-widest">
              <span className="text-emerald-400">Software Engineer</span>
              <span>·</span>
              <span>Full-Stack</span>
              <span>·</span>
              <span className="text-cyan-400">AI &amp; Systems</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-oswald text-xs tracking-wider">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-400">
              <span>PORTFOLIO — MMXXVI</span>
              <div className="flex gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              </div>
            </div>

            <button
              onClick={onOpenInterviewMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)]"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">INTERVIEW MODE</span>
              <span className="sm:hidden">INTERVIEW</span>
            </button>
          </div>
        </div>

        {/* Floating Welcome Strip Banner */}
        <div className="pt-4 flex flex-col items-center gap-2.5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] sm:text-xs font-oswald tracking-[0.25em] text-slate-300 uppercase">
            <span className="text-emerald-400 font-bold">•••</span>
            <span>Welcome to my world</span>
            <span className="text-emerald-400 font-bold">•••</span>
          </div>

          {/* Official Introduction Statement */}
          <div className="max-w-2xl mx-auto text-center px-2">
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed backdrop-blur-md bg-slate-900/80 border border-slate-800/90 px-4 py-2 rounded-2xl shadow-xl">
              &ldquo;Hi, I&apos;m Uday Kumar &mdash; a Computer Science developer passionate about DSA, full-stack engineering, scalable systems, and AI. I build real-world software that turns complex problems into practical solutions.&rdquo;
            </p>
          </div>
        </div>
      </header>

      {/* Main Cinematic Spatial Stage */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center min-h-[68vh] sm:min-h-[72vh] px-4">
        {/* Layer 1: Giant Monumental Typography Wordmark Behind Figure */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -14}px, 0)`,
          }}
        >
          <div className="font-film text-[18vw] sm:text-[19vw] lg:text-[20vw] leading-none tracking-tight text-center font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-slate-500/10 to-transparent uppercase select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            UDAY
          </div>
          <div className="font-film text-[13vw] sm:text-[14vw] lg:text-[15vw] leading-none tracking-tight text-center font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-500/20 via-cyan-500/10 to-transparent uppercase select-none -mt-[3vw]">
            KUMAR
          </div>
        </div>

        {/* Layer 2: Editorial Floating Chips & Directional Chevrons */}
        <div className="absolute inset-x-6 sm:inset-x-12 max-w-6xl mx-auto top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-20">
          {/* Left Chip */}
          <div
            className="flex flex-col items-start gap-2 transition-transform duration-500"
            style={{ transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -12}px, 0)` }}
          >
            <div className="px-3 py-1 rounded bg-slate-900/90 border border-emerald-500/30 text-emerald-400 font-oswald text-xs tracking-widest shadow-lg">
              • UDAY KUMAR •
            </div>
            <div className="text-[11px] font-mono text-slate-500 pl-1 tracking-wider">
              BATCH 2023–2027 // GRAD 2027
            </div>
          </div>

          {/* Right Chip */}
          <div
            className="flex flex-col items-end gap-2 transition-transform duration-500"
            style={{ transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * -12}px, 0)` }}
          >
            <div className="px-3 py-1 rounded bg-slate-900/90 border border-cyan-500/30 text-cyan-400 font-oswald text-xs tracking-widest shadow-lg">
              • VERIFIED ENGINEER •
            </div>
            <div className="text-[11px] font-mono text-slate-500 pr-1 tracking-wider">
              5 CLOUD &amp; AI CERTS · 450+ DSA
            </div>
          </div>
        </div>

        {/* Layer 3: Central High-Fidelity Character Layer */}
        <div
          className="relative z-30 flex flex-col items-center justify-end h-[50vh] sm:h-[58vh] lg:h-[64vh] max-h-[640px] pointer-events-auto cursor-pointer group"
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
          onClick={onEnterUniverse}
          title="Click to enter the Engineering Universe"
        >
          {/* Ambient Glow Aura Behind Character */}
          <div className="absolute bottom-12 w-64 h-80 sm:w-80 sm:h-96 bg-gradient-to-t from-emerald-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />

          {/* Character Silhouette & Real Formal Portrait Cutout */}
          <div className="relative flex justify-center items-end h-full">
            <img
              src="/images/uday-profile.png"
              alt="Uday Kumar - Software Engineer"
              className="h-full w-auto max-w-none object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:scale-[1.02]"
              style={{
                filter: 'contrast(1.04) brightness(1.02)',
              }}
            />

            {/* Subtle Contact Shadow on Floor */}
            <div className="absolute -bottom-4 inset-x-4 h-8 bg-black/80 rounded-full blur-md -z-10" />
          </div>
        </div>
      </div>

      {/* Bottom Furniture, Boot Loader & Navigation Controls */}
      <footer className="relative z-30 pb-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
        {/* Left: Boot Bar & Status */}
        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <div className="w-28 sm:w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
              style={{ width: `${bootProgress}%` }}
            />
          </div>
          <span className="text-emerald-400 font-bold">{bootProgress}%</span>
          <span className="text-slate-500 hidden md:inline">SYSTEM STATUS: ONLINE</span>
        </div>

        {/* Center: Scroll down prompt */}
        <button
          onClick={onEnterUniverse}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 text-xs font-oswald tracking-widest text-slate-300 hover:text-white transition-all group cursor-pointer"
        >
          <span>ENTER THE UNIVERSE</span>
          <ArrowDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
        </button>

        {/* Right: Quick Action Links */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={onReplayWalkIntro}
            className="px-2.5 py-1 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
            title="Replay cinematic 3D walk introduction"
          >
            3D INTRO
          </button>
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            RESUME
          </button>
          <a
            href={DEVELOPER_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a
            href={DEVELOPER_INFO.leetcode}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-amber-400 hover:text-amber-300 transition-colors"
          >
            LEETCODE
          </a>
        </div>
      </footer>
    </div>
  );
};

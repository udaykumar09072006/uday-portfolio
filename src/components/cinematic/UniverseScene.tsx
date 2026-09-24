import React, { useState, useEffect, useRef } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Sparkles, Layers, Cpu, Database, Network, Globe, Filter, Info, X } from 'lucide-react';

interface TechNode {
  name: string;
  category: 'languages' | 'ai' | 'backend' | 'systems' | 'frontend';
  color: string;
  proficiency: number;
  description: string;
  projectsUsed: string[];
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
}

const ALL_NODES: Omit<TechNode, 'x' | 'y' | 'z' | 'vx' | 'vy' | 'radius'>[] = [
  // Languages & Core
  { name: 'Python', category: 'languages', color: '#38bdf8', proficiency: 95, description: 'Primary language for AI model inference, computer vision, data analysis, and microservices.', projectsUsed: ['Riskora AI', 'AuraVision'] },
  { name: 'TypeScript', category: 'languages', color: '#60a5fa', proficiency: 92, description: 'Strict typing for high-reliability full-stack systems, type-safe API contracts, and robust tooling.', projectsUsed: ['ScaleCheck', 'DevCommand OS'] },
  { name: 'C++', category: 'languages', color: '#a78bfa', proficiency: 88, description: 'Algorithmic optimization, memory-constrained computing, and 450+ solved LeetCode DSA structures.', projectsUsed: ['Core DSA', 'Graph Engine'] },
  { name: 'SQL', category: 'backend', color: '#34d399', proficiency: 90, description: 'Relational schema design, complex window queries, indexing, and high-concurrency transactions.', projectsUsed: ['Riskora AI', 'ScaleCheck'] },

  // AI & Machine Learning
  { name: 'Gemini AI', category: 'ai', color: '#00ff88', proficiency: 94, description: 'Multimodal AI generation, function calling, tool use, structured JSON schemas, and streaming.', projectsUsed: ['Riskora AI', 'AI Studio Apps'] },
  { name: 'PyTorch', category: 'ai', color: '#f87171', proficiency: 86, description: 'Deep learning tensor operations, convolutional neural networks, and vision embeddings.', projectsUsed: ['AuraVision', 'Model Fine-tuning'] },
  { name: 'Scikit-Learn', category: 'ai', color: '#fb923c', proficiency: 89, description: 'Predictive statistical models, classification pipelines, feature engineering, and ROC analysis.', projectsUsed: ['Riskora AI', 'Churn Predictor'] },
  { name: 'LangChain', category: 'ai', color: '#4ade80', proficiency: 85, description: 'RAG pipelines, vector store embeddings, and autonomous multi-agent tool execution.', projectsUsed: ['Riskora AI'] },

  // Backend & Cloud Systems
  { name: 'Node.js', category: 'backend', color: '#4ade80', proficiency: 92, description: 'Asynchronous event-loop servers, non-blocking I/O, REST APIs, and microservices.', projectsUsed: ['ScaleCheck', 'NexusCore'] },
  { name: 'FastAPI', category: 'backend', color: '#2dd4bf', proficiency: 90, description: 'Ultra-low-latency asynchronous Python API endpoints with automatic OpenAPI documentation.', projectsUsed: ['Riskora AI'] },
  { name: 'PostgreSQL', category: 'backend', color: '#38bdf8', proficiency: 91, description: 'ACID transactional persistence, JSONB document fields, and connection pooling.', projectsUsed: ['Riskora AI', 'Enterprise DB'] },
  { name: 'Redis', category: 'systems', color: '#ef4444', proficiency: 88, description: 'In-memory key-value caching, distributed locks, and pub/sub message brokers.', projectsUsed: ['ScaleCheck', 'NexusCore'] },
  { name: 'Docker', category: 'systems', color: '#0ea5e9', proficiency: 89, description: 'Containerized environments, multi-stage production builds, and microservice orchestration.', projectsUsed: ['All Projects', 'CI/CD'] },
  { name: 'WebSockets', category: 'systems', color: '#facc15', proficiency: 92, description: 'Bi-directional real-time telemetry streaming with sub-10ms broadcast latency.', projectsUsed: ['ScaleCheck', 'DevCommand OS'] },
  { name: 'System Design', category: 'systems', color: '#c084fc', proficiency: 90, description: 'Horizontal scalability, load balancing, circuit breakers, and distributed fault tolerance.', projectsUsed: ['NexusCore', 'ScaleCheck'] },

  // Frontend & 3D
  { name: 'React', category: 'frontend', color: '#38bdf8', proficiency: 96, description: 'Declarative component architecture, custom performance hooks, and reactive state management.', projectsUsed: ['All Web Apps'] },
  { name: 'Next.js', category: 'frontend', color: '#f1f5f9', proficiency: 91, description: 'Server components, incremental static regeneration, and edge route dispatching.', projectsUsed: ['Production SaaS'] },
  { name: 'Three.js / WebGL', category: 'frontend', color: '#00f0ff', proficiency: 89, description: 'Cinematic 3D spatial environments, shader materials, third-person cameras, and particle fields.', projectsUsed: ['Cinematic Portfolio', '3D Arena'] },
  { name: 'Tailwind CSS', category: 'frontend', color: '#38bdf8', proficiency: 96, description: 'Zero-runtime utility styling, responsive viewport discipline, and custom theme tokens.', projectsUsed: ['All Projects'] },
];

export const UniverseScene: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'backend' | 'systems' | 'frontend'>('all');
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<TechNode[]>([]);

  // Initialize nodes with spatial coordinates
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    nodesRef.current = ALL_NODES.map((node, i) => {
      const angle = (i / ALL_NODES.length) * Math.PI * 2;
      const radius = Math.min(width, height) * (0.22 + (i % 3) * 0.08);
      return {
        ...node,
        radius: 18 + (node.proficiency / 100) * 8,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius * 0.65,
        z: Math.sin(angle) * 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      };
    });
  }, []);

  // Dynamic canvas animation for orbital tech cosmos
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

    let angle = 0;

    const render = () => {
      angle += 0.002;
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, width, height);

      // Radial ambient lighting
      const grad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, width * 0.6);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.06)');
      grad.addColorStop(0.5, 'rgba(0, 255, 136, 0.03)');
      grad.addColorStop(1, 'rgba(5, 7, 12, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Central core node
      ctx.save();
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 25;
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Orbital dashed rings
      const rings = [180, 280, 380];
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.setLineDash([4, 8]);
      ctx.lineWidth = 1;
      rings.forEach((r) => {
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2, r, r * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      // Filtered nodes
      const currentNodes = nodesRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw connection filaments
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i < currentNodes.length; i++) {
        const n1 = currentNodes[i];
        if (activeFilter !== 'all' && n1.category !== activeFilter) continue;

        // Line to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(n1.x, n1.y);
        ctx.stroke();

        // Lines to nearby neighbors
        for (let j = i + 1; j < currentNodes.length; j++) {
          const n2 = currentNodes[j];
          if (activeFilter !== 'all' && n2.category !== activeFilter) continue;

          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.15 * (1 - dist / 140)})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (const n of currentNodes) {
        // Orbit rotation
        const dx = n.x - centerX;
        const dy = (n.y - centerY) / 0.55;
        const currentAngle = Math.atan2(dy, dx) + 0.0015;
        const r = Math.hypot(dx, dy);

        n.x = centerX + Math.cos(currentAngle) * r;
        n.y = centerY + Math.sin(currentAngle) * r * 0.55;

        const isFiltered = activeFilter === 'all' || n.category === activeFilter;
        const isSelected = selectedNode?.name === n.name;

        // Glow
        ctx.save();
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isSelected ? 30 : isFiltered ? 15 : 4;
        ctx.fillStyle = isFiltered ? n.color : 'rgba(100, 116, 139, 0.3)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, isSelected ? n.radius + 4 : isFiltered ? n.radius : n.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        ctx.fillStyle = '#05070c';
        ctx.beginPath();
        ctx.arc(n.x, n.y, (isSelected ? n.radius + 4 : n.radius) * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Label
        if (isFiltered) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '11px Oswald, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(n.name, n.x, n.y + n.radius + 14);
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeFilter, selectedNode]);

  // Handle canvas click to select tech node
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (const node of nodesRef.current) {
      if (activeFilter !== 'all' && node.category !== activeFilter) continue;
      const dist = Math.hypot(clickX - node.x, clickY - node.y);
      if (dist <= node.radius + 8) {
        setSelectedNode(node);
        return;
      }
    }
  };

  return (
    <section id="universe" className="relative min-h-screen bg-[#05070c] overflow-hidden flex flex-col justify-between py-16 px-4 sm:px-8 border-t border-slate-800/80">
      {/* Interactive Cosmos Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 z-0 cursor-pointer"
        title="Click on any technology node to inspect benchmarks"
      />

      {/* Header Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-800/80 pb-6 pointer-events-none">
        <div className="space-y-1.5">
          <p className="font-oswald text-xs uppercase tracking-[0.3em] text-cyan-400">
            SCENE 02 // TECHNICAL ECOSYSTEM
          </p>
          <h2 className="font-film text-3xl sm:text-4xl lg:text-5xl tracking-wide text-white uppercase">
            THE ENGINEERING UNIVERSE
          </h2>
          <p className="font-oswald text-xs sm:text-sm text-slate-400 tracking-wider">
            Languages · Distributed Systems · AI Inference · High-Throughput Engines
          </p>
        </div>

        {/* Category Filters (Pointer Events Enabled) */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-oswald tracking-wider">
          {(['all', 'ai', 'backend', 'systems', 'frontend'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All (18)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Selected Node Telemetry Drawer */}
      {selectedNode && (
        <div className="relative z-30 max-w-md w-full mx-auto my-4 bg-[#080d1a]/95 border border-cyan-500/40 rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.2)] animate-fadeIn">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedNode.color, boxShadow: `0 0 10px ${selectedNode.color}` }}
                />
                <h3 className="font-film text-2xl text-white tracking-wider uppercase">
                  {selectedNode.name}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                CATEGORY: {selectedNode.category}
              </span>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-300 font-sans leading-relaxed">
            {selectedNode.description}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Engineering Proficiency</span>
              <span className="text-emerald-400 font-bold">{selectedNode.proficiency}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                style={{ width: `${selectedNode.proficiency}%` }}
              />
            </div>

            <div className="pt-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Shipped in Systems: </span>
              <span className="text-white">{selectedNode.projectsUsed.join(' · ')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Annotation */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-4">
        <span>INTERACTIVE COSMOS // CLICK ANY SPHERE TO INSPECT PRODUCTION TELEMETRY</span>
        <span className="text-cyan-400 font-bold">18 VERIFIED PRODUCTION STACK TECHNOLOGIES</span>
      </div>
    </section>
  );
};

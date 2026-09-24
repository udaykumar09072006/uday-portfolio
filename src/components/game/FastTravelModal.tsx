import React from 'react';
import { X, Compass, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export interface WorldLocation {
  id: string;
  name: string;
  sector: string;
  category: string;
  position: [number, number, number];
  description: string;
  icon: string;
  accentColor: string;
}

export const WORLD_LOCATIONS: WorldLocation[] = [
  {
    id: 'hub',
    name: 'MAIN HUB',
    sector: 'ALPHA-00',
    category: 'HOME / PROFILE',
    position: [0, 0, 0],
    description: 'Central command pavilion with Uday Kumar developer profile, core identity, and sector gateways.',
    icon: '⚡',
    accentColor: 'emerald'
  },
  {
    id: 'projects',
    name: 'PROJECT LAB',
    sector: 'BETA-01',
    category: 'FEATURED PROJECTS',
    position: [0, 0, -32],
    description: 'Interactive laboratory containing 5 holographic project terminals (Riskora, ScaleCheck, MediCare, etc.).',
    icon: '🏢',
    accentColor: 'cyan'
  },
  {
    id: 'skills',
    name: 'SKILL CENTER',
    sector: 'GAMMA-02',
    category: 'CORE COMPETENCIES',
    position: [-32, 0, 0],
    description: 'Cyber dome with floating skill pods: Languages, Frontend, Backend, Database, AI, and CS Fundamentals.',
    icon: '🧠',
    accentColor: 'emerald'
  },
  {
    id: 'certs',
    name: 'CERTIFICATION VAULT',
    sector: 'DELTA-03',
    category: 'VERIFIED CREDENTIALS',
    position: [32, 0, 0],
    description: 'High-security vault housing 3D rotating certificates: Oracle Cloud AI, HackerRank 5-Star, and LeetCode DSA.',
    icon: '🛡️',
    accentColor: 'purple'
  },
  {
    id: 'achievements',
    name: 'ACHIEVEMENT ARENA',
    sector: 'EPSILON-04',
    category: 'METRIC BENCHMARKS',
    position: [0, 0, 28],
    description: 'Futuristic stadium displaying 450+ solved algorithmic problems, competitive coding ratings, and badges.',
    icon: '🏆',
    accentColor: 'yellow'
  },
  {
    id: 'resume',
    name: 'RESUME HQ',
    sector: 'ZETA-05',
    category: 'CURRICULUM VITAE',
    position: [0, 0, 56],
    description: 'Executive pavilion with readable holographic resume inspection and high-fidelity PDF export.',
    icon: '📄',
    accentColor: 'cyan'
  },
  {
    id: 'contact',
    name: 'CONTACT STATION',
    sector: 'ETA-06',
    category: 'COMMUNICATIONS',
    position: [0, 0, 84],
    description: 'Long-range quantum transmission relay: GitHub, LinkedIn, direct inbox dispatch, and email.',
    icon: '📡',
    accentColor: 'emerald'
  }
];

interface FastTravelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeleport: (location: WorldLocation) => void;
  currentSectorId?: string;
}

export const FastTravelModal: React.FC<FastTravelModalProps> = ({
  isOpen,
  onClose,
  onTeleport,
  currentSectorId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl cyber-glass rounded-2xl border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.18)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f18] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                UDAY_OS // WORLD FAST TRAVEL
              </div>
              <h2 className="font-cyber text-lg sm:text-xl font-bold text-white tracking-wide">
                SECTOR TELEPORTATION SYSTEM
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

        {/* Spatial Diagram & Locations */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Spatial World Diagram */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
            <div className="text-slate-400 mb-2 flex items-center justify-between">
              <span>WORLD TOPOLOGY DIAGRAM</span>
              <span className="text-emerald-400">● REAL-TIME DISCOVERY ACTIVE</span>
            </div>
            <div className="p-3 bg-[#060910] rounded-lg text-center font-mono leading-relaxed text-slate-300 border border-slate-800/80 select-none overflow-x-auto text-[11px] sm:text-xs">
              <div className="text-cyan-400 font-bold">[ NORTH: PROJECT LAB ]</div>
              <div className="text-slate-600">│</div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-emerald-400 font-bold">[ WEST: SKILL CENTER ]</span>
                <span className="text-slate-600">──</span>
                <span className="text-white font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">[ MAIN HUB ]</span>
                <span className="text-slate-600">──</span>
                <span className="text-purple-400 font-bold">[ EAST: CERT VAULT ]</span>
              </div>
              <div className="text-slate-600">│</div>
              <div className="text-yellow-400 font-bold">[ ACHIEVEMENT ARENA ]</div>
              <div className="text-slate-600">│</div>
              <div className="text-cyan-400 font-bold">[ RESUME HQ ]</div>
              <div className="text-slate-600">│</div>
              <div className="text-emerald-400 font-bold">[ SOUTH: CONTACT STATION ]</div>
            </div>
          </div>

          {/* Location Selection List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WORLD_LOCATIONS.map((loc) => {
              const isCurrent = currentSectorId === loc.id;

              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    onTeleport(loc);
                    onClose();
                  }}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between group ${
                    isCurrent
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-cyan-400 font-semibold">{loc.sector}</span>
                      <span className="text-slate-400">{loc.category}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-xl">{loc.icon}</span>
                      <h3 className="font-cyber font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                        {loc.name}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 font-sans line-clamp-2 pt-1">
                      {loc.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    {isCurrent ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold">
                        ● CURRENT LOCATION
                      </span>
                    ) : (
                      <span className="text-slate-400 group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                        WARP TO SECTOR <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}

                    <span className="text-[10px] text-slate-400">
                      [{loc.position[0]}, {loc.position[2]}]
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0f18] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>SELECT A DESTINATION TO WARP INSTANTLY</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            CANCEL [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};

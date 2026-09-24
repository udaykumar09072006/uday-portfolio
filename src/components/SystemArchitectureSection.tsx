import React, { useState } from 'react';
import { SYSTEM_ARCHITECTURE_LAYERS } from '../data/portfolioData';
import { Play, RotateCcw, ArrowDown, Activity, Zap, CheckCircle2, Shield, Cpu, Database, Brain, Cloud, Monitor, Network } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Monitor,
  Shield,
  Network,
  Cpu,
  Zap,
  Database,
  Brain,
  Cloud,
};

export const SystemArchitectureSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('fraud');
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const scenarios = [
    {
      id: 'fraud',
      name: 'Real-Time Fraud Evaluation Request',
      totalEstimatedTime: '115ms',
      description: 'Incoming payment transaction intercepted, normalized, evaluated against Scikit-Learn anomaly models, and persisted with audit trails.',
    },
    {
      id: 'cache',
      name: 'High-Concurrency Read with Edge Cache',
      totalEstimatedTime: '14ms',
      description: 'Sub-second cached query returning system status data directly from Redis cache without hitting persistent disk stores.',
    },
    {
      id: 'websocket',
      name: 'Collaborative IDE Keystroke Broadcast',
      totalEstimatedTime: '32ms',
      description: 'Duplex WebSocket frame debounced, operational-transformed, and broadcasted to candidate interview rooms with zero flicker.',
    },
  ];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
    setSimulationLog([`[0.0ms] Initializing simulated payload for scenario: ${selectedScenario.toUpperCase()}`]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < SYSTEM_ARCHITECTURE_LAYERS.length) {
        setActiveStep(step);
        const layer = SYSTEM_ARCHITECTURE_LAYERS[step];
        setSimulationLog((prev) => [
          ...prev,
          `[+${layer.latency}] Packet entered [${layer.layer}] ${layer.name} (${layer.role})`,
        ]);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationLog((prev) => [
          ...prev,
          `[COMPLETE] Request lifecycle successfully terminated with 200 OK across distributed cluster.`,
        ]);
      }
    }, 600);
  };

  const resetSimulation = () => {
    setActiveStep(-1);
    setIsSimulating(false);
    setSimulationLog([]);
  };

  return (
    <section id="system-design" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>&gt; SYSTEM_ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cyber font-bold text-white tracking-wide">
              DISTRIBUTED DATA FLOW PIPELINE
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl font-sans">
              Visualizing horizontal scalability, fault-tolerant microservice decoupling, low-latency edge caching, and AI inference orchestration.
            </p>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all shadow-lg ${
                isSimulating
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,255,136,0.25)]'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isSimulating ? 'SIMULATING...' : 'SIMULATE PACKET FLOW'}</span>
            </button>

            <button
              onClick={resetSimulation}
              disabled={isSimulating && activeStep === -1}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scenario Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenario(sc.id);
                resetSimulation();
              }}
              className={`p-3.5 rounded-xl text-left border transition-all duration-150 ${
                selectedScenario === sc.id
                  ? 'bg-[#0f172a]/90 border-emerald-500/50 shadow-md'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className={selectedScenario === sc.id ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  SCENARIO
                </span>
                <span className="text-cyan-400 font-bold">~{sc.totalEstimatedTime}</span>
              </div>
              <div className="text-sm font-semibold text-white">{sc.name}</div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{sc.description}</p>
            </button>
          ))}
        </div>

        {/* Vertical Pipeline Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Architecture Pipeline Stack */}
          <div className="lg:col-span-8 space-y-3">
            {SYSTEM_ARCHITECTURE_LAYERS.map((layer, index) => {
              const IconComponent = ICON_MAP[layer.icon] || Cpu;
              const isCurrent = activeStep === index;
              const isPassed = activeStep > index;

              return (
                <React.Fragment key={layer.layer}>
                  <div
                    className={`relative p-4 sm:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-emerald-950/80 to-slate-900 border-emerald-400 shadow-[0_0_25px_rgba(0,255,136,0.3)] scale-[1.01]'
                        : isPassed
                        ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200'
                        : 'bg-[#0a0e17]/80 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Layer number tag */}
                      <span
                        className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                          isCurrent
                            ? 'bg-emerald-500 text-slate-950'
                            : isPassed
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {layer.layer}
                      </span>

                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-cyan-400 shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-cyber font-bold text-white text-sm sm:text-base tracking-wide">
                            {layer.name}
                          </span>
                          <span className="hidden sm:inline text-xs text-slate-400">·</span>
                          <span className="hidden sm:inline text-xs text-emerald-400 font-mono">
                            {layer.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-sans mt-0.5">{layer.details}</p>
                      </div>
                    </div>

                    {/* Step Metrics */}
                    <div className="text-right shrink-0 font-mono text-xs">
                      <div className="text-cyan-400 font-bold">{layer.latency}</div>
                      <div className="text-[10px] text-slate-500">
                        {isCurrent ? (
                          <span className="text-emerald-400 animate-pulse font-semibold">PROCESSING</span>
                        ) : isPassed ? (
                          <span className="text-emerald-400">PASSED</span>
                        ) : (
                          'IDLE'
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connecting Arrow between layers */}
                  {index < SYSTEM_ARCHITECTURE_LAYERS.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <div
                        className={`w-0.5 h-4 transition-colors ${
                          isPassed ? 'bg-emerald-400' : 'bg-slate-800'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Column: Live Telemetry / Execution Console */}
          <div className="lg:col-span-4 cyber-glass rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                <Activity className="w-4 h-4" />
                TELEMETRY &amp; PACKET MONITOR
              </div>
              <span className="text-[10px] font-mono text-slate-500">PORT 443 // TLS</span>
            </div>

            <div className="h-64 sm:h-72 overflow-y-auto bg-[#070b12] rounded-xl p-3 font-mono text-[11px] space-y-1.5 border border-slate-800/80">
              {simulationLog.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center p-4">
                  <Activity className="w-8 h-8 mb-2 opacity-40" />
                  <p>Click "SIMULATE PACKET FLOW" to initiate request pipeline packet tracer.</p>
                </div>
              ) : (
                simulationLog.map((log, i) => (
                  <div
                    key={i}
                    className={
                      log.includes('[COMPLETE]')
                        ? 'text-emerald-400 font-bold'
                        : log.includes('entered')
                        ? 'text-cyan-300'
                        : 'text-slate-400'
                    }
                  >
                    {log}
                  </div>
                ))
              )}
            </div>

            {/* Architecture Invariants */}
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-emerald-400 font-bold">SYSTEM ARCHITECTURE PRINCIPLES:</div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>✔ Stateless horizontal worker scale</div>
                <div>✔ Redis-backed distributed rate limiter</div>
                <div>✔ Circuit breaker on downstream ML endpoints</div>
                <div>✔ Zero-trust TLS between internal microservices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

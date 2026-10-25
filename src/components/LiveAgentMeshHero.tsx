import React, { useState, useEffect } from 'react';
import { ChakraLogo } from './ChakraLogo';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: string;
  throughput: string;
  latency: string;
  badge: string;
  color: string;
  accentBg: string;
  logDetail: string;
}

export const LiveAgentMeshHero: React.FC = () => {
  const [activeAgentId, setActiveAgentId] = useState<string>('recovery');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const agents: AgentNode[] = [
    {
      id: 'planner',
      name: 'Planner Agent',
      role: 'Architecture & Decomp',
      icon: 'account_tree',
      status: 'Synthesized 4 user stories & invariants',
      throughput: '184 tok/s',
      latency: '110ms',
      badge: 'Spec Aligned',
      color: 'text-primary',
      accentBg: 'bg-primary-fixed/40 border-primary/20',
      logDetail: 'Decomposed OAuth2 password-reset flow into deterministic state-machine invariants.',
    },
    {
      id: 'coder',
      name: 'Coding Agent',
      role: 'AST Code Synthesis',
      icon: 'terminal',
      status: 'Compiled TokenService.ts (+142 lines)',
      throughput: '342 tok/s',
      latency: '240ms',
      badge: 'AST Clean',
      color: 'text-primary',
      accentBg: 'bg-primary-fixed/40 border-primary/20',
      logDetail: 'Generated cryptographic token hashing, salt generation, and single-use revocation lifecycle.',
    },
    {
      id: 'tester',
      name: 'Sandbox QA Agent',
      role: 'MicroVM Container Runner',
      icon: 'science',
      status: 'Executed 24 integration suites',
      throughput: '24/24 suites',
      latency: '580ms',
      badge: 'Isolated VM',
      color: 'text-secondary',
      accentBg: 'bg-secondary-fixed/40 border-secondary/20',
      logDetail: 'Simulated 100 concurrent token invalidation requests in ephemeral sandbox #sb-89241.',
    },
    {
      id: 'recovery',
      name: 'Recovery Agent',
      role: 'Self-Healing AST Engine',
      icon: 'healing',
      status: 'Auto-repaired clock skew timeout',
      throughput: 'AST Mutated',
      latency: '820ms',
      badge: 'Self-Healed',
      color: 'text-secondary',
      accentBg: 'bg-secondary-fixed/50 border-secondary/30',
      logDetail: 'Patched flaky async clock assertion in tokenExpiry.spec.ts. Neutralized race condition in 820ms.',
    },
    {
      id: 'verifier',
      name: 'Verifier Agent',
      role: 'Cryptographic Gatekeeper',
      icon: 'verified_user',
      status: 'Cosign Sigstore Bundle Verified',
      throughput: '0 Blockers',
      latency: '1.2s',
      badge: 'Attestation Sealed',
      color: 'text-tertiary',
      accentBg: 'bg-tertiary-fixed/40 border-tertiary/20',
      logDetail: 'Cryptographically sealed PR #492. Zero OWASP vulnerabilities detected, 100% test coverage.',
    },
  ];

  // Rotate highlight subtly unless paused by user interaction
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setActiveAgentId((prev) => {
        const ids = agents.map((a) => a.id);
        const idx = ids.indexOf(prev);
        return ids[(idx + 1) % ids.length];
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [autoRotate, agents]);

  const activeAgent = agents.find((a) => a.id === activeAgentId) || agents[3];

  return (
    <div className="w-full relative py-2">
      {/* Background ambient mesh aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-fixed/20 via-secondary-fixed/15 to-transparent rounded-3xl blur-3xl -z-10 pointer-events-none" />

      {/* Main Agent Mesh Container */}
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-[0_12px_40px_rgba(0,84,202,0.06),0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden">
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#0054ca_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.025] pointer-events-none" />

        {/* Top Control Plane Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200/60 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
              Chakra Multi-Agent Mesh Topology
            </h3>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <span className="text-xs text-slate-500 hidden sm:inline font-medium">
              Autonomous Cooperative System
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/70 tabular-nums">
              5 Agents Synchronized
            </span>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 font-medium transition-colors text-[11px] flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">
                {autoRotate ? 'motion_photos_on' : 'motion_photos_paused'}
              </span>
              <span>{autoRotate ? 'Auto-Cycle On' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Topology Canvas: Left Agents (2) - Center Hub - Right Agents (3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center relative z-10">
          {/* Left Column: Planner & Coder */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {agents.slice(0, 2).map((agent) => {
              const isSelected = activeAgentId === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => {
                    setActiveAgentId(agent.id);
                    setAutoRotate(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-primary ring-2 ring-primary/20 shadow-md translate-x-1'
                      : 'bg-slate-50/70 hover:bg-white border-slate-200/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-primary bg-primary-fixed/50`}>
                        <span className="material-symbols-outlined text-[18px]">{agent.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          {agent.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block">{agent.role}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                      {agent.latency}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-1 leading-relaxed pl-10">
                    {agent.status}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{agent.throughput}</span>
                    <span className="text-primary font-semibold">{agent.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column: Chakra Orchestrator Hub */}
          <div className="lg:col-span-4 flex flex-col items-center text-center justify-center py-4 relative">
            {/* SVG Connecting Flow Lines (visible on desktop) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block opacity-40"
              viewBox="0 0 300 240"
              fill="none"
            >
              {/* Left connection curve */}
              <path
                d="M 10 70 C 80 70, 80 120, 150 120"
                stroke="url(#flowGradientLeft)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 10 170 C 80 170, 80 120, 150 120"
                stroke="url(#flowGradientLeft)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Right connection curve */}
              <path
                d="M 290 50 C 220 50, 220 120, 150 120"
                stroke="url(#flowGradientRight)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 290 120 C 220 120, 220 120, 150 120"
                stroke="url(#flowGradientRight)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 290 190 C 220 190, 220 120, 150 120"
                stroke="url(#flowGradientRight)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <defs>
                <linearGradient id="flowGradientLeft" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0054ca" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5c4bc3" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="flowGradientRight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5c4bc3" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#006a42" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative flex items-center justify-center p-4 rounded-full bg-gradient-to-b from-primary-fixed/40 via-secondary-fixed/30 to-slate-100 shadow-[0_8px_30px_rgba(0,84,202,0.12)] border border-white">
              <ChakraLogo size="xl" animated />
            </div>

            <div className="mt-4">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                Chakra Orchestrator
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                Deterministic Closed-Loop
              </span>
            </div>

            <div className="mt-2.5 text-[11px] font-semibold text-slate-700 bg-slate-100/80 border border-slate-200/80 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <span className="material-symbols-outlined text-primary text-[15px]">verified</span>
              <span>Zero Hallucination Gate</span>
            </div>
          </div>

          {/* Right Column: QA, Recovery & Verifier */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {agents.slice(2, 5).map((agent) => {
              const isSelected = activeAgentId === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => {
                    setActiveAgentId(agent.id);
                    setAutoRotate(false);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-secondary ring-2 ring-secondary/20 shadow-md -translate-x-1'
                      : 'bg-slate-50/70 hover:bg-white border-slate-200/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${agent.id === 'recovery' ? 'text-secondary bg-secondary-fixed/50' : agent.id === 'verifier' ? 'text-tertiary bg-tertiary-fixed/50' : 'text-secondary bg-secondary-fixed/50'}`}>
                        <span className="material-symbols-outlined text-[18px]">{agent.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          {agent.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block">{agent.role}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                      {agent.latency}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-1 leading-relaxed pl-10">
                    {agent.status}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{agent.throughput}</span>
                    <span className={agent.id === 'recovery' ? 'text-secondary font-semibold' : agent.id === 'verifier' ? 'text-tertiary font-semibold' : 'text-slate-600 font-semibold'}>
                      {agent.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Agent Live Diagnostic Inspector Panel */}
        <div className="mt-5 pt-4 border-t border-slate-200/70 bg-slate-50/80 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-4 sm:p-5 rounded-b-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5 sm:mt-0">
                terminal
              </span>
              <div className="min-w-0">
                <span className="font-bold text-slate-900">{activeAgent.name}: </span>
                <span className="text-slate-600 font-normal">{activeAgent.logDetail}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-slate-500 font-mono text-[11px]">
              <span className="tabular-nums">Latency: {activeAgent.latency}</span>
              <span>·</span>
              <span className="text-primary font-bold">100% Attested</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

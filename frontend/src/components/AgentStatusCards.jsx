import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Code, 
  CheckCircle, 
  ShieldAlert, 
  Server, 
  MoreVertical, 
  ExternalLink, 
  AlertTriangle, 
  Check, 
  RefreshCw,
  Sliders,
  ChevronRight,
  GitCommit,
  TerminalSquare
} from 'lucide-react';
import { fetchStatus } from '../api';

const AGENT_ICON_MAP = {
  product: FileText,
  engineering: Code,
  qa: CheckCircle,
  security: ShieldAlert,
  devops: Server
};

// Helper to deduce color and status from backend statusLabel or status field
function parseAgentState(backendAgent, fallbackAgent) {
  const label = backendAgent.statusLabel || '';
  const rawStatus = (backendAgent.status || '').toLowerCase();

  let color = 'emerald';
  let status = 'active';

  if (label.includes('Red') || label.includes('Failed') || rawStatus === 'error') {
    color = 'rose';
    status = 'error';
  } else if (label.includes('Yellow') || label.includes('Diagnosing') || label.includes('Queued') || rawStatus === 'warning') {
    color = 'amber';
    status = 'warning';
  } else if (label.includes('Green') || label.includes('Passed') || label.includes('Active') || label.includes('Secure') || rawStatus === 'active') {
    color = 'emerald';
    status = 'active';
  }

  return {
    ...fallbackAgent,
    ...backendAgent,
    color,
    status,
    icon: AGENT_ICON_MAP[backendAgent.id] || fallbackAgent.icon || FileText,
  };
}

export default function AgentStatusCards({ onAgentAction }) {
  // Default agents matching Stitch aesthetic
  const initialAgents = [
    {
      id: 'product',
      name: 'Product Agent',
      role: 'PRD & Architecture Engine',
      status: 'active',
      statusLabel: 'Green/Active',
      color: 'emerald',
      icon: FileText,
      directive: 'Standby for feature specification requests.',
      stat1Label: 'TASKS TODAY',
      stat1Val: '14 done / 0 wait',
      stat2Label: 'UPTIME',
      stat2Val: '99.8%',
      progressLabel: 'PRD Synthesis Completeness',
      progressVal: 100,
      actionBtn: 'View PRD Spec',
      badge: 'v2.4 Core',
    },
    {
      id: 'engineering',
      name: 'Engineering Agent',
      role: 'Code Generation & Refactoring',
      status: 'active',
      statusLabel: 'Green/Active',
      color: 'emerald',
      icon: Code,
      directive: 'Listening on git worktree and task queue.',
      stat1Label: 'COMMIT STATS',
      stat1Val: '42 tasks | +344L',
      stat2Label: 'UPTIME',
      stat2Val: '99.9%',
      progressLabel: 'git: main branch',
      progressVal: 100,
      actionBtn: 'Review Diff',
      badge: 'Go / Rust',
    },
    {
      id: 'qa',
      name: 'QA Agent',
      role: 'Synthetic Validation & E2E Tests',
      status: 'active',
      statusLabel: 'Green/Passed',
      color: 'emerald',
      icon: CheckCircle,
      directive: 'Test environment ready. Worker pools active.',
      stat1Label: 'TEST STATUS',
      stat1Val: '28 pass / 0 fail',
      stat2Label: 'UPTIME',
      stat2Val: '99.2%',
      progressLabel: 'E2E Test Matrix',
      progressVal: 100,
      actionBtn: 'Live Test Report',
      badge: 'Synthetic Cluster',
    },
    {
      id: 'security',
      name: 'Security Agent',
      role: 'Static Analysis & Threat Detection',
      status: 'active',
      statusLabel: 'Green/Secure',
      color: 'emerald',
      icon: ShieldAlert,
      directive: 'Security policy active. Static code scans clear.',
      stat1Label: 'ALERTS',
      stat1Val: '0 Critical / 0 Patch',
      stat2Label: 'CONTAINMENT',
      stat2Val: 'Nominal',
      progressLabel: 'CVSS Risk Score: 0.0',
      progressVal: 0,
      actionBtn: 'Scan Worktree',
      secondaryBtn: 'Policies',
      badge: 'Policy Enforced',
    },
    {
      id: 'devops',
      name: 'DevOps Agent',
      role: 'Infrastructure & Kubernetes Orchestration',
      status: 'active',
      statusLabel: 'Green/Active',
      color: 'emerald',
      icon: Server,
      directive: 'Kubernetes staging/prod mesh nominal.',
      stat1Label: 'BUILDS TODAY',
      stat1Val: '12 builds / 0 rollback',
      stat2Label: 'UPTIME',
      stat2Val: '99.9%',
      progressLabel: 'Stage: Nominal Deployment',
      progressVal: 100,
      actionBtn: 'K8s Pods',
      badge: 'k8s cluster',
      stepCurrent: 5,
      stepTotal: 5,
    }
  ];

  const [agents, setAgents] = useState(initialAgents);
  const [activeNotification, setActiveNotification] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Poll /api/status every 1 second
  useEffect(() => {
    let isMounted = true;

    const poll = async () => {
      const data = await fetchStatus();
      if (!isMounted) return;

      if (data && Array.isArray(data.agents)) {
        setBackendConnected(true);
        if (typeof data.current_step === 'number') {
          setCurrentStep(data.current_step);
        }

        setAgents(prevAgents => {
          return initialAgents.map(fallback => {
            const backendAgent = data.agents.find(a => a.id === fallback.id);
            if (backendAgent) {
              return parseAgentState(backendAgent, fallback);
            }
            return fallback;
          });
        });
      } else {
        setBackendConnected(false);
      }
    };

    // Initial immediate poll
    poll();

    // 1-second interval
    const interval = setInterval(poll, 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleAction = (agent, actionType) => {
    setActiveNotification(`${agent.name}: Triggered "${actionType}"`);
    setTimeout(() => setActiveNotification(null), 3000);
    if (onAgentAction) onAgentAction(agent, actionType);
  };

  return (
    <section className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-5 h-5 rounded bg-cyber-emerald/15 text-cyber-emerald">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
          </div>
          <h2 className="text-sm font-bold tracking-wide uppercase text-obsidian-100 flex items-center gap-2 font-mono">
            Active Agent Swarm Nodes
            <span className="text-[10px] bg-obsidian-800 text-obsidian-300 px-2 py-0.5 rounded border border-obsidian-700">
              5 Agents Live
            </span>
            {currentStep > 0 && (
              <span className="text-[10px] bg-cyber-cyan/15 text-cyber-cyan px-2 py-0.5 rounded border border-cyber-cyan/30 animate-pulse">
                Demo Step {currentStep}/5
              </span>
            )}
          </h2>
        </div>
        <div className="text-xs font-mono text-obsidian-400 flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${backendConnected ? 'bg-cyber-emerald' : 'bg-cyber-amber animate-pulse'}`}></span>
          <span>
            {backendConnected ? (
              <>Live Polling Status: <strong className="text-cyber-emerald font-medium">1s / OK</strong></>
            ) : (
              <span className="text-cyber-amber">Connecting to Backend (localhost:8000)...</span>
            )}
          </span>
        </div>
      </div>

      {/* Action Notification Toast */}
      {activeNotification && (
        <div className="mb-3 px-3 py-1.5 rounded bg-cyber-cyan/15 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono flex items-center justify-between animate-fadeIn">
          <span>⚡ {activeNotification}</span>
          <span className="text-[10px] text-obsidian-400">Action recorded</span>
        </div>
      )}

      {/* 5 Cards Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {agents.map((agent) => {
          const Icon = agent.icon || FileText;
          const isEmerald = agent.color === 'emerald';
          const isAmber = agent.color === 'amber';
          const isRose = agent.color === 'rose';

          return (
            <div 
              key={agent.id}
              className={`rounded-lg p-3.5 flex flex-col justify-between transition-all duration-300 glass-card relative overflow-hidden group ${
                isRose 
                  ? 'border-cyber-rose/60 bg-gradient-to-b from-obsidian-850 to-cyber-rose/10 shadow-glow-rose' 
                  : isAmber 
                  ? 'border-cyber-amber/50 bg-gradient-to-b from-obsidian-850 to-cyber-amber/5 shadow-glow-amber' 
                  : 'border-obsidian-750 hover:border-cyber-emerald/50 hover:shadow-glow-emerald/20'
              }`}
            >
              {/* Dynamic top indicator line */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-300 ${
                  isRose ? 'bg-cyber-rose shadow-glow-rose' : isAmber ? 'bg-cyber-amber shadow-glow-amber' : 'bg-cyber-emerald'
                }`}
              />

              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isRose 
                        ? 'bg-cyber-rose/20 text-cyber-rose border border-cyber-rose/40 animate-pulse' 
                        : isAmber 
                        ? 'bg-cyber-amber/20 text-cyber-amber border border-cyber-amber/40' 
                        : 'bg-obsidian-800 text-cyber-cyan border border-obsidian-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-obsidian-50 tracking-tight leading-snug">
                        {agent.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          isRose 
                            ? 'bg-cyber-rose animate-ping' 
                            : isAmber 
                            ? 'bg-cyber-amber animate-pulse' 
                            : 'bg-cyber-emerald'
                        }`}></span>
                        <span className={`text-[10px] font-mono font-bold tracking-wider uppercase transition-colors duration-300 ${
                          isRose ? 'text-cyber-rose' : isAmber ? 'text-cyber-amber' : 'text-cyber-emerald'
                        }`}>
                          {agent.statusLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-obsidian-400 hover:text-obsidian-200 p-0.5">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Current Directive */}
                <div className="my-2.5">
                  <div className="text-[10px] font-mono text-obsidian-400 uppercase tracking-wider mb-1">
                    Current Directive
                  </div>
                  <p className={`text-xs leading-relaxed min-h-[36px] line-clamp-2 transition-colors duration-300 ${
                    isRose ? 'text-cyber-rose font-medium' : isAmber ? 'text-cyber-amber font-medium' : 'text-obsidian-200'
                  }`}>
                    {agent.directive}
                  </p>
                </div>

                {/* Dual Metric Columns */}
                <div className="grid grid-cols-2 gap-2 my-2.5 pt-2 border-t border-obsidian-800/80 text-[11px] font-mono">
                  <div className="bg-obsidian-900/60 p-1.5 rounded border border-obsidian-800">
                    <div className="text-[9px] text-obsidian-400 uppercase">{agent.stat1Label || 'TASKS'}</div>
                    <div className="font-semibold text-obsidian-100 truncate">{agent.stat1Val}</div>
                  </div>
                  <div className="bg-obsidian-900/60 p-1.5 rounded border border-obsidian-800">
                    <div className="text-[9px] text-obsidian-400 uppercase">{agent.stat2Label || 'UPTIME'}</div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      isRose ? 'text-cyber-rose' : isAmber ? 'text-cyber-amber' : 'text-cyber-emerald'
                    }`}>
                      {agent.stat2Val || '99.9%'}
                    </div>
                  </div>
                </div>

                {/* Progress / Step Gauge */}
                <div className="my-2">
                  <div className="flex justify-between items-center text-[10px] font-mono mb-1 text-obsidian-300">
                    <span className="truncate pr-1">{agent.progressLabel || 'Progress'}</span>
                    <span className={`font-semibold ${isRose ? 'text-cyber-rose' : isAmber ? 'text-cyber-amber' : 'text-cyber-emerald'}`}>
                      {agent.stepTotal ? `${agent.stepCurrent}/${agent.stepTotal}` : `${agent.progressVal ?? 100}%`}
                    </span>
                  </div>

                  <div className="w-full bg-obsidian-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isRose ? 'bg-cyber-rose shadow-glow-rose' : isAmber ? 'bg-cyber-amber shadow-glow-amber' : 'bg-cyber-emerald'
                      }`}
                      style={{ width: `${Math.max(agent.progressVal ?? 10, 5)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 mt-1 border-t border-obsidian-800/80 flex items-center gap-1.5">
                <button
                  onClick={() => handleAction(agent, agent.actionBtn || 'Inspect')}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded text-[11px] font-mono font-medium transition-all ${
                    isRose 
                      ? 'bg-cyber-rose/20 text-cyber-rose border border-cyber-rose/40 hover:bg-cyber-rose/30 shadow-glow-rose/20'
                      : isAmber
                      ? 'bg-cyber-amber/20 text-cyber-amber border border-cyber-amber/40 hover:bg-cyber-amber/30'
                      : 'bg-obsidian-800 hover:bg-obsidian-750 text-obsidian-200 border border-obsidian-750 hover:text-white'
                  }`}
                >
                  <span>{agent.actionBtn || 'Inspect'}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>

                {agent.secondaryBtn && (
                  <button
                    onClick={() => handleAction(agent, agent.secondaryBtn)}
                    className="py-1.5 px-2 rounded text-[11px] font-mono text-obsidian-400 border border-obsidian-800 hover:text-obsidian-200 hover:bg-obsidian-800 transition-colors"
                  >
                    {agent.secondaryBtn}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

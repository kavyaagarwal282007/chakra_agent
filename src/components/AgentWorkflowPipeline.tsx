import React, { useState, useEffect } from 'react';

export interface WorkflowStage {
  id: string;
  name: string;
  role: string;
  agentTitle: string;
  icon: string;
  badge: string;
  status: 'idle' | 'active' | 'success' | 'recovering';
  task: string;
  detail: string;
  latency: string;
}

const DEFAULT_STAGES: WorkflowStage[] = [
  {
    id: 'request',
    name: 'Goal / Request',
    role: 'Natural Language Input',
    agentTitle: 'User Prompt',
    icon: 'chat',
    badge: 'Dispatched',
    status: 'success',
    task: 'Add JWT expiration & refresh rotation with rate-limiting',
    detail: 'Spec decomposed into 4 testable acceptance criteria with zero ambiguities.',
    latency: '12ms',
  },
  {
    id: 'planner',
    name: 'Planner Agent',
    role: 'Decomposition & Architecture',
    agentTitle: 'Product Architect',
    icon: 'account_tree',
    badge: 'Spec Ready',
    status: 'success',
    task: 'Breaking task into 3 sub-modules and dependency graph',
    detail: 'Defined contract interfaces, database schemas, and single-use token lifecycle invariants.',
    latency: '140ms',
  },
  {
    id: 'coder',
    name: 'Coding Agent',
    role: 'AST Synthesis & Implementation',
    agentTitle: 'Engineering Agent',
    icon: 'terminal',
    badge: 'Compiled',
    status: 'success',
    task: 'Writing TokenService.ts & ResetController.ts (+142 lines)',
    detail: 'Zero syntax errors. Strict TypeScript 5.4 types with crypto randomBytes and HMAC hashing.',
    latency: '420ms',
  },
  {
    id: 'tester',
    name: 'Testing Agent',
    role: 'MicroVM Sandbox Execution',
    agentTitle: 'QA Sandbox Agent',
    icon: 'science',
    badge: 'Race Caught',
    status: 'recovering',
    task: 'Simulated 24 integration tests in isolated Docker container',
    detail: 'Detected clock skew on token_expiry_validation returning 400 instead of 401.',
    latency: '680ms',
  },
  {
    id: 'recovery',
    name: 'Recovery Agent',
    role: 'AST Tree-Sitter Mutation',
    agentTitle: 'Self-Healing Engine',
    icon: 'healing',
    badge: 'Auto-Patched',
    status: 'success',
    task: 'Synthesized 1-line AST repair in TokenService.ts:48',
    detail: 'Injected synchronized mock clock; re-verified 24/24 integration tests in 820ms.',
    latency: '820ms',
  },
  {
    id: 'verified',
    name: 'Verified Code',
    role: 'Cryptographic Attestation',
    agentTitle: 'Security Auditor',
    icon: 'verified_user',
    badge: '100% Passed',
    status: 'success',
    task: 'Cryptographically signed PR #492 ready for staging release',
    detail: 'OWASP top 10 checked, zero secrets leaked, deterministic container snapshot sealed.',
    latency: '1.2s',
  },
];

export const AgentWorkflowPipeline: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [selectedStage, setSelectedStage] = useState<string>('recovery');
  const [activeRunningIndex, setActiveRunningIndex] = useState<number>(4);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useEffect(() => {
    if (!isSimulating) return;
    const timer = setInterval(() => {
      setActiveRunningIndex((prev) => {
        const next = (prev + 1) % DEFAULT_STAGES.length;
        setSelectedStage(DEFAULT_STAGES[next].id);
        return next;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [isSimulating]);

  const activeStage = DEFAULT_STAGES.find((s) => s.id === selectedStage) || DEFAULT_STAGES[4];

  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-outline-variant/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[20px]">hub</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-on-surface">
                Autonomous Multi-Agent Pipeline
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                Live Mesh
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Every request orchestrates specialized agents with automated failover and AST recovery.
            </p>
          </div>
        </div>

        {/* Live Simulation Control */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
              isSimulating
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isSimulating ? 'pause' : 'play_arrow'}
            </span>
            <span>{isSimulating ? 'Simulating...' : 'Run Pipeline Flow'}</span>
          </button>
        </div>
      </div>

      {/* Horizontal Pipeline Steps Track */}
      <div className="relative">
        {/* Connecting Line Track */}
        <div className="hidden lg:block absolute top-7 left-8 right-8 h-0.5 bg-surface-container-high -z-0">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary transition-all duration-700"
            style={{ width: `${((activeRunningIndex + 1) / DEFAULT_STAGES.length) * 100}%` }}
          />
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 relative z-10">
          {DEFAULT_STAGES.map((stage, idx) => {
            const isCurrent = stage.id === selectedStage;
            const isPassed = idx <= activeRunningIndex;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setSelectedStage(stage.id);
                  setActiveRunningIndex(idx);
                }}
                className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between gap-2 border ${
                  isCurrent
                    ? 'bg-surface-container-high border-primary ring-2 ring-primary/20 shadow-sm'
                    : isPassed
                    ? 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/20 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between gap-1 w-full">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      stage.id === 'recovery'
                        ? 'bg-secondary text-on-secondary animate-pulse'
                        : isPassed
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{stage.icon}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-on-surface-variant">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-on-surface truncate block">
                      {stage.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant line-clamp-1">
                    {stage.agentTitle}
                  </span>
                </div>

                <div className="pt-1 border-t border-outline-variant/15 flex items-center justify-between w-full text-[10px]">
                  <span
                    className={`font-semibold ${
                      stage.id === 'recovery'
                        ? 'text-secondary'
                        : isPassed
                        ? 'text-tertiary'
                        : 'text-outline'
                    }`}
                  >
                    {stage.badge}
                  </span>
                  <span className="font-mono text-outline">{stage.latency}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Showcase of Selected Agent */}
      {!compact && (
        <div className="p-4 sm:p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">{activeStage.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase font-bold tracking-wider text-primary">
                  {activeStage.role}
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-xs font-mono text-on-surface-variant">
                  {activeStage.agentTitle}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold">
                  {activeStage.badge}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-on-surface mt-0.5">
                {activeStage.task}
              </h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                {activeStage.detail}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/20 gap-1 text-xs">
            <div className="flex items-center gap-1.5 text-tertiary font-bold">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span>Active Invariants Verified</span>
            </div>
            <span className="font-mono text-outline text-[11px]">
              Execution Time: <strong>{activeStage.latency}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

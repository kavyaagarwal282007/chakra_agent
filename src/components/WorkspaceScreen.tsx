import React, { useState } from 'react';
import { ScreenType, AgentActivity } from '../types';
import { INITIAL_ACTIVITIES } from '../data/mockData';
import { ChakraLogo } from './ChakraLogo';
import { LiveAgentMeshHero } from './LiveAgentMeshHero';

interface WorkspaceScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenDiffModal: () => void;
}

export const WorkspaceScreen: React.FC<WorkspaceScreenProps> = ({
  onNavigate,
  onOpenDiffModal,
}) => {
  const [activeTab, setActiveTab] = useState<'build' | 'mesh' | 'results' | 'history'>('build');
  const [prompt, setPrompt] = useState('Add a password-reset feature with email verification and tests.');
  const [isBuilding, setIsBuilding] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(4); // 1: Plan, 2: Build, 3: Verify, 4: Recover
  const [activities, setActivities] = useState<AgentActivity[]>(INITIAL_ACTIVITIES);
  const [streamingPhase, setStreamingPhase] = useState<string>('');

  const samplePrompts = [
    'Add a password-reset feature with email verification and tests.',
    'Add rate-limiting and redis lock to token swap',
    'Migrate auth session cookies to SameSite=Strict and audit headers',
    'Synthesize end-to-end load tests for webhook replay idempotency',
  ];

  const handleStartBuilding = () => {
    setIsBuilding(true);
    setCurrentStep(1);
    setStreamingPhase('Product Architect Agent: Synthesizing specifications & AST schemas...');

    // Simulate multi-agent steps with live phase updates
    setTimeout(() => {
      setCurrentStep(2);
      setStreamingPhase('Engineering Agent: Compiling TypeScript controllers & token rotation logic...');
      setTimeout(() => {
        setCurrentStep(3);
        setStreamingPhase('Sandbox QA Agent: Executing 24 integration tests in isolated micro-VM...');
        setTimeout(() => {
          setCurrentStep(4);
          setStreamingPhase('Self-Healing Recovery Agent: Off-by-one clock skew auto-recovered in 820ms!');
          setIsBuilding(false);
        }, 900);
      }, 900);
    }, 900);
  };

  const handleReset = () => {
    setPrompt('Add a password-reset feature with email verification and tests.');
    setStreamingPhase('');
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Sub-Header / Project Context Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-slate-50/90 shadow-2xs border-b border-slate-200/70 rounded-2xl mt-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <ChakraLogo size="sm" animated />
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-slate-900 truncate">
                Account Service
              </span>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1 text-on-surface-variant min-w-0">
                <span className="material-symbols-outlined text-[16px] shrink-0 text-primary">
                  fork_right
                </span>
                <span className="text-xs sm:text-sm font-mono truncate max-w-[150px]">
                  feat/password-reset
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>Autonomous Mode Active</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-mono">
              #sb-89241
            </span>
          </div>
        </div>

        {/* Segmented View Tabs */}
        <div className="flex items-center p-1 mt-3.5 bg-surface-container-highest rounded-xl gap-1 max-w-md overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('build')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'build'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">construction</span>
            <span>Build Canvas</span>
          </button>
          <button
            onClick={() => setActiveTab('mesh')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'mesh'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">hub</span>
            <span>Agent Mesh</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('results');
              onNavigate('review');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 relative whitespace-nowrap ${
              activeTab === 'results'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">verified</span>
            <span>Results</span>
            <span className="w-2 h-2 rounded-full bg-tertiary absolute top-1.5 right-2"></span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">history</span>
            <span>History</span>
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-6 flex flex-col gap-6">
        {activeTab === 'mesh' ? (
          /* Multi-Agent Topology View */
          <div className="space-y-4">
            <LiveAgentMeshHero />
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface-variant">
              <span className="font-bold text-on-surface block mb-1">
                Sub-Agent Inter-Communication Matrix
              </span>
              Product Architect, Engineering, QA Tester, Self-Healing Recovery, and Security Auditor
              agents share deterministic AST checkpoints via secure IPC channel. Zero hallucinations
              are allowed past the verification threshold.
            </div>
          </div>
        ) : (
          <>
            {/* Feature Prompt Box */}
            <div className="p-5 sm:p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-on-surface">
                      What would you like to build?
                    </h2>
                    <span className="text-[11px] text-on-surface-variant block sm:hidden">
                      Autonomous Multi-Agent Flow
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full font-bold">
                  Autonomous Multi-Agent Flow
                </span>
              </div>

              <div className="relative bg-surface-container-low rounded-xl p-3.5 border border-outline-variant/30 transition-all focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary">
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent text-on-surface text-sm sm:text-base placeholder:text-outline focus:outline-none resize-none leading-relaxed font-sans"
                  placeholder="Describe feature, bug fix, or schema migration..."
                />
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15 text-xs text-outline">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">psychology</span>
                    <span className="text-on-surface font-medium">5 specialized sub-agents online</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs text-outline hover:text-primary transition-colors font-medium"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Prompt Suggestions */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span className="text-outline shrink-0 font-medium">Suggestions:</span>
                {samplePrompts.slice(1).map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPrompt(s)}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-[11px] whitespace-nowrap border border-outline-variant/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Live Streaming Phase Banner if building */}
              {isBuilding && (
                <div className="p-3 bg-primary-fixed/30 rounded-xl flex items-center gap-2.5 text-xs text-primary border border-primary/20 animate-fadeIn">
                  <span className="material-symbols-outlined text-[18px] animate-spin">autorenew</span>
                  <span className="font-semibold truncate">{streamingPhase}</span>
                </div>
              )}

              {/* CTA Button */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleStartBuilding}
                  disabled={isBuilding || !prompt.trim()}
                  className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm sm:text-base rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
                >
                  {isBuilding ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                      <span>Orchestrating Sub-Agents in Sandbox...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px] text-primary-fixed">
                        rocket_launch
                      </span>
                      <span>Start Building with Agents</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-on-surface-variant text-center flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-tertiary">check_circle</span>
                  <span>Dispatches Product, Engineering &amp; QA agents simultaneously</span>
                </p>
              </div>
            </div>

            {/* 4-Step Visual Progress Stepper */}
            <div className="p-5 sm:p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">account_tree</span>
                  <h3 className="text-sm sm:text-base font-bold text-on-surface">
                    Execution Lifecycle
                  </h3>
                </div>
                <span className="text-xs bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-0.5 rounded-full font-bold">
                  100% Passing
                </span>
              </div>

              {/* Stepper Nodes */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center gap-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-colors ${
                      currentStep >= 1
                        ? 'bg-tertiary-container text-on-tertiary'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">done</span>
                  </div>
                  <span className="text-xs font-semibold text-on-surface">1. Plan</span>
                  <span className="text-[10px] text-on-surface-variant leading-tight">Schema ready</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center gap-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-colors ${
                      currentStep >= 2
                        ? 'bg-tertiary-container text-on-tertiary'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">done</span>
                  </div>
                  <span className="text-xs font-semibold text-on-surface">2. Build</span>
                  <span className="text-[10px] text-on-surface-variant leading-tight">+142 lines</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center gap-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-colors ${
                      currentStep >= 3
                        ? 'bg-tertiary-container text-on-tertiary'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">done</span>
                  </div>
                  <span className="text-xs font-semibold text-on-surface">3. Verify</span>
                  <span className="text-[10px] text-on-surface-variant leading-tight">Sandbox test</span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center gap-1 relative">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
                      currentStep >= 4
                        ? 'bg-secondary text-on-secondary animate-pulse'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </div>
                  <span className="text-xs font-semibold text-secondary">4. Recover</span>
                  <span className="text-[10px] text-secondary-fixed-variant leading-tight">Auto-patched</span>
                </div>
              </div>

              {/* Recovery Banner Detail */}
              <div className="p-3 sm:p-3.5 bg-secondary-fixed/30 rounded-xl flex items-start gap-2.5 border border-secondary/20">
                <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">
                  published_with_changes
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-on-secondary-fixed">
                    Recovery successful
                  </span>
                  <span className="text-xs text-on-surface leading-relaxed">
                    1 patch applied to{' '}
                    <code className="font-mono bg-surface-container px-1 py-0.5 rounded text-primary font-semibold">
                      TokenService.ts
                    </code>
                    . All integration test suites now green.
                  </span>
                </div>
              </div>
            </div>

            {/* Live Agent Activity Feed */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping"></span>
                  <h3 className="text-base sm:text-lg font-bold text-on-surface">Agent Activity Stream</h3>
                </div>
                <span className="text-xs text-on-surface-variant">Live telemetry</span>
              </div>

              <div className="flex flex-col gap-3">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className={`p-4 rounded-2xl shadow-sm border flex flex-col gap-2 transition-all ${
                      act.agentType === 'qa'
                        ? 'bg-error-container/40 border-error/20'
                        : act.agentType === 'recovery'
                        ? 'bg-secondary-fixed/30 border-secondary/20'
                        : 'bg-surface-container-lowest border-outline-variant/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span
                          className={`p-1 rounded-lg text-[16px] material-symbols-outlined ${
                            act.agentType === 'qa'
                              ? 'bg-error-container text-error'
                              : act.agentType === 'recovery'
                              ? 'bg-secondary text-on-secondary'
                              : 'bg-primary-fixed text-primary'
                          }`}
                        >
                          {act.icon}
                        </span>
                        <span className="font-bold text-on-surface">{act.agentName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{act.time}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            act.status === 'failure'
                              ? 'bg-error text-on-error'
                              : act.status === 'recovered'
                              ? 'bg-secondary text-on-secondary'
                              : 'bg-tertiary-fixed text-on-tertiary-fixed'
                          }`}
                        >
                          {act.statusText}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`text-xs sm:text-sm pl-8 leading-relaxed ${
                        act.status === 'failure' ? 'text-on-error-container' : 'text-on-surface'
                      }`}
                    >
                      {act.message}
                    </p>
                    {act.agentType === 'recovery' && (
                      <div className="pl-8 pt-1">
                        <button
                          onClick={onOpenDiffModal}
                          className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                        >
                          <span className="material-symbols-outlined text-[15px]">difference</span>
                          <span>Inspect Auto-Recovery Diff</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Results CTA Banner */}
            <button
              onClick={() => onNavigate('review')}
              className="w-full p-5 bg-gradient-to-r from-primary-container to-primary rounded-2xl text-on-primary shadow-lg flex items-center justify-between group active:scale-98 transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-3.5 min-w-0 text-left">
                <div className="w-11 h-11 rounded-full bg-surface-container-lowest/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">task_alt</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm sm:text-base font-bold truncate">Artifacts Ready for Review</span>
                  <span className="text-xs text-primary-fixed truncate">
                    Diff inspect • 2 files • 1 patch verified • 5/5 Checks Passed
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold shrink-0">
                <span className="hidden sm:inline">Inspect Release Gate</span>
                <span className="material-symbols-outlined text-[22px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

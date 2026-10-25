import React, { useState } from 'react';
import { ScreenType } from '../types';
import { CHAKRA_ASSETS } from '../data/mockData';
import { ChakraLogo } from './ChakraLogo';
import { LiveAgentMeshHero } from './LiveAgentMeshHero';
import { AgentWorkflowPipeline } from './AgentWorkflowPipeline';
import { BuildVerifyRecoverFlow } from './BuildVerifyRecoverFlow';

interface LandingPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [sandboxPrompt, setSandboxPrompt] = useState('Add rate-limiting and redis lock to token swap');
  const [isRunningAgent, setIsRunningAgent] = useState(false);
  const [agentLogs, setAgentLogs] = useState([
    {
      agent: 'Product Architect Agent',
      type: 'product',
      status: 'Ready',
      text: "Decomposed 'OAuth2 Refresh Flow' into 4 sub-modules & 7 integration tests.",
    },
    {
      agent: 'Engineering Agent',
      type: 'engineering',
      status: 'Compiled',
      text: 'Generated src/auth/tokenValidator.ts • 0 syntax errors • TypeScript 5.4',
    },
    {
      agent: 'QA & Recovery Agent',
      type: 'recovery',
      status: 'Self-Healed',
      text: 'Sandbox caught race condition on token revocation. AST patched in 1.4s.',
    },
  ]);

  const handleRunAgent = () => {
    setIsRunningAgent(true);
    setTimeout(() => {
      setAgentLogs((prev) => [
        ...prev,
        {
          agent: 'Security Auditor Agent',
          type: 'security',
          status: 'Verified',
          text: `Applied rate-limiter bucket for "${sandboxPrompt}". Sandbox assertions 100% green.`,
        },
      ]);
      setIsRunningAgent(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-primary-fixed/35 via-secondary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Announcement Bar */}
          <div
            onClick={() => onNavigate('workspace')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 shadow-xs mb-6 hover:border-primary/40 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Chakra Engine 2.4 · Autonomous Test-Driven Self-Healing
            </span>
            <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </div>

          {/* Standardized Concentric Gyro Logo Unit */}
          <div className="relative mb-5 flex items-center justify-center">
            <ChakraLogo size="xl" animated />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight leading-[1.12] max-w-4xl">
            From Natural Language to{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Verified Software
            </span>
            .
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed font-normal">
            Tell Chakra Agent what you want to build. Its coordinated AI agents write modular code, run isolated test harnesses, diagnose runtime regressions, and auto-heal AST failures.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3.5 max-w-xs sm:max-w-none mb-10">
            <button
              onClick={() => onNavigate('workspace')}
              className="h-12 px-8 rounded-xl bg-primary hover:bg-[#0047af] text-white font-semibold text-sm sm:text-base shadow-[0_4px_16px_rgba(0,84,202,0.28)] hover:shadow-[0_6px_22px_rgba(0,84,202,0.38)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              <span>Launch Workspace</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="h-12 px-6 rounded-xl bg-white text-slate-800 font-semibold text-sm sm:text-base shadow-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-[0.98] border border-slate-200/90 hover:border-slate-300"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">play_circle</span>
              <span>See How It Works</span>
            </button>
          </div>

          {/* Autonomous Multi-Agent Mesh Live Visualization in Hero */}
          <div className="w-full max-w-5xl mb-12">
            <LiveAgentMeshHero />
          </div>

          {/* Live Workspace Execution Terminal Card */}
          <div className="w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,84,202,0.08),0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/90 text-left relative overflow-hidden">
            {/* Terminal Top Chrome */}
            <div className="flex items-center justify-between pb-3.5 mb-5 bg-slate-50/90 -mx-5 -mt-5 sm:-mx-7 sm:-mt-7 px-5 sm:px-7 py-3 border-b border-slate-200/70">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-xs font-mono font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-primary">terminal</span>
                  <span>chakra-sandbox-runtime</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Isolated MicroVM</span>
              </div>
            </div>

            {/* Step Indicators - Unboxed & Elegant */}
            <div className="grid grid-cols-4 gap-2 text-center mb-6 py-2 px-3 bg-slate-50/70 rounded-2xl border border-slate-200/50">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold mb-1 shadow-2xs">
                  <span className="material-symbols-outlined text-[15px]">check</span>
                </div>
                <span className="text-xs font-bold text-slate-800">1. Decompose</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">Spec Ready</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold mb-1 shadow-2xs">
                  <span className="material-symbols-outlined text-[15px]">check</span>
                </div>
                <span className="text-xs font-bold text-slate-800">2. Scaffold</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">AST Synthesized</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold mb-1 shadow-2xs">
                  <span className="material-symbols-outlined text-[15px]">science</span>
                </div>
                <span className="text-xs font-bold text-primary">3. Sandbox QA</span>
                <span className="text-[10px] text-primary/80 hidden sm:inline">24 / 24 Tests</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center text-xs font-bold mb-1 shadow-2xs">
                  <span className="material-symbols-outlined text-[15px]">healing</span>
                </div>
                <span className="text-xs font-bold text-secondary">4. Self-Heal</span>
                <span className="text-[10px] text-secondary/80 hidden sm:inline">AST Recovery</span>
              </div>
            </div>

            {/* Live Agent Activity List */}
            <div className="space-y-2 font-mono text-xs">
              {agentLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl flex items-start gap-3 border transition-all ${
                    log.type === 'recovery'
                      ? 'bg-purple-50/70 border-purple-200/80 text-slate-900'
                      : log.type === 'security'
                      ? 'bg-emerald-50/70 border-emerald-200/80 text-slate-900'
                      : 'bg-slate-50/70 border-slate-200/70 text-slate-900'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[17px] shrink-0 mt-0.5 ${
                    log.type === 'recovery' ? 'text-secondary' : log.type === 'security' ? 'text-emerald-700' : 'text-primary'
                  }`}>
                    {log.type === 'product'
                      ? 'psychology'
                      : log.type === 'engineering'
                      ? 'code'
                      : log.type === 'recovery'
                      ? 'healing'
                      : 'verified_user'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-bold text-slate-900 text-xs">{log.agent}</span>
                      <span className="font-mono text-[10px] text-slate-500 font-semibold tabular-nums">
                        {log.status}
                      </span>
                    </div>
                    <p className="text-slate-600 font-sans text-xs leading-relaxed">{log.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt Runner Interactive Bar */}
            <div className="mt-4 pt-3 bg-slate-50/90 p-3 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border border-slate-200/80">
              <div className="flex items-center gap-2.5 min-w-0 flex-1 px-1">
                <span className="material-symbols-outlined text-primary text-[18px]">terminal</span>
                <input
                  type="text"
                  value={sandboxPrompt}
                  onChange={(e) => setSandboxPrompt(e.target.value)}
                  className="bg-transparent text-xs text-slate-900 focus:outline-none w-full font-mono placeholder:text-slate-400"
                  placeholder="e.g. Add rate-limiting with redis distributed lock..."
                />
              </div>
              <button
                onClick={handleRunAgent}
                disabled={isRunningAgent}
                className="bg-primary hover:bg-[#0047af] text-white px-4 py-2 rounded-xl text-xs font-semibold shrink-0 shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isRunningAgent ? (
                  <>
                    <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <span>Run Agent Test</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Multi-Agent Pipeline Interactive Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        <AgentWorkflowPipeline />
      </section>

      {/* Live Engineering Lifecycle Graphic Banner */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">auto_graph</span>
            <h2 className="text-lg sm:text-xl font-bold text-on-background">Live Engineering Lifecycle</h2>
          </div>
          <span className="text-xs text-primary font-semibold">Active Mesh</span>
        </div>
        <div className="w-full rounded-2xl overflow-hidden shadow-md bg-surface-container-lowest border border-outline-variant/30">
          <img
            src={CHAKRA_ASSETS.dashboardPreview}
            alt="AI developer platform dashboard on a luminous desktop with code graph nodes"
            className="w-full h-48 sm:h-72 object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Build • Verify • Recover Interactive Architectural Flow */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full">
        <BuildVerifyRecoverFlow />
      </section>

      {/* Autonomous Development in 3 Steps */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold text-primary tracking-wider">How It Works</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-background mt-1 mb-3">
              Autonomous Development in 3 Steps
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Complex orchestration simplified into transparent checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary font-bold flex items-center justify-center mb-4 text-base">
                  01
                </div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-2">Describe your goal</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Explain features, bug fixes, or test expansions using natural language prompts or tickets.
                </p>
              </div>
              <div className="p-3 bg-surface-container rounded-lg font-mono text-[11px] text-on-surface-variant">
                • Context parsing: AST &amp; Schema<br />
                • Acceptance criteria autogen<br />
                • Dependency risk score calculation
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary font-bold flex items-center justify-center mb-4 text-base">
                  02
                </div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-2">Multi-Agent Sandbox Execution</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Agents scaffold the code, generate comprehensive tests, and simulate production runs safely.
                </p>
              </div>
              <div className="p-3 bg-surface-container rounded-lg font-mono text-[11px] text-on-surface-variant">
                • Dockerized ephemeral runtime<br />
                • Synthetic fixtures generated<br />
                • Sub-second hot compilation
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold flex items-center justify-center mb-4 text-base">
                  03
                </div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-2">Automated Recovery &amp; Signoff</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  When issues occur, Chakra pinpoints root causes, proposes diff patches, and awaits your approval.
                </p>
              </div>
              <div className="p-3 bg-surface-container rounded-lg font-mono text-[11px] text-on-surface-variant">
                • Self-healing loop: 3 iterations max<br />
                • Clean GitHub PR generated<br />
                • 100% verified trace log
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Autonomous Recovery in Action & AST Diff Preview */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit">
              <span className="material-symbols-outlined text-[16px]">build_circle</span>
              <span className="text-xs font-bold uppercase tracking-wider">Automated Recovery Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Self-Healing AST Patching at Runtime
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Unlike conventional autocomplete tools that leave syntax errors and broken unit tests for you to debug, Chakra Agent inspects crash traces and automatically rewrites code until all test suites pass.
            </p>
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="font-semibold text-on-surface">Recursive stack trace backpropagation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="font-semibold text-on-surface">Semantic tree mutation with zero hallucinations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="font-semibold text-on-surface">Automated regression avoidance snapshot</span>
              </div>
            </div>
          </div>

          {/* Interactive Incident Card */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-md border border-outline-variant/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[20px]">healing</span>
                <span className="text-xs sm:text-sm font-bold text-on-background uppercase tracking-wide">
                  Autonomous Recovery in Action
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">
                Incident Demo
              </span>
            </div>

            {/* Error box */}
            <div className="p-3.5 rounded-xl bg-surface-container-low mb-3 border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-error font-mono text-xs mb-1">
                <span className="material-symbols-outlined text-sm">cancel</span>
                <span className="font-bold">test_jwt_expiration() FAILED</span>
              </div>
              <p className="text-xs text-on-surface-variant pl-5">
                Expected epoch integer <code className="bg-surface-bright px-1 py-0.5 rounded text-on-surface font-mono">1712940200</code> but received undefined in authorization header parser.
              </p>
            </div>

            {/* Proposed patch */}
            <div className="p-3.5 rounded-xl bg-surface-container-high mb-3 border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-secondary font-mono text-xs mb-1.5">
                <span className="material-symbols-outlined text-sm">psychology</span>
                <span className="font-bold">Recovery Agent Proposed Patch</span>
              </div>
              <div className="font-mono text-xs pl-5 space-y-1">
                <div className="text-error bg-error-container/40 px-2 py-0.5 rounded line-through">
                  - token.exp || null
                </div>
                <div className="text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded font-semibold">
                  + token.exp ? Math.floor(token.exp) : defaultExp
                </div>
              </div>
            </div>

            {/* Re-verification result */}
            <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between shadow-xs border border-outline-variant/20">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary">
                  <span className="material-symbols-outlined text-xs">done_all</span>
                </div>
                <span className="text-xs font-semibold text-on-surface">Automatic Re-verification</span>
              </div>
              <span className="text-xs text-tertiary font-bold">100% Passed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="text-xs uppercase font-bold text-primary tracking-wider">Core Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-background mt-1">
              Built to Eliminate Regressions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">smart_toy</span>
              </div>
              <h3 className="font-bold text-base text-on-surface mb-1">Coordinated AI Agents</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Specialized roles for system architecture, backend logic, and synthetic user test harnesses working simultaneously.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-primary text-[22px]">science</span>
              </div>
              <h3 className="font-bold text-base text-on-surface mb-1">Isolated Sandbox Testing</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Every run executes in throwaway virtual containers with zero risk to production dependencies or persistent state.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-secondary text-[22px]">auto_fix_high</span>
              </div>
              <h3 className="font-bold text-base text-on-surface mb-1">Self-Healing Failure Recovery</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Runtime errors trigger instant AST inspection and targeted 1-line to multi-file healing commits.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-tertiary text-[22px]">verified_user</span>
              </div>
              <h3 className="font-bold text-base text-on-surface mb-1">Guaranteed Human-In-Loop</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                One-click diff review and explicit gatekeeper signoffs ensure complete developer oversight before deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to build CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto bg-primary rounded-2xl p-8 sm:p-12 text-on-primary text-center shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-primary-container opacity-40"></div>
          <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-on-primary text-[28px]">rocket</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-on-primary mb-3">
            Ready to build with AI agents?
          </h2>
          <p className="text-sm sm:text-base text-on-primary/90 mb-6 max-w-md mx-auto leading-relaxed">
            Join hundreds of innovative engineering teams creating high-confidence software effortlessly.
          </p>
          <button
            onClick={() => onNavigate('workspace')}
            className="w-full sm:w-auto h-12 px-8 rounded-xl bg-surface-container-lowest text-primary font-semibold text-sm sm:text-base shadow-md hover:bg-surface-bright transition-all inline-flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Start Free in Demo Mode</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <p className="text-xs text-on-primary/75 mt-4">
            No credit card required • Instant browser access
          </p>
        </div>
      </section>

      {/* Footer with Standardized ChakraLogo */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 text-center bg-surface-container-low border-t border-outline-variant/30">
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <ChakraLogo size="xs" animated={false} showStatusDot={false} />
          <span className="text-sm font-bold text-on-background tracking-tight">Chakra Agent</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4 text-xs text-on-surface-variant font-medium">
          <button onClick={() => onNavigate('landing')} className="hover:text-primary transition-colors">Documentation</button>
          <span>•</span>
          <button onClick={() => onNavigate('projects')} className="hover:text-primary transition-colors">Projects</button>
          <span>•</span>
          <button onClick={() => onNavigate('workspace')} className="hover:text-primary transition-colors">Workspace</button>
          <span>•</span>
          <button onClick={() => onNavigate('review')} className="hover:text-primary transition-colors">Security &amp; Audit</button>
        </div>
        <p className="text-xs text-on-surface-variant mb-1">
          Built for modern software engineering teams.
        </p>
        <p className="text-[11px] text-outline">
          © 2025 Chakra Agent Systems, Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

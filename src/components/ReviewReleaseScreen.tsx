import React, { useState } from 'react';
import { ScreenType } from '../types';
import { VERIFICATION_CHECKS } from '../data/mockData';
import { ChakraLogo } from './ChakraLogo';

interface ReviewReleaseScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenDiffModal: () => void;
  onOpenConfirmationModal: () => void;
}

export const ReviewReleaseScreen: React.FC<ReviewReleaseScreenProps> = ({
  onNavigate,
  onOpenDiffModal,
  onOpenConfirmationModal,
}) => {
  const [notifyWebhooks, setNotifyWebhooks] = useState(true);
  const [enableRollbackCanary, setEnableRollbackCanary] = useState(true);
  const [isRequestingChanges, setIsRequestingChanges] = useState(false);
  const [requestFeedbackSent, setRequestFeedbackSent] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [selectedAttestationAgent, setSelectedAttestationAgent] = useState<string | null>('self-heal-engine');

  const handleRequestChanges = () => {
    if (!feedbackInput.trim()) return;
    setIsRequestingChanges(true);
    setTimeout(() => {
      setIsRequestingChanges(false);
      setRequestFeedbackSent(true);
      setShowFeedbackDialog(false);
      setFeedbackInput('');
      setTimeout(() => setRequestFeedbackSent(false), 4000);
    }, 1200);
  };

  const agentAttestations = [
    {
      id: 'planner-v3-orch',
      name: 'Planner Agent',
      role: 'Requirement Specification & Scope Analysis',
      status: 'Signed',
      time: '10:41:04 AM',
      hash: 'sha256:7f3a9e42bb1',
      details: 'Validated scope against Issue #492. Zero spec drift detected.',
      icon: 'architecture',
      badgeColor: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      id: 'coder-ast-synth',
      name: 'Coding Agent',
      role: 'AST Synthesis & Type-Safe Patching',
      status: 'Signed',
      time: '10:41:28 AM',
      hash: 'sha256:1a84f93cb02',
      details: 'Emitted +142 / -6 lines. Static semantic checks passed with 0 diagnostic flags.',
      icon: 'code',
      badgeColor: 'bg-secondary/10 text-secondary border-secondary/20',
    },
    {
      id: 'sandbox-qa-runner',
      name: 'Testing Agent',
      role: 'Isolated Sandbox Execution & QA',
      status: 'Signed',
      time: '10:41:52 AM',
      hash: 'sha256:e92c017df88',
      details: '24 / 24 test suites executed in ephemeral sandbox #sb-89241. All assertions passed.',
      icon: 'science',
      badgeColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary/20',
    },
    {
      id: 'self-heal-engine',
      name: 'Recovery Agent',
      role: 'Anomaly Isolation & Self-Healing Patch',
      status: 'Auto-Recovered',
      time: '10:42:15 AM',
      hash: 'sha256:c441aa50e19',
      details: 'Diagnosed async clock skew in tokenExpiry.spec.ts. Synthesized synchronized clock mock.',
      icon: 'auto_fix_high',
      badgeColor: 'bg-secondary-fixed text-on-secondary-fixed border-secondary/30',
    },
    {
      id: 'verifier-gatekeeper',
      name: 'Verification Agent',
      role: 'Security Audit & Cosign Attestation',
      status: 'Verified',
      time: '10:42:39 AM',
      hash: 'sha256:8812bf0972e',
      details: 'OWASP top 10 verified clean. Cryptographic Cosign signature sealed for release gate.',
      icon: 'verified_user',
      badgeColor: 'bg-tertiary/10 text-tertiary border-tertiary/20',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('workspace')}
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface text-xs sm:text-sm font-semibold active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Workspace</span>
          </button>
          <span className="text-outline-variant hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-1.5">
            <ChakraLogo size="xs" />
            <span className="text-xs font-semibold text-on-surface">Chakra Agent</span>
            <span className="text-outline-variant">•</span>
            <span className="text-xs text-on-surface-variant font-medium">Release Gate Review</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Simulated Sandbox #sb-89241</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold shadow-xs border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[15px]">verified_user</span>
            <span>Policy: High-Assurance</span>
          </span>
        </div>
      </div>

      {/* Screen Title & Narrative */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <ChakraLogo size="sm" />
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Review Before Release
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
          Multi-agent verified release package. Inspect automated recovery telemetry and agent signatures before approving production merge.
        </p>
      </div>

      {requestFeedbackSent && (
        <div className="p-4 rounded-xl bg-tertiary-fixed/40 text-on-tertiary-fixed-variant text-xs sm:text-sm flex items-center gap-2.5 border border-tertiary/30 animate-fadeIn">
          <span className="material-symbols-outlined text-[20px] text-tertiary">check_circle</span>
          <span>Prompt instructions dispatched to Chakra Recovery Agent. Re-verifying test suite with updated assertions...</span>
        </div>
      )}

      {/* Readiness Hero Spotlight Banner */}
      <section className="rounded-2xl p-6 sm:p-8 bg-tertiary text-on-tertiary shadow-lg relative overflow-hidden flex flex-col gap-4">
        {/* Background Ambient SVG */}
        <svg
          className="absolute -right-8 -bottom-8 w-44 h-44 opacity-15 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="42" strokeDasharray="6 6" strokeWidth="4"></circle>
          <circle cx="50" cy="50" r="28" strokeWidth="5"></circle>
          <circle cx="50" cy="50" r="14" strokeWidth="4"></circle>
          <path d="M50 15v16M50 69v16M15 50h16M69 50h16" strokeLinecap="round" strokeWidth="4"></path>
        </svg>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 bg-on-tertiary/20 px-3 py-1 rounded-full text-on-tertiary text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
              <span>Release Gate Ready</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <span>5 / 5 Checks Passed</span>
              <span className="text-tertiary-fixed font-normal text-sm sm:text-base">• Safe to Ship</span>
            </h2>
            <p className="text-xs sm:text-sm text-on-tertiary/90 max-w-xl leading-relaxed">
              Automated recovery resolved 1 failing test suite. Sandbox snapshot verified clean &amp; immutable.
            </p>
          </div>

          {/* Radial Verification Index Gauge */}
          <div className="flex items-center gap-4 bg-on-tertiary/15 backdrop-blur-xs px-5 py-3 rounded-2xl self-start sm:self-auto border border-on-tertiary/20">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-on-tertiary/20"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-tertiary-fixed"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="100, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <span className="absolute font-bold text-sm text-on-tertiary">100%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-on-tertiary">Verification Index</span>
              <span className="text-[11px] text-on-tertiary/80">0 Blocking Anomalies</span>
              <span className="text-[10px] text-tertiary-fixed font-bold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                Continuous Attestation
              </span>
            </div>
          </div>
        </div>

        {/* Micro progress indicator bar */}
        <div className="w-full bg-on-tertiary/20 h-1.5 rounded-full overflow-hidden z-10">
          <div className="bg-tertiary-fixed h-full rounded-full w-full"></div>
        </div>
      </section>

      {/* Multi-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Target Service & Verification Trail (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Service Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[24px]">dns</span>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold block">
                    Target Service
                  </span>
                  <span className="text-base sm:text-lg font-bold text-on-surface">
                    Account Service (v2.4.1)
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
                PR #492
              </span>
            </div>

            {/* Feature Spec */}
            <div className="bg-surface-container-low rounded-xl p-3.5 border border-outline-variant/20 flex flex-col gap-1">
              <span className="text-xs font-semibold text-on-surface-variant">Feature Spec</span>
              <p className="text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
                Password-reset feature with email verification token lifecycle and state-machine revocation.
              </p>
            </div>

            {/* Git Branch Topology */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg flex-1 min-w-0 font-mono">
                <span className="material-symbols-outlined text-[16px] text-primary">merge_type</span>
                <span className="text-on-surface truncate">main ← feat/password-reset</span>
                <span className="bg-surface-container-high px-1.5 py-0.5 rounded text-[10px] text-on-surface">
                  #e4f9b2a
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant shrink-0">
                <span>Author: <strong>AI Engine / chakra-core</strong></span>
                <span>•</span>
                <span>28m ago</span>
              </div>
            </div>
          </div>

          {/* Verification Trail Section */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">fact_check</span>
                <h3 className="text-base sm:text-lg font-bold text-on-surface">
                  Automated Verification Trail
                </h3>
              </div>
              <span className="text-xs text-on-surface-variant">Cryptographically Signed Log</span>
            </div>

            {/* Check Item 1: Code Review */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-on-surface">
                        Code changes verified
                      </span>
                      <span className="px-2 py-0.2 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded">
                        Passed
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      2 files changed • <span className="text-tertiary font-bold">+142</span>{' '}
                      <span className="text-error font-bold">-6</span> lines. AST semantic structure checks clean.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenDiffModal}
                  className="px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-container rounded-lg text-xs font-semibold text-primary transition-colors flex items-center gap-1 shrink-0 border border-outline-variant/20 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[15px]">code</span>
                  <span>View Code Diff</span>
                </button>
              </div>
            </div>

            {/* Check Item 2: Test Suite Passed + Recovery Note */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-on-surface">
                        Required test suites passed
                      </span>
                      <span className="px-2 py-0.2 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded">
                        24 / 24 Passed
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Integration &amp; unit suites executed inside isolated micro-runtime in 1.4s.
                    </p>
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant shrink-0">Runtime: 1.4s</span>
              </div>

              {/* Auto-Recovery Highlight Callout */}
              <div className="ml-10 p-3 rounded-lg bg-surface-container-high flex items-start gap-2 border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                  published_with_changes
                </span>
                <div className="text-xs text-on-surface leading-relaxed">
                  <strong className="text-secondary font-bold">Auto-Recovered:</strong>{' '}
                  1 timeout assertion patched in{' '}
                  <code className="font-mono bg-surface-container px-1 py-0.5 rounded text-on-surface">
                    tokenExpiry.spec.ts
                  </code>
                  . Async clock skew neutralized.
                </div>
              </div>
            </div>

            {/* Check Item 3: Security Scan */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      Security checks reviewed
                    </span>
                    <span className="px-2 py-0.2 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded">
                      OWASP Clean
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    No secrets detected. Cryptographic hashing conforms to SHA-256 + 128-bit salt standard.
                  </p>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant shrink-0 font-medium">0 Vulnerabilities</span>
            </div>

            {/* Check Item 4: Acceptance Criteria Replay */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      Requirements verified via replay
                    </span>
                    <span className="px-2 py-0.2 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded">
                      4 / 4 Criteria
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Automated browser replayed full recovery and token invalidation journeys without degradation.
                  </p>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant shrink-0 font-medium">Replay: Clean</span>
            </div>

            {/* Check Item 5: Blocking Incidents */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      System blocking incidents
                    </span>
                    <span className="px-2 py-0.2 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded">
                      0 Active
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Zero downstream dependency freezes or unresolved infrastructure alerts on staging.
                  </p>
                </div>
              </div>
              <span className="text-xs text-tertiary font-bold shrink-0">Stable</span>
            </div>
          </div>

          {/* Inline Code Diff Preview Accordion Box */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">difference</span>
                <span>Diff Inspection: src/auth/tokenExpiry.spec.ts</span>
              </span>
              <span className="text-[11px] text-on-surface-variant font-mono">Lines 42-49</span>
            </div>
            <div className="font-mono text-xs bg-surface-container-low p-4 rounded-xl overflow-x-auto space-y-1.5 border border-outline-variant/20 leading-relaxed">
              <div className="text-on-surface-variant/70">@@ -42,7 +42,8 @@ describe('Token Lifecycle', () =&gt; {'{'}</div>
              <div className="text-on-surface-variant pl-2">const token = await generateVerificationToken(user.id);</div>
              <div className="bg-error-container/40 text-on-error-container px-2 py-1 rounded -mx-1 flex items-center gap-2">
                <span className="font-bold select-none">-</span>
                <span>expect(await token.isExpired()).toBe(false); // prone to clock skew</span>
              </div>
              <div className="bg-tertiary-fixed/40 text-on-tertiary-fixed-variant px-2 py-1 rounded -mx-1 flex items-center gap-2 font-medium">
                <span className="font-bold select-none">+</span>
                <span>// Auto-recovered: injected synchronized mock clock for deterministic eval</span>
              </div>
              <div className="bg-tertiary-fixed/40 text-on-tertiary-fixed-variant px-2 py-1 rounded -mx-1 flex items-center gap-2 font-medium">
                <span className="font-bold select-none">+</span>
                <span>expect(token.isValidAt(testTimestamp)).toBe(true);</span>
              </div>
              <div className="text-on-surface-variant pl-2">await clock.tickAsync(15 * 60 * 1000);</div>
            </div>
          </div>
        </div>

        {/* Right Column: Gatekeeper Action, Sandbox Snapshot & Audit Trail (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Release Decision Gate Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-md border border-outline-variant/30 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">gavel</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface">Release Decision Gate</h3>
                <p className="text-xs text-on-surface-variant">Sign off deployment to production</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low text-on-surface space-y-1.5 border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <span className="material-symbols-outlined text-[16px]">policy</span>
                <span>High-Assurance Identity Policy</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Human authorization is required for identity &amp; authentication changes. All sandbox build telemetry and AI decision traces are cryptographically signed.
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={onOpenConfirmationModal}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span className="material-symbols-outlined text-[20px]">lock_open</span>
                <span>Approve Release &amp; Merge</span>
              </button>

              <button
                onClick={() => setShowFeedbackDialog(true)}
                className="w-full h-11 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-98 border border-outline-variant/20"
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                <span>Request Changes / Re-run Checks</span>
              </button>
            </div>

            {/* Quick Toggles */}
            <div className="pt-2 space-y-2 border-t border-outline-variant/15 text-xs text-on-surface-variant">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyWebhooks}
                  onChange={(e) => setNotifyWebhooks(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                />
                <span>Notify staging webhook subscribers</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableRollbackCanary}
                  onChange={(e) => setEnableRollbackCanary(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                />
                <span>Enable automated rollback canary monitor</span>
              </label>
            </div>
          </div>

          {/* Interactive Request Changes Dialog Box (if opened) */}
          {showFeedbackDialog && (
            <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-lg border border-primary/40 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px]">edit_note</span>
                  <span>Instruct Chakra Agent for Re-evaluation</span>
                </span>
                <button
                  onClick={() => setShowFeedbackDialog(false)}
                  className="text-xs text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
              </div>
              <textarea
                rows={2}
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="e.g. Tighten clock skew threshold to 2s and re-verify..."
                className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 resize-none"
              />
              <button
                onClick={handleRequestChanges}
                disabled={isRequestingChanges || !feedbackInput.trim()}
                className="w-full h-9 bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-all disabled:opacity-50"
              >
                {isRequestingChanges ? (
                  <>
                    <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                    <span>Dispatching Feedback...</span>
                  </>
                ) : (
                  <>
                    <span>Submit &amp; Trigger Recovery Loop</span>
                    <span className="material-symbols-outlined text-[14px]">send</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Multi-Agent Attestation Signatures Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-outline-variant/15">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-on-surface">
                    Multi-Agent Attestations
                  </h3>
                  <span className="text-[11px] text-on-surface-variant">5/5 Autonomous Signatures</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold">
                Quorum Signed
              </span>
            </div>

            {/* Agent Signatures List */}
            <div className="space-y-2">
              {agentAttestations.map((agent) => {
                const isSelected = selectedAttestationAgent === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAttestationAgent(isSelected ? null : agent.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-surface-container-low border-primary/40 shadow-xs'
                        : 'bg-surface-container-low/50 hover:bg-surface-container-low border-outline-variant/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface shrink-0">
                          <span className="material-symbols-outlined text-[16px] text-primary">
                            {agent.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-on-surface truncate">
                              {agent.name}
                            </span>
                            <span className="font-mono text-[10px] text-on-surface-variant/70 hidden sm:inline">
                              ({agent.id})
                            </span>
                          </div>
                          <span className="text-[10px] text-on-surface-variant block truncate">
                            {agent.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${agent.badgeColor}`}>
                          {agent.status}
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant transition-transform">
                          {isSelected ? 'expand_less' : 'expand_more'}
                        </span>
                      </div>
                    </div>

                    {/* Expandable Agent Telemetry Detail */}
                    {isSelected && (
                      <div className="mt-2.5 pt-2.5 border-t border-outline-variant/15 text-[11px] space-y-1.5 animate-fadeIn">
                        <p className="text-on-surface leading-relaxed">
                          {agent.details}
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant pt-1">
                          <span className="truncate max-w-[200px]">Hash: {agent.hash}</span>
                          <span>Signed at {agent.time}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cosign Root Verification Summary */}
            <div className="p-2.5 bg-primary-fixed/20 rounded-xl flex items-center justify-between text-xs text-primary font-medium border border-primary/20">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                <span>Cosign Root Bundle #sig-492-prod</span>
              </div>
              <span className="font-mono text-[10px] font-bold">100% Immutable</span>
            </div>
          </div>

          {/* Sandbox Snapshot Widget */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-on-surface">Sandbox Snapshot</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold">
                Clean State
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block font-medium">Memory Footprint</span>
                <span className="text-lg font-bold text-on-surface mt-1 block">184 MB</span>
                <span className="text-[11px] text-tertiary font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">trending_down</span>
                  -12% vs baseline
                </span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block font-medium">Cold Start Latency</span>
                <span className="text-lg font-bold text-on-surface mt-1 block">42 ms</span>
                <span className="text-[11px] text-tertiary font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Within SLA (&lt;100ms)
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-xl font-mono text-xs text-on-surface-variant space-y-1.5 border border-outline-variant/20">
              <div className="flex justify-between">
                <span>SHA-256 Digest:</span>
                <span className="text-on-surface font-semibold">9fa8...d302</span>
              </div>
              <div className="flex justify-between">
                <span>Container Image:</span>
                <span className="text-on-surface truncate max-w-[150px]">registry.chakra/auth:2.4.1</span>
              </div>
              <div className="flex justify-between">
                <span>Attestation Engine:</span>
                <span className="text-on-surface">Cosign v2.2.0 (Sigstore)</span>
              </div>
            </div>
          </div>

          {/* Telemetry Audit Trail Timeline */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-bold text-on-surface">Telemetry Audit Trail</h4>
              <span className="material-symbols-outlined text-outline-variant text-[18px]">history_edu</span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Event 1 */}
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary mt-1.5 shrink-0"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">Self-Healing Execution Complete</span>
                    <span className="text-[10px] text-on-surface-variant">10:42 AM</span>
                  </div>
                  <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                    Chakra Agent isolated clock skew and committed patch to worktree.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">Sandbox Snapshot Sealed</span>
                    <span className="text-[10px] text-on-surface-variant">10:44 AM</span>
                  </div>
                  <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                    Deterministic filesystem lock created with zero delta.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-1.5 shrink-0"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">Human Review Gate Triggered</span>
                    <span className="text-[10px] text-on-surface-variant">10:45 AM</span>
                  </div>
                  <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                    High-Assurance policy flagged PR #492 for manual signoff.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

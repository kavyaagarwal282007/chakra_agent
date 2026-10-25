import React, { useState } from 'react';

export const BuildVerifyRecoverFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to Step 4 (Recover)

  const steps = [
    {
      step: 1,
      title: 'BUILD',
      agent: 'Engineering Agent',
      status: 'Scaffolding Done',
      badgeClass: 'bg-primary-fixed text-primary',
      description: 'Generates components, strict TypeScript types, and unit tests directly from requirements.',
      codePreview: 'const token = generateToken(userId);',
      icon: 'construction',
    },
    {
      step: 2,
      title: 'VERIFY',
      agent: 'Sandbox Test Runner',
      status: 'Mock Container',
      badgeClass: 'bg-primary-fixed text-primary',
      description: 'Executes integration test suite in throwaway micro-VM with simulated latency.',
      codePreview: 'await testSuite.runAll({ timeout: 5000 });',
      icon: 'science',
    },
    {
      step: 3,
      title: 'ISSUE DETECTED',
      agent: 'QA Observer Agent',
      status: 'Assertion Failed',
      badgeClass: 'bg-error-container text-on-error-container',
      description: 'Catches async clock skew on token expiry: returned status 400 instead of 401.',
      codePreview: 'AssertionError: Token expiry time mismatch (+5s)',
      icon: 'warning',
    },
    {
      step: 4,
      title: 'RECOVER',
      agent: 'AST Recovery Agent',
      status: 'Self-Healing AST',
      badgeClass: 'bg-secondary-fixed text-secondary',
      description: 'Inspects AST call site, synthesizes deterministic mock clock tolerance, and mutates code.',
      codePreview: '+ { clockTolerance: 5, ignoreExpiration: false }',
      icon: 'healing',
    },
    {
      step: 5,
      title: 'RE-VERIFY',
      agent: 'Automated Regression Gate',
      status: 'Re-running Suite',
      badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      description: 'Reruns the failed test harness along with full regression matrix to ensure zero side-effects.',
      codePreview: 'Suite passed (1 test auto-recovered in 820ms)',
      icon: 'sync',
    },
    {
      step: 6,
      title: 'VERIFIED',
      agent: 'Security Gatekeeper',
      status: 'Ready to Ship',
      badgeClass: 'bg-tertiary text-on-tertiary',
      description: 'Signs cryptographic build attestation (Cosign / Sigstore) and prepares staging release.',
      codePreview: '100% Tests Passed • Safe to Ship',
      icon: 'verified',
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200/80 flex flex-col gap-6">
      {/* Title & Philosophy Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs uppercase font-extrabold text-primary tracking-wider">
              Autonomous Closed-Loop Engineering
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Build · Verify · Recover in Real Time
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-1 leading-relaxed">
            Conventional AI code tools stop after emitting raw code. Chakra Agent executes the code in an isolated micro-VM, captures failures, repairs the AST, and proves correctness.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Click any phase to inspect AST telemetry:</span>
        </div>
      </div>

      {/* Workflow Nodes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {steps.map((item, idx) => {
          const isSelected = activeStep === idx;
          const isIssue = item.title === 'ISSUE DETECTED';
          const isRecover = item.title === 'RECOVER';
          const isVerified = item.title === 'VERIFIED';

          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-200 relative flex flex-col justify-between gap-3 border ${
                isSelected
                  ? 'bg-slate-50/90 border-primary ring-2 ring-primary/20 shadow-sm -translate-y-0.5'
                  : 'bg-white hover:bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isIssue
                      ? 'bg-red-500 text-white'
                      : isRecover
                      ? 'bg-secondary text-white'
                      : isVerified
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  0{item.step}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-900 block tracking-tight">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                  {item.agent}
                </span>
              </div>

              <span
                className={`text-[9px] px-2 py-0.5 rounded-full font-bold w-fit border ${
                  isIssue
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : isRecover
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : isVerified
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                {item.status}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expanded Step Deep Dive */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase font-extrabold text-primary tracking-wider">
              Step 0{steps[activeStep].step} — {steps[activeStep].title}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-700">
              {steps[activeStep].agent}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {steps[activeStep].description}
          </p>
        </div>

        {/* Code Snippet Box (Modern Dark IDE styling) */}
        <div className="bg-[#0f172a] text-slate-200 p-3.5 rounded-xl border border-slate-800 font-mono text-xs max-w-md w-full shrink-0 overflow-x-auto shadow-inner">
          <div className="text-[10px] text-slate-400 pb-1.5 border-b border-slate-800 font-sans flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Live AST Telemetry</span>
            </span>
            <span className="text-emerald-400 font-mono text-[10px]">Deterministic Sandbox</span>
          </div>
          <div className="pt-2">
            <code
              className={
                steps[activeStep].title === 'ISSUE DETECTED'
                  ? 'text-red-400 font-semibold'
                  : steps[activeStep].title === 'RECOVER'
                  ? 'text-purple-300 font-semibold'
                  : steps[activeStep].title === 'VERIFIED'
                  ? 'text-emerald-400 font-bold'
                  : 'text-blue-300'
              }
            >
              {steps[activeStep].codePreview}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

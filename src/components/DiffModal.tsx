import React from 'react';

interface DiffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiffModal: React.FC<DiffModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-outline-variant/30">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-surface-container flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">difference</span>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-on-surface">Inspection: Code Diff</h3>
              <p className="text-xs text-on-surface-variant font-mono">auth/password-reset.ts • AST repair diff</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-dim transition-colors"
            aria-label="Close diff modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Diff Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 font-mono text-xs sm:text-sm">
          <div className="flex items-center justify-between font-sans text-xs text-on-surface-variant pb-1 border-b border-outline-variant/20">
            <span className="font-semibold text-on-surface">auth/password-reset.ts</span>
            <div className="flex items-center gap-2">
              <span className="text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded font-mono font-bold">+142</span>
              <span className="text-error bg-error-container/40 px-2 py-0.5 rounded font-mono font-bold">-6</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-4 leading-6 overflow-x-auto space-y-1.5 border border-outline-variant/20">
            <div className="text-on-surface-variant/70">// 1. Generate secure cryptographic reset token</div>
            <div className="text-error bg-error-container/30 px-2 py-1 rounded -mx-1 flex items-start gap-2">
              <span className="font-bold select-none">-</span>
              <code>const token = Math.random().toString(36);</code>
            </div>
            <div className="text-tertiary bg-tertiary-fixed/30 px-2 py-1 rounded -mx-1 flex items-start gap-2 font-medium">
              <span className="font-bold select-none">+</span>
              <code>const tokenBuffer = crypto.randomBytes(32);</code>
            </div>
            <div className="text-tertiary bg-tertiary-fixed/30 px-2 py-1 rounded -mx-1 flex items-start gap-2 font-medium">
              <span className="font-bold select-none">+</span>
              <code>const token = tokenBuffer.toString('hex');</code>
            </div>
            <div className="text-tertiary bg-tertiary-fixed/30 px-2 py-1 rounded -mx-1 flex items-start gap-2 font-medium">
              <span className="font-bold select-none">+</span>
              <code>const hashedToken = await bcrypt.hash(token, 10);</code>
            </div>
            <div className="text-on-surface-variant pl-4">
              await db.tokenStore.insert({'{'} userId, hashedToken, expiresAt {'}'});
            </div>

            <div className="pt-3 text-on-surface-variant/70">// 2. Token expiration evaluation with synchronized mock clock</div>
            <div className="text-error bg-error-container/30 px-2 py-1 rounded -mx-1 flex items-start gap-2">
              <span className="font-bold select-none">-</span>
              <code>- token.exp || null</code>
            </div>
            <div className="text-tertiary bg-tertiary-fixed/30 px-2 py-1 rounded -mx-1 flex items-start gap-2 font-medium">
              <span className="font-bold select-none">+</span>
              <code>+ token.exp ? Math.floor(token.exp) : defaultExp</code>
            </div>
            <div className="text-tertiary bg-tertiary-fixed/30 px-2 py-1 rounded -mx-1 flex items-start gap-2 font-medium">
              <span className="font-bold select-none">+</span>
              <code>expect(token.isValidAt(testTimestamp)).toBe(true);</code>
            </div>
          </div>

          <div className="p-3 bg-secondary-fixed text-on-secondary-fixed rounded-xl flex items-center gap-2.5 font-sans text-xs sm:text-sm">
            <span className="material-symbols-outlined text-[20px] text-secondary shrink-0">verified</span>
            <span>Verified against NIST Special Publication 800-63B digital authentication standards.</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container flex items-center justify-between border-t border-outline-variant/20">
          <span className="text-xs text-on-surface-variant">Sandbox Node: us-east-4-sandbox-82</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-sm font-semibold shadow-xs active:scale-95 transition-all"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};

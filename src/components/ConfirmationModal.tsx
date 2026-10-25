import React, { useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [deploying, setDeploying] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onConfirm();
        onClose();
      }, 1200);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Modal Icon */}
        <div className="w-12 h-12 rounded-2xl bg-primary-fixed/60 text-primary flex items-center justify-center mx-auto shadow-inner">
          <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
        </div>

        <div className="text-center flex flex-col gap-1">
          <h4 className="font-bold text-lg text-on-surface">Confirm Release to Staging</h4>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            You are about to merge <span className="font-mono text-primary font-semibold">feat/password-reset</span> into{' '}
            <span className="font-mono text-on-surface font-semibold">main</span> with cryptographic attestation.
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-low text-on-surface flex flex-col gap-2 text-xs border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Automated Deployment:</span>
            <span className="text-tertiary font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Immediate (PROD-CANARY)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Cryptographic Record:</span>
            <span className="font-mono text-on-surface font-semibold">#0x7b...9f8</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Sigstore Attestation:</span>
            <span className="text-on-surface font-medium">Cosign v2.2.0</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleConfirm}
            disabled={deploying || success}
            className={`w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 text-on-tertiary ${
              success
                ? 'bg-primary'
                : 'bg-tertiary hover:bg-tertiary-container'
            }`}
          >
            {deploying ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">autorenew</span>
                <span>Deploying to Cluster...</span>
              </>
            ) : success ? (
              <>
                <span className="material-symbols-outlined text-[18px]">done_all</span>
                <span>Shipped to Canary!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Confirm &amp; Merge</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={deploying}
            className="w-full h-10 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-xl text-xs sm:text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

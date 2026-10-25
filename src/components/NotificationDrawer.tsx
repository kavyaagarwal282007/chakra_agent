import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToReview?: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToReview,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Auto-Recovery Patch Synthesized',
      message: 'TokenService.ts:48 off-by-one clock error resolved. All 24 integration tests passed.',
      time: '2m ago',
      type: 'recovery',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'Release Gate Ready: Account Service',
      message: '5/5 verification checks passed. Safe to ship to staging canary.',
      time: '12m ago',
      type: 'success',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'Ephemeral MicroVM Recycled',
      message: 'Sandbox #sb-89241 sealed with cryptographic SHA-256 digest 9fa8...d302.',
      time: '28m ago',
      type: 'info',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-inverse-surface/30 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-surface-container-lowest h-full shadow-2xl p-5 flex flex-col justify-between border-l border-outline-variant/30 animate-slideLeft">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">notifications_active</span>
              <h3 className="font-bold text-base text-on-surface">Agent Notifications</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="divide-y divide-outline-variant/15 mt-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`py-3.5 px-2 rounded-xl transition-colors ${
                  n.unread ? 'bg-primary-fixed/20' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {n.type === 'recovery' ? (
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    ) : n.type === 'success' ? (
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    )}
                    <span className="font-semibold text-xs text-on-surface">{n.title}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant">{n.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 pl-3.5 leading-relaxed">
                  {n.message}
                </p>
                {n.type === 'success' && onNavigateToReview && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToReview();
                    }}
                    className="mt-2 ml-3.5 text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                  >
                    <span>Inspect Gate</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
          <span>Real-time Sandbox Mesh v2.4</span>
          <button
            onClick={onClose}
            className="text-primary font-semibold hover:underline"
          >
            Mark all read
          </button>
        </div>
      </div>
    </div>
  );
};

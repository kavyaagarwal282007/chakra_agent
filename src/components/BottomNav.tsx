import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#f9f9ff]/90 backdrop-blur-xl border-t border-[#c2c6d7]/30 shadow-[0_-2px_12px_rgba(4,27,60,0.05)] pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4">
        <button
          onClick={() => onNavigate('projects')}
          className={`flex flex-col items-center justify-center min-w-[64px] h-12 transition-colors ${
            currentScreen === 'projects'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">folder_code</span>
          <span className="text-[11px] font-medium mt-0.5">Projects</span>
        </button>

        <button
          onClick={() => onNavigate('workspace')}
          className={`flex flex-col items-center justify-center min-w-[64px] h-12 transition-colors ${
            currentScreen === 'workspace'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">terminal</span>
          <span className="text-[11px] font-medium mt-0.5">Workspace</span>
        </button>

        <button
          onClick={() => onNavigate('review')}
          className={`flex flex-col items-center justify-center min-w-[64px] h-12 transition-colors ${
            currentScreen === 'review'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">verified</span>
          <span className="text-[11px] font-medium mt-0.5">Release</span>
        </button>
      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import { ScreenType } from '../types';
import { CHAKRA_ASSETS } from '../data/mockData';
import { ChakraLogo } from './ChakraLogo';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,84,202,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => handleNav('landing')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Chakra Agent Home"
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <ChakraLogo size="md" animated />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  Chakra <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Agent</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-medium hidden sm:inline">
                  v2.4
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden md:block font-medium">
                Autonomous Multi-Agent Engineering
              </span>
            </div>
          </button>
        </div>

        {/* Center Navigation Links - Refined Segmented Control */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 shadow-inner">
          <button
            onClick={() => handleNav('landing')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'landing'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNav('projects')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'projects'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => handleNav('workspace')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'workspace'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Workspace
          </button>
          <button
            onClick={() => handleNav('review')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentScreen === 'review'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Review &amp; Release
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Launch Workspace CTA (Desktop) */}
          {currentScreen !== 'workspace' && (
            <button
              onClick={() => handleNav('workspace')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-[#0047af] text-white text-xs font-semibold shadow-[0_2px_10px_rgba(0,84,202,0.25)] hover:shadow-[0_4px_16px_rgba(0,84,202,0.35)] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>Launch Workspace</span>
            </button>
          )}

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-white" />
            )}
          </button>

          {/* Profile / Auth Button */}
          {currentScreen === 'auth' ? (
            <button
              onClick={() => handleNav('landing')}
              className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-container px-3 py-1.5 rounded-lg transition-colors"
            >
              Home
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('auth')}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary/30 transition-all"
                title="Switch Account / Auth"
              >
                <img
                  src={CHAKRA_ASSETS.avatar}
                  alt="Developer Profile"
                  className="w-8 h-8 rounded-full object-cover border border-outline-variant/40"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 bg-surface-container-lowest border-b border-outline-variant/30 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleNav('landing')}
              className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                currentScreen === 'landing'
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              <span>Overview</span>
            </button>
            <button
              onClick={() => handleNav('projects')}
              className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                currentScreen === 'projects'
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">folder_code</span>
              <span>Projects</span>
            </button>
            <button
              onClick={() => handleNav('workspace')}
              className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                currentScreen === 'workspace'
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              <span>Workspace</span>
            </button>
            <button
              onClick={() => handleNav('review')}
              className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                currentScreen === 'review'
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Review & Release</span>
            </button>
            <button
              onClick={() => handleNav('auth')}
              className="px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center gap-2.5 text-on-surface-variant hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>Sign In / Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

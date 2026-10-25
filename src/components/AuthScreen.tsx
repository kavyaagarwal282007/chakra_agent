import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ChakraLogo } from './ChakraLogo';

interface AuthScreenProps {
  onLoginSuccess: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onNavigate }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('alex@company.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Chen');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationMsg, setSimulationMsg] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleAuthSubmit = (e: React.FormEvent, type: 'signin' | 'signup' | 'github') => {
    e.preventDefault();
    setIsSimulating(true);

    if (type === 'github') {
      setSimulationMsg('Redirecting to GitHub OAuth provider & sandbox token handshake...');
    } else if (type === 'signup') {
      setSimulationMsg('Creating isolated developer sandbox environment for new account...');
    } else {
      setSimulationMsg('Verifying sandbox token for workspace...');
    }

    setTimeout(() => {
      setSimulationMsg('Access granted! Connecting to Chakra IDE canvas...');
      setTimeout(() => {
        setIsSimulating(false);
        onLoginSuccess();
      }, 1000);
    }, 1200);
  };

  const handleForgotPassword = () => {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12 bg-surface">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Brand / Hero Branding Unit with Standardized Logo */}
        <div className="flex flex-col items-center text-center pb-6">
          <div className="mb-3">
            <ChakraLogo size="xl" animated />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            Welcome to Chakra Agent
          </h1>
          <p className="text-sm font-medium text-on-surface-variant tracking-wide">
            Build. Verify. Recover.
          </p>

          {/* Demo Notification Pill */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface text-xs shadow-xs border border-outline-variant/20">
            <span className="text-sm">💡</span>
            <span className="font-semibold text-on-surface">Prototype Demo</span>
            <span className="w-1 h-1 rounded-full bg-outline"></span>
            <span className="text-on-surface-variant">No credit card required</span>
          </div>
        </div>

        {/* Main Authentication Card */}
        <div className="w-full bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/30 p-5 sm:p-6 flex flex-col">
          {/* Segmented Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-surface-container-low rounded-xl gap-1 mb-6 border border-outline-variant/20">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex items-center justify-center py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                authMode === 'signin'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex items-center justify-center py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                authMode === 'signup'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Sign In Form */}
          {authMode === 'signin' ? (
            <form onSubmit={(e) => handleAuthSubmit(e, 'signin')} className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-on-surface">Work Email</label>
                  {isValidEmail && (
                    <span className="flex items-center gap-1 text-tertiary font-medium">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      Valid
                    </span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface">Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-11 pl-10 pr-11 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 outline-none transition-all shadow-xs font-mono"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-outline hover:text-on-surface flex items-center justify-center p-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                  />
                  <span className="text-xs text-on-surface-variant font-medium">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-semibold text-primary hover:text-primary-container transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {forgotSent && (
                <div className="p-2.5 rounded-lg bg-tertiary-fixed/30 text-on-tertiary-fixed-variant text-xs flex items-center gap-2 animate-fadeIn">
                  <span className="material-symbols-outlined text-[16px]">mark_email_read</span>
                  <span>Reset instructions sent to your email!</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSimulating}
                className="w-full h-11 mt-1 bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          ) : (
            /* Create Account Form */
            <form onSubmit={(e) => handleAuthSubmit(e, 'signup')} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">Full Name</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-on-surface">Work Email</label>
                  {isValidEmail && (
                    <span className="flex items-center gap-1 text-tertiary font-medium">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      Valid
                    </span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full h-11 pl-10 pr-11 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 outline-none transition-all shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-outline hover:text-on-surface flex items-center justify-center p-1"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">Confirm Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    verified_user
                  </span>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSimulating}
                className="w-full h-11 mt-1 bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                <span>Create Free Account</span>
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex py-4 items-center justify-center">
            <div className="w-full h-px bg-outline-variant/30"></div>
            <span className="absolute bg-surface-container-lowest px-3 text-xs text-outline font-medium">
              or
            </span>
          </div>

          {/* Continue with GitHub Button */}
          <button
            type="button"
            onClick={(e) => handleAuthSubmit(e, 'github')}
            disabled={isSimulating}
            className="w-full h-11 bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-sm rounded-xl border border-outline-variant/30 transition-all flex items-center justify-center gap-2.5 active:scale-98"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span>Continue with GitHub</span>
          </button>

          {/* Toggle Helper Text */}
          <div className="mt-4 pt-1 text-center">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            >
              {authMode === 'signin' ? (
                <span>
                  Don't have an account? <strong className="text-primary font-semibold">Sign up in 10 seconds</strong>
                </span>
              ) : (
                <span>
                  Already have an account? <strong className="text-primary font-semibold">Sign in here</strong>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Live Simulation Banner */}
        {isSimulating && (
          <div className="mt-4 w-full p-4 bg-surface-container rounded-xl flex items-center gap-3 border border-outline-variant/30 animate-fadeIn">
            <div className="w-3 h-3 rounded-full bg-tertiary animate-pulse shrink-0"></div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-on-surface truncate">{simulationMsg}</p>
              <p className="text-[11px] text-on-surface-variant">Connecting to secure sandbox runner...</p>
            </div>
          </div>
        )}

        {/* Reassurance Footer */}
        <div className="mt-6 text-center px-4">
          <div className="inline-flex items-center gap-1.5 justify-center text-outline text-xs mb-1">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span className="font-semibold">Secure sandbox environment</span>
          </div>
          <p className="text-[11px] text-outline leading-relaxed">
            By continuing, you agree to Chakra Agent terms &amp; conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

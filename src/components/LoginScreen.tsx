import React, { useState, useRef } from 'react';
import { User, Lock, ArrowRight, ShieldAlert, LogIn } from 'lucide-react';
import { verifyCredentialsDetailed } from '../utils/crypto';
import { UserAccount } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface LoginScreenProps {
  onLoginSuccess: (user: UserAccount) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await verifyCredentialsDetailed(username, password);
      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else if (result.reason === 'disabled') {
        setErrorMessage('This account has been disabled. Please contact your system administrator.');
      } else {
        setErrorMessage('Invalid username or password. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login verification failed:', err);
      setErrorMessage('An unexpected authentication error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUsernameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordInputRef.current?.focus();
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={`w-full max-w-md mx-auto p-6 md:p-8 rounded-3xl border transition-all duration-300 animate-fade-in space-y-6 relative overflow-hidden ${
        isDarkMode
          ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7] shadow-2xl shadow-black/60'
          : 'bg-white border-[#DBEAFE] text-[#0F172A] shadow-2xl shadow-blue-900/10'
      }`}
    >
      {/* App Header Badge & Title */}
      <div className="text-center space-y-4 flex flex-col items-center justify-center pt-1">
        {/* Header Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase font-bold shadow-sm border ${
            isDarkMode
              ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
              : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#4FB8A6] animate-pulse" />
          ERC Academy • Piensa Rápido
        </div>

        {/* Interlocking Diamond Emblem SVG Logo */}
        <div className="py-2 flex items-center justify-center">
          <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center transition-transform hover:scale-105 duration-300">
            {/* Glowing background aura */}
            <div
              className={`absolute inset-0 rounded-full blur-xl pointer-events-none ${
                isDarkMode ? 'bg-[#E8A33D]/15' : 'bg-blue-100/60'
              }`}
            />
            <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md relative z-10">
              <path
                d="M50 10 L85 45 L50 80 L15 45 Z"
                fill="none"
                stroke={isDarkMode ? '#E8A33D' : '#2563EB'}
                strokeWidth="10"
                strokeLinejoin="round"
              />
              <path
                d="M50 24 L72 45 L50 66 L28 45 Z"
                fill="none"
                stroke={isDarkMode ? '#4FB8A6' : '#0284C7'}
                strokeWidth="7"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="45" r="4" fill="#4FB8A6" />
            </svg>
          </div>
        </div>

        {/* Main Banner Headline */}
        <div className="space-y-1 text-center">
          <h1
            className={`text-3xl md:text-4xl font-black tracking-tight font-heading ${
              isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
            }`}
          >
            "In Progress"
          </h1>
          <p
            className={`text-base md:text-lg font-bold font-heading ${
              isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'
            }`}
          >
            English Tense Practice Quiz
          </p>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Username Field */}
        <div>
          <label
            className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1.5 ${
              isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
            }`}
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9AA5AE]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleUsernameKeyDown}
              placeholder="e.g. teacher or admin"
              autoCapitalize="none"
              autoCorrect="off"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all font-medium border ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] placeholder-[#9AA5AE] focus:border-[#E8A33D] focus:ring-[#E8A33D]/20'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#2563EB] focus:ring-[#2563EB]/20'
              }`}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1.5 ${
              isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
            }`}
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9AA5AE]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              ref={passwordInputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordKeyDown}
              placeholder="••••••••"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all font-medium border ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] placeholder-[#9AA5AE] focus:border-[#E8A33D] focus:ring-[#E8A33D]/20'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#2563EB] focus:ring-[#2563EB]/20'
              }`}
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 animate-shake font-medium border ${
              isDarkMode
                ? 'bg-[#D9534F]/15 border-[#D9534F]/40 text-[#D9534F]'
                : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#D9534F]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 px-4 rounded-2xl font-heading font-extrabold text-base tracking-wide transition-all shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer ${
            isDarkMode
              ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820] shadow-amber-500/10'
              : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-500/20'
          }`}
        >
          {isSubmitting ? (
            <span>Verifying Credentials...</span>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Log in to Practice</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer link */}
      <div
        className={`mt-6 pt-4 text-center border-t ${
          isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-sm border ${
            isDarkMode
              ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
              : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
          }`}
        >
          <span>www.ercacademynic.com</span>
        </div>
      </div>
    </div>
  );
};

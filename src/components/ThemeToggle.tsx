import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  variant?: 'floating' | 'card' | 'inline';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  onToggleTheme,
  variant = 'inline',
}) => {
  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer select-none backdrop-blur-md active:scale-95 ${
        isDarkMode
          ? 'bg-[#182430] border border-[#2A3B4A] text-[#E8A33D] hover:bg-[#1F2E3C] shadow-lg shadow-black/40'
          : 'bg-white/90 border border-[#BFDBFE] text-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] shadow-md shadow-blue-900/10'
      } ${variant === 'floating' ? 'ring-2 ring-blue-500/20 dark:ring-[#E8A33D]/20' : ''}`}
    >
      {isDarkMode ? (
        <>
          <Sun className="w-4 h-4 text-[#E8A33D] shrink-0 transition-transform duration-300" />
          <span className="hidden sm:inline">Light Mode</span>
          <span className="sm:hidden">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-[#2563EB] shrink-0 transition-transform duration-300" />
          <span className="hidden sm:inline">Dark Mode</span>
          <span className="sm:hidden">Dark</span>
        </>
      )}
    </button>
  );
};


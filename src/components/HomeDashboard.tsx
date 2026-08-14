import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  X,
  Play,
  Settings,
  History,
  Trash2,
  Download,
  AlertCircle,
  Clock,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Check,
  Zap,
  Target,
  Sliders,
  Award,
  Layers,
  ArrowRight,
  LogOut,
  BookOpen,
  Compass,
  Briefcase,
  ShieldCheck,
  HelpCircle,
  FileText,
  KeyRound
} from 'lucide-react';
import { QuizSettings, QuizSession, UserAccount } from '../types';
import { generateQuizPDF } from '../utils/pdf';
import { ThemeToggle } from './ThemeToggle';
import { getCategoryQuestionCount } from '../data/questions';
import { UserAdminModule } from './UserAdminModule';
import { DocumentationModule } from './DocumentationModule';

interface HomeDashboardProps {
  players: string[];
  currentUser?: UserAccount | null;
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (name: string) => void;
  settings: QuizSettings;
  onUpdateSettings: (newSettings: QuizSettings) => void;
  onStartQuiz: () => void;
  history: QuizSession[];
  onClearHistory: () => void;
  onDeleteSession?: (sessionId: string) => void;
  onLogout?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

type TabType = 'players' | 'tenses' | 'setup' | 'history' | 'users' | 'docs';

const PLAYER_COLORS = [
  '#2563EB', // Royal Blue
  '#0284C7', // Sky Blue
  '#10B981', // Emerald
  '#D97706', // Amber
  '#7C3AED', // Violet
  '#EC4899', // Pink
];

const QUESTION_COUNTS = [
  { count: 15, label: '15 Qs', duration: '~15 min', tag: 'Quick Sprint' },
  { count: 20, label: '20 Qs', duration: '~20 min', tag: 'Fast Practice' },
  { count: 30, label: '30 Qs', duration: '~30 min', tag: 'Standard' },
  { count: 50, label: '50 Qs', duration: '~50 min', tag: 'In-Depth' },
  { count: 60, label: '60 Qs', duration: '~60 min', tag: 'Default Exam' },
  { count: 90, label: '90 Qs', duration: '~90 min', tag: 'Mastery Marathon' },
  { count: 120, label: '120 Qs', duration: '~120 min', tag: 'Grand Challenge' },
  { count: 150, label: '150 Qs', duration: '~150 min', tag: 'Mega Test' },
];

const TENSE_CATEGORIES = [
  {
    id: 'all',
    title: 'All Topics',
    desc: 'Mixed grammar, tenses, prepositions, phrasal verbs & common errors',
    icon: Sparkles,
  },
  {
    id: 'continuous',
    title: 'Continuous Tenses',
    desc: 'Present, Past & Future Continuous (-ing)',
    icon: Zap,
  },
  {
    id: 'perfect',
    title: 'Perfect Tenses',
    desc: 'Present, Past & Future Perfect (have/had/will have)',
    icon: Target,
  },
  {
    id: 'perfect_continuous',
    title: 'Perfect Continuous',
    desc: 'Present, Past & Future Perfect Continuous',
    icon: Clock,
  },
  {
    id: 'phrasal_verbs',
    title: 'Phrasal Verbs',
    desc: 'Separable, Inseparable, Pronouns, Transitivity & Meanings',
    icon: BookOpen,
  },
  {
    id: 'prepositions',
    title: 'Preposition Errors (Fitikides)',
    desc: 'Correct prepositions after verbs, adjectives & nouns',
    icon: Layers,
  },
  {
    id: 'confused_words',
    title: 'Confused Words (Fitikides)',
    desc: 'Borrow/Lend, Steal/Rob, Make/Do, Lie/Lay, Say/Tell & more',
    icon: Sliders,
  },
  {
    id: 'common_errors',
    title: 'Common Mistakes & Omissions',
    desc: 'Unnecessary words, wrong plurals (advice, news, furniture) & grammar traps',
    icon: AlertCircle,
  },
  {
    id: 'pv_particles',
    title: 'Phrasal Verb Particles (In Use)',
    desc: 'Master particles: Up, Out, Off, On, In, Down, Over, Through, Away & Into',
    icon: Target,
  },
  {
    id: 'pv_life_work',
    title: 'Phrasal Verbs: Work & Life',
    desc: 'Phrasal verbs for business, finance, time, emotions, socialising & travel',
    icon: Compass,
  },
  {
    id: 'pv_in_use_foundations',
    title: 'Phrasal Verbs Foundations',
    desc: 'Basics, Meanings, Particles, Nouns/Adjectives, Metaphor & Core Verbs (Come, Get, Go, Look, Make, Put, Take, Up, Out, Off)',
    icon: BookOpen,
  },
  {
    id: 'conditionals_wishes',
    title: 'Conditionals & Wish Clauses',
    desc: 'Zero, First, Second, Third, Mixed Conditionals, I wish & If only structures',
    icon: ShieldCheck,
  },
  {
    id: 'passive_voice',
    title: 'Passive Voice & Causatives',
    desc: 'Passive structures across tenses, modal passives & causative form (have/get done)',
    icon: Layers,
  },
  {
    id: 'idioms_collocations',
    title: 'Idioms & Natural Expressions',
    desc: 'Everyday English idioms, collocations, binomials & metaphorical phrasing',
    icon: Award,
  },
  {
    id: 'advanced_grammar',
    title: 'Advanced Grammar & Inversion',
    desc: 'Inversion after negative adverbs, cleft sentences, subjunctive & formal structures',
    icon: Sparkles,
  },
  {
    id: 'business_academic',
    title: 'Business & Academic English',
    desc: 'Professional communication, formal vocabulary, linking words & report register',
    icon: Briefcase,
  },
  {
    id: 'reported_speech',
    title: 'Reported Speech & Discourse',
    desc: 'Indirect speech, tense backshifting, reporting verbs & indirect questions',
    icon: FileText,
  },
  {
    id: 'relative_clauses',
    title: 'Relative & Participle Clauses',
    desc: 'Defining & non-defining relative pronouns, reduced clauses & participle phrases',
    icon: Layers,
  },
  {
    id: 'modal_verbs',
    title: 'Modal Verbs & Past Modals',
    desc: 'Obligation, deduction, probability & regret structures (should have, must have)',
    icon: ShieldCheck,
  },
  {
    id: 'articles_determiners',
    title: 'Articles & Quantifiers',
    desc: 'Definite/indefinite articles, count/uncountable nouns & quantifier agreement',
    icon: HelpCircle,
  },
  {
    id: 'gerunds_infinitives',
    title: 'Gerunds & Infinitives',
    desc: 'Verb patterns (-ing vs to-infinitive), prepositions & meaning shifts (stop, remember)',
    icon: BookOpen,
  },
] as const;

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  players,
  currentUser,
  onAddPlayer,
  onRemovePlayer,
  settings,
  onUpdateSettings,
  onStartQuiz,
  history,
  onClearHistory,
  onDeleteSession,
  onLogout,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const isAdmin = currentUser?.role === 'admin' || currentUser?.username?.toLowerCase() === 'admin';
  const [activeTab, setActiveTab] = useState<TabType>('players');

  useEffect(() => {
    if (!isAdmin && (activeTab === 'docs' || activeTab === 'users')) {
      setActiveTab('players');
    }
  }, [isAdmin, activeTab]);

  const [shortcuts, setShortcuts] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('erc_player_shortcuts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return ['Alex', 'Sam', 'Teacher', 'Maria', 'Team Gold', 'Group A'];
  });

  const [newPlayerName, setNewPlayerName] = useState('');
  const [duplicateError, setDuplicateError] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const saveShortcutsToStorage = (updated: string[]) => {
    setShortcuts(updated);
    try {
      localStorage.setItem('erc_player_shortcuts', JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteShortcut = (presetToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = shortcuts.filter((s) => s.toLowerCase() !== presetToDelete.toLowerCase());
    saveShortcutsToStorage(updated);
  };

  const handleSaveCurrentInputAsShortcut = () => {
    const trimmed = newPlayerName.trim();
    if (!trimmed) return;
    if (shortcuts.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setDuplicateError(`"${trimmed}" is already in your player shortcuts.`);
      return;
    }
    const updated = [...shortcuts, trimmed];
    saveShortcutsToStorage(updated);
    setDuplicateError('');
  };

  const handleResetShortcuts = () => {
    const defaults = ['Alex', 'Sam', 'Teacher', 'Maria', 'Team Gold', 'Group A'];
    saveShortcutsToStorage(defaults);
  };

  const handleAddSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setDuplicateError('');

    const trimmed = newPlayerName.trim();
    if (!trimmed) return;

    if (trimmed.length > 24) {
      setDuplicateError('Player name must be 24 characters or fewer.');
      return;
    }

    if (players.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
      setDuplicateError(`"${trimmed}" is already added to the player list.`);
      return;
    }

    onAddPlayer(trimmed);
    setNewPlayerName('');
  };

  const handleQuickAddPreset = (name: string) => {
    setDuplicateError('');
    if (players.some((p) => p.toLowerCase() === name.toLowerCase())) {
      return;
    }
    onAddPlayer(name);
  };

  const handleSelectQuestionCount = (count: number) => {
    const validCount = Math.max(1, count);
    onUpdateSettings({
      ...settings,
      questionCount: validCount,
    });
  };

  const [customInputText, setCustomInputText] = useState<string>(() => String(settings.questionCount));

  useEffect(() => {
    setCustomInputText(String(settings.questionCount));
  }, [settings.questionCount]);

  const currentCategory = settings.tenseCategory || 'all';
  const selectedCatObj = TENSE_CATEGORIES.find((c) => c.id === currentCategory) || TENSE_CATEGORIES[0];
  const availablePoolSize = getCategoryQuestionCount(currentCategory);

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setCustomInputText(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateSettings({
        ...settings,
        questionCount: parsed,
      });
    }
  };

  const handleCustomInputBlur = () => {
    const parsed = parseInt(customInputText, 10);
    if (isNaN(parsed) || parsed < 1) {
      setCustomInputText(String(settings.questionCount));
    }
  };

  const handleAdjustCount = (delta: number) => {
    const next = Math.max(1, settings.questionCount + delta);
    handleSelectQuestionCount(next);
  };

  const handleSelectTenseCategory = (
    category: NonNullable<QuizSettings['tenseCategory']>
  ) => {
    onUpdateSettings({
      ...settings,
      tenseCategory: category,
    });
  };

  const handleTimerToggle = (useTimer: boolean) => {
    onUpdateSettings({
      ...settings,
      useTimer,
    });
  };

  const handleExecuteClearHistory = () => {
    onClearHistory();
    setShowConfirmClear(false);
  };

  // Filter history records based on search query
  const filteredHistory = history.filter((session) => {
    if (!historySearch.trim()) return true;
    const term = historySearch.toLowerCase();
    const matchesPlayer = session.players.some((p) =>
      p.name.toLowerCase().includes(term)
    );
    const matchesDate = new Date(session.date)
      .toLocaleDateString()
      .toLowerCase()
      .includes(term);
    return matchesPlayer || matchesDate;
  });

  return (
    <div
      className={`w-full max-w-2xl mx-auto space-y-3 transition-colors duration-300 animate-fade-in pb-4 ${
        isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
      }`}
    >
      {/* ==================================================== */}
      {/* TOP HEADER CONTROLS (DOCS, USER ACCESS & THEME)      */}
      {/* ==================================================== */}
      <div className="w-full flex items-center justify-end gap-2">
        {/* Only visible to Admin */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'docs' ? 'players' : 'docs')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer select-none backdrop-blur-md active:scale-95 ${
              activeTab === 'docs'
                ? isDarkMode
                  ? 'bg-[#E8A33D] text-[#101820] shadow-md shadow-amber-500/20'
                  : 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                : isDarkMode
                ? 'bg-[#182430] border border-[#2A3B4A] text-[#E8A33D] hover:bg-[#1F2E3C] shadow-lg shadow-black/40'
                : 'bg-white/90 border border-[#BFDBFE] text-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] shadow-md shadow-blue-900/10'
            }`}
            title="Admin-only: Technical manual, architecture & code snippets"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Docs & Code</span>
          </button>
        )}

        {/* Only visible to Admin */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'users' ? 'players' : 'users')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer select-none backdrop-blur-md active:scale-95 ${
              activeTab === 'users'
                ? isDarkMode
                  ? 'bg-[#E8A33D] text-[#101820] shadow-md shadow-amber-500/20'
                  : 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                : isDarkMode
                ? 'bg-[#182430] border border-[#2A3B4A] text-[#E8A33D] hover:bg-[#1F2E3C] shadow-lg shadow-black/40'
                : 'bg-white/90 border border-[#BFDBFE] text-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] shadow-md shadow-blue-900/10'
            }`}
            title="Admin-only: User access management"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>User Access</span>
          </button>
        )}

        {onToggleTheme && (
          <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
        )}
      </div>

      {/* ==================================================== */}
      {/* BRANDING HEADER & LOG OUT BUTTON                      */}
      {/* ==================================================== */}
      <div
        className={`px-5 py-3.5 rounded-2xl border shadow-sm flex items-center justify-between gap-3 ${
          isDarkMode
            ? 'bg-[#182430] border-[#2A3B4A]'
            : 'bg-white border-[#DBEAFE]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border ${
              isDarkMode
                ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
                : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
            }`}
          >
            ERC
          </div>
          <div>
            <h1
              className={`text-sm font-black font-heading leading-tight ${
                isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
              }`}
            >
              ERC Academy
            </h1>
            <p
              className={`text-[11px] font-mono font-bold ${
                isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'
              }`}
            >
              English Tense Quiz
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentUser && (
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-mono font-bold ${
                isAdmin
                  ? isDarkMode
                    ? 'bg-amber-500/10 border-amber-500/30 text-[#E8A33D]'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                  : isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#9AA5AE]'
                  : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#475569]'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              <span>{currentUser.username}</span>
              <span className="opacity-70 text-[10px] uppercase">({currentUser.role})</span>
            </div>
          )}

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                isDarkMode
                  ? 'bg-[#D9534F]/15 hover:bg-[#D9534F]/25 border-[#D9534F]/40 text-[#D9534F]'
                  : 'bg-[#FEF2F2] hover:bg-[#FEE2E2] border-[#FECACA] text-[#DC2626]'
              }`}
              title="Log out of your account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* ==================================================== */}
      {/* TOP ICON MENU NAVIGATION                              */}
      {/* ==================================================== */}
      <div
        className={`p-2 rounded-2xl border shadow-sm flex items-center justify-between gap-1 ${
          isDarkMode
            ? 'bg-[#182430] border-[#2A3B4A]'
            : 'bg-white border-[#DBEAFE]'
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveTab('players')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-heading font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'players'
              ? isDarkMode
                ? 'bg-[#E8A33D] text-[#101820] shadow-md shadow-amber-500/10'
                : 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
              : isDarkMode
              ? 'text-[#9AA5AE] hover:text-[#E8A33D] hover:bg-[#1F2E3C]'
              : 'text-[#475569] hover:text-[#2563EB] hover:bg-[#F0F5FF]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Players ({players.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tenses')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-heading font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'tenses'
              ? isDarkMode
                ? 'bg-[#E8A33D] text-[#101820] shadow-md shadow-amber-500/10'
                : 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
              : isDarkMode
              ? 'text-[#9AA5AE] hover:text-[#E8A33D] hover:bg-[#1F2E3C]'
              : 'text-[#475569] hover:text-[#2563EB] hover:bg-[#F0F5FF]'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Topic / Tenses</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('setup')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-heading font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'setup'
              ? isDarkMode
                ? 'bg-[#E8A33D] text-[#101820] shadow-md shadow-amber-500/10'
                : 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
              : isDarkMode
              ? 'text-[#9AA5AE] hover:text-[#E8A33D] hover:bg-[#1F2E3C]'
              : 'text-[#475569] hover:text-[#2563EB] hover:bg-[#F0F5FF]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Length & Speed</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-heading font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer relative ${
            activeTab === 'history'
              ? isDarkMode
                ? 'bg-[#E8A33D] text-[#101820] shadow-md shadow-amber-500/10'
                : 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
              : isDarkMode
              ? 'text-[#9AA5AE] hover:text-[#E8A33D] hover:bg-[#1F2E3C]'
              : 'text-[#475569] hover:text-[#2563EB] hover:bg-[#F0F5FF]'
          }`}
        >
          <History className="w-4 h-4" />
          <span>History</span>
          {history.length > 0 && (
            <span
              className={`w-2 h-2 rounded-full ${
                activeTab === 'history'
                  ? 'bg-[#101820]'
                  : isDarkMode
                  ? 'bg-[#E8A33D]'
                  : 'bg-[#2563EB]'
              }`}
            />
          )}
        </button>
      </div>

      {/* ==================================================== */}
      {/* ACTIVE TAB CONTENT VIEW                               */}
      {/* ==================================================== */}

      {/* DOCUMENTATION & SPECS TAB (ADMIN ONLY) */}
      {activeTab === 'docs' && isAdmin && (
        <DocumentationModule isDarkMode={isDarkMode} />
      )}

      {/* USER ACCESS & ADMIN TAB (ADMIN ONLY) */}
      {activeTab === 'users' && isAdmin && (
        <UserAdminModule isDarkMode={isDarkMode} />
      )}

      {/* 1. PLAYERS TAB */}
      {activeTab === 'players' && (
        <div
          className={`p-6 md:p-7 rounded-3xl border shadow-xl space-y-6 animate-fade-in ${
            isDarkMode
              ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
              : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-4 ${
              isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                  isDarkMode
                    ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
                    : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
                }`}
              >
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2
                  className={`text-xl font-black font-heading ${
                    isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                  }`}
                >
                  Who's playing today?
                </h2>
                <p
                  className={`text-xs font-medium ${
                    isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                  }`}
                >
                  Add student names or practice solo
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#4FB8A6]'
                  : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-[#4FB8A6]" />
              <span>{players.length} Active</span>
            </span>
          </div>

          {/* Player Input Form */}
          <div className="space-y-2">
            <form onSubmit={handleAddSubmit} className="flex gap-2">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => {
                  setNewPlayerName(e.target.value);
                  if (duplicateError) setDuplicateError('');
                }}
                maxLength={24}
                placeholder="Enter student or player name..."
                className={`flex-1 px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition-all font-medium ${
                  isDarkMode
                    ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] placeholder-[#9AA5AE] focus:border-[#E8A33D] focus:ring-[#E8A33D]/20'
                    : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#2563EB] focus:ring-[#2563EB]/20'
                }`}
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-2xl font-heading font-extrabold text-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer shadow-md ${
                  isDarkMode
                    ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820] shadow-amber-500/10'
                    : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-500/20'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Player</span>
              </button>
            </form>

            {newPlayerName.trim().length > 0 && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveCurrentInputAsShortcut}
                  className={`text-xs font-mono hover:underline flex items-center gap-1 cursor-pointer font-bold ${
                    isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Save "{newPlayerName.trim()}" as a Quick-Add Shortcut
                </button>
              </div>
            )}
          </div>

          {duplicateError && (
            <p className="text-xs text-[#D9534F] flex items-center gap-1 font-mono font-bold animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#D9534F]" />
              {duplicateError}
            </p>
          )}

          {/* Quick Shortcuts Roster with Delete */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                }`}
              >
                ⚡ Quick-Add Roster Shortcuts:
              </span>
              <button
                type="button"
                onClick={handleResetShortcuts}
                className={`text-xs font-mono hover:underline cursor-pointer ${
                  isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'
                }`}
              >
                Reset default presets
              </button>
            </div>

            {shortcuts.length === 0 ? (
              <p
                className={`text-xs font-mono italic ${
                  isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                }`}
              >
                No shortcuts saved. Type a name and click "Save as Quick-Add Shortcut".
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {shortcuts.map((preset) => {
                  const isAdded = players.some(
                    (p) => p.toLowerCase() === preset.toLowerCase()
                  );
                  return (
                    <div
                      key={preset}
                      className={`inline-flex items-center gap-1 pl-3 pr-1.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                        isAdded
                          ? isDarkMode
                            ? 'bg-[#101820] text-[#9AA5AE] border-[#1F2E3C]'
                            : 'bg-[#F1F5F9] text-[#94A3B8] border-[#E2E8F0]'
                          : isDarkMode
                          ? 'bg-[#1F2E3C] text-[#E8A33D] border-[#2A3B4A] hover:bg-[#2A3B4A]'
                          : 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE] hover:border-[#2563EB] hover:bg-[#DBEAFE]'
                      }`}
                    >
                      <button
                        type="button"
                        disabled={isAdded}
                        onClick={() => handleQuickAddPreset(preset)}
                        className={`flex items-center gap-1 ${
                          isAdded ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        <span>+ {preset}</span>
                        {isAdded && <Check className="w-3.5 h-3.5 text-[#4FB8A6]" />}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteShortcut(preset, e)}
                        title={`Delete shortcut "${preset}"`}
                        className={`p-1 rounded-md transition-colors cursor-pointer ml-1 ${
                          isDarkMode
                            ? 'text-[#9AA5AE] hover:text-[#D9534F] hover:bg-[#D9534F]/20'
                            : 'text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEE2E2]'
                        }`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Player Badges */}
          <div
            className={`space-y-2 pt-2 border-t ${
              isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'
            }`}
          >
            <span
              className={`text-xs font-mono uppercase tracking-wider font-bold block ${
                isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
              }`}
            >
              Active Session Roster ({players.length}):
            </span>

            {players.length === 0 ? (
              <div
                className={`p-6 rounded-2xl border border-dashed text-center space-y-1 ${
                  isDarkMode
                    ? 'bg-[#1F2E3C] border-[#2A3B4A]'
                    : 'bg-[#F8FAFC] border-[#CBD5E1]'
                }`}
              >
                <p
                  className={`font-bold text-sm ${
                    isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                  }`}
                >
                  No players added yet
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                  }`}
                >
                  Add at least one player above to unlock the practice quiz!
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {players.map((name, idx) => {
                  const color = PLAYER_COLORS[idx % PLAYER_COLORS.length];
                  const initial = name.charAt(0).toUpperCase();

                  return (
                    <span
                      key={name}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-sm font-bold shadow-sm transition-all ${
                        isDarkMode
                          ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] hover:border-[#E8A33D]'
                          : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] hover:border-[#2563EB]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black text-white"
                        style={{ backgroundColor: color }}
                      >
                        {initial}
                      </span>
                      <span>{name}</span>
                      <button
                        type="button"
                        onClick={() => onRemovePlayer(name)}
                        title={`Remove ${name}`}
                        className="text-[#9AA5AE] hover:text-[#D9534F] transition-colors p-0.5 rounded-full cursor-pointer ml-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. TENSES TAB */}
      {activeTab === 'tenses' && (
        <div
          className={`p-6 md:p-7 rounded-3xl border shadow-xl space-y-5 animate-fade-in ${
            isDarkMode
              ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
              : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
          }`}
        >
          <div
            className={`flex items-center gap-3 border-b pb-4 ${
              isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
                  : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
              }`}
            >
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-xl font-black font-heading ${
                  isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                }`}
              >
                Practice Topic & Tenses
              </h2>
              <p
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                }`}
              >
                Choose which verb tenses or topics (e.g. Phrasal Verbs) to practice
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {TENSE_CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const isSelected = currentCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectTenseCategory(cat.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-[#1F2E3C] border-[#E8A33D] ring-2 ring-[#E8A33D]/20 shadow-md'
                        : 'bg-[#EFF6FF] border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-md'
                      : isDarkMode
                      ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7] hover:border-[#E8A33D] hover:bg-[#1F2E3C]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#94A3B8] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-xl ${
                          isSelected
                            ? isDarkMode
                              ? 'bg-[#E8A33D] text-[#101820]'
                              : 'bg-[#2563EB] text-white'
                            : isDarkMode
                            ? 'bg-[#1F2E3C] text-[#9AA5AE]'
                            : 'bg-[#E2E8F0] text-[#64748B]'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-sm font-extrabold font-heading ${
                          isSelected
                            ? isDarkMode
                              ? 'text-[#E8A33D]'
                              : 'text-[#1E40AF]'
                            : isDarkMode
                            ? 'text-[#F2EFE7]'
                            : 'text-[#0F172A]'
                        }`}
                      >
                        {cat.title}
                      </span>
                    </div>
                    {isSelected && (
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isDarkMode ? 'bg-[#E8A33D]' : 'bg-[#2563EB]'
                        }`}
                      />
                    )}
                  </div>
                  <p
                    className={`text-xs font-medium leading-relaxed pl-1 ${
                      isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                    }`}
                  >
                    {cat.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. SETUP & SPEED TAB */}
      {activeTab === 'setup' && (
        <div
          className={`p-6 md:p-7 rounded-3xl border shadow-xl space-y-6 animate-fade-in ${
            isDarkMode
              ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
              : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
          }`}
        >
          <div
            className={`flex items-center gap-3 border-b pb-4 ${
              isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
                  : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
              }`}
            >
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-xl font-black font-heading ${
                  isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                }`}
              >
                Length & Timer Settings
              </h2>
              <p
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                }`}
              >
                Customize question count and practice mode speed
              </p>
            </div>
          </div>

          {/* Question Count Grid & Custom Controls */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                className={`block text-xs font-mono font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                }`}
              >
                Preset Question Counts:
              </label>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                  isDarkMode
                    ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
                    : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
                }`}
              >
                Topic Pool ("{selectedCatObj.title}"): {availablePoolSize} Qs
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {QUESTION_COUNTS.map((item) => {
                const isSelected = settings.questionCount === item.count;
                return (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => handleSelectQuestionCount(item.count)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? isDarkMode
                          ? 'bg-[#E8A33D] text-[#101820] border-[#E8A33D] font-bold shadow-md scale-[1.02]'
                          : 'bg-[#2563EB] text-white border-[#2563EB] font-bold shadow-md scale-[1.02]'
                        : isDarkMode
                        ? 'bg-[#1F2E3C] text-[#F2EFE7] border-[#2A3B4A] hover:border-[#E8A33D]'
                        : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:border-[#2563EB]/60'
                    }`}
                  >
                    <div className="text-base font-black font-heading">
                      {item.label}
                    </div>
                    <div
                      className={`text-[11px] font-mono ${
                        isSelected
                          ? isDarkMode ? 'text-[#101820]/80' : 'text-white/80'
                          : isDarkMode
                          ? 'text-[#9AA5AE]'
                          : 'text-[#64748B]'
                      }`}
                    >
                      {item.tag} • {item.duration}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Question Count Box */}
            <div
              className={`p-4 rounded-2xl border space-y-3.5 transition-all ${
                isDarkMode
                  ? 'bg-[#1F2E3C]/80 border-[#2A3B4A]'
                  : 'bg-[#F8FAFC] border-[#E2E8F0]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3
                    className={`text-sm font-black font-heading ${
                      isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                    }`}
                  >
                    Custom Question Count
                  </h3>
                  <p
                    className={`text-xs ${
                      isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                    }`}
                  >
                    Enter any exact question number or practice all questions in this topic pool
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectQuestionCount(availablePoolSize)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
                    settings.questionCount === availablePoolSize
                      ? isDarkMode
                        ? 'bg-[#E8A33D] text-[#101820] border-[#E8A33D]'
                        : 'bg-[#2563EB] text-white border-[#2563EB]'
                      : isDarkMode
                      ? 'bg-[#182430] border-[#2A3B4A] text-[#E8A33D] hover:bg-[#1F2E3C]'
                      : 'bg-white border-[#BFDBFE] text-[#2563EB] hover:bg-[#EFF6FF]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Select All {availablePoolSize} Qs
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="customCountInput"
                    className={`text-xs font-mono font-bold ${
                      isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                    }`}
                  >
                    Custom Qs:
                  </label>
                  <input
                    id="customCountInput"
                    type="number"
                    min="1"
                    max="1000"
                    value={customInputText}
                    onChange={handleCustomInputChange}
                    onBlur={handleCustomInputBlur}
                    className={`w-28 px-3 py-2 rounded-xl border text-sm font-bold font-mono text-center focus:outline-none transition-all ${
                      isDarkMode
                        ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7] focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]'
                        : 'bg-white border-[#CBD5E1] text-[#0F172A] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
                    }`}
                    placeholder="e.g. 100"
                  />
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {[-50, -10, -5, +5, +10, +50, +100].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => handleAdjustCount(step)}
                      className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                        isDarkMode
                          ? 'bg-[#182430] border-[#2A3B4A] text-[#F2EFE7] hover:border-[#E8A33D] hover:bg-[#1F2E3C]'
                          : 'bg-white border-[#CBD5E1] text-[#0F172A] hover:border-[#2563EB] hover:bg-[#EFF6FF]'
                      }`}
                    >
                      {step > 0 ? `+${step}` : step}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`px-3 py-2 rounded-xl text-xs font-medium flex flex-wrap items-center justify-between gap-1 border ${
                  isDarkMode
                    ? 'bg-[#182430] border-[#2A3B4A] text-[#9AA5AE]'
                    : 'bg-white border-[#E2E8F0] text-[#64748B]'
                }`}
              >
                <span>
                  Active selection:{' '}
                  <strong className={isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}>
                    {settings.questionCount} Questions
                  </strong>
                </span>
                {settings.questionCount > availablePoolSize && (
                  <span className="text-[11px] font-mono text-amber-500">
                    💡 Topic pool has {availablePoolSize} unique Qs available; quiz will include all {availablePoolSize} questions.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Practice Speed Mode Toggle */}
          <div className="space-y-3 pt-2">
            <label
              className={`block text-xs font-mono font-bold uppercase tracking-wider ${
                isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
              }`}
            >
              Practice Speed Mode:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTimerToggle(true)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  settings.useTimer
                    ? isDarkMode
                      ? 'bg-[#1F2E3C] border-[#E8A33D] ring-2 ring-[#E8A33D]/20 shadow-sm'
                      : 'bg-[#EFF6FF] border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm'
                    : isDarkMode
                    ? 'bg-[#182430] border-[#2A3B4A] opacity-80 hover:opacity-100'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80 hover:opacity-100'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    settings.useTimer
                      ? isDarkMode
                        ? 'bg-[#E8A33D] text-[#101820]'
                        : 'bg-[#3B82F6] text-white'
                      : isDarkMode
                      ? 'bg-[#1F2E3C] text-[#9AA5AE]'
                      : 'bg-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div
                    className={`text-sm font-bold font-heading ${
                      isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                    }`}
                  >
                    60s Timed Exam
                  </div>
                  <div
                    className={`text-xs ${
                      isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                    }`}
                  >
                    60-second countdown bar per question
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTimerToggle(false)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  !settings.useTimer
                    ? isDarkMode
                      ? 'bg-[#1F2E3C] border-[#4FB8A6] ring-2 ring-[#4FB8A6]/20 shadow-sm'
                      : 'bg-[#EFF6FF] border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm'
                    : isDarkMode
                    ? 'bg-[#182430] border-[#2A3B4A] opacity-80 hover:opacity-100'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80 hover:opacity-100'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    !settings.useTimer
                      ? 'bg-[#4FB8A6] text-[#101820]'
                      : isDarkMode
                      ? 'bg-[#1F2E3C] text-[#9AA5AE]'
                      : 'bg-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div
                    className={`text-sm font-bold font-heading ${
                      isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                    }`}
                  >
                    Untimed Zen Mode
                  </div>
                  <div
                    className={`text-xs ${
                      isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                    }`}
                  >
                    Self-paced practice with no time limit
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. HISTORY TAB */}
      {activeTab === 'history' && (
        <div
          className={`p-6 md:p-7 rounded-3xl border shadow-xl space-y-5 animate-fade-in ${
            isDarkMode
              ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
              : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
          }`}
        >
          <div
            className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
              isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                  isDarkMode
                    ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
                    : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
                }`}
              >
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2
                  className={`text-xl font-black font-heading ${
                    isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                  }`}
                >
                  Practice History
                </h2>
                <p
                  className={`text-xs font-medium ${
                    isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                  }`}
                >
                  {history.length} past practice {history.length === 1 ? 'session' : 'sessions'} recorded
                </p>
              </div>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setShowConfirmClear((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'border-[#2A3B4A] bg-[#1F2E3C] text-[#9AA5AE] hover:text-[#D9534F] hover:border-[#D9534F]/50 hover:bg-[#D9534F]/15'
                    : 'border-[#CBD5E1] bg-[#F8FAFC] text-[#64748B] hover:text-[#DC2626] hover:border-[#FCA5A5] hover:bg-[#FEF2F2]'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear history</span>
              </button>
            )}
          </div>

          {/* History Search Bar */}
          {history.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 text-[#9AA5AE] absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search history by player name or date..."
                className={`w-full pl-9 pr-4 py-2.5 rounded-2xl text-xs font-mono focus:outline-none transition-all border ${
                  isDarkMode
                    ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] placeholder-[#9AA5AE] focus:border-[#E8A33D]'
                    : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#2563EB]'
                }`}
              />
            </div>
          )}

          {/* Confirm Clear Prompt */}
          {showConfirmClear && (
            <div
              className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs font-mono animate-fade-in ${
                isDarkMode
                  ? 'bg-[#D9534F]/20 border-[#D9534F]/50 text-[#D9534F]'
                  : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
              }`}
            >
              <span className="font-bold">
                Clear all {history.length} history records permanently?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExecuteClearHistory}
                  className="px-3.5 py-1.5 rounded-xl bg-[#D9534F] text-white font-bold hover:bg-[#c4413d] transition-all cursor-pointer"
                >
                  Yes, Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmClear(false)}
                  className={`px-3.5 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7]'
                      : 'bg-white border-[#CBD5E1] text-[#64748B]'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {history.length === 0 ? (
            <div
              className={`p-8 text-center text-xs italic font-mono space-y-1 ${
                isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
              }`}
            >
              <p
                className={`font-bold ${
                  isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                }`}
              >
                No practice history recorded yet
              </p>
              <p>Completed quizzes will automatically save score reports here.</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <p
              className={`text-xs italic py-4 text-center font-mono ${
                isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
              }`}
            >
              No practice sessions match your search filter.
            </p>
          ) : (
            <div className="space-y-3 pt-1">
              {filteredHistory.map((session) => {
                const isExpanded = expandedSessionId === session.id;
                const dateStr = new Date(session.date).toLocaleDateString(
                  undefined,
                  {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                );

                let totalCorrect = 0;
                let totalAnswered = 0;
                session.players.forEach((p) => {
                  totalCorrect += p.correct;
                  totalAnswered += p.correct + p.wrong;
                });
                const overallPct =
                  totalAnswered > 0
                    ? Math.round((totalCorrect / totalAnswered) * 100)
                    : 0;

                return (
                  <div
                    key={session.id}
                    className={`rounded-2xl border overflow-hidden transition-all ${
                      isDarkMode
                        ? 'bg-[#1F2E3C] border-[#2A3B4A] hover:border-[#E8A33D]'
                        : 'bg-[#F8FAFC] border-[#CBD5E1] hover:border-[#2563EB]'
                    }`}
                  >
                    <div
                      onClick={() =>
                        setExpandedSessionId(isExpanded ? null : session.id)
                      }
                      className={`p-4 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isDarkMode
                          ? 'hover:bg-[#182430]/80'
                          : 'hover:bg-[#EFF6FF]/60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div
                          className={`text-xs font-mono font-bold ${
                            isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
                          }`}
                        >
                          {dateStr}
                        </div>
                        <div
                          className={`flex flex-wrap items-center gap-1.5 text-xs font-mono ${
                            isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                          }`}
                        >
                          {session.players.map((p) => (
                            <span
                              key={p.name}
                              className={`px-2.5 py-0.5 rounded-lg border ${
                                isDarkMode
                                  ? 'bg-[#101820] border-[#2A3B4A] text-[#F2EFE7]'
                                  : 'bg-white border-[#E2E8F0] text-[#0F172A]'
                              }`}
                            >
                              <strong
                                className={
                                  isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'
                                }
                              >
                                {p.name}
                              </strong>
                              :{' '}
                              <span className="text-[#4FB8A6] font-bold">
                                {p.correct}
                              </span>
                              /<span>{p.correct + p.wrong}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2.5 py-1 rounded-xl border font-mono text-xs font-black ${
                            isDarkMode
                              ? 'bg-[#4FB8A6]/20 border-[#4FB8A6]/50 text-[#4FB8A6]'
                              : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'
                          }`}
                        >
                          {overallPct}% Accuracy
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            generateQuizPDF(session);
                          }}
                          title="Download PDF Report"
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isDarkMode
                              ? 'bg-[#101820] hover:bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
                              : 'bg-white hover:bg-[#EFF6FF] border-[#CBD5E1] text-[#2563EB]'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          className={`p-1 ${
                            isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                          }`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Drawer Details */}
                    {isExpanded && (
                      <div
                        className={`p-4 border-t text-xs font-mono space-y-3 animate-fade-in ${
                          isDarkMode
                            ? 'border-[#2A3B4A] bg-[#101820] text-[#F2EFE7]'
                            : 'border-[#E2E8F0] bg-white text-[#0F172A]'
                        }`}
                      >
                        <div
                          className={`flex items-center justify-between ${
                            isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
                          }`}
                        >
                          <span>Questions Answered: {session.totalQuestions}</span>
                          <span>Elapsed Time: {session.elapsedSeconds}s</span>
                        </div>
                        {session.missedQuestions.length > 0 ? (
                          <div className="text-[11px] text-[#D9534F] font-bold">
                            ⚠️ {session.missedQuestions.length} missed {session.missedQuestions.length === 1 ? 'question' : 'questions'} recorded in PDF report.
                          </div>
                        ) : (
                          <div className="text-[11px] text-[#4FB8A6] font-bold">
                            🌟 Perfect session with zero missed questions!
                          </div>
                        )}

                        {onDeleteSession && (
                          <div
                            className={`pt-2 border-t flex justify-end ${
                              isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteSession(session.id);
                              }}
                              className={`px-3.5 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                                isDarkMode
                                  ? 'bg-[#D9534F]/20 hover:bg-[#D9534F]/30 border-[#D9534F]/50 text-[#D9534F]'
                                  : 'bg-[#FEF2F2] hover:bg-[#FEE2E2] border-[#FECACA] text-[#DC2626]'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete session record</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* PERSISTENT START QUIZ & CONFIG HUD BAR               */}
      {/* ==================================================== */}
      <div
        className={`p-5 rounded-3xl border shadow-xl space-y-3 ${
          isDarkMode
            ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
            : 'bg-white border-[#DBEAFE] shadow-blue-900/10'
        }`}
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b pb-2.5 ${
            isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span
              className={`font-bold ${
                isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
              }`}
            >
              Roster:
            </span>
            <span
              className={`font-black ${
                isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'
              }`}
            >
              {players.length > 0 ? `${players.length} Player(s) (${players.join(', ')})` : 'No players added'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div>
              Topic:{' '}
              <strong
                className={isDarkMode ? 'text-[#E8A33D]' : 'text-[#1E40AF]'}
              >
                {selectedCatObj.title}
              </strong>
            </div>
            <div>
              Set:{' '}
              <strong
                className={isDarkMode ? 'text-[#E8A33D]' : 'text-[#1E40AF]'}
              >
                {settings.questionCount} Qs
              </strong>
            </div>
            <div>
              Mode:{' '}
              <strong
                className={isDarkMode ? 'text-[#E8A33D]' : 'text-[#1E40AF]'}
              >
                {settings.useTimer ? '60s Timed' : 'Untimed'}
              </strong>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={players.length === 0}
          onClick={onStartQuiz}
          className={`w-full py-4 px-6 rounded-2xl font-heading font-black text-base md:text-lg tracking-wide transition-all shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed group ${
            isDarkMode
              ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820] disabled:bg-[#1F2E3C] disabled:text-[#9AA5AE] shadow-amber-500/10'
              : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] shadow-blue-500/25'
          }`}
        >
          <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
          <span>Start Practice Quiz</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

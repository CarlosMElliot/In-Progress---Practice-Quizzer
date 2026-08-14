import { useState, useEffect } from 'react';
import { ScreenState, QuizSettings, QuizSession, AnswerRecord, PlayerScore, MissedQuestion, QuizQuestion, UserAccount } from './types';
import { safeGet, safeSet, PLAYERS_STORAGE_KEY, HISTORY_STORAGE_KEY, THEME_STORAGE_KEY, CURRENT_USER_STORAGE_KEY } from './utils/storage';
import { prepareQuizQuestions } from './data/questions';
import { LoginScreen } from './components/LoginScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('login');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [history, setHistory] = useState<QuizSession[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [settings, setSettings] = useState<QuizSettings>({
    questionCount: 60,
    useTimer: true,
  });

  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(null);

  // Initial Load from Storage
  useEffect(() => {
    async function loadStoredData() {
      const storedUser = await safeGet<UserAccount | null>(CURRENT_USER_STORAGE_KEY, null);
      if (storedUser) {
        setCurrentUser(storedUser);
      }

      const storedPlayers = await safeGet<string[]>(PLAYERS_STORAGE_KEY, ['Alex', 'Sam']);
      setPlayers(storedPlayers);

      const storedHistory = await safeGet<QuizSession[]>(HISTORY_STORAGE_KEY, []);
      setHistory(storedHistory);

      const storedTheme = await safeGet<string>(THEME_STORAGE_KEY, 'light');
      const isDark = storedTheme === 'dark';
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    loadStoredData();
  }, []);

  const handleToggleTheme = async () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    await safeSet(THEME_STORAGE_KEY, nextTheme ? 'dark' : 'light');
  };

  const handleLoginSuccess = async (user: UserAccount) => {
    setCurrentUser(user);
    await safeSet(CURRENT_USER_STORAGE_KEY, user);
    setScreen('home');
  };

  const handleLogout = async () => {
    setCurrentUser(null);
    await safeSet(CURRENT_USER_STORAGE_KEY, null);
    setScreen('login');
  };

  // Player List Management
  const handleAddPlayer = async (name: string) => {
    const updated = [...players, name];
    setPlayers(updated);
    await safeSet(PLAYERS_STORAGE_KEY, updated);
  };

  const handleRemovePlayer = async (name: string) => {
    const updated = players.filter((p) => p !== name);
    setPlayers(updated);
    await safeSet(PLAYERS_STORAGE_KEY, updated);
  };

  // Settings Management
  const handleUpdateSettings = (newSettings: QuizSettings) => {
    setSettings(newSettings);
  };

  // Start Quiz
  const handleStartQuiz = () => {
    const { shuffledQuestions } = prepareQuizQuestions(
      settings.questionCount,
      settings.tenseCategory || 'all'
    );
    const preparedQuizQuestions: QuizQuestion[] = shuffledQuestions.map((sq) => ({
      ...sq.question,
      shuffledOpts: sq.shuffledOpts,
      correctOptText: sq.correctText,
    }));

    setCurrentQuestions(preparedQuizQuestions);
    setScreen('quiz');
  };

  // Escape hatch mid-quiz
  const handleReturnHome = () => {
    setScreen('home');
  };

  // Finish Quiz Execution
  const handleFinishQuiz = async (records: AnswerRecord[], elapsedSeconds: number) => {
    // Map per-player scores
    const playerScoresMap: Record<string, { correct: number; wrong: number }> = {};

    players.forEach((p) => {
      playerScoresMap[p] = { correct: 0, wrong: 0 };
    });

    const missedQuestions: MissedQuestion[] = [];

    records.forEach((r) => {
      if (!playerScoresMap[r.playerName]) {
        playerScoresMap[r.playerName] = { correct: 0, wrong: 0 };
      }

      if (r.isCorrect) {
        playerScoresMap[r.playerName].correct += 1;
      } else {
        playerScoresMap[r.playerName].wrong += 1;

        missedQuestions.push({
          questionText: r.questionText,
          playerName: r.playerName,
          chosenAnswer: r.chosenAnswer,
          correctAnswer: r.correctAnswer,
          note: r.note,
          tag: r.tag,
        });
      }
    });

    const playerScoresList: PlayerScore[] = Object.entries(playerScoresMap).map(
      ([name, score]) => ({
        name,
        correct: score.correct,
        wrong: score.wrong,
      })
    );

    const session: QuizSession = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
      elapsedSeconds,
      totalQuestions: currentQuestions.length,
      players: playerScoresList,
      missedQuestions,
    };

    setCurrentSession(session);

    // Update history, keeping max 10 recent sessions
    const updatedHistory = [session, ...history].slice(0, 10);
    setHistory(updatedHistory);
    await safeSet(HISTORY_STORAGE_KEY, updatedHistory);

    setScreen('results');
  };

  // Clear All History
  const handleClearHistory = async () => {
    setHistory([]);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // fallback ignore
    }
    await safeSet(HISTORY_STORAGE_KEY, []);
  };

  // Delete Individual History Session
  const handleDeleteSession = async (sessionId: string) => {
    const updated = history.filter((s) => s.id !== sessionId);
    setHistory(updated);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // fallback ignore
    }
    await safeSet(HISTORY_STORAGE_KEY, updated);
  };

  // Restart Quiz Immediately
  const handlePlayAgain = () => {
    handleStartQuiz();
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 px-3 py-2 sm:py-3.5 flex flex-col items-center ${
        screen === 'login' || screen === 'quiz' ? 'justify-center' : 'justify-start'
      } selection:bg-[#E8A33D] selection:text-[#101820] relative ${
        isDarkMode
          ? 'bg-[#101820] text-[#F2EFE7]'
          : 'bg-[#F0F5FF] text-[#0F172A]'
      }`}
    >
      <div className={`w-full max-w-2xl flex flex-col space-y-2 sm:space-y-3 mx-auto ${
        screen === 'login' || screen === 'quiz' ? 'my-auto' : ''
      }`}>
        {screen !== 'quiz' && screen !== 'home' && (
          <div className="w-full flex justify-end items-center">
            <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
          </div>
        )}

        {screen === 'login' && (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {screen === 'home' && (
          <HomeDashboard
            players={players}
            currentUser={currentUser}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onStartQuiz={handleStartQuiz}
            history={history}
            onClearHistory={handleClearHistory}
            onDeleteSession={handleDeleteSession}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            questions={currentQuestions}
            players={players}
            useTimer={settings.useTimer}
            onReturnHome={handleReturnHome}
            onFinishQuiz={handleFinishQuiz}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {screen === 'results' && currentSession && (
          <ResultsScreen
            currentSession={currentSession}
            history={history}
            onPlayAgain={handlePlayAgain}
            onReturnHome={() => setScreen('home')}
            onSwitchNames={() => setScreen('home')}
            onClearHistory={handleClearHistory}
            onDeleteSession={handleDeleteSession}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />
        )}
      </div>
    </main>
  );
}

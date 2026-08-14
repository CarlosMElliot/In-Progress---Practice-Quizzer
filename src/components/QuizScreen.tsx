import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Clock, Sparkles, Pause, Play, Square, Home, AlertCircle } from 'lucide-react';
import { QuizQuestion, AnswerRecord } from '../types';
import { TimelineBar } from './TimelineBar';
import { ThemeToggle } from './ThemeToggle';

interface QuizScreenProps {
  questions: QuizQuestion[];
  players: string[];
  useTimer: boolean;
  onReturnHome: () => void;
  onFinishQuiz: (records: AnswerRecord[], elapsedSeconds: number) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  players,
  useTimer,
  onReturnHome,
  onFinishQuiz,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showStopConfirm, setShowStopConfirm] = useState(false);

  // Stats
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  // Timer state
  const [secondsLeft, setSecondsLeft] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Total session timer
  const startTimeRef = useRef<number>(Date.now());

  // Current question & randomly selected player on the spot
  const currentQuestionObj = questions[currentIndex];
  
  // Pick a random player on the spot when current question index changes
  const [currentPlayer, setCurrentPlayer] = useState<string>('');

  useEffect(() => {
    const randomP = players[Math.floor(Math.random() * players.length)];
    setCurrentPlayer(randomP || players[0] || 'Player');
  }, [currentIndex, players]);

  // Handle countdown timer logic
  useEffect(() => {
    if (!useTimer || isAnswered || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setSecondsLeft(60);
    setIsTimeOut(false);

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered, isPaused, useTimer]);

  const handleTimeOut = () => {
    setIsTimeOut(true);
    setIsAnswered(true);
    setSelectedOption(null);
    setWrongCount((prev) => prev + 1);

    const record: AnswerRecord = {
      questionId: currentQuestionObj.id,
      questionText: currentQuestionObj.text,
      playerName: currentPlayer,
      chosenAnswer: '(No Answer - Time Out)',
      correctAnswer: currentQuestionObj.correctOptText,
      isCorrect: false,
      note: currentQuestionObj.note,
      tag: currentQuestionObj.tag,
    };

    setAnswerRecords((prev) => [...prev, record]);
  };

  const handleSelectOption = (optText: string) => {
    if (isAnswered || isPaused) return;

    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(optText);
    setIsAnswered(true);

    const isCorrect = optText === currentQuestionObj.correctOptText;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    const record: AnswerRecord = {
      questionId: currentQuestionObj.id,
      questionText: currentQuestionObj.text,
      playerName: currentPlayer,
      chosenAnswer: optText,
      correctAnswer: currentQuestionObj.correctOptText,
      isCorrect,
      note: currentQuestionObj.note,
      tag: currentQuestionObj.tag,
    };

    setAnswerRecords((prev) => [...prev, record]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setIsTimeOut(false);
      setIsPaused(false);
    } else {
      const totalElapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      onFinishQuiz(answerRecords, totalElapsed);
    }
  };

  const handleExecuteStopActivity = () => {
    const totalElapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    onFinishQuiz(answerRecords, totalElapsed);
  };

  // Timeline Progress Calculations
  const questionProgress = ((currentIndex + 1) / questions.length) * 100;
  const timerProgress = (secondsLeft / 60) * 100;

  // Render sentence with styled blank ____
  const renderSentenceWithBlank = (sentenceText: string) => {
    const parts = sentenceText.split('____');
    if (parts.length < 2) {
      return (
        <p className={`text-base sm:text-lg font-bold leading-relaxed ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
          {sentenceText}
        </p>
      );
    }

    let fillText = '____';
    if (isAnswered) {
      if (selectedOption) {
        fillText = selectedOption;
      } else {
        fillText = currentQuestionObj.correctOptText;
      }
    }

    return (
      <p className={`text-base sm:text-lg font-bold leading-relaxed ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
        {parts[0]}
        <span
          className={`inline-block mx-1 px-2.5 py-0.5 rounded-lg border font-mono font-bold transition-all ${
            !isAnswered
              ? isDarkMode
                ? 'bg-[#1F2E3C] border-[#E8A33D] text-[#E8A33D] animate-pulse'
                : 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] animate-pulse'
              : selectedOption === currentQuestionObj.correctOptText
              ? isDarkMode
                ? 'bg-[#4FB8A6]/20 border-[#4FB8A6] text-[#4FB8A6]'
                : 'bg-[#ECFDF5] border-[#10B981] text-[#059669]'
              : isDarkMode
              ? 'bg-[#D9534F]/20 border-[#D9534F] text-[#D9534F]'
              : 'bg-[#FEF2F2] border-[#DC2626] text-[#DC2626]'
          }`}
        >
          {fillText}
        </span>
        {parts[1]}
      </p>
    );
  };

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-2.5 sm:space-y-3 transition-colors duration-300 animate-fade-in ${
      isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
    }`}>
      {/* Top Bar: On-The-Spot Player & Controls */}
      <div className={`flex flex-wrap items-center justify-between gap-2 p-2.5 px-3.5 rounded-2xl border shadow-md ${
        isDarkMode
          ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
          : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
      }`}>
        {/* On the spot Player */}
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className={`text-[11px] font-mono uppercase tracking-wider shrink-0 font-bold ${
            isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'
          }`}>
            On the spot:
          </span>
          <span className={`px-2.5 py-0.5 rounded-full border text-xs font-black font-heading truncate ${
            isDarkMode
              ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
              : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
          }`}>
            {currentPlayer}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? "Resume activity" : "Pause activity"}
            className={`px-3 py-1 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
              isPaused
                ? isDarkMode
                  ? 'bg-[#E8A33D] text-[#101820] border-[#E8A33D] shadow-md animate-pulse'
                  : 'bg-[#2563EB] text-white border-[#2563EB] shadow-md animate-pulse'
                : isDarkMode
                ? 'bg-[#1F2E3C] hover:bg-[#2A3B4A] border-[#2A3B4A] text-[#E8A33D]'
                : 'bg-[#F8FAFC] hover:bg-[#EFF6FF] border-[#CBD5E1] text-[#2563EB]'
            }`}
          >
            {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowStopConfirm((prev) => !prev)}
            title="Stop activity and view results"
            className={`px-2.5 py-1 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-[#D9534F]/15 hover:bg-[#D9534F]/25 border-[#D9534F]/40 text-[#D9534F]'
                : 'bg-[#FEF2F2] hover:bg-[#FEE2E2] border-[#FECACA] text-[#DC2626]'
            }`}
          >
            <Square className="w-3 h-3 fill-current" />
            <span>Stop</span>
          </button>

          <button
            type="button"
            onClick={onReturnHome}
            title="Return to Home screen"
            className={`px-2.5 py-1 rounded-xl border text-xs font-mono transition-all flex items-center gap-1 cursor-pointer ${
              isDarkMode
                ? 'bg-[#1F2E3C] hover:bg-[#2A3B4A] border-[#2A3B4A] text-[#9AA5AE] hover:text-[#F2EFE7]'
                : 'bg-[#F8FAFC] hover:bg-[#EFF6FF] border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Home className="w-3 h-3" />
            <span>Home</span>
          </button>

          {onToggleTheme && (
            <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
          )}
        </div>
      </div>

      {/* Stop Activity Inline Confirmation Bar */}
      {showStopConfirm && (
        <div className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-2 text-xs font-mono animate-fade-in shadow-md ${
          isDarkMode
            ? 'bg-[#D9534F]/20 border-[#D9534F]/50 text-[#D9534F]'
            : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
        }`}>
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-3.5 h-3.5 text-[#D9534F] shrink-0" />
            <span>Stop activity now and see progress results so far?</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExecuteStopActivity}
              className="px-3 py-1 rounded-xl bg-[#D9534F] text-white font-bold hover:bg-[#c4413d] transition-all cursor-pointer"
            >
              Yes, Stop Activity
            </button>
            <button
              type="button"
              onClick={() => setShowStopConfirm(false)}
              className={`px-3 py-1 rounded-xl border font-bold transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7]'
                  : 'bg-white border-[#CBD5E1] text-[#64748B]'
              }`}
            >
              Resume Quiz
            </button>
          </div>
        </div>
      )}

      {/* Progress & Live HUD Metrics Bar */}
      <div className={`p-3 px-3.5 rounded-2xl border shadow-md space-y-2 ${
        isDarkMode
          ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
          : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
      }`}>
        {/* Stats Header */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className={`flex items-center gap-1.5 font-bold ${
            isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[#4FB8A6] font-extrabold">✓ {correctCount}</span>
            <span className="text-[#D9534F] font-extrabold">✗ {wrongCount}</span>
          </div>
        </div>

        {/* Timeline Progress Bar */}
        <TimelineBar progress={questionProgress} variant="royal" height={5} />

        {/* Countdown Timer Bar */}
        {useTimer && (
          <div className={`pt-1.5 border-t space-y-1 ${isDarkMode ? 'border-[#2A3B4A]' : 'border-[#E2E8F0]'}`}>
            <div className={`flex items-center justify-between text-[11px] font-mono ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
              <span className="flex items-center gap-1 text-[#E8A33D] font-bold">
                <Clock className="w-3 h-3" />
                Timer {isPaused && '(PAUSED)'}
              </span>
              <span
                className={`font-bold ${
                  secondsLeft <= 10 ? 'text-[#D9534F] animate-pulse' : 'text-[#E8A33D]'
                }`}
              >
                {secondsLeft}s
              </span>
            </div>
            <TimelineBar progress={timerProgress} variant="amber" height={5} />
          </div>
        )}
      </div>

      {/* Question Card */}
      <div className={`p-4 sm:p-5 rounded-2xl border shadow-lg space-y-3.5 relative overflow-hidden ${
        isDarkMode
          ? 'bg-[#182430] border-[#2A3B4A] shadow-black/50'
          : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
      }`}>
        {isPaused ? (
          <div className="py-6 text-center space-y-3 animate-fade-in">
            <div className={`w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center ${
              isDarkMode
                ? 'bg-[#1F2E3C] border-[#E8A33D] text-[#E8A33D]'
                : 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]'
            }`}>
              <Pause className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h2 className={`text-xl font-bold font-heading ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>Activity Paused</h2>
              <p className={`text-xs ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>Timer and question choices are on hold. Resume whenever you're ready.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsPaused(false)}
              className={`px-5 py-2.5 rounded-xl font-heading font-extrabold text-xs tracking-wide transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1.5 ${
                isDarkMode
                  ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820]'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Activity</span>
            </button>
          </div>
        ) : (
          <>
            {/* Sentence Text with Blank */}
            <div className="min-h-[42px] flex items-center">
              {renderSentenceWithBlank(currentQuestionObj.text)}
            </div>

            {/* 4 Multiple Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQuestionObj.shuffledOpts.map((optText, optIdx) => {
                const isSelected = selectedOption === optText;
                const isCorrectOpt = optText === currentQuestionObj.correctOptText;

                let btnStyle = isDarkMode
                  ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7] hover:border-[#E8A33D] hover:bg-[#2A3B4A]'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] hover:border-[#2563EB] hover:bg-[#EFF6FF]';

                if (isAnswered) {
                  if (isCorrectOpt) {
                    btnStyle = isDarkMode
                      ? 'bg-[#4FB8A6]/20 border-[#4FB8A6] text-[#4FB8A6] font-medium shadow-sm'
                      : 'bg-[#ECFDF5] border-[#10B981] text-[#059669] font-medium shadow-sm';
                  } else if (isSelected && !isCorrectOpt) {
                    btnStyle = isDarkMode
                      ? 'bg-[#D9534F]/20 border-[#D9534F] text-[#D9534F] font-medium'
                      : 'bg-[#FEF2F2] border-[#DC2626] text-[#DC2626] font-medium';
                  } else {
                    btnStyle = isDarkMode
                      ? 'bg-[#101820] border-[#1F2E3C] text-[#9AA5AE] opacity-50'
                      : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#94A3B8] opacity-60';
                  }
                }

                return (
                  <button
                    key={`${optIdx}-${optText}`}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(optText)}
                    className={`p-3 rounded-xl border-2 text-left text-xs sm:text-sm font-normal transition-all flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span>{optText}</span>
                    {isAnswered && isCorrectOpt && (
                      <CheckCircle2 className="w-4 h-4 text-[#4FB8A6] shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrectOpt && (
                      <XCircle className="w-4 h-4 text-[#D9534F] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Post-Answer Feedback Note Box */}
            {isAnswered && (
              <div
                className={`p-3 rounded-xl border-2 text-xs space-y-1 animate-fade-in ${
                  selectedOption === currentQuestionObj.correctOptText
                    ? isDarkMode
                      ? 'bg-[#4FB8A6]/15 border-[#4FB8A6]/50 text-[#4FB8A6]'
                      : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
                    : isDarkMode
                    ? 'bg-[#D9534F]/15 border-[#D9534F]/50 text-[#D9534F]'
                    : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-black font-heading text-xs sm:text-sm">
                  {selectedOption === currentQuestionObj.correctOptText ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4FB8A6]" />
                      <span className={isDarkMode ? 'text-[#4FB8A6]' : 'text-[#059669]'}>Correct! Spot on, {currentPlayer}.</span>
                    </>
                  ) : isTimeOut ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-[#D9534F]" />
                      <span className="text-[#D9534F]">Time's up! {currentPlayer} didn't answer in time.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-[#D9534F]" />
                      <span className="text-[#D9534F]">Incorrect. Hard luck, {currentPlayer}.</span>
                    </>
                  )}
                </div>

                <p className={`font-body leading-relaxed pt-0.5 text-[11px] sm:text-xs ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#334155]'}`}>
                  <strong className={`font-mono ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#1E40AF]'}`}>Grammar Note:</strong>{' '}
                  {currentQuestionObj.note}
                </p>
              </div>
            )}

            {/* Next Question Button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                disabled={!isAnswered}
                onClick={handleNextQuestion}
                className={`px-5 py-2.5 rounded-xl font-heading font-black text-xs sm:text-sm tracking-wide transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer disabled:cursor-not-allowed ${
                  isDarkMode
                    ? 'bg-[#E8A33D] hover:bg-[#D69332] disabled:bg-[#1F2E3C] disabled:text-[#9AA5AE] text-[#101820] shadow-amber-500/10'
                    : 'bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] text-white shadow-blue-500/20'
                }`}
              >
                <span>{currentIndex + 1 === questions.length ? 'See Final Results' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Trophy, RefreshCw, Eye, Download, CheckCircle2, XCircle, ChevronDown, ChevronUp, History, Trash2, LogOut, Home } from 'lucide-react';
import { QuizSession } from '../types';
import { generateQuizPDF } from '../utils/pdf';
import { ThemeToggle } from './ThemeToggle';

interface ResultsScreenProps {
  currentSession: QuizSession;
  history: QuizSession[];
  onPlayAgain: () => void;
  onSwitchNames: () => void;
  onReturnHome?: () => void;
  onClearHistory?: () => void;
  onDeleteSession?: (sessionId: string) => void;
  onLogout?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  currentSession,
  history,
  onPlayAgain,
  onSwitchNames,
  onReturnHome,
  onClearHistory,
  onDeleteSession,
  onLogout,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const [showReview, setShowReview] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const totalCorrect = currentSession.players.reduce((sum, p) => sum + p.correct, 0);
  const totalWrong = currentSession.players.reduce((sum, p) => sum + p.wrong, 0);
  const totalQuestions = currentSession.totalQuestions;

  const mins = Math.floor(currentSession.elapsedSeconds / 60);
  const secs = currentSession.elapsedSeconds % 60;
  const timeFormatted = `${mins}m ${secs.toString().padStart(2, '0')}s`;

  // Sorted leaderboard descending
  const sortedPlayers = [...currentSession.players].sort((a, b) => b.correct - a.correct);

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-4 transition-colors duration-300 animate-fade-in pb-4 ${
      isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'
    }`}>
      {/* Big Score Card */}
      <div className={`p-8 rounded-3xl border shadow-xl text-center space-y-4 relative overflow-hidden ${
        isDarkMode
          ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
          : 'bg-white border-[#DBEAFE] shadow-blue-900/10'
      }`}>
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
          isDarkMode
            ? 'bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
            : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
        }`}>
          <Trophy className={`w-4 h-4 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
          Quiz Completed
        </div>

        {/* Big Score Number */}
        <div className="py-2">
          <div className={`text-5xl md:text-6xl font-black font-heading ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
            <span className={isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}>{totalCorrect}</span>
            <span className="text-[#9AA5AE] mx-1">/</span>
            <span>{totalQuestions}</span>
          </div>
          <p className={`text-xs font-mono mt-2 font-bold ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
            Total Correct Answers Across All Players
          </p>
        </div>

        {/* Subtext stats pill row */}
        <div className={`flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-mono ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
          <span className={`px-3.5 py-1.5 rounded-full border ${isDarkMode ? 'bg-[#1F2E3C] border-[#2A3B4A]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            Players: <strong className={isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}>{currentSession.players.length}</strong>
          </span>
          <span className={`px-3.5 py-1.5 rounded-full border ${isDarkMode ? 'bg-[#1F2E3C] border-[#2A3B4A]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            Total Missed: <strong className="text-[#D9534F]">{totalWrong}</strong>
          </span>
          <span className={`px-3.5 py-1.5 rounded-full border ${isDarkMode ? 'bg-[#1F2E3C] border-[#2A3B4A]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            Elapsed Time: <strong className={isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}>{timeFormatted}</strong>
          </span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className={`p-6 md:p-7 rounded-3xl border shadow-xl space-y-4 ${
        isDarkMode
          ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
          : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
      }`}>
        <h2 className={`text-lg font-bold font-heading flex items-center gap-2 ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
          <Trophy className={`w-5 h-5 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
          Leaderboard
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className={`border-b uppercase tracking-wider font-bold ${isDarkMode ? 'border-[#2A3B4A] text-[#9AA5AE]' : 'border-[#E2E8F0] text-[#64748B]'}`}>
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Player</th>
                <th className="py-2.5 px-3">Correct / Total</th>
                <th className="py-2.5 px-3 text-right">Wrong</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-[#2A3B4A]' : 'divide-[#E2E8F0]'}`}>
              {sortedPlayers.map((player, idx) => {
                const playerTotal = player.correct + player.wrong;
                const accuracy = playerTotal > 0 ? Math.round((player.correct / playerTotal) * 100) : 0;

                return (
                  <tr key={player.name} className={`transition-colors ${isDarkMode ? 'hover:bg-[#1F2E3C]/60' : 'hover:bg-[#EFF6FF]/50'}`}>
                    <td className={`py-3 px-3 font-extrabold ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`}>
                      #{idx + 1}
                    </td>
                    <td className={`py-3 px-3 font-bold ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
                      {player.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-bold ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`}>{player.correct}</span> / {playerTotal}{' '}
                      <span className={`text-[10px] ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>({accuracy}%)</span>
                    </td>
                    <td className="py-3 px-3 text-right text-[#D9534F] font-bold">
                      {player.wrong}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Button Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Play Again */}
        <button
          type="button"
          onClick={onPlayAgain}
          className={`py-3.5 px-4 rounded-2xl font-heading font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer ${
            isDarkMode
              ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820] shadow-amber-500/10'
              : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-500/20'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play again</span>
        </button>

        {/* Review Errors */}
        <button
          type="button"
          onClick={() => setShowReview((prev) => !prev)}
          className={`py-3.5 px-4 rounded-2xl border font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
            isDarkMode
              ? 'bg-[#182430] hover:bg-[#1F2E3C] border-[#2A3B4A] text-[#F2EFE7]'
              : 'bg-white hover:bg-[#EFF6FF] border-[#CBD5E1] text-[#0F172A]'
          }`}
        >
          <Eye className={`w-4 h-4 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
          <span>Review errors</span>
          {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Download PDF */}
        <button
          type="button"
          onClick={() => generateQuizPDF(currentSession)}
          className={`py-3.5 px-4 rounded-2xl font-heading font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer ${
            isDarkMode
              ? 'bg-[#E8A33D] hover:bg-[#D69332] text-[#101820] shadow-amber-500/10'
              : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-500/20'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Return Home & Log Out Secondary Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onReturnHome || onSwitchNames}
          className={`flex-1 py-3.5 px-4 rounded-2xl border font-heading font-extrabold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-xs ${
            isDarkMode
              ? 'bg-[#182430] hover:bg-[#1F2E3C] border-[#2A3B4A] text-[#E8A33D]'
              : 'bg-white hover:bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
          }`}
        >
          <Home className={`w-4 h-4 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
          <span>Return Home</span>
        </button>

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className={`py-3.5 px-5 rounded-2xl border font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${
              isDarkMode
                ? 'bg-[#D9534F]/15 hover:bg-[#D9534F]/25 border-[#D9534F]/40 text-[#D9534F]'
                : 'bg-[#FEF2F2] hover:bg-[#FEE2E2] border-[#FECACA] text-[#DC2626]'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        )}
      </div>

      {/* Review Errors Panel */}
      {showReview && (
        <div className={`p-6 rounded-3xl border shadow-xl space-y-4 animate-fade-in ${
          isDarkMode
            ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
            : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
        }`}>
          <h2 className={`text-lg font-bold font-heading flex items-center gap-2 ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
            <XCircle className="w-5 h-5 text-[#D9534F]" />
            Missed Questions Review ({currentSession.missedQuestions.length})
          </h2>

          {currentSession.missedQuestions.length === 0 ? (
            <div className={`p-4 rounded-2xl border text-sm flex items-center gap-3 font-bold ${
              isDarkMode
                ? 'bg-[#4FB8A6]/20 border-[#4FB8A6]/50 text-[#4FB8A6]'
                : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'
            }`}>
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Congratulations! Zero mistakes recorded on this quiz run!</span>
            </div>
          ) : (
            <div className="space-y-4">
              {currentSession.missedQuestions.map((mq, idx) => (
                <div
                  key={`${idx}-${mq.questionText}`}
                  className={`p-4 rounded-2xl border space-y-2.5 text-xs ${
                    isDarkMode
                      ? 'bg-[#1F2E3C] border-[#2A3B4A]'
                      : 'bg-[#F8FAFC] border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-bold text-sm ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
                      <strong className={`font-mono ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`}>Q{idx + 1}:</strong>{' '}
                      {mq.questionText}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono">
                    <div className={`p-2.5 rounded-xl border ${
                      isDarkMode
                        ? 'bg-[#D9534F]/20 border-[#D9534F]/50 text-[#D9534F]'
                        : 'bg-white border-[#FECACA] text-[#DC2626]'
                    }`}>
                      <span className={isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}>Player ({mq.playerName}) chose: </span>
                      <strong>{mq.chosenAnswer}</strong>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${
                      isDarkMode
                        ? 'bg-[#4FB8A6]/20 border-[#4FB8A6]/50 text-[#4FB8A6]'
                        : 'bg-white border-[#A7F3D0] text-[#059669]'
                    }`}>
                      <span className={isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}>Correct answer: </span>
                      <strong>{mq.correctAnswer}</strong>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl font-body leading-relaxed border ${
                    isDarkMode
                      ? 'bg-[#101820] border-[#2A3B4A] text-[#9AA5AE]'
                      : 'bg-white border-[#E2E8F0] text-[#334155]'
                  }`}>
                    <strong className={`font-mono ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#1E40AF]'}`}>Grammar Note:</strong> {mq.note}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Log History Table */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
        isDarkMode
          ? 'bg-[#182430] border-[#2A3B4A] shadow-black/40'
          : 'bg-white border-[#DBEAFE] shadow-blue-900/5'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-bold font-heading flex items-center gap-2 ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
            <History className={`w-5 h-5 ${isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}`} />
            Practice Session Log
          </h2>

          {history.length > 0 && onClearHistory && (
            <button
              type="button"
              onClick={() => setShowConfirmClear((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isDarkMode
                  ? 'border-[#2A3B4A] bg-[#1F2E3C] text-[#9AA5AE] hover:text-[#D9534F] hover:border-[#D9534F]/50 hover:bg-[#D9534F]/15'
                  : 'border-[#CBD5E1] bg-[#F8FAFC] text-[#64748B] hover:text-[#DC2626] hover:border-[#FECACA]'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear history</span>
            </button>
          )}
        </div>

        {/* Inline Confirmation Prompt */}
        {showConfirmClear && onClearHistory && (
          <div className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs font-mono animate-fade-in ${
            isDarkMode
              ? 'bg-[#D9534F]/20 border-[#D9534F]/50 text-[#D9534F]'
              : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
          }`}>
            <span className="font-bold">Clear all {history.length} history records permanently?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClearHistory();
                  setShowConfirmClear(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#D9534F] text-white font-bold hover:bg-[#c4413d] transition-all cursor-pointer"
              >
                Yes, Clear All
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmClear(false)}
                className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
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
          <p className={`text-sm italic py-2 text-center font-mono ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
            No session history saved.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className={`border-b uppercase tracking-wider ${isDarkMode ? 'border-[#2A3B4A] text-[#9AA5AE]' : 'border-[#E2E8F0] text-[#64748B]'}`}>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Players & Scores</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-[#2A3B4A]' : 'divide-[#E2E8F0]'}`}>
                {history.map((session) => {
                  const dateStr = new Date(session.date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr key={session.id} className={`transition-colors ${isDarkMode ? 'hover:bg-[#1F2E3C]/60' : 'hover:bg-[#EFF6FF]/50'}`}>
                      <td className={`py-3 px-3 font-bold whitespace-nowrap ${isDarkMode ? 'text-[#F2EFE7]' : 'text-[#0F172A]'}`}>
                        {dateStr}
                      </td>
                      <td className={`py-3 px-3 ${isDarkMode ? 'text-[#9AA5AE]' : 'text-[#64748B]'}`}>
                        <div className="flex flex-wrap gap-1.5">
                          {session.players.map((p) => (
                            <span
                              key={p.name}
                              className={`px-2.5 py-0.5 rounded-lg border text-[11px] ${
                                isDarkMode
                                  ? 'bg-[#101820] border-[#2A3B4A] text-[#F2EFE7]'
                                  : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]'
                              }`}
                            >
                              <strong className={isDarkMode ? 'text-[#E8A33D]' : 'text-[#2563EB]'}>{p.name}</strong>:{' '}
                              <span className="text-[#4FB8A6] font-bold">{p.correct}</span>/
                              <span>{p.correct + p.wrong}</span>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap space-x-2">
                        <button
                          type="button"
                          onClick={() => generateQuizPDF(session)}
                          title="Download PDF Report"
                          className={`px-2.5 py-1 rounded-xl border transition-all inline-flex items-center gap-1 text-[11px] font-bold cursor-pointer ${
                            isDarkMode
                              ? 'bg-[#1F2E3C] hover:bg-[#2A3B4A] border-[#2A3B4A] text-[#E8A33D]'
                              : 'bg-white hover:bg-[#EFF6FF] border-[#CBD5E1] text-[#2563EB]'
                          }`}
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>

                        {onDeleteSession && (
                          <button
                            type="button"
                            onClick={() => onDeleteSession(session.id)}
                            title="Delete this history record"
                            className={`px-2.5 py-1 rounded-xl border transition-all inline-flex items-center gap-1 text-[11px] cursor-pointer ${
                              isDarkMode
                                ? 'bg-[#1F2E3C] hover:bg-[#D9534F]/20 border-[#2A3B4A] hover:border-[#D9534F]/50 text-[#9AA5AE] hover:text-[#D9534F]'
                                : 'bg-white hover:bg-[#FEF2F2] border-[#CBD5E1] hover:border-[#FECACA] text-[#64748B] hover:text-[#DC2626]'
                            }`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

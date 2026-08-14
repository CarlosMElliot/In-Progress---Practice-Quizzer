export type TenseTag =
  | 'present_continuous'
  | 'past_continuous'
  | 'future_continuous'
  | 'present_perfect'
  | 'past_perfect'
  | 'future_perfect'
  | 'present_perfect_continuous'
  | 'past_perfect_continuous'
  | 'future_perfect_continuous'
  | 'phrasal_verbs'
  | 'prepositions'
  | 'confused_words'
  | 'common_errors'
  | 'pv_particles'
  | 'pv_life_work'
  | 'pv_in_use_foundations'
  | 'conditionals_wishes'
  | 'passive_voice'
  | 'idioms_collocations'
  | 'advanced_grammar'
  | 'business_academic'
  | 'reported_speech'
  | 'relative_clauses'
  | 'modal_verbs'
  | 'articles_determiners'
  | 'gerunds_infinitives';

export interface Question {
  id: string;
  tag: TenseTag;
  text: string;
  opts: string[];
  correct: number;
  note: string;
}

export interface QuizQuestion extends Question {
  shuffledOpts: string[];
  correctOptText: string;
}

export interface PlayerScore {
  name: string;
  correct: number;
  wrong: number;
}

export interface MissedQuestion {
  questionText: string;
  playerName: string;
  chosenAnswer: string;
  correctAnswer: string;
  note: string;
  tag: TenseTag;
}

export interface QuizSession {
  id: string;
  date: string;
  elapsedSeconds: number;
  totalQuestions: number;
  players: PlayerScore[];
  missedQuestions: MissedQuestion[];
}

export interface QuizSettings {
  questionCount: number; // 15, 20, 30, 40, 50, 60, 90
  useTimer: boolean; // default true (60s)
  tenseCategory?:
    | 'all'
    | 'continuous'
    | 'perfect'
    | 'perfect_continuous'
    | 'phrasal_verbs'
    | 'prepositions'
    | 'confused_words'
    | 'common_errors'
    | 'pv_particles'
    | 'pv_life_work'
    | 'pv_in_use_foundations'
    | 'conditionals_wishes'
    | 'passive_voice'
    | 'idioms_collocations'
    | 'advanced_grammar'
    | 'business_academic'
    | 'reported_speech'
    | 'relative_clauses'
    | 'modal_verbs'
    | 'articles_determiners'
    | 'gerunds_infinitives';
}

export type ScreenState = 'login' | 'home' | 'quiz' | 'results';

export interface AnswerRecord {
  questionId: string;
  questionText: string;
  playerName: string;
  chosenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  note: string;
  tag: TenseTag;
}

export interface UserAccount {
  id: string;
  username: string;
  passwordHash: string;
  plainTextPasswordHint?: string;
  role: 'admin' | 'teacher' | 'student';
  status: 'active' | 'disabled';
  createdAt: string;
  lastLogin?: string;
}

export interface LoginResult {
  success: boolean;
  user?: UserAccount;
  reason?: 'invalid' | 'disabled';
}


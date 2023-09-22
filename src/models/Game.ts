import { gameViews } from "../constants/game";
import { ValueOf } from "./utilities";

export type GameViews = ValueOf<typeof gameViews>;
export type QuestionNumberOptions = "10" | "15" | "20";
export type QuestionDifficultyOptions = 'easy' | 'medium' | 'hard' | 'any';
export type QuestionTypeOptions = 'boolean' | 'multiple' | 'all';

export interface GameSettings {
  number: QuestionNumberOptions;
  difficulty: QuestionDifficultyOptions
  category: string
  type: QuestionTypeOptions
}

export interface Question {
  category: string;
  correct_answer: string; // 'True' | 'False'
  incorrect_answers: string[];
  difficulty: Omit<QuestionDifficultyOptions, 'any'>;
  question: string;
  type: Omit<QuestionTypeOptions, 'all'>;
}
export interface Answer {
  question: string;
  answer: string;
  correct_answer: string;
  is_correct: boolean;
}

export interface Category {
  label: string;
  code: string;
}

export interface GameState {
  activeView: GameViews;
  timeLeft: number;
  questions: Question[],
  score: number,
  currentQuestionIndex: number,
  currectQuestionDescription: string,
  answers: Answer[];
  availableAnswers: string[];
  loading: boolean;
  difficulty: QuestionDifficultyOptions;
  questionNumber: QuestionNumberOptions;
  questionType: QuestionTypeOptions;
  questionCategory: string;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesInitialized: boolean;
}
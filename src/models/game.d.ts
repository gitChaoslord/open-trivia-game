import { gameViews } from "@constants/game";
import type { ValueOf } from "@models/utilities";

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


interface BaseQuestion {
  category: string;
  difficulty: Omit<QuestionDifficultyOptions, 'any'>;
  question: string;
  type: Omit<QuestionTypeOptions, 'all'>;
}
export interface TDBQuestion extends BaseQuestion {
  correct_answer: string;
  incorrect_answers: string[];
}

export interface UpdatedQuestion extends BaseQuestion {
  correct_answer: {
    text: string;
    id: string
  };
  incorrect_answers: { text: string; id: string }[];
}

export interface Answer {
  question: string;
  // TODO: dislike the fact that interface has a field with the same name
  answer: { text: string; id: string };
  correct_answer: { text: string; id: string };
  is_correct: boolean;
}

export interface Category {
  label: string;
  code: string;
}

// TODO: cleanup by removing unnecessary fields
export interface GameState {
  activeView: GameViews;
  timeLeft: number;
  questions: UpdatedQuestion[],
  score: number,
  currentQuestionIndex: number,
  currectQuestionDescription: string,
  answers: Answer[];
  availableAnswers: { text: string; id: string }[];
  loading: boolean;
  difficulty: QuestionDifficultyOptions;
  questionNumber: QuestionNumberOptions;
  questionType: QuestionTypeOptions;
  questionCategory: string;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesInitialized: boolean;
}
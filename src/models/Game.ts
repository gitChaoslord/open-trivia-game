import { gameViews } from "../constants/game";
import { Category } from "./Quiz";
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

export interface GameState {
  activeView: GameViews;
  timeLeft: number;
  difficulty: QuestionDifficultyOptions;
  questionNumber: QuestionNumberOptions;
  questionType: QuestionTypeOptions;
  questionCategory: string;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesInitialized: boolean;
}
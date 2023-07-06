import { Category } from "./Quiz";

export type Stage = 'INIT' | 'GAME' | 'END';
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
  stage: Stage;
  difficulty: QuestionDifficultyOptions;
  questionNumber: QuestionNumberOptions;
  questionType: QuestionTypeOptions;
  questionCategory: string;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesInitialized: boolean;
}
export type Stage = 'START_GAME' | 'GAME' | 'FETCHING_GAME' | 'END_GAME';
export type QuestionNumberOptions = 10 | 15 | 20;
export type QuestionDifficultyOptions = 'easy' | 'medium' | 'hard' | 'any';
export type QuestionTypeOptions = 'boolean' | 'multiple' | 'all';
export type QuestionCategoryOptions = 10;

export interface GameSettings {
  questions: QuestionNumberOptions;
  difficulty: QuestionDifficultyOptions
  category: QuestionCategoryOptions
  type: QuestionTypeOptions
}

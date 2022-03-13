export interface Question {
  category: string;
  correct_answer: string; // 'True' | 'False'
  incorrect_answers: string[];
  difficulty: 'hard' | 'medium' | 'easy';
  question: string;
  type: 'multiple' | 'boolean';
}
export interface Answer {
  question: string;
  answer: string;
  correct_answer: string;
  is_correct: boolean;
}
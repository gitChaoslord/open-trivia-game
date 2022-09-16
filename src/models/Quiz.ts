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

export interface Category {
  id: string;
  name: string;
}

export interface QuizState {
  questions: Question[],
  score: number,
  currentQuestionIndex: number,
  answers: Answer[];
  loading: boolean;
}
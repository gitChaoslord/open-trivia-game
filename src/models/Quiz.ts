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
  label: string;
  code: string;
}

export interface QuizState {
  questions: Question[],
  score: number,
  currentQuestionIndex: number,
  currectQuestionDescription: string,
  answers: Answer[];
  availableAnswers: string[];
  loading: boolean;
}
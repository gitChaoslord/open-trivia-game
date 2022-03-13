import { createSlice, Slice } from "@reduxjs/toolkit";
import { Answer } from '../../models/Quiz';
import { Question } from '../../models/Quiz';

interface TriviaState {
  questions: Question[],
  error: string | undefined,
  score: number,
  currentQuestionIndex: number,
  answers: Answer[];
}

const initialState: TriviaState = {
  questions: [],
  error: undefined,
  score: 0,
  currentQuestionIndex: 0,
  answers: []
}

const quizSlice: Slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    fetchQuestionsSuccess: (state: TriviaState, action) => {
      state.questions = action.payload;
      state.score = 0;
      state.currentQuestionIndex = 0;
      state.answers = [];
    },
    fetchQuestionsFail: (state: TriviaState, action) => {
      state.error = action.payload;
    },
    answerQuestion: (state: TriviaState, action) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      state.score += action.payload.answer === currentQuestion.correct_answer ? 1 : 0;

      state.answers.push({
        question: currentQuestion.question,
        answer: action.payload.answer,
        correct_answer: currentQuestion.correct_answer,
        is_correct: action.payload.anwer === currentQuestion.correct_answer
      });
    },
    nextQuestion: (state: TriviaState, action) => {
      // TODO: Dynamic index
      if (state.currentQuestionIndex < 9) {
        state.currentQuestionIndex += 1;
      }
    }
  }
});

export const { fetchQuestionsSuccess, fetchQuestionsFail, answerQuestion, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
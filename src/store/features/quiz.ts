import { createSlice, Slice } from "@reduxjs/toolkit";
import { Answer } from '../../models/Answer';
import { Question } from '../../models/Question';

interface TriviaState {
  value: {
    questions: Question[],
    error: string | null,
    score: number,
    currentQuestionIndex: number,
    answers: Answer[];
  }
}

const initialState: TriviaState = {
  value: {
    questions: [],
    error: null,
    score: 0,
    currentQuestionIndex: 0,
    answers: []
  }
}

const quizSlice: Slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    fetchQuestionsSuccess: (state, action) => {
      state.value.questions = action.payload;
      state.value.score = 0;
      state.value.currentQuestionIndex = 0;
      state.value.answers = [];
    },
    fetchQuestionsFail: (state, action) => {
      state.value.error = action.payload;
    },
    answerQuestion: (state, action) => {
      const currentQuestion = state.value.questions[state.value.currentQuestionIndex];
      state.value.score += action.payload.answer === currentQuestion.correct_answer ? 1 : 0;

      state.value.answers.push({
        question: currentQuestion.question,
        answer: action.payload.answer,
        correct_answer: currentQuestion.correct_answer,
        is_correct: action.payload.anwer === currentQuestion.correct_answer
      });
    },
    nextQuestion: (state, action) => {
      state.value.currentQuestionIndex += 1;
    }
  }
});

export const { fetchQuestionsSuccess, fetchQuestionsFail, answerQuestion, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
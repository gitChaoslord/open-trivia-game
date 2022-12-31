import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import api from "../../api";
import { GameSettings } from "../../models/Game";
import { QuizState } from '../../models/Quiz';
import { Question } from '../../models/Quiz';

const initialState: QuizState = {
  questions: [],
  score: 0,
  currentQuestionIndex: 0,
  answers: [],
  availableAnswers: [],
  loading: false
}

export const getQuestions = createAsyncThunk(
  "quiz/getQuestions",
  async (payload: GameSettings, { rejectWithValue }): Promise<Question[] | any> => {
    try {
      const response = await api.OpenTDBService.getQuestions(payload);

      if (response.response_code === 1) return rejectWithValue('There are not enough available questions for your criteria.');

      return response.results;
    } catch (rejected) {
      return rejectWithValue(rejected);
    }
  }
)

const quizSlice: Slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      state.score += action.payload.answer === currentQuestion.correct_answer ? 1 : 0;
      state.answers.push({
        question: currentQuestion.question,
        answer: action.payload.answer,
        correct_answer: currentQuestion.correct_answer,
        is_correct: action.payload.anwer === currentQuestion.correct_answer
      });
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length) {
        state.currentQuestionIndex += 1;
        state.availableAnswers = [state.questions[state.currentQuestionIndex].correct_answer, ...state.questions[state.currentQuestionIndex].incorrect_answers].sort((a, b) => 0.5 - Math.random());
      }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.loading = !initialState.loading;
      })
      .addCase(getQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.questions = action.payload;
        console.log(action.payload);
        state.currentQuestionIndex = initialState.currentQuestionIndex;
        state.availableAnswers = [state.questions[state.currentQuestionIndex].correct_answer, ...state.questions[state.currentQuestionIndex].incorrect_answers].sort((a, b) => 0.5 - Math.random());
        state.answers = initialState.answers;
        state.score = initialState.score;
        state.loading = initialState.loading;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loading = initialState.loading;
      })
  }
});

export const { answerQuestion, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
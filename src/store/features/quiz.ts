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
  loading: false
}

export const getQuestions = createAsyncThunk(
  "quiz/getQuestions",
  async (payload: GameSettings, { rejectWithValue }): Promise<Question[] | any> => {
    try {
      const response = await api.OpenTDBService.getQuestions(payload);
      return response.results;
    } catch (rejected: any) {
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
      }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.questions = action.payload;
        state.currentQuestionIndex = initialState.currentQuestionIndex;
        state.answers = initialState.answers;
        state.score = initialState.score;
        state.loading = false;
      })
      .addCase(getQuestions.rejected, (state) => {
        state.loading = false;
      })
  }
});

export const { answerQuestion, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
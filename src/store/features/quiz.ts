import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import api from "../../api";
import { GameSettings } from "../../models/Game";
import { Answer } from '../../models/Quiz';
import { Question } from '../../models/Quiz';

export interface QuizState {
  questions: Question[],
  score: number,
  currentQuestionIndex: number,
  answers: Answer[];
}

const initialState: QuizState = {
  questions: [],
  score: 0,
  currentQuestionIndex: 0,
  answers: []
}

// TODO: check type issues
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
    answerQuestion: (state: QuizState, action) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      state.score += action.payload.answer === currentQuestion.correct_answer ? 1 : 0;

      state.answers.push({
        question: currentQuestion.question,
        answer: action.payload.answer,
        correct_answer: currentQuestion.correct_answer,
        is_correct: action.payload.anwer === currentQuestion.correct_answer
      });
    },
    nextQuestion: (state: QuizState, action) => {
      // TODO: Dynamic index
      if (state.currentQuestionIndex < 9) {
        state.currentQuestionIndex += 1;
      }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, () => { })
      .addCase(getQuestions.fulfilled, (state: QuizState, action: PayloadAction<Question[]>) => {
        // state = { ...initialState, questions: action.payload }
        state.questions = action.payload;
        state.currentQuestionIndex = initialState.currentQuestionIndex;
        state.answers = initialState.answers;
        state.score = initialState.score;
      })
      .addCase(getQuestions.rejected, (state: QuizState, action: any) => {

      })
  }
});

export const { answerQuestion, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
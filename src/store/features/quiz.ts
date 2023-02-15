import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { cleanQuestionContent } from "../../helpers/quiz";
import { GameSettings } from "../../models/Game";
import { QuizState } from '../../models/Quiz';
import { Question } from '../../models/Quiz';

const initialState: QuizState = {
  questions: [],
  score: 0,
  currentQuestionIndex: 0,
  currectQuestionDescription: "",
  answers: [],
  availableAnswers: [],
  loading: false
}

export const getQuestions = createAsyncThunk(
  "quiz/getQuestions",
  async (payload: GameSettings, { rejectWithValue }): Promise<Question[] | any> => {
    try {
      const response = await api.OpenTDBService.getQuestions(payload);

      if (response.response_code === 0) return response.results.map((question) => cleanQuestionContent(question));
      if (response.response_code === 1) return rejectWithValue('There are not enough available questions for your criteria');
      return rejectWithValue('Unable to retrieve questions');

    } catch (rejected) {
      return rejectWithValue(rejected);
    }
  }
)

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerQuestion: (state, action: PayloadAction<{ answer: string }>) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      state.score += action.payload.answer === currentQuestion.correct_answer ? 1 : 0;
      state.answers.push({
        question: currentQuestion.question,
        answer: action.payload.answer,
        correct_answer: currentQuestion.correct_answer,
        is_correct: action.payload.answer === currentQuestion.correct_answer
      });
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length) {
        state.currentQuestionIndex += 1;
        state.currectQuestionDescription = state.questions[state.currentQuestionIndex].question;
        state.availableAnswers = [
          state.questions[state.currentQuestionIndex].correct_answer,
          ...state.questions[state.currentQuestionIndex].incorrect_answers
        ].sort((a, b) => {
          if (state.questions[state.currentQuestionIndex].type === 'boolean') {
            return a.length - b.length;
          } else {
            return 0.5 - Math.random();
          };
        });
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
        state.currentQuestionIndex = initialState.currentQuestionIndex;

        const initialQuestion = state.questions[initialState.currentQuestionIndex];

        state.availableAnswers = [
          initialQuestion.correct_answer,
          ...initialQuestion.incorrect_answers
        ].sort((a, b) => {
          if (initialQuestion.type === 'boolean') {
            return a.length - b.length;
          } else {
            return 0.5 - Math.random();
          };
        });

        state.currectQuestionDescription = initialQuestion.question;

        state.answers = initialState.answers;
        state.score = initialState.score;
        state.loading = initialState.loading;
      })
      .addCase(getQuestions.rejected, (state) => {
        state.loading = initialState.loading;
      })
  }
});

export const { answerQuestion, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
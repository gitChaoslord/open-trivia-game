import api from "@api/index";
import { gameDuration, gameViews } from "@constants/game";
import { ERR_CAT_RETRIEVE, ERR_QUEST_LOW_COUNT, ERR_QUEST_RETRIEVE } from "@constants/strings";
import { cleanQuestionContent, constructCategories } from "@helpers/utils";
import type { GameSettings, GameState, GameViews, UpdatedQuestion } from "@models/game";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@store/extras";

export const getQuestions = createAppAsyncThunk(
  "quiz/getQuestions",
  async (payload: GameSettings, { rejectWithValue }) => {
    try {
      const response = await api.OpenTDBService.retrieveQuestions(payload);

      if (response.response_code === 0) return response.results.map((question) => cleanQuestionContent(question));
      if (response.response_code === 1) return rejectWithValue(ERR_QUEST_LOW_COUNT);
      return rejectWithValue(ERR_QUEST_RETRIEVE);

    } catch (rejected) {
      return rejectWithValue(rejected);
    }
  }
);

export const getCategories = createAppAsyncThunk(
  "quiz/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.OpenTDBService.retrieveCategories();
      return response.trivia_categories;
    } catch (rejected) {
      return rejectWithValue(ERR_CAT_RETRIEVE);
    }
  }
);

const initialState: GameState = {
  activeView: gameViews.INIT,
  timeLeft: gameDuration,
  questions: [],
  score: 0,
  currentQuestionIndex: 0,
  currectQuestionDescription: "",
  answers: [],
  availableAnswers: [],
  loading: false,
  difficulty: "any",
  questionNumber: "10",
  questionType: "all",
  questionCategory: "0",
  categories: [],
  categoriesLoading: false,
  categoriesInitialized: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    answerQuestion: (state, action: PayloadAction<{ id: string, text: string }>) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      state.score += action.payload.id === currentQuestion.correct_answer.id ? 1 : 0;

      state.answers.push({
        question: currentQuestion.question,
        answer: { id: action.payload.id, text: action.payload.text },
        correct_answer: currentQuestion.correct_answer,
        is_correct: action.payload.id === currentQuestion.correct_answer.id
      });

      // next question or end
      if (state.currentQuestionIndex === state.questions.length - 1) {
        state.activeView = gameViews.END;
      } else {
        state.currentQuestionIndex += 1;
        state.currectQuestionDescription = state.questions[state.currentQuestionIndex].question;
        state.availableAnswers = [
          state.questions[state.currentQuestionIndex].correct_answer,
          ...state.questions[state.currentQuestionIndex].incorrect_answers
        ].sort((a, b) => {
          if (state.questions[state.currentQuestionIndex].type === 'boolean') {
            return a.text.length - b.text.length;
          } else {
            return 0.5 - Math.random();
          }
        });
      }
    },
    timerTick: (state) => {
      state.timeLeft -= 1;
    },
    setView: (state, action: PayloadAction<GameViews>) => {
      state.activeView = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state, action) => {
        state.loading = !initialState.loading;
        state.difficulty = action.meta.arg.difficulty;
        state.questionNumber = action.meta.arg.number;
        state.questionType = action.meta.arg.type;
        state.questionCategory = action.meta.arg.category;
      })
      .addCase(getQuestions.fulfilled, (state, action: PayloadAction<UpdatedQuestion[]>) => {
        state.questions = action.payload;
        state.currentQuestionIndex = initialState.currentQuestionIndex;

        const initialQuestion = state.questions[initialState.currentQuestionIndex];

        state.availableAnswers = [
          initialQuestion.correct_answer,
          ...initialQuestion.incorrect_answers
        ].sort((a, b) => {
          if (initialQuestion.type === 'boolean') {
            return a.text.length - b.text.length;
          } else {
            return 0.5 - Math.random();
          }
        });
        state.currectQuestionDescription = initialQuestion.question;
        state.answers = initialState.answers;
        state.score = initialState.score;
        state.loading = initialState.loading;
        state.activeView = gameViews.GAME;
        state.timeLeft = gameDuration;
      })
      .addCase(getQuestions.rejected, (state) => {
        state.loading = initialState.loading;
      })

      //
      .addCase(getCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = constructCategories([{ id: 0, name: "Any category" }, ...action.payload]);
        state.categoriesLoading = false;
        state.categoriesInitialized = true;
      })
      .addCase(getCategories.rejected, (state) => {
        state.categoriesLoading = false;
      })
  }
});

export const { answerQuestion, setView, timerTick } = gameSlice.actions;
export default gameSlice.reducer;
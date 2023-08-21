import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { constructCategories } from "../../helpers/utils";
import { GameState, QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions, GameViews } from "../../models/Game";
import { getQuestions } from "./quiz";
import { gameViews } from "../../constants/game";

export const getCategories = createAsyncThunk(
  "quiz/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.OpenTDBService.getCategories();
      return response.trivia_categories;
    } catch (rejected) {
      return rejectWithValue('Unable to retrieve categories');
    }
  }
)

const initialState: GameState = {
  activeView: gameViews.INIT,
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
    setView: (state, action: PayloadAction<GameViews>) => {
      state.activeView = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<QuestionDifficultyOptions>) => {
      state.difficulty = action.payload;
    },
    setQuestionNumbmer: (state, action: PayloadAction<QuestionNumberOptions>) => {
      state.questionNumber = action.payload;
    },
    setQuestionType: (state, action: PayloadAction<QuestionTypeOptions>) => {
      state.questionType = action.payload;
    },
    setQuestionCategory: (state, action: PayloadAction<string>) => {
      state.questionCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
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

      /* ---- EXTERNAL: ---- */
      .addCase(getQuestions.pending, (state, action) => {
        state.difficulty = action.meta.arg.difficulty;
        state.questionNumber = action.meta.arg.number;
        state.questionType = action.meta.arg.type;
        state.questionCategory = action.meta.arg.category;
      })

      .addCase(getQuestions.fulfilled, (state) => {
        state.activeView = gameViews.GAME;
      })
  }
});

export const { setView, setDifficulty, setQuestionNumbmer, setQuestionType, setQuestionCategory } = gameSlice.actions;
export default gameSlice.reducer;
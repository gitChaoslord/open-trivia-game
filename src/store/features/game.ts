import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { GameState, QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions, Stage } from "../../models/Game";
import { getQuestions } from "./quiz";

export const getCategories = createAsyncThunk(
  "quiz/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.OpenTDBService.getCategories();
      return response.trivia_categories;
    } catch (rejected: any) {
      return rejectWithValue('Unable to retrieve categories');
    }
  }
)

const initialState: GameState = {
  stage: 'INIT',
  difficulty: "any",
  questionNumber: 10,
  questionType: "all",
  questionCategory: 0,
  categories: [],
  categoriesLoading: false,
  categoriesInitialized: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStage: (state, action: PayloadAction<Stage>) => {
      state.stage = action.payload;
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
    setQuestionCategory: (state, action: PayloadAction<number>) => {
      state.questionCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = [{ id: 0, name: "Any category" }, ...action.payload];
        state.categoriesLoading = false;
        state.categoriesInitialized = true;
      })
      .addCase(getCategories.rejected, (state) => {
        state.categoriesLoading = false;
      })

      /* ---- EXTERNAL: ---- */
      .addCase(getQuestions.fulfilled, (state) => {
        state.stage = 'GAME';
      })
  }
});

export const { setStage, setDifficulty, setQuestionNumbmer, setQuestionType, setQuestionCategory } = gameSlice.actions;
export default gameSlice.reducer;
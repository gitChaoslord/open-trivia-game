import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import api from "../../api";
import { QuestionCategoryOptions, QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions, Stage } from "../../models/Game";
import { Category } from "../../models/Quiz";

export interface GameState {
  stage: Stage;
  difficulty: QuestionDifficultyOptions;
  questionNumber: QuestionNumberOptions;
  questionType: QuestionTypeOptions;
  questionCategory: QuestionCategoryOptions;
  categories: Category[];
  categoriesLoading: boolean;

}

export const getCategories = createAsyncThunk(
  "quiz/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.OpenTDBService.getCategories();
      return response.trivia_categories;
    } catch (rejected: any) {
      return rejectWithValue(rejected);
    }
  }
)

const initialState: GameState = {
  stage: 'INIT',
  difficulty: "any",
  questionNumber: 10,
  questionType: "all",
  questionCategory: 10,
  categories: [],
  categoriesLoading: false
}

const gameSlice: Slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStage: (state: GameState, action: PayloadAction<Stage>) => {
      state.stage = action.payload;
    },
    setDifficulty: (state: GameState, action: PayloadAction<QuestionDifficultyOptions>) => {
      state.difficulty = action.payload;
    },
    setQuestionNumbmer: (state: GameState, action: PayloadAction<QuestionNumberOptions>) => {
      state.questionNumber = action.payload;
    },
    setQuestionType: (state: GameState, action: PayloadAction<QuestionTypeOptions>) => {
      state.questionType = action.payload;
    },
    setQuestionCategory: (state: GameState, action: PayloadAction<QuestionCategoryOptions>) => {
      state.questionCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesLoading = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.categoriesLoading = false;
      })
  }
});

export const { setStage, setDifficulty, setQuestionNumbmer, setQuestionType, setQuestionCategory } = gameSlice.actions;
export default gameSlice.reducer;
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { QuestionCategoryOptions, QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions, Stage } from "../../models/Game";

export interface GameState {
  stage: Stage;
  difficulty: QuestionDifficultyOptions;
  questionNumber: QuestionNumberOptions;
  questionType: QuestionTypeOptions;
  questionCategory: QuestionCategoryOptions;

}

const initialState: GameState = {
  stage: 'INIT',
  difficulty: "any",
  questionNumber: 10,
  questionType: "all",
  questionCategory: 10
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
});

export const { setStage, setDifficulty, setQuestionNumbmer, setQuestionType, setQuestionCategory } = gameSlice.actions;
export default gameSlice.reducer;
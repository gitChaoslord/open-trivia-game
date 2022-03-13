import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { GameSettings, Stage } from "../../models/Game";

export interface GameState {
  stage: Stage;
  settings: GameSettings;
}

const initialState: GameState = {
  stage: 'INIT',
  settings: {
    questions: 10,
    difficulty: 'any',
    category: 10,
    type: 'all'
  }
}

const gameSlice: Slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStage: (state: GameState, action: PayloadAction<Stage>) => {
      state.stage = action.payload;
    },
    setSettings: (state: GameState, action: PayloadAction<GameSettings>) => {
      state.settings = action.payload;
    },
  },
});

export const { setStage, setSettings } = gameSlice.actions;
export default gameSlice.reducer;
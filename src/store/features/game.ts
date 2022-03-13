import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Stage } from "../../models/Game";

export interface GameState {
  stage: Stage;
}

const initialState: GameState = {
  stage: 'INIT',
}

const gameSlice: Slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStage: (state: GameState, action: PayloadAction<Stage>) => {
      state.stage = action.payload;
    },
  },
});

export const { setStage } = gameSlice.actions;
export default gameSlice.reducer;
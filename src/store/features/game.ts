import { createSlice, Slice } from "@reduxjs/toolkit";
import { GameSettings, Stage } from "../../models/Game";
import { fetchQuestionsFail, fetchQuestionsSuccess } from "./quiz";


interface GameState {
  stage: Stage;
  settings: GameSettings;
}

// TODO: rename and consolidate functions 
const initialState: GameState = {
  stage: 'START_GAME',
  settings: {
    questions: 10,
    difficulty: 'any',
    category: 10,
    type: 'all'
  }
}
// TODO: types from page https://redux-toolkit.js.org/api/createslice
const gameSlice: Slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state: GameState, action) => {
      state.stage = 'FETCHING_GAME';
    },
    cancelGame: (state: GameState, action) => {
      state.stage = 'START_GAME';
    },
    moveToGame: (state: GameState, action) => {
      state.stage = 'GAME';
    },
    finishGame: (state: GameState, action) => {
      state.stage = 'END_GAME';
    },
    restartGame: (state: GameState, action) => {
      state.stage = 'START_GAME';
    },
    setSettings: (state: GameState, action) => {
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsSuccess, (state: GameState, action) => {
        state.stage = 'START_GAME'
      })
      .addCase(fetchQuestionsFail, (state: GameState, action) => {
        state.stage = 'START_GAME';
      })
  }
});

export const { startGame, cancelGame, restartGame, finishGame, moveToGame, setSettings } = gameSlice.actions;
export default gameSlice.reducer;
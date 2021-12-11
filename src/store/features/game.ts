import { createSlice, Slice } from "@reduxjs/toolkit";
import { fetchQuestionsFail, fetchQuestionsSuccess } from "./quiz";

type Stage = 'START_GAME' | 'GAME' | 'FETCHING_GAME' | 'END_GAME';

interface GameState {
  value: {
    stage: Stage;
  }
}

const initialState: GameState = {
  value: {
    stage: 'START_GAME',
  }
}
// TODO: types from page https://redux-toolkit.js.org/api/createslice
const gameSlice: Slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.value.stage = 'FETCHING_GAME';
    },
    cancelGame: (state, action) => {
      state.value.stage = 'START_GAME';
    },
    finishGame: (state, action) => {
      state.value.stage = 'END_GAME';
    },
    restartGame: (state, action) => {
      state.value.stage = 'START_GAME';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsSuccess, (state, action) => {
        state.value.stage = 'START_GAME'
      })
      .addCase(fetchQuestionsFail, (state, action) => {
        state.value.stage = 'START_GAME';
      })
  }
});

export const { startGame, cancelGame, restartGame, finishGame } = gameSlice.actions;
export default gameSlice.reducer;
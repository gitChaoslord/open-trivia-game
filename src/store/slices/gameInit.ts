import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestionsFail, fetchQuestionsSuccess } from './game'
import { GameState } from "../../models/GameState";

const initialState: GameState = {
    stage: 'START_GAME',
    username: ''
};

const gameState = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        startGame(state, action) {
            state.username = action.payload.username;
            state.stage = 'FETCHING_GAME';
        },
        cancelGame(state, action) {
            state.stage = 'START_GAME';
        },
        finishGame(state, action) {
            state.stage = 'END_GAME';
        },
        restartGame(state, action) {
            state.stage = 'START_GAME';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestionsSuccess, (state) => {
            state.stage = 'GAME';
        }).addCase(fetchQuestionsFail, (state) => {
            state.stage = 'START_GAME';
        });
    }
});

export const { startGame, cancelGame, finishGame, restartGame } = gameState.actions;

export default gameState.reducer;
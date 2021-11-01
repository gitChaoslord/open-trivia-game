import { createSlice } from "@reduxjs/toolkit";
// import * as stages from '../../utils/constants';
import { fetchQuestionsFail, fetchQuestionsSuccess } from './game'
import { GameState } from "../../models/GameState";

// interface GameState {
//     stage: 'START_GAME' | 'GAME' | 'FETCHING_GAME' | 'END_GAME'; // NOTE: set values here instead of constants file
//     username: string;
// }


const initialState: GameState = {
    // stage: stages.START_GAME,
    stage: 'START_GAME',
    username: ''
};

const gameState = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        startGame(state, action) {
            state.username = action.payload.username;
            // state.stage = stages.FETCHING_GAME;
            state.stage = 'FETCHING_GAME';
        },
        cancelGame(state, action) {
            // state.stage = stages.START_GAME;
            state.stage = 'START_GAME';
        },
        finishGame(state, action) {
            // state.stage = stages.END_GAME;
            state.stage = 'END_GAME';
        },
        restartGame(state, action) {
            // state.stage = stages.START_GAME;
            state.stage = 'START_GAME';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestionsSuccess, (state) => {
            // state.stage = stages.GAME;
            state.stage = 'GAME';
        }).addCase(fetchQuestionsFail, (state) => {
            // state.stage = stages.START_GAME;
            state.stage = 'START_GAME';
        });
    }
});

export const { startGame, cancelGame, finishGame, restartGame } = gameState.actions;

export default gameState.reducer;
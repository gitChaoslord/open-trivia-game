import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { GameState } from "../models/Game";
import { QuizState } from "../models/Quiz";
import game from "./features/game";
import quiz from "./features/quiz";

const persistConfig: PersistConfig<any> = {
  key: 'trivia-game-',
  storage,
  throttle: 200
}

export default combineReducers({
  quiz: persistReducer<QuizState, AnyAction>({ ...persistConfig, key: persistConfig.key + 'quiz', blacklist: ['loading'] }, quiz),
  game: persistReducer<GameState, AnyAction>({ ...persistConfig, key: persistConfig.key + 'game', blacklist: ['categoriesInitialized', 'categoriesLoading', 'categories'] }, game)
});
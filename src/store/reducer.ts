import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { GameState } from "../models/game";
import game from "./features/game";

const persistConfig = {
  key: 'trivia-',
  storage,
  throttle: 200
}

export default combineReducers({
  game: persistReducer<GameState, AnyAction>({
    ...persistConfig,
    key: persistConfig.key + 'game',
    blacklist: ['loading', 'categoriesInitialized', 'categoriesLoading', 'categories']
  },
    game),
});

import type { GameState } from "@models/game";
import { SettingsState } from "@models/settings";
import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import game from "@store/features/game";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import settings from "./features/settings";

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
  settings: persistReducer<SettingsState, AnyAction>({
    ...persistConfig,
    key: persistConfig.key + 'settings',
    blacklist: ['settingsModalOpen']
  }, settings)
});
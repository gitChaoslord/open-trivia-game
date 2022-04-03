import { AnyAction, combineReducers } from "redux";
import quiz, { QuizState } from "./features/quiz";
import game, { GameState } from "./features/game";
import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig: PersistConfig<any> = {
  key: 'trivia-game-',
  storage,
  throttle: 200
}

export default combineReducers({
  quiz: persistReducer<QuizState, AnyAction>({ ...persistConfig, key: persistConfig.key + 'quiz', blacklist: ['loading'] }, quiz),
  game: persistReducer<GameState, AnyAction>({ ...persistConfig, key: persistConfig.key + 'game' }, game)
});
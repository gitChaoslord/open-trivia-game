import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "./localStorage";
import rootReducer from './reducer';
import { loadState } from './localStorage';

const persistedState = loadState();
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    quiz: store.getState().quiz,
    game: store.getState().game
  });
});

export default store;
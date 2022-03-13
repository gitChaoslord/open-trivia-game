import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "./localStorage";
import rootReducer from './reducer';
import { loadState } from './localStorage';
import { TypedUseSelectorHook, useSelector } from "react-redux";

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


export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
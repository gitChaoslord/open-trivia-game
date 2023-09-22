import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { INIT_TIMER } from "./actions";
import { listenerMiddleware } from "./middlewares/timer";
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).prepend(listenerMiddleware.middleware),
  devTools: import.meta.env.DEV
});

// Dispatch immediately after store initialization
store.dispatch(INIT_TIMER());

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Export a selector that be reused to get the state
export default store;
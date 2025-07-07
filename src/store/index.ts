import { configureStore } from "@reduxjs/toolkit";
import { INIT_TIMER } from "@store/actions";
import { listenerMiddleware } from "@store/middlewares/timer";
import rootReducer from '@store/reducer';
import { useDispatch, useSelector } from "react-redux";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).prepend(listenerMiddleware.middleware),
  devTools: import.meta.env.DEV
});

// Dispatch immediately after store initialization
store.dispatch(INIT_TIMER());

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>() // Export a selector that be reused to get the state
export default store;
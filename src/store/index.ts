import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from './reducer';
import rootSaga from './saga';
// import { loadState, saveState } from "../utils/localStorage";

const sagaMiddleware = createSagaMiddleware();

// const persistedState = loadState();

const store = configureStore({
    reducer: rootReducer,
    // preloadedState: persistedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

// store.subscribe(() => {
//     saveState(store.getState());
// });

export default store;
import { TypedAddListener, TypedStartListening, addListener, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { getQuestions } from "../features/quiz";
import { INIT_TIMER } from "../actions";
import { gameViews } from "../../constants/game";
import { setView, timerTick } from "../features/game";

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const listenerMiddleware = createListenerMiddleware();
export const startAppListening = listenerMiddleware.startListening as AppStartListening;
export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;


startAppListening({
  matcher: isAnyOf(getQuestions.fulfilled, INIT_TIMER),
  effect: (_action, { getState, dispatch }) => {


    const interval = setInterval(() => {
      const { timeLeft, activeView } = getState().game;

      if (activeView !== gameViews.GAME) {
        clearInterval(interval);
        return;
      }

      if (timeLeft <= 0) {
        clearInterval(interval);
        dispatch(setView(gameViews.END));
      } else {
        dispatch(timerTick());
      }

    }, 1000)
  }
})
import { gameViews } from "@/constants/game";
import { TypedStartListening, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { INIT_TIMER } from "@/store/actions";
import { getQuestions, setView, timerTick } from "@/store/features/game";
import type { AppDispatch, RootState } from "@/store/index";

export const listenerMiddleware = createListenerMiddleware();
const startAppListening = listenerMiddleware.startListening as TypedStartListening<RootState, AppDispatch>;

startAppListening({
  matcher: isAnyOf(getQuestions.fulfilled, INIT_TIMER),
  effect: (_action, { getState, dispatch }) => {

    // TODO: change to request animation frame
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
import { take, fork, put, call, cancel } from "@redux-saga/core/effects";
import { cancelGame, startGame } from "../slices/gameInit";
import { fetchQuizFromApi } from '../../utils/api';
import { fetchQuestionsSuccess, fetchQuestionsFail } from '../slices/game';

function* fetchQuestionsSaga(): any {
    try {
        const data = yield call(fetchQuizFromApi);
        yield put(fetchQuestionsSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(fetchQuestionsFail('There was an error fetching the questions'));
    }
}

function* cancelFetchQuiz(forkedSaga: any) {
    while (true) {
        yield take(cancelGame.type);
        yield cancel(forkedSaga);
    };
}

export default function* startGameSaga(): any {
    while (true) {
        yield take(startGame.type);
        const forkedSaga = yield fork(fetchQuestionsSaga);
        yield fork(cancelFetchQuiz, forkedSaga);
    };
}
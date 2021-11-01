import { all } from 'redux-saga/effects';
import startGameSaga from './saga/gameInit';
import game from './saga/game'

export default function* rootSaga() {
    yield all([startGameSaga(), game()]);
}
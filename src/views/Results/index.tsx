import Button from '@components/button';
import { gameViews } from '@constants/game';
import { GAME_OVER, RESTART_GAME, RESULTS_NO_ANSWERS_GIVEN, YOU_SCORED } from '@constants/strings';
import { setView } from '@store/features/game';
import { useAppDispatch, useAppSelector } from '@store/index';
import React from 'react';
import ResultsAnswer from './answer';
import "./index.css";

const ResultsView: React.FC = () => {
  const questions = useAppSelector((state) => state.game.questions);
  const answers = useAppSelector((state) => state.game.answers);
  const score = useAppSelector((state) => state.game.score);
  const dispatch = useAppDispatch();

  const handleRestart = () => dispatch(setView(gameViews.INIT));

  return (
    <React.Fragment>
      <h2>{GAME_OVER}</h2>

      <h3 className="results__message">
        {YOU_SCORED}
        <span className="text-primary">{score}</span>{"/"}{questions.length}
      </h3>

      <Button className="btn-primary mt-8" onClick={handleRestart}>
        {RESTART_GAME}
      </Button>

      <div className="results__list">
        {answers.length ?
          <React.Fragment>
            {answers.map((answer) => <ResultsAnswer answer={answer} key={answer.question} />)}
          </React.Fragment>
          : <span className="text-content-contrast">{RESULTS_NO_ANSWERS_GIVEN}</span>}
      </div>

    </React.Fragment>
  )
}
export default ResultsView;

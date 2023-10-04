import Button from '@components/Button';
import { gameViews } from '@constants/game';
import { GAME_OVER, RESTART_GAME, YOU_SCORED } from '@constants/strings';
import { setView } from '@store/features/game';
import { useAppDispatch, useAppSelector } from '@store/index';
import React from 'react';

const ResultsView: React.FC = () => {
  const questions = useAppSelector((state) => state.game.questions);
  const answers = useAppSelector((state) => state.game.answers);
  const score = useAppSelector((state) => state.game.score);
  const dispatch = useAppDispatch();

  const handleRestart = () => dispatch(setView(gameViews.INIT));

  return (
    <React.Fragment>
      <h1 className="text-4xl text-indigo-500 my-4">{GAME_OVER}</h1>
      <p className="text-2xl mb-4">
        {YOU_SCORED}
        <span className="text-indigo-400">{score}</span>/{questions.length}
      </p>
      <Button className="btn-primary" onClick={handleRestart}>{RESTART_GAME}</Button>
      {answers.length ?
        <div className="mt-4 p-4 block overflow-y-auto">
          {answers.map((answer) => (
            <div key={answer.question} className="border-b-2 text-lg border-indigo-300 flex lg:flex-row flex-col justify-between bg-white mb-2 rounded lg:px-2">
              <p className="py-2 lg:px-2 px-4">{answer.question}</p>
              <p className={`p-2 mx-2 text-xl text-center ${answer.correct_answer === answer.answer ? 'text-green-500' : 'text-red-500'}`}>{answer.answer}</p>
            </div>
          ))}
        </div>
        : null}
    </React.Fragment>
  )
}
export default ResultsView;

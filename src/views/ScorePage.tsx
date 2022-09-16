import React from 'react';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store';
import { setStage } from '../store/features/game';

const ScorePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { answers, score, questions } = useAppSelector((state) => state.quiz);

  const handleRestart = (): void => {
    dispatch(setStage('INIT'));
  };

  return (
    <div className="page-content overflow-y-hidden">
      <h1 className="text-4xl text-indigo-500 my-4">Game Over</h1>
      <p className="text-2xl mb-4 ">Your score was <span className="text-indigo-400">{score}</span>/{questions.length}</p>
      <Button className="btn-primary" onClick={handleRestart}>Restart game</Button>
      {answers.length !== 0 && (
        <div className="mt-4 p-4 block overflow-y-scroll">
          {answers.map((answer) => (
            <div key={answer.question} className="border-b-2 text-lg border-indigo-300 flex lg:flex-row flex-col justify-between bg-white mb-2 rounded lg:px-2">
              <p className="py-2 lg:px-2 px-4" dangerouslySetInnerHTML={{ __html: answer.question }}></p>
              <p className={`p-2 mx-2 text-xl text-center ${answer.correct_answer === answer.answer ? 'text-green-500' : 'text-red-500'}`}>{answer.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default ScorePage

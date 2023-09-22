import React from 'react';
import Button from '../components/Button';
import Counter from '../components/Question/counter';
import Description from '../components/Question/description';
import Timer from '../components/Timer';
import { useAppDispatch, useAppSelector } from '../store';
import { answerQuestion } from '../store/features/game';

const GamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const availableAnswers = useAppSelector((state) => state.game.availableAnswers);

  const handleAnswer = (answer: string): void => {
    dispatch(answerQuestion({ answer }));
  };

  return (
    <React.Fragment>

      <Timer />
      <Counter />
      <Description />

      {/* TODO: move answers to a different component to avoid triggering re-render of the above elements */}
      <div className="action-container-boolean mt-8 grid grid-cols-2">
        {availableAnswers.map((answer) => (
          <Button key={answer} className="btn-primary m-1" onClick={() => {
            handleAnswer(answer);
          }}>
            {answer}
          </Button>
        ))}
      </div>
    </React.Fragment>
  )
}
export default GamePage

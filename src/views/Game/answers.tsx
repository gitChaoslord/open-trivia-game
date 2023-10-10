import Button from '@components/button';
import { answerQuestion } from '@store/features/game';
import { useAppDispatch, useAppSelector } from '@store/index';
import React from 'react';

const answerOrder = ['A', "B", "C", "D"];

const AnswersGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const availableAnswers = useAppSelector((state) => state.game.availableAnswers);

  const handleAnswer = (answer: string): void => {
    dispatch(answerQuestion({ answer }));
  };

  return (
    <div className="action-container">
      {availableAnswers.map((answer, index) => (
        <Button key={answer} className="btn-primary animate-fade-in text-left" onClick={() => {
          handleAnswer(answer);
        }}>
          {answerOrder[index]}{") "}{answer}
        </Button>
      ))}
    </div>
  )
}
export default AnswersGrid;
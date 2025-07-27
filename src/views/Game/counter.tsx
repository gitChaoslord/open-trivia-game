import { useAppSelector } from '@/store/index';
import React from 'react';

const Counter: React.FC = () => {
  const index = useAppSelector((state) => state.game.currentQuestionIndex);
  const questions = useAppSelector((state) => state.game.questions);

  return (
    <p className="game__counter">
      {index + 1}{" / "}{questions.length}
    </p>
  )
}
export default Counter;
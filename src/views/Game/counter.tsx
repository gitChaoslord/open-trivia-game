import { useAppSelector } from '@store/index';
import React from 'react';

const Counter: React.FC = () => {
  const index = useAppSelector((state) => state.game.currentQuestionIndex);
  const questions = useAppSelector((state) => state.game.questions);

  const count = React.useMemo(() => questions.length, [questions]);

  return (
    <p className="question-counter">
      {index + 1}{" / "}{count}
    </p>
  )
}
export default Counter;
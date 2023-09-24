import React from 'react';
import { useAppSelector } from '@store/index';

const Counter: React.FC = () => {
  const { currentQuestionIndex: index, questions } = useAppSelector((state) => state.game);

  const count = React.useMemo(() => questions.length, [questions]);

  return (
    <p className="question-counter">
      {index + 1}{" / "}{count}
    </p>
  )
}
export default Counter;
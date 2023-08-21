import React from 'react';
import { useAppSelector } from '../../store';

const Counter: React.FC = () => {
  const { currentQuestionIndex: index, questions } = useAppSelector((state) => state.quiz);

  const count = React.useMemo(() => questions.length, [questions]);

  return (
    <p className="question-counter">
      {index + 1}{" / "}{count}
    </p>
  )
}
export default Counter;
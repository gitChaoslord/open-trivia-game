import React from 'react';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store';
import { setView } from '../store/features/game';
import { answerQuestion, nextQuestion } from '../store/features/quiz';
import { gameViews } from '../constants/game';
import Timer from '../components/Timer';
import Description from '../components/Question/description';
import Counter from '../components/Question/counter';

const GamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentQuestionIndex, questions, availableAnswers } = useAppSelector((state) => state.quiz);

  const handleAnswer = (answer: string): void => {
    dispatch(answerQuestion({ answer }));

    // TODO: this should be moved into the store
    if (currentQuestionIndex === questions.length - 1) {
      dispatch(setView(gameViews.END));
    }
    else {
      dispatch(nextQuestion());
    }
  };

  return (
    <React.Fragment>

      <Timer />
      <Counter />
      <Description />

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

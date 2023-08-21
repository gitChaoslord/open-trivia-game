import React from 'react';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store';
import { setView } from '../store/features/game';
import { answerQuestion, nextQuestion } from '../store/features/quiz';
import { gameViews } from '../constants/game';

const GamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = React.useState(60);
  const { currentQuestionIndex, currectQuestionDescription, questions, availableAnswers } = useAppSelector((state) => state.quiz);

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

  // TODO: save timer to state
  React.useEffect(() => {
    const interval = setInterval(() => {
      timeLeft <= 0 ? dispatch(setView(gameViews.END)) : setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [timeLeft, dispatch]);

  return (
    <React.Fragment>

      <p className="timer-container">{timeLeft}</p>
      <p className="question-counter">{currentQuestionIndex + 1}{" / "}{questions.length} </p>

      <p className="p-7 bg-white rounded shadow">{currectQuestionDescription}</p>

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

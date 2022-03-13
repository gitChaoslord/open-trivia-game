import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { RootState, useAppSelector } from '../store';
import { setStage } from '../store/features/game';
import { answerQuestion, nextQuestion } from '../store/features/quiz';

const GamePage: React.FC = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = React.useState(60);
  const { currentQuestionIndex, questions } = useAppSelector((state: RootState) => state.quiz);
  const [availableAnswers, setAvailableAnswers] = React.useState<string[]>([])

  const answerHandler = (answer: string): void => {
    dispatch(answerQuestion({ answer }));
    if (currentQuestionIndex === questions.length - 1) {
      dispatch(setStage('END'));
    }
    else {
      dispatch(nextQuestion({}));
    }
  }

  const endGameHandler = (e: React.MouseEvent): void => {
    dispatch(setStage('END'));
  }

  // TODO: save timer to state
  React.useEffect(() => {
    const interval = setInterval(() => {
      timeLeft <= 0 ? dispatch(setStage('END')) : setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [timeLeft, dispatch]);

  React.useEffect(() => {

    setAvailableAnswers([questions[currentQuestionIndex].correct_answer, ...questions[currentQuestionIndex].incorrect_answers].sort((a, b) => 0.5 - Math.random()));
  }, [currentQuestionIndex, questions]);

  return (
    <React.Fragment>
      <div className="page-content relative flex-grow overflow-hidden">
        <p className="timer-container">{timeLeft}</p>
        <p className="question-counter">{currentQuestionIndex + 1}/ {questions.length} </p>

        <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} className="p-7 bg-white rounded shadow" />

        <div className="action-container-boolean mt-8 grid grid-cols-2">
          {availableAnswers.map((answer: string, index: number) =>
            <Button key={index} addClassNames="btn-primary m-1" onClick={() => {
              answerHandler(answer);
            }}>
              {answer}
            </Button>
          )}
        </div>
      </div>

      <div className="absolute bottom-16 right-4">
        <Button addClassNames="btn-error" onClick={endGameHandler}>Quit game</Button>
      </div>

    </React.Fragment>
  )
}
export default GamePage

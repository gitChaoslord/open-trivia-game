import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { RootState, useAppSelector } from '../store';
import { finishGame } from '../store/features/game';
import { answerQuestion, nextQuestion } from '../store/features/quiz';

const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = React.useState(60);
    const { currentQuestionIndex, questions } = useAppSelector((state: RootState) => state.quiz);

    const answerHandler = (answer: 'True' | 'False'): void => {
        // TODO: Dynamic index
        dispatch(answerQuestion({ answer }));
        dispatch(nextQuestion({}));
        if (currentQuestionIndex === 9) {
            dispatch(finishGame({}));
        }
    }

    const endGameHandler = (e: React.MouseEvent): void => {
        dispatch(finishGame({}));
    }

    // TODO: save timer to state
    React.useEffect(() => {
        const interval = setInterval(() => {
            timeLeft <= 0 ? dispatch(finishGame({})) : setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [timeLeft]);

    return (
        <React.Fragment>
            <div className="page-content relative flex-grow overflow-hidden">
                <p className="timer-container">{timeLeft}</p>
                <p className="question-counter">{currentQuestionIndex + 1}/10 </p>
                <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} className="p-7 bg-white rounded shadow"></p>
                {questions[currentQuestionIndex].type === 'boolean' &&
                    <div className="action-container-boolean mt-8">
                        <Button addClassNames="btn-primary" onClick={() => {
                            answerHandler('True');
                        }}>True</Button>
                        <Button addClassNames="btn-primary" onClick={() => {
                            answerHandler('False');
                        }}>False</Button>
                    </div>
                }
                {questions[currentQuestionIndex].type === 'multiple' &&
                    <div className="action-container-boolean mt-8">
                        Question multiple choice TODO:
                    </div>
                }
            </div>

            <div className="absolute bottom-16 right-4">
                <Button addClassNames="btn-error" onClick={endGameHandler}>Quit game</Button>
            </div>

        </React.Fragment>
    )
}
export default GamePage

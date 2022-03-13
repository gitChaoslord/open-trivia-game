import React from 'react';
import { RootStateOrAny } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, nextQuestion } from '../store/features/quiz';
import Button from '../components/Button';
import { finishGame } from '../store/features/game';

const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = React.useState(60);
    const currentQuestionIndex: number = useSelector((state: RootStateOrAny) => state.quiz.currentQuestionIndex);
    const currentQuestion: string = useSelector((state: RootStateOrAny) => state.quiz.questions[currentQuestionIndex].question);
    const currentQuestionType: string = useSelector((state: RootStateOrAny) => state.quiz.questions[currentQuestionIndex].type);
    // TODO: clear this thing a bit


    // combine incorrect answers array and corrent one, then randomize, then display

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
                <p dangerouslySetInnerHTML={{ __html: currentQuestion }} className="p-7 bg-white rounded shadow"></p>
                {currentQuestionType === 'boolean' &&
                    <div className="action-container-boolean mt-8">
                        <Button addClassNames="btn-primary" onClick={() => {
                            answerHandler('True');
                        }}>True</Button>
                        <Button addClassNames="btn-primary" onClick={() => {
                            answerHandler('False');
                        }}>False</Button>
                    </div>
                }
                {currentQuestionType === 'multiple' &&
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

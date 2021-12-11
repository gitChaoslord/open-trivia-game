import React from 'react';
import { RootStateOrAny } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, nextQuestion } from '../store/features/quiz';
import Button from '../components/Button';
import { finishGame } from '../store/features/game';

const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = React.useState(60);
    const currentQuestionIndex: number = useSelector((state: RootStateOrAny) => state.quiz.value.currentQuestionIndex);
    const currentQuestion: string = useSelector((state: RootStateOrAny) => state.quiz.value.questions[currentQuestionIndex].question);

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
            // TODO: Dynamic Time in future
            timeLeft <= 0 ? dispatch(finishGame({})) : setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [timeLeft]);

    return (
        <React.Fragment>
            <div className="flex flex-col items-center relative">
                <p className="h-20 w-20 flex justify-center items-center border-8 border-indigo-500 rounded-full my-4 text-3xl text-indigo-500">{timeLeft}</p>
                <p className="absolute top-4 right-4 text-2xl text-indigo-500">{currentQuestionIndex + 1}/10 </p>
                <p dangerouslySetInnerHTML={{ __html: currentQuestion }} className="mx-2 p-7 bg-white rounded shadow"></p>
                <div className="flex justify-between w-96 mt-8">
                    <Button onClick={() => {
                        answerHandler('True');
                    }}>True</Button>
                    <Button onClick={() => {
                        answerHandler('False');
                    }}>False</Button>
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <Button onClick={endGameHandler} type='error'>Quit game</Button>
            </div>
        </React.Fragment>
    )
}
export default GamePage

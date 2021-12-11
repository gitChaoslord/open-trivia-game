import React, { useState, useEffect, FC } from 'react';
import { RootStateOrAny } from 'react-redux';

import { useSelector, useDispatch } from 'react-redux';
// import { answerQuestion } from '../store/slices/game';
// import { finishGame } from '../store/slices/gameInit';
import Button from '../components/Button';
import { finishGame } from '../store/features/game';

const GamePage: FC = () => {
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(60);
    const currentQuestionIndex: number = useSelector((state: RootStateOrAny) => state.quiz.value.currentQuestionIndex);
    const currentQuestion: string = useSelector((state: RootStateOrAny) => state.quiz.value.questions[currentQuestionIndex].question);

    // const score: number = useSelector((state: RootStateOrAny) => state.quiz.score);
    // 

    const answerHandler = (answer: 'True' | 'False'): void => {
        // dispatch(answerQuestion({ answer }));
    }

    const endGameHandler = (): void => {
        dispatch(finishGame({}));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <React.Fragment>
            <div className="flex flex-col items-center relative">
                <p className="h-20 w-20 flex justify-center items-center border-8 border-indigo-500 rounded-full my-4 text-3xl text-indigo-500">{timeLeft}</p>
                {/* <p className="absolute top-4 left-4 text-2xl text-indigo-500">{score}</p>
                <p className="absolute top-4 right-4 text-2xl text-indigo-500">{currentQuestionIndex}/10 </p> */}
                <p dangerouslySetInnerHTML={{ __html: currentQuestion }} className="p-7 bg-white rounded shadow"></p>
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

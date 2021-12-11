import React from 'react'
import { RootStateOrAny } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
// import { restartGame } from '../store/slices/gameInit';
import Button from '../components/Button';
import { Answer } from '../models/Answer';

const ScorePage: React.FC = () => {
    const dispatch = useDispatch();
    const answers: Answer[] = useSelector((state: RootStateOrAny) => state.quiz.answers);
    const score: number = useSelector((state: RootStateOrAny) => state.quiz.score);
    const restartHandler = (): void => {
        // dispatch(restartGame({}));
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl text-indigo-500 my-4">Game Over</h1>
            <p className="text-2xl mb-4 ">Your score was <span className="text-indigo-400">{score}</span>/10</p>
            <Button onClick={restartHandler}>Restart game</Button>
            <div className="mt-4 p-4">
                {answers.map((answer: Answer) => (
                    <div className="border-b-2 text-lg border-indigo-500 flex justify-between bg-white mb-2 rounded px-1">
                        <p className="p-3 mr-2" dangerouslySetInnerHTML={{ __html: answer.question }}></p>
                        <span className={`p-2 text-xl ${answer.correct_answer === answer.answer ? 'text-green-500' : 'text-red-500'}`}>{answer.answer}</span>

                    </div>
                ))}
            </div>
        </div>
    )
}
export default ScorePage

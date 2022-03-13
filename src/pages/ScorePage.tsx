import React from 'react'
import { RootStateOrAny } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import { restartGame } from '../store/features/game';
import Button from '../components/Button';
import { Answer } from '../models/Quiz';

const ScorePage: React.FC = () => {
    const dispatch = useDispatch();
    const answers: Answer[] = useSelector((state: RootStateOrAny) => state.quiz.answers);
    const score: number = useSelector((state: RootStateOrAny) => state.quiz.score);
    const restartHandler = (e: React.MouseEvent): void => {
        dispatch(restartGame({}));
    };

    return (
        <div className="page-content overflow-y-hidden">
            <h1 className="text-4xl text-indigo-500 my-4">Game Over</h1>
            <p className="text-2xl mb-4 ">Your score was <span className="text-indigo-400">{score}</span>/10</p>
            <Button addClassNames="btn-primary" onClick={restartHandler}>Restart game</Button>
            {answers.length !== 0 && (
                <div className="mt-4 p-4 block overflow-y-scroll">
                    {answers.map((answer: Answer, index: number) => (
                        <div key={`question-${index}`} className="border-b-2 text-lg border-blue-300 flex justify-between bg-white mb-2 rounded px-1">
                            <p className="p-3 mr-2" dangerouslySetInnerHTML={{ __html: answer.question }}></p>
                            <span className={`p-2 text-xl ${answer.correct_answer === answer.answer ? 'text-green-500' : 'text-red-500'}`}>{answer.answer}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}
export default ScorePage

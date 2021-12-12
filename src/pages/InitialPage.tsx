import React from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../store/features/game';
import Button from '../components/Button';

const InitialPage: React.FC = () => {
    const dispatch = useDispatch();
    // TODO: localstorage update, when you visit the initial link, you should be able to start a new game instead of loading the storage
    // TODO: add more api Options for trivia
    const startGameHandler = (e: React.MouseEvent): void => {
        dispatch(startGame({ stage: "FETCHING_GAME" }));
    }

    return (
        <div className="page-content mt-20">
            <h1 className="text-4xl text-indigo-500 text-center">Current settings</h1>
            <div className="lg:w-auto  border-b-2 text-lg border-indigo-500 flex justify-between bg-white my-6 rounded ">
                <ul className="p-5">
                    <li className="mb-2">Number of questions: <span className="text-indigo-500">10</span></li>
                    <li className="mb-2">Category: <span className="text-indigo-500">Any</span></li>
                    <li className="mb-2">Difficulty: <span className="text-indigo-500">Any</span></li>
                    <li className="mb-2">Type: <span className="text-indigo-500">True/False</span></li>
                    <li>Time: <span className="text-indigo-500">60 sec.</span></li>
                </ul>
            </div>
            <Button onClick={startGameHandler}>Start Game</Button>
        </div>
    )
}

export default InitialPage

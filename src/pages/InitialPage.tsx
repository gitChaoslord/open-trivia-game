import React from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../store/features/game';
import Button from '../components/Button';

const InitialPage: React.FC = () => {
    const dispatch = useDispatch();

    // TODO: add more api Options for trivia
    const startGameHandler = (): void => {
        dispatch(startGame({ stage: "FETCHING_GAME" }));
    }

    return (
        <div className="flex flex-col justify-center items-center mt-80">
            <span> select values yada yada</span>
            <Button onClick={startGameHandler}>Start Game</Button>
        </div>
    )
}

export default InitialPage

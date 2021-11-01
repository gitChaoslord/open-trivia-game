import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../store/slices/gameInit';
import Button from '../components/Button';

const StartGamePage: FC = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    // TODO: add more api Options for trivia
    const startGameHandler = (): void => {
        dispatch(startGame({ username }));
    }

    return (
        <div className="flex flex-col justify-center items-center mt-80">
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Your name"
                className="py-2 px-4 outline-none rounded shadow w-64 mb-6" />

            <Button onClick={startGameHandler}>Start Game</Button>
        </div>
    )
}

export default StartGamePage

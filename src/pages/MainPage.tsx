import React, { FC } from 'react';
import { RootStateOrAny } from 'react-redux';
import { useSelector } from 'react-redux';
import StartGame from './StartGamePage';
import Game from './GamePage';
import Fetching from './FetchingPage';
import EndGame from './EndGamePage';
import { Stage } from '../models/GameState';


const MainPage: FC = () => {

    const currentStage: Stage = useSelector((state: RootStateOrAny) => state.gameState.stage)

    let displayedPage: React.ReactNode;
    switch (currentStage) {
        case 'START_GAME':
            displayedPage = <StartGame />;
            break;
        case 'FETCHING_GAME':
            displayedPage = <Fetching />;
            break;
        case 'GAME':
            displayedPage = <Game />;
            break;
        case 'END_GAME':
            displayedPage = <EndGame />;
            break;
        default:
            break;
    }
    return (
        <div className="font-mono bg-indigo-50 min-h-screen">
            <h1 className="bg-indigo-500 text-white p-4 text-2x1 text-center uppercase">Trivia game</h1>
            {displayedPage}
        </div>
    );
}
export default MainPage

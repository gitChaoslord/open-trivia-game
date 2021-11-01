import React, { FC } from 'react';
import { RootStateOrAny } from 'react-redux';
import { useSelector } from 'react-redux';
import StartGame from './StartGamePage';
import Game from './GamePage';
import Fetching from './FetchingPage';
import EndGame from './EndGamePage';
// import * as stages from '../utils/constants';
import { Stage } from '../models/GameState';
// type Stage = 'START_GAME' | 'GAME' | 'FETCHING_GAME' | 'END_GAME';


const MainPage: FC = () => {

    // TODO: interface for state the right way
    const currentStage: Stage = useSelector((state: RootStateOrAny) => state.gameState.stage)

    let displayedPage: React.ReactNode;
    switch (currentStage) {
        // case stages.START_GAME:
        case 'START_GAME':
            displayedPage = <StartGame />;
            break;
        // case stages.FETCHING_GAME:
        case 'FETCHING_GAME':
            displayedPage = <Fetching />;
            break;
        // case stages.GAME:
        case 'GAME':
            displayedPage = <Game />;
            break;
        // case stages.END_GAME:
        case 'END_GAME':
            displayedPage = <EndGame />;
            break;
        default:
            break;
    }
    return (
        <div className="font-mono bg-purple-50 min-h-screen">
            <h1 className="bg-purple-500 text-white p-4 text-2x1 text-center uppercase">Redux saga quiz game</h1>
            {displayedPage}
        </div>
    );
}
export default MainPage

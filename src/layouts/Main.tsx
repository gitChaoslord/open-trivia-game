import React from 'react';
import Footer from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { RootState, useAppSelector } from '../store';
import GamePage from '../views/GamePage';
import InitialPage from '../views/InitialPage';
import ScorePage from '../views/ScorePage';

const MainLayout: React.FC = () => {
  const { stage } = useAppSelector((state: RootState) => state.game);
  return (
    <React.Fragment>
      <Navbar />
      {stage === 'INIT' && <InitialPage />}
      {stage === 'GAME' && <GamePage />}
      {stage === 'END' && <ScorePage />}
      <Footer />
    </React.Fragment>
  )
}
export default MainLayout;
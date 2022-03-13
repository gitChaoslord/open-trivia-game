import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import InitialPage from '../pages/InitialPage';
import ScorePage from '../pages/ScorePage';
import GamePage from '../pages/GamePage';
import LoadingPage from '../pages/LoadingPage';
import MainLayout from '../layouts/Main';


export const Root: React.FC = () => {
  const navigate = useNavigate();
  const currentPage: string = useSelector((state: RootStateOrAny) => state.game.stage);

  React.useEffect(() => {
    switch (currentPage) {
      case 'START_GAME':
        navigate('');
        break;
      case 'FETCHING_GAME':
        navigate('/loading');
        break;
      case 'GAME':
        navigate('/play');
        break;
      case 'END_GAME':
        navigate('/score');
        break;
      default:
        break;
    }
  }, [currentPage])

  return <React.Fragment>
    <Routes>
      <Route path='' element={<MainLayout />}>
        <Route path='' element={<InitialPage />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path='/play' element={<GamePage />} />
        <Route path='/score' element={<ScorePage />} />
      </Route>
    </Routes>
  </React.Fragment>
}

import Button from '@components/button';
import Footer from '@components/footer';
import LoadingSpinner from '@components/loading';
import { Navbar } from '@components/navbar';
import { gameViews } from '@constants/game';
import { QUIT_GAME } from '@constants/strings';
import { getCategories, setView } from '@store/features/game';
import { useAppDispatch, useAppSelector } from '@store/index';
import GamePage from '@views/Game';
import InitialPage from '@views/Initial';
import ScorePage from '@views/Results';
import React from 'react';
import { toast } from 'react-toastify';

const MainLayout: React.FC = () => {
  const activeView = useAppSelector((state) => state.game.activeView);
  const loading = useAppSelector((state) => state.game.categoriesLoading);
  const initialized = useAppSelector((state) => state.game.categoriesInitialized);
  const dispatch = useAppDispatch();

  const isFillingForm = activeView === gameViews.INIT;
  const isPlaying = activeView === gameViews.GAME;
  const isComplete = activeView === gameViews.END;

  React.useEffect(() => {
    if (!initialized) dispatch(getCategories()).unwrap().catch((error) => {
      toast.error(error);
    });
  }, [dispatch, initialized]);

  const handleEndGame = () => dispatch(setView(gameViews.END));

  return (
    <React.Fragment>

      {isFillingForm && <Navbar />}

      <main>

        {loading ? <LoadingSpinner /> : <React.Fragment>
          {isFillingForm && <InitialPage />}
          {isPlaying && <GamePage />}
          {isComplete && <ScorePage />}
        </React.Fragment>}

        {isPlaying && <Button className="btn-error absolute top-4 right-4" onClick={handleEndGame}>
          {QUIT_GAME}
        </Button>}

      </main>

      {isFillingForm && <Footer />}

    </React.Fragment>
  )
}
export default MainLayout;
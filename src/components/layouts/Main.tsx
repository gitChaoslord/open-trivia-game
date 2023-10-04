import Button from '@components/Button';
import Footer from '@components/Footer';
import LoadingSpinner from '@components/Loading';
import { Navbar } from '@components/Navbar';
import { gameViews } from '@constants/game';
import { QUIT_GAME } from '@constants/strings';
import { getCategories, setView } from '@store/features/game';
import { useAppDispatch, useAppSelector } from '@store/index';
import GamePage from '@views/Game/GamePage';
import InitialPage from '@views/Initial/InitialPage';
import ScorePage from '@views/Results/ScorePage';
import React from 'react';
import { toast } from 'react-toastify';

const MainLayout: React.FC = () => {
  const activeView = useAppSelector((state) => state.game.activeView);
  const loading = useAppSelector((state) => state.game.categoriesLoading);
  const initialized = useAppSelector((state) => state.game.categoriesInitialized);
  const dispatch = useAppDispatch();

  const isFillingForm = React.useMemo(() => activeView === gameViews.INIT, [activeView]);
  const isPlaying = React.useMemo(() => activeView === gameViews.GAME, [activeView]);
  const isComplete = React.useMemo(() => activeView === gameViews.END, [activeView]);

  React.useEffect(() => {
    if (!initialized) dispatch(getCategories()).unwrap().catch((error) => {
      toast.error(error);
    });
  }, [dispatch, initialized]);

  const handleEndGame = () => dispatch(setView(gameViews.END));

  return (
    <React.Fragment>

      {isFillingForm && <Navbar />}
      {/* <Navbar /> */}

      <main>

        {loading ? <LoadingSpinner /> : <React.Fragment>
          {isFillingForm && <InitialPage />}
          {isPlaying && <GamePage />}
          {isComplete && <ScorePage />}
        </React.Fragment>}

        {isPlaying && <Button className="btn-error absolute bottom-16 right-4" onClick={handleEndGame}>
          {QUIT_GAME}
        </Button>}

      </main>

      <Footer />

    </React.Fragment>
  )
}
export default MainLayout;
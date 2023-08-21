import React from 'react';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/Loading';
import { Navbar } from '../components/Navbar';
import { useAppDispatch, useAppSelector } from '../store';
import { getCategories, setStage } from '../store/features/game';
import GamePage from '../views/GamePage';
import InitialPage from '../views/InitialPage';
import ScorePage from '../views/ScorePage';
import classnames from 'classnames';
import Button from '../components/Button';

const MainLayout: React.FC = () => {
  const stage = useAppSelector((state) => state.game.stage);
  const loading = useAppSelector((state) => state.game.categoriesLoading);
  const initialized = useAppSelector((state) => state.game.categoriesInitialized);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!initialized) dispatch(getCategories()).unwrap().catch((error) => {
      toast.error(error);
    });
  }, [dispatch, initialized]);

  const handleEndGame = () => dispatch(setStage('END'));

  // const isPlaying = stage === "GAME";

  return (
    <main>
      {stage === "INIT" && <Navbar />}
      <div className={classnames("page-content", { "overflow-y-hidden": stage === "END", "relative flex-grow overflow-hidden": stage === "GAME" })}>
        {loading ? <LoadingSpinner /> : <React.Fragment>
          {stage === "INIT" && <InitialPage />}
          {stage === "GAME" && <GamePage />}
          {stage === "END" && <ScorePage />}
        </React.Fragment>}
      </div>

      {stage === "GAME" && <div className="absolute bottom-16 right-4">
        <Button className="btn-error" onClick={handleEndGame}>Quit game</Button>
      </div>}

      <Footer />
    </main>
  )
}
export default MainLayout;
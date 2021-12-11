import React from 'react';
import { Navbar } from './components/Navbar';
import { Root } from './components/Root';

const App: React.FC = () => {
  // const currentStage: Stage = useSelector((state: RootStateOrAny) => state.gameState.stage)
  // const navigate = useNavigate();
  // console.log(currentStage)


  // useEffect(() => {
  //   switch (currentStage) {
  //     case 'START_GAME':
  //       navigate('');
  //       break;
  //     case 'FETCHING_GAME':
  //       navigate('/loading');
  //       break;
  //     case 'GAME':
  //       navigate('/play');
  //       break;
  //     case 'END_GAME':
  //       navigate('/score');
  //       break;
  //     default:
  //       navigate('');
  //       break;
  //   }
  // }, [currentStage])

  return (
    <div className="font-mono bg-indigo-50 min-h-screen">
      <Navbar />
      <Root />
    </div>
  );
}
export default App;
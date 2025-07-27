import Counter from '@/views/Game/counter';
import Description from '@/views/Game/description';
import Timer from '@/views/Game/timer';
import React from 'react';
import AnswersGrid from './answers';
import "./index.css";

const GameView: React.FC = () => {

  return (
    <div id="game__layout">

      <Timer />
      <Counter />
      <Description />
      <AnswersGrid />

    </div>
  )
}
export default GameView

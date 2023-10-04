import React from 'react';
import { useAppSelector } from '@store/index';
import "./index.css";

const Timer: React.FC = () => {
  const timeLeft = useAppSelector((state) => state.game.timeLeft);

  // TODO: turn this P into a circular progress bar!
  return <p className="timer">{timeLeft}</p>;
}

export default Timer;
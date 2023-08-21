import React from 'react';
import { useAppSelector } from '../../store';
import "./index.css";

const Timer: React.FC = () => {
  const timeLeft = useAppSelector((state) => state.game.timeLeft);

  return <p className="timer">{timeLeft}</p>;
}

export default Timer;
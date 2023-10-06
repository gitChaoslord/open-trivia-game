import { gameDuration } from '@constants/game';
import { useAppSelector } from '@store/index';
import React from 'react';
import "./index.css";

const Timer: React.FC = () => {
  const timeLeft = useAppSelector((state) => state.game.timeLeft);

  const progressStyle: Record<string, number> = {
    "--progress-value": timeLeft,
    "--progress-start": gameDuration
  };

  return (
    <div
      key={timeLeft}
      className="timer"
      role="progressbar"
      aria-valuenow={timeLeft}
      aria-valuemin={0}
      aria-valuemax={gameDuration}
      style={{ ...progressStyle }}
    />);
}

export default Timer;
import { gameDuration } from '@constants/game';
import { useAppSelector } from '@store/index';
import React from 'react';
import "./index.css";

const circumference = 2 * 3.14 * 68;

const Timer: React.FC = () => {
  const timeLeft = useAppSelector((state) => state.game.timeLeft);

  const offset = circumference * ((gameDuration - timeLeft) / gameDuration);

  // TODO: add color variables and dark/light theme

  return (
    <svg width="160" height="160" viewBox="0 0 160 160" style={{ rotate: "-90deg" }}>
      <circle r="68" cx="80" cy="80" fill="transparent" stroke="#e0e0e0" stroke-width="22px" />
      <circle r="68" cx="80" cy="80" fill="transparent" stroke="#60e6a8" stroke-width="12px" stroke-dasharray={circumference} stroke-dashoffset={offset} />

      <text
        x="50%"
        y="50%"
        fontSize={52}
        dominant-baseline="central"
        text-anchor="middle"
        style={{ rotate: "90deg", transformOrigin: '50% 50%' }}>
        {timeLeft}
      </text>

    </svg>
  );
}

export default Timer;
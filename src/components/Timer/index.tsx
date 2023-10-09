import { gameDuration } from '@constants/game';
import { useAppSelector } from '@store/index';
import React from 'react';
import "./index.css";

const circumference = 2 * 3.14 * 68;

const Timer: React.FC = () => {
  const timeLeft = useAppSelector((state) => state.game.timeLeft);

  const offset = circumference * ((gameDuration - timeLeft) / gameDuration);

  return (
    <svg width="160" height="160" viewBox="0 0 160 160" style={{ rotate: "-90deg" }}>
      <circle
        className="timer-background"
        r="68"
        cx="80"
        cy="80"
        fill="transparent"
        strokeWidth="22px"
      />
      <circle
        className="timer-bar"
        r="68"
        cx="80"
        cy="80"
        fill="transparent"
        strokeWidth="12px"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        className="timer-text"
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        style={{ rotate: "90deg", transformOrigin: '50% 50%' }}>
        {timeLeft}
      </text>

    </svg>
  );
}

export default Timer;
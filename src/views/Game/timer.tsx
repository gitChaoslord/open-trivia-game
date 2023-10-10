import { gameDuration, gameEndingIndicator } from '@constants/game';
import { useAppSelector } from '@store/index';
import classnames from 'classnames';
import React from 'react';

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
        key={timeLeft}
        className={classnames("timer-text", { "animate-heartbeat": gameEndingIndicator >= timeLeft })}
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
      >
        {timeLeft}
      </text>

    </svg>
  );
}

export default Timer;
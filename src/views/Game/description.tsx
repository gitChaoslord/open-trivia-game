import { useAppSelector } from '@store/index';
import React from 'react';

const Description: React.FC = () => {
  const description = useAppSelector((state) => state.game.currectQuestionDescription);

  // Key is added here to force re-render the node in order for the animation to play
  return (
    <h3 className="description" key={description}>
      {description}
    </h3>
  )
}
export default Description;
import React from 'react'
import { useAppSelector } from '@store/index'

const Description: React.FC = () => {
  const description = useAppSelector((state) => state.game.currectQuestionDescription);

  // Key is added here to force re-render the node in order for the animation to play
  return (
    <p className="p-7 bg-white rounded border-b border-indigo-500 shadow animate-fade-in" key={description}>
      {description}
    </p>
  )
}
export default Description;
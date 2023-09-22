import React from 'react'
import { useAppSelector } from '../../store'

const Description: React.FC = () => {
  const description = useAppSelector((state) => state.game.currectQuestionDescription);

  return (
    <p className="p-7 bg-white rounded shadow">{description}</p>
  )
}
export default Description;
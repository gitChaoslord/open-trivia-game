import type { Answer } from '@models/game';
import React from 'react';

interface PropTypes {
  answer: Answer
}

const ResultsAnswer: React.FC<PropTypes> = ({ answer }) => {
  return (
    <div className="border-b-2 text-lg border-primary flex lg:flex-row flex-col justify-between bg-content text-content-contrast mb-2 rounded lg:px-2">
      <p className="py-2 lg:px-2 px-4">
        {answer.question}
      </p>
      <p className={`p-2 mx-2 text-xl text-center ${answer.is_correct ? 'text-success' : 'text-danger'}`}>
        {answer.answer.text}
      </p>
    </div>
  )
}
export default ResultsAnswer;
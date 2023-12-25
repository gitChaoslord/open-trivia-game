import Button from '@components/button';
import { RESULTS_REVEAL_ANSWER } from '@constants/strings';
import type { Answer } from '@models/game';
import React from 'react';
import classnames from "classnames";

interface PropTypes {
  answer: Answer
}

const ResultsAnswer: React.FC<PropTypes> = ({ answer }) => {
  const [isRevealed, setIsRevealed] = React.useState<boolean>(false);
  const { question, is_correct: isCorrect, correct_answer } = answer;

  const handleRevealAnswer = () => setIsRevealed(true);

  return (
    <div className="border-b-2 p-2 lg:p-4 text-lg border-primary bg-content text-content-contrast rounded grid gap-3">

      <p className="text-xl">
        {question}
      </p>
      <p className={classnames("text-lg", { "text-danger": !isCorrect, "text-success": isCorrect })}>
        {answer.answer.text}
      </p>

      {!isCorrect && <React.Fragment>
        {!isRevealed && <Button className="btn-primary mx-auto lg:mr-auto lg:ml-0" onClick={handleRevealAnswer}>
          {RESULTS_REVEAL_ANSWER}
        </Button>}
        {isRevealed && <p className="text-xl py-2">
          {correct_answer.text}
        </p>}
      </React.Fragment>}
    </div>
  )
}
export default ResultsAnswer;
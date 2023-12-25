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
    <div className="results__answer">

      <p>
        {question}
      </p>
      <p className={classnames({ "text-danger": !isCorrect, "text-success": isCorrect })}>
        {answer.answer.text}
      </p>

      {!isCorrect && <React.Fragment>

        {!isRevealed && <Button className="btn-primary results__answer-reveal-action" onClick={handleRevealAnswer}>
          {RESULTS_REVEAL_ANSWER}
        </Button>}

        {isRevealed && <p className="py-2 font-semibold">
          {correct_answer.text}
        </p>}

      </React.Fragment>}
    </div>
  )
}
export default ResultsAnswer;
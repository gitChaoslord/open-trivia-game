import Button from '@components/button';
import { RESULTS_ANSWER_CHOICE, RESULTS_REVEAL_ANSWER } from '@constants/strings';
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
      <p>
        {RESULTS_ANSWER_CHOICE}{": "}<span className={classnames({ "text-danger": !isCorrect, "text-success": isCorrect })}>{answer.answer.text}</span>
      </p>

      {!isCorrect && <React.Fragment>

        {!isRevealed && <Button className="btn-primary results__reveal-action" onClick={handleRevealAnswer}>
          {RESULTS_REVEAL_ANSWER}
        </Button>}

        {isRevealed && <p className="results__reveal-correct">
          {correct_answer.text}
        </p>}

      </React.Fragment>}
    </div>
  )
}
export default ResultsAnswer;
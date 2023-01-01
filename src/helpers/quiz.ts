interface CleanAnswersResult {
  correctAnswer?: string;
  incorrectAnswers?: string[]
}

export const cleanAnswersHtml = ({ correctAnswer = "", incorrectAnswers = [] }: CleanAnswersResult) => {

  const parser = new DOMParser();

  const correct_answer = parser.parseFromString(correctAnswer, "text/html").documentElement.textContent || correctAnswer;

  const incorrect_answers = incorrectAnswers.map((answer) => {
    return parser.parseFromString(answer, "text/html").documentElement.textContent || answer;
  })

  return {
    correct_answer,
    incorrect_answers
  }
}
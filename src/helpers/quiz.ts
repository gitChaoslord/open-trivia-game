import { Question } from "../models/Quiz";

export const cleanQuestionContent = ({ question, correct_answer, incorrect_answers, ...props }: Question) => {

  const parser = new DOMParser();

  const description = parser.parseFromString(question, "text/html").documentElement.textContent || question;

  const correctAnswer = parser.parseFromString(correct_answer, "text/html").documentElement.textContent || correct_answer;

  const incorrectAnswers = incorrect_answers.map((answer) => {
    return parser.parseFromString(answer, "text/html").documentElement.textContent || answer;
  })

  return {
    question: description,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
    ...props
  }
}
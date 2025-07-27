import type { Category, TDBQuestion, UpdatedQuestion } from "@/models/game";
import { v4 as uuidv4 } from "uuid";

export const constructCategories = (categories: {
  id: number;
  name: string
}[]): Category[] => {
  const result: { label: string, code: string }[] = []
  for (const cat of categories) {
    result.push({ code: cat.id.toString(), label: cat.name })
  }
  return result;
}

export const cleanQuestionContent = ({ question, correct_answer, incorrect_answers, ...props }: TDBQuestion): UpdatedQuestion => {

  const parser = new DOMParser();

  const description = parser.parseFromString(question, "text/html").documentElement.textContent || question;

  const correctAnswer = {
    id: uuidv4(),
    text: parser.parseFromString(correct_answer, "text/html").documentElement.textContent || correct_answer
  }

  const incorrectAnswers = incorrect_answers.map((answer) => {
    return {
      id: uuidv4(),
      text: parser.parseFromString(answer, "text/html").documentElement.textContent || answer
    }
  })

  return {
    question: description,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
    ...props
  }
}
import { createSlice } from "@reduxjs/toolkit";
import { Question } from '../../models/Question';
import { Answer } from '../../models/Answer';

interface TriviaState {
    questions: Question[],
    error: string | null
    score: number,
    currentQuestionIndex: number,
    answers: Answer[]
}

const initialState: TriviaState = {
    questions: [],
    error: null,
    score: 0,
    currentQuestionIndex: 0,
    answers: []
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        fetchQuestionsSuccess(state, action): void {
            state.questions = action.payload;
            state.score = 0;
            state.currentQuestionIndex = 0;
            state.answers = [];
        },
        fetchQuestionsFail(state, action): void {
            state.error = action.payload;
        },
        answerQuestion(state, action): void {
            const currentQuestion = state.questions[state.currentQuestionIndex];

            state.score += action.payload.answer === currentQuestion.correct_answer ? 1 : 0;

            state.answers.push({
                question: currentQuestion.question,
                answer: action.payload.answer,
                correct_answer: currentQuestion.correct_answer,
                is_correct: action.payload.answer === currentQuestion.correct_answer
            });
        },
        nextQuestion(state, action): void {
            state.currentQuestionIndex += 1;
        }
    },
})

export const { fetchQuestionsSuccess, fetchQuestionsFail, answerQuestion, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
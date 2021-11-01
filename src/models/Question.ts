export class Question {

    category: string;
    question: string;
    correct_answer: string;
    incorrect_answer: string;

    constructor(properties?: Question) {
        this.category = properties?.category || '';
        this.question = properties?.question || '';
        this.correct_answer = properties?.correct_answer || '';
        this.incorrect_answer = properties?.incorrect_answer || '';
    }
}
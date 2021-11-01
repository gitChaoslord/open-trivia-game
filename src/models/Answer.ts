export class Answer {

    question: string;
    answer: string;
    correct_answer: string;
    is_correct: boolean;

    constructor(properties?: Answer) {
        this.question = properties?.question || '';
        this.answer = properties?.answer || '';
        this.correct_answer = properties?.correct_answer || '';
        this.is_correct = properties?.is_correct || false; // Note: is this correct? 
    }
}
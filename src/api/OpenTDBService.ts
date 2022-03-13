import { GameSettings } from "../models/Game";
import { Question } from "../models/Quiz";

interface GetQuestionsResponse {
    response_code: number;
    results?: Question[];
}

export default class OpenTDBService {
    baseUrl: string = 'https://opentdb.com/api.php';

    constructor(url?: string) {
        if (url) {
            this.baseUrl = url
        }
    }

    async getQuestions(payload: GameSettings): Promise<GetQuestionsResponse> {
        let finalUrl = this.baseUrl;
        finalUrl += `?amount=${payload.questions}`;
        finalUrl += `${payload?.type === 'all' ? '' : `&type=${payload.type}`}`;
        finalUrl += `${payload?.difficulty === 'any' ? '' : `&difficulty=${payload.difficulty}`}`;
        finalUrl += `${payload?.category === 10 ? '' : `&category=${payload.category}`}`;

        try {
            const response: any = await fetch(finalUrl);
            return await Promise.resolve(response.json());
        } catch (error: any) {
            return await Promise.reject(error)
        }
    }
}
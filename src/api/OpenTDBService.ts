import { GameSettings } from "../models/Game";
import { Question, Category } from "../models/Quiz";

interface GetQuestionsResponse {
  response_code: number;
  results: Question[];
}

interface GetCategoriesResponse {
  trivia_categories: Category[]
}

export default class OpenTDBService {
  baseUrl = 'https://opentdb.com';

  constructor(url?: string) {
    if (url) {
      this.baseUrl = url
    }
  }

  async getCategories(): Promise<GetCategoriesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api_category.php`);
      return await Promise.resolve(response.json());
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async getQuestions(payload: GameSettings): Promise<GetQuestionsResponse> {
    let finalUrl = `${this.baseUrl}/api.php`;
    finalUrl += `?amount=${payload.questions}`;
    finalUrl += `${payload?.type === 'all' ? '' : `&type=${payload.type}`}`;
    finalUrl += `${payload?.difficulty === 'any' ? '' : `&difficulty=${payload.difficulty}`}`;
    // finalUrl += `${payload?.category === 10 ? '' : `&category=${payload.category}`}`;
    finalUrl += `${payload?.category ? `&category=${payload.category}` : ""}`;

    try {
      const response: any = await fetch(finalUrl);
      return await Promise.resolve(response.json());
    } catch (error: any) {
      return await Promise.reject(error)
    }
  }
}
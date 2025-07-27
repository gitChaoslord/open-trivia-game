import type { GameSettings, TDBQuestion } from "@/models/game";

interface GetQuestionsResponse {
  response_code: number;
  results: TDBQuestion[];
}

interface GetCategoriesResponse {
  trivia_categories: {
    id: number;
    name: string;
  }[]
}

export default class OpenTDBService {
  baseUrl = 'https://opentdb.com';

  constructor(url?: string) {
    if (url) {
      this.baseUrl = url
    }
  }

  async retrieveCategories(): Promise<GetCategoriesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api_category.php`);
      return await Promise.resolve(response.json());
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async retrieveQuestions({ number, type, difficulty, category }: GameSettings): Promise<GetQuestionsResponse> {

    const queryUrl = new URL("/api.php", this.baseUrl);

    queryUrl.searchParams.set('amount', number);
    if (difficulty !== 'any') queryUrl.searchParams.set('difficulty', difficulty);
    // INFO: '0' is a custom category i created to represent any category
    if (category !== '0') queryUrl.searchParams.set('category', category);
    if (type !== 'all') queryUrl.searchParams.set('type', type);

    try {
      const response = await fetch(queryUrl);
      return await Promise.resolve(response.json());
    } catch (error) {
      return await Promise.reject(error)
    }
  }
}
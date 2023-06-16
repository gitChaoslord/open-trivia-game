import { Category } from "../models/Quiz";

export const constructCategories = (categories: Category[]) => {
  const result: { label: string, code: number }[] = []
  for (const cat of categories) {
    result.push({ code: cat.id, label: cat.name })
  }
  return result;
}
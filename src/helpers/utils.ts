import { Category } from "../models/Quiz";

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
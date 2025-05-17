import type { Meal } from "../types.ts";

export interface IMealStorageInterface {
  getMealsForInterval: (from: Date, to: Date) => Promise<Meal[]>;
  addMeal: (meal: Meal) => Promise<Meal>;
  removeMeal: (meal: Meal) => Promise<void>;
}

import type { MealTemplate } from "../types.ts";

export interface IMealTemplateStorageInterface {
  addMealTemplate: (template: MealTemplate) => Promise<MealTemplate>;
  removeMealTemplate: (template: MealTemplate) => Promise<void>;
  getMealTemplates: () => Promise<MealTemplate[]>;
}

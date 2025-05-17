import { createMealTemplatesStore } from "./migrations/1_createMealTemplatesStore.ts";
import { initMealsDb } from "./migrations/0_initMealsDb.ts";
import type { IMealStorageInterface } from "../core/meals/storageInterface.ts";
import type { IMealTemplateStorageInterface } from "../core/mealTemplates/storageInterface.ts";
import { addMeal, getMealsForInterval, removeMeal } from "./meals.ts";
import {
  addMealTemplate,
  getMealTemplates,
  removeMealTemplate,
} from "./mealTemplates.ts";

const FOOD_DIARY_DB_NAME = "foodDiary";
const DB_VERSION = 2;

let foodDiaryDB: IDBDatabase | null = null;

const getFoodDiaryDB = async (): Promise<IDBDatabase> => {
  if (foodDiaryDB) return foodDiaryDB;

  return new Promise((resolve) => {
    const request = indexedDB.open(FOOD_DIARY_DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      upgradeDB(request.result, event.oldVersion);
    };
    request.onsuccess = () => {
      foodDiaryDB = request.result;
      resolve(request.result);
    };
  });
};

const upgradeDB = (db: IDBDatabase, oldVersion: number) => {
  switch (oldVersion) {
    case 0:
      initMealsDb(db);
    case 1:
      createMealTemplatesStore(db);
  }
};

export const indexedDBAdapter: IMealStorageInterface &
  IMealTemplateStorageInterface = {
  addMeal: addMeal(getFoodDiaryDB),
  removeMeal: removeMeal(getFoodDiaryDB),
  getMealsForInterval: getMealsForInterval(getFoodDiaryDB),

  addMealTemplate: addMealTemplate(getFoodDiaryDB),
  removeMealTemplate: removeMealTemplate(getFoodDiaryDB),
  getMealTemplates: getMealTemplates(getFoodDiaryDB),
};

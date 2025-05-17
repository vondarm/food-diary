import {
  MEAL_TEMPLATE_ID_PROPERTY,
  MEAL_TEMPLATES_STORE_NAME,
} from "../mealTemplates.ts";

export const createMealTemplatesStore = (db: IDBDatabase) => {
  db.createObjectStore(MEAL_TEMPLATES_STORE_NAME, {
    keyPath: MEAL_TEMPLATE_ID_PROPERTY,
  });
};

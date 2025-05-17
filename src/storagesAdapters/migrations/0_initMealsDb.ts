import {
  MEAL_CREATED_AT_PROPERTY,
  MEAL_ID_PROPERTY,
  MEALS_STORE_NAME,
} from "../meals.ts";

export const initMealsDb = (db: IDBDatabase) => {
  const mealsStore = db.createObjectStore(MEALS_STORE_NAME, {
    keyPath: MEAL_ID_PROPERTY,
  });
  mealsStore.createIndex(MEAL_CREATED_AT_PROPERTY, MEAL_CREATED_AT_PROPERTY, {
    unique: false,
  });
};

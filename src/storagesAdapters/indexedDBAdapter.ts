import type { Meal } from "../core/types.ts";
import type { IStorageInterface } from "../core/storageInterface.ts";

const FOOD_DIARY_DB_NAME = "foodDiary";
const MEALS_STORE_NAME = "meals";
const MEAL_ID_PROPERTY = "uuid";
const MEAL_CREATED_AT_PROPERTY = "dateTime";

let foodDiaryDB: IDBDatabase | null = null;

const getFoodDiaryDB = async (): Promise<IDBDatabase> => {
  if (foodDiaryDB) return foodDiaryDB;

  return new Promise((resolve) => {
    const request = indexedDB.open(FOOD_DIARY_DB_NAME, 1);
    request.onupgradeneeded = () => initDB(request.result);
    request.onsuccess = () => {
      foodDiaryDB = request.result;
      resolve(request.result);
    };
  });
};

const initDB = (db: IDBDatabase) => {
  const mealsStore = db.createObjectStore(MEALS_STORE_NAME, {
    keyPath: MEAL_ID_PROPERTY,
  });
  mealsStore.createIndex(MEAL_CREATED_AT_PROPERTY, MEAL_CREATED_AT_PROPERTY, {
    unique: false,
  });
};

const getMealsForInterval: IStorageInterface["getMealsForInterval"] = async (
  from,
  to,
) => {
  const foodDiaryDB = await getFoodDiaryDB();
  const tx = foodDiaryDB.transaction(MEALS_STORE_NAME, "readonly");
  const store = tx.objectStore(MEALS_STORE_NAME);
  const index = store.index(MEAL_CREATED_AT_PROPERTY);

  const range = IDBKeyRange.bound(from, to, false, true);
  const request = index.getAll(range);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = reject;
  });
};

const addMeal: IStorageInterface["addMeal"] = async (meal: Meal) => {
  const foodDiaryDB = await getFoodDiaryDB();
  const tx = foodDiaryDB.transaction(MEALS_STORE_NAME, "readwrite");
  const store = tx.objectStore(MEALS_STORE_NAME);
  store.add(meal);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(meal);
    tx.onerror = reject;
  });
};

const removeMeal: IStorageInterface["removeMeal"] = async (meal: Meal) => {
  const foodDiaryDB = await getFoodDiaryDB();
  const tx = foodDiaryDB.transaction(MEALS_STORE_NAME, "readwrite");
  const store = tx.objectStore(MEALS_STORE_NAME);
  store.delete(meal.uuid);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = reject;
  });
};

export const indexedDBAdapter: IStorageInterface = {
  removeMeal,
  addMeal,
  getMealsForInterval,
};

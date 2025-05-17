import type { IMealStorageInterface } from "../core/meals/storageInterface.ts";
import type { Meal } from "../core/types.ts";
import type { WithDBGetter } from "./types.ts";

export const MEALS_STORE_NAME = "meals";
export const MEAL_ID_PROPERTY = "uuid";
export const MEAL_CREATED_AT_PROPERTY = "dateTime";

const getMealsForInterval: WithDBGetter<
  IMealStorageInterface["getMealsForInterval"]
> = (getDB) => async (from, to) => {
  const foodDiaryDB = await getDB();
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

const addMeal: WithDBGetter<IMealStorageInterface["addMeal"]> =
  (getDB) => async (meal: Meal) => {
    const foodDiaryDB = await getDB();
    const tx = foodDiaryDB.transaction(MEALS_STORE_NAME, "readwrite");
    const store = tx.objectStore(MEALS_STORE_NAME);
    store.add(meal);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(meal);
      tx.onerror = reject;
    });
  };

const removeMeal: WithDBGetter<IMealStorageInterface["removeMeal"]> =
  (getDB) => async (meal: Meal) => {
    const foodDiaryDB = await getDB();
    const tx = foodDiaryDB.transaction(MEALS_STORE_NAME, "readwrite");
    const store = tx.objectStore(MEALS_STORE_NAME);
    store.delete(meal.uuid);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = reject;
    });
  };

export { removeMeal, addMeal, getMealsForInterval };

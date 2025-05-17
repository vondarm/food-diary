import type { WithDBGetter } from "./types.ts";
import type { IMealTemplateStorageInterface } from "../core/mealTemplates/storageInterface.ts";

export const MEAL_TEMPLATES_STORE_NAME = "mealTemplates";
export const MEAL_TEMPLATE_ID_PROPERTY = "uuid";

const getMealTemplates: WithDBGetter<
  IMealTemplateStorageInterface["getMealTemplates"]
> = (getDB) => async () => {
  const db = await getDB();

  const tx = db.transaction(MEAL_TEMPLATES_STORE_NAME, "readonly");
  const store = tx.objectStore(MEAL_TEMPLATES_STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = reject;
  });
};

const addMealTemplate: WithDBGetter<
  IMealTemplateStorageInterface["addMealTemplate"]
> = (getDB) => async (mealTemplate) => {
  const db = await getDB();

  const tx = db.transaction(MEAL_TEMPLATES_STORE_NAME, "readwrite");
  const store = tx.objectStore(MEAL_TEMPLATES_STORE_NAME);
  store.add(mealTemplate);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(mealTemplate);
    tx.onerror = reject;
  });
};

const removeMealTemplate: WithDBGetter<
  IMealTemplateStorageInterface["removeMealTemplate"]
> = (getDB) => async (mealTemplate) => {
  const foodDiaryDB = await getDB();
  const tx = foodDiaryDB.transaction(MEAL_TEMPLATES_STORE_NAME, "readwrite");
  const store = tx.objectStore(MEAL_TEMPLATES_STORE_NAME);
  store.delete(mealTemplate.uuid);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = reject;
  });
};

export { getMealTemplates, addMealTemplate, removeMealTemplate };

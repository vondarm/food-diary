import { initFoodDiary } from "../core/meals";
import { indexedDBAdapter } from "../storagesAdapters/indexedDBAdapter.ts";
import { createSignal } from "@react-rxjs/utils";
import type { Meal } from "../core/types.ts";
import { bind } from "@react-rxjs/core";

const [addMeal$, onAddMeal] = createSignal<Meal>();
const [removeMeal$, onRemoveMeal] = createSignal<Meal>();

const foodDiary = initFoodDiary(indexedDBAdapter, {
  add$: addMeal$,
  remove$: removeMeal$,
});

const [useMealsForDay] = bind(foodDiary.getMealsForDay$, []);
const [useKcalForDay] = bind(foodDiary.getFullKcalForDay$, 0);

export { onAddMeal, onRemoveMeal, useKcalForDay, useMealsForDay };

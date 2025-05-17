import { initMeals } from "../core/meals";
import { indexedDBAdapter } from "../storagesAdapters/indexedDBAdapter.ts";
import { createSignal } from "@react-rxjs/utils";
import type { Meal, MealTemplate } from "../core/types.ts";
import { bind } from "@react-rxjs/core";
import { initMealTemplates } from "../core/mealTemplates";

const [addMeal$, onAddMeal] = createSignal<Meal>();
const [removeMeal$, onRemoveMeal] = createSignal<Meal>();

const [addMealTemplate$, onAddMealTemplate] = createSignal<MealTemplate>();
const [removeMealTemplate$, onRemoveMealTemplate] =
  createSignal<MealTemplate>();

const meals = initMeals(indexedDBAdapter, {
  add$: addMeal$,
  remove$: removeMeal$,
});
const mealTemplates = initMealTemplates(indexedDBAdapter, {
  add$: addMealTemplate$,
  remove$: removeMealTemplate$,
});

const [useMealsForDay] = bind(meals.getMealsForDay$, []);
const [useKcalForDay] = bind(meals.getFullKcalForDay$, 0);

const [useMealTemplates] = bind(mealTemplates.getMealTemplates$, []);

export {
  onAddMeal,
  onRemoveMeal,
  useKcalForDay,
  useMealsForDay,
  useMealTemplates,
  onAddMealTemplate,
  onRemoveMealTemplate,
};

import { initMeals } from "../core/meals";
import { indexedDBAdapter } from "../storagesAdapters/indexedDBAdapter.ts";
import { createSignal } from "@react-rxjs/utils";
import type { Meal, MealTemplate, PersonalSettings } from "../core/types.ts";
import { bind } from "@react-rxjs/core";
import { initMealTemplates } from "../core/mealTemplates";
import { initPersonalSettings } from "../core/personalSettings";

const [addMeal$, onAddMeal] = createSignal<Meal>();
const [removeMeal$, onRemoveMeal] = createSignal<Meal>();

const [addMealTemplate$, onAddMealTemplate] = createSignal<MealTemplate>();
const [removeMealTemplate$, onRemoveMealTemplate] =
  createSignal<MealTemplate>();
const [updatePersonalSettings$, onUpdatePersonalSettings] =
  createSignal<PersonalSettings>();

const meals = initMeals(indexedDBAdapter, {
  add$: addMeal$,
  remove$: removeMeal$,
});
const mealTemplates = initMealTemplates(indexedDBAdapter, {
  add$: addMealTemplate$,
  remove$: removeMealTemplate$,
});
const personalSettings = initPersonalSettings(indexedDBAdapter, {
  update$: updatePersonalSettings$,
});

const [useMealsForDay] = bind(meals.getMealsForDay$, []);
const [useKcalForDay] = bind(meals.getFullKcalForDay$, 0);
const [useAverageKcalForWeek] = bind(meals.getAverageKcalForWeek$, 0);
const [useMealTemplates] = bind(mealTemplates.getMealTemplates$, []);

const [usePersonalSettings] = bind(personalSettings.personalSettings$);

export {
  onAddMeal,
  onRemoveMeal,
  useKcalForDay,
  useMealsForDay,
  useAverageKcalForWeek,
  useMealTemplates,
  onAddMealTemplate,
  onRemoveMealTemplate,
  usePersonalSettings,
  onUpdatePersonalSettings,
};

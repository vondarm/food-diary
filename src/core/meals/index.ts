import type { IStorageInterface } from "../storageInterface.ts";
import type { Meal } from "../types.ts";
import { map, share, tap } from "rxjs";
import type { Dayjs } from "dayjs";
import { getMealsForDay$ } from "./mealsForDay";
import type { IMealActions } from "./actions.ts";

export const getFullKcal = (meal: Meal) => (meal.weight / 100) * meal.kcal;

const getFullKcalForMeals = (meals: Meal[]) => {
  return meals.reduce((sum: number, meal) => sum + getFullKcal(meal), 0);
};

export const initFoodDiary = (
  storage: IStorageInterface,
  actions: IMealActions,
) => {
  // TODO обработка ошибок обращения к внешнему апи
  const requestActions: IMealActions = {
    add$: actions.add$.pipe(
      tap((meal) => storage.addMeal(meal)),
      share(),
    ),
    remove$: actions.remove$.pipe(
      tap((meal) => storage.removeMeal(meal)),
      share(),
    ),
  };

  const getMealsForDayWithStorage$ = getMealsForDay$(
    storage.getMealsForInterval,
    requestActions,
  );

  const getFullKcalForDay$ = (date: Dayjs) => {
    return getMealsForDayWithStorage$(date).pipe(map(getFullKcalForMeals));
  };

  return {
    getMealsForDay$: getMealsForDayWithStorage$,
    addMeal: async (meal: Meal) => {
      await storage.addMeal(meal);
    },
    removeMeal: async (meal: Meal) => {
      await storage.removeMeal(meal);
    },
    getFullKcalForDay$,
  };
};

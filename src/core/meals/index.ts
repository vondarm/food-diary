import type { IMealStorageInterface } from "./storageInterface.ts";
import type { Meal } from "../types.ts";
import { map, share, tap } from "rxjs";
import type { Dayjs } from "dayjs";
import { getMealsForDay$ } from "./mealsForDay";
import type { IMealActions } from "./actionsInterface.ts";

export const getFullKcal = (meal: Meal) => (meal.weight / 100) * meal.kcal;

const getFullKcalForMeals = (meals: Meal[]) => {
  return meals.reduce((sum: number, meal) => sum + getFullKcal(meal), 0);
};

export const initMeals = (
  storage: IMealStorageInterface,
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

  requestActions.add$.subscribe();
  requestActions.remove$.subscribe();

  const getMealsForDayWithStorage$ = getMealsForDay$(
    storage.getMealsForInterval,
    requestActions,
  );

  const getFullKcalForDay$ = (date: Dayjs) => {
    return getMealsForDayWithStorage$(date).pipe(map(getFullKcalForMeals));
  };

  return {
    getMealsForDay$: getMealsForDayWithStorage$,
    getFullKcalForDay$,
  };
};

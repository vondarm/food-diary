import type { IMealStorageInterface } from "./storageInterface.ts";
import type { Meal } from "../types.ts";
import { map, share, tap } from "rxjs";
import type { Dayjs } from "dayjs";
import type { IMealActions } from "./actionsInterface.ts";
import { createMealsListForWeek$ } from "./createMealsForWeek.ts";
import { createMealsListForDay$ } from "./createMealsListForDay.ts";

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

  const getMealsForDayWithStorage$ = createMealsListForDay$(
    storage.getMealsForInterval,
    requestActions,
  );
  const getMealsForWeekWithStorage$ = createMealsListForWeek$(
    storage.getMealsForInterval,
    requestActions,
  );

  const getFullKcalForDay$ = (date: Dayjs) => {
    return getMealsForDayWithStorage$(date).pipe(map(getFullKcalForMeals));
  };
  const getAverageKcalForWeek$ = (date: Dayjs) => {
    return getMealsForWeekWithStorage$(date).pipe(
      map(getFullKcalForMeals),
      map(
        (sum) =>
          (sum / date.startOf("day").diff(date.weekday(0), "day")),
      ),
    );
  };

  return {
    getMealsForDay$: getMealsForDayWithStorage$,
    getFullKcalForDay$,
    getAverageKcalForWeek$,
  };
};

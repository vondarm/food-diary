import dayjs, { Dayjs } from "dayjs";
import {
  createListData,
  mapEntityToAddAction,
  mapEntityToRemoveAction,
} from "../cache.ts";
import type { Meal } from "../types.ts";
import { filter, map, merge } from "rxjs";
import type { IMealActions } from "./actionsInterface.ts";

export const createMealsListForInterval$ =
  (
    fetchMeals: (from: Date, to: Date) => Promise<Meal[]>,
    mealActions: IMealActions,
  ) =>
  ({ from, to }: { from: Dayjs; to: Dayjs }) =>
    createListData<Meal>(
      () => fetchMeals(from.toDate(), to.toDate()),
      merge(
        mealActions.add$.pipe(
          filter((newMeal) =>
            dayjs(newMeal.dateTime).isBetween(from, to, null, "[)"),
          ),
          map(mapEntityToAddAction),
        ),
        mealActions.remove$.pipe(
          filter((newMeal) =>
            dayjs(newMeal.dateTime).isBetween(from, to, null, "[)"),
          ),
          map(mapEntityToRemoveAction),
        ),
      ),
    );

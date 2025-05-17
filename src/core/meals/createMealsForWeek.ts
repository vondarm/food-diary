import { Dayjs } from "dayjs";
import type { Meal } from "../types.ts";
import type { IMealActions } from "./actionsInterface.ts";
import { createMealsListForInterval$ } from "./createMealsListForInterval.ts";

export const createMealsListForWeek$ =
  (
    fetchMeals: (from: Date, to: Date) => Promise<Meal[]>,
    mealActions: IMealActions,
  ) =>
  (date: Dayjs) => {
    const from = date.locale("ru").weekday(0).startOf("day");
    const to = date.startOf("day");

    return createMealsListForInterval$(fetchMeals, mealActions)({ from, to });
  };

import { Dayjs } from "dayjs";
import type { Meal } from "../types.ts";
import type { IMealActions } from "./actionsInterface.ts";
import { createMealsListForInterval$ } from "./createMealsListForInterval.ts";

export const createMealsListForDay$ =
  (
    fetchMeals: (from: Date, to: Date) => Promise<Meal[]>,
    mealActions: IMealActions,
  ) =>
  (date: Dayjs) => {
    const from = date.startOf("day");
    const to = from.add(1, "day");

    return createMealsListForInterval$(fetchMeals, mealActions)({ from, to });
  };

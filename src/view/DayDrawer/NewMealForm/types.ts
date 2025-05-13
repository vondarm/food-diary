import type { Dayjs } from "dayjs";

export type NewMealFormData = {
  title?: string;
  kcal?: number;
  weight?: number;
  time: Dayjs | null;
};
export type ValidMealFormData = {
  title: string;
  kcal: number;
  weight: number;
  time: Dayjs;
};

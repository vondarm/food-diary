export type Meal = {
  uuid: string;
  dateTime: Date;
  name: string;
  kcal: number;
  weight: number;
};

export type MealTemplate = {
  uuid: string;
  name: string;
  kcal: number;
  weight: number;
};

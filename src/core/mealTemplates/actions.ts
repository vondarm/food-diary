import type { Observable } from "rxjs";
import type { MealTemplate } from "../types.ts";

export interface IMealTemplateActions {
  add$: Observable<MealTemplate>;
  remove$: Observable<MealTemplate>;
}

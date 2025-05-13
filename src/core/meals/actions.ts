import type { Meal } from "../types.ts";
import type { Observable } from "rxjs";

export interface IMealActions {
  add$: Observable<Meal>;
  remove$: Observable<Meal>;
}

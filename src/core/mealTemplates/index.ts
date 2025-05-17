import type { IMealTemplateActions } from "./actions.ts";
import { share, tap, merge, map } from "rxjs";
import type { IMealTemplateStorageInterface } from "./storageInterface.ts";
import {
  createListData,
  mapEntityToAddAction,
  mapEntityToRemoveAction,
} from "../cache.ts";

export const initMealTemplates = (
  storage: IMealTemplateStorageInterface,
  actions: IMealTemplateActions,
) => {
  const requestActions: IMealTemplateActions = {
    add$: actions.add$.pipe(
      tap((mealTemplate) => storage.addMealTemplate(mealTemplate)),
      share(),
    ),
    remove$: actions.remove$.pipe(
      tap((mealTemplate) => storage.removeMealTemplate(mealTemplate)),
      share(),
    ),
  };

  requestActions.add$.subscribe();
  requestActions.remove$.subscribe();

  const getMealTemplates$ = () =>
    createListData(
      storage.getMealTemplates,
      merge(
        requestActions.add$.pipe(map(mapEntityToAddAction)),
        requestActions.remove$.pipe(map(mapEntityToRemoveAction)),
      ),
    );

  return { getMealTemplates$ };
};

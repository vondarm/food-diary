import type { IPersonalSettingsStorage } from "./storageInterface.ts";
import { createData, mapEntityToUpdateAction } from "../cache.ts";
import type { IPersonalSettingsActions } from "./actionsInterface.ts";
import { map, tap } from "rxjs";

export const initPersonalSettings = (
  storage: IPersonalSettingsStorage,
  actions: IPersonalSettingsActions,
) => {
  const requestActions = {
    update$: actions.update$.pipe(tap()),
  };

  requestActions.update$.subscribe();

  const reactiveActions$ = requestActions.update$.pipe(
    map(mapEntityToUpdateAction),
  );

  const personalSettings$ = createData(
    storage.getPersonalSettings,
    reactiveActions$,
  );

  return {
    personalSettings$,
  };
};

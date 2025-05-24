import type { Observable } from "rxjs";
import type { PersonalSettings } from "../types.ts";

export interface IPersonalSettingsActions {
  update$: Observable<PersonalSettings>;
}

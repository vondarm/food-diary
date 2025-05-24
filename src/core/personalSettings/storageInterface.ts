import type { PersonalSettings } from "../types.ts";

export interface IPersonalSettingsStorage {
  getPersonalSettings: () => Promise<PersonalSettings>;
  setPersonalSettings: (value: PersonalSettings) => void;
}

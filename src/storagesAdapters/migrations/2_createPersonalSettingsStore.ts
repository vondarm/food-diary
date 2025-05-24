import {
  PERSONAL_SETTINGS_ID_PROPERTY,
  PERSONAL_SETTINGS_STORE_NAME,
} from "../personalSettings.ts";

export const createPersonalSettingsStore = (db: IDBDatabase) => {
  db.createObjectStore(PERSONAL_SETTINGS_STORE_NAME, {
    keyPath: PERSONAL_SETTINGS_ID_PROPERTY,
  });
};

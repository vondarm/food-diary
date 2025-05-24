import type { WithDBGetter } from "./types.ts";
import type { IPersonalSettingsStorage } from "../core/personalSettings/storageInterface.ts";
import type { PersonalSettings } from "../core/types.ts";

const PERSONAL_SETTINGS_STORE_NAME = "personalSettings";
const PERSONAL_SETTINGS_ID_PROPERTY = "uuid";
const PERSONAL_SETTINGS_UUID: PersonalSettings["uuid"] = "_personal_settings";

const getPersonalSettings: WithDBGetter<
  IPersonalSettingsStorage["getPersonalSettings"]
> = (getDB) => async () => {
  const db = await getDB();

  const tx = db.transaction(PERSONAL_SETTINGS_STORE_NAME, "readonly");
  const store = tx.objectStore(PERSONAL_SETTINGS_STORE_NAME);
  const request = store.get(PERSONAL_SETTINGS_UUID);

  return new Promise<PersonalSettings>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result || {});
    request.onerror = reject;
  });
};

const setPersonalSettings: WithDBGetter<
  IPersonalSettingsStorage["setPersonalSettings"]
> = (getDb) => async (newSettings) => {
  const db = await getDb();

  const tx = db.transaction(PERSONAL_SETTINGS_STORE_NAME, "readwrite");
  const store = tx.objectStore(PERSONAL_SETTINGS_STORE_NAME);
  store.put(newSettings);

  return new Promise<PersonalSettings>((resolve, reject) => {
    tx.oncomplete = () => resolve(newSettings);
    tx.onerror = reject;
  });
};

export {
  PERSONAL_SETTINGS_STORE_NAME,
  PERSONAL_SETTINGS_ID_PROPERTY,
  getPersonalSettings,
  setPersonalSettings,
};

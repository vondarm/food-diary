export type WithDBGetter<T> = (getDB: () => Promise<IDBDatabase>) => T;

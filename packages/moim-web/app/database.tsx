import localforage from "localforage";
import { defaultMemoize } from "reselect";

export const getDatabase = defaultMemoize((storeName: string) =>
  localforage.createInstance({
    storeName,
  }),
);

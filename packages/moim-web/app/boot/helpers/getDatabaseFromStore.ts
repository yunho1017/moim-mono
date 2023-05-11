import { defaultMemoize } from "reselect";
import { getDatabase } from "app/database";
import { IAppStore } from "app/store";

export const getDatabaseStoreName = defaultMemoize(
  (groupId: Moim.Id, userId: Moim.Id | null | undefined) => {
    const storeName = `G:${groupId}@U:${userId || "undefined"}`;
    localStorage.setItem("CURRENT_STORE_NAME", storeName);
    return storeName;
  },
);

export function getDatabaseFromStore(store: IAppStore) {
  const { app } = store.getState();
  return getDatabase(
    getDatabaseStoreName(app.currentGroupId!, app.currentUserId),
  );
}

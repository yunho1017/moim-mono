import { getDatabase } from "app/database";
import { IAppState } from "app/rootReducer";
import { GROUP_ID } from "common/constants/keys";
import * as ExpiredInMemoryHelper from "common/helpers/expiredInMemoryHelper";
import { moimClientIdStoreName } from "../constants";

export function storeMoimClientId(state: IAppState): string {
  return state.app.currentGroupId || "";
}

export async function getMoimClientId(
  storeName: string | null,
): Promise<Moim.Id | null> {
  try {
    if (!storeName) return null;
    const data = await getDatabase(storeName).getItem<string | null>(
      moimClientIdStoreName,
    );
    ExpiredInMemoryHelper.set(GROUP_ID, data, -1);
    return data;
  } catch (error) {
    throw error;
  }
}

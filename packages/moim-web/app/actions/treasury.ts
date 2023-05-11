import axios from "axios";

import { TreasuryItemNormalizer } from "app/models";
import { ThunkPromiseResult } from "app/store";

import { loadEntities } from "./entity";
import { openSnackbar } from "./snackbar";

export function getTreasuryItem(
  itemId: Moim.Id,
): ThunkPromiseResult<Moim.Treasury.ITreasury | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const treasuryItem = await api.treasury.getTreasury(itemId);

      const normalized = TreasuryItemNormalizer(treasuryItem ?? null);
      dispatch(loadEntities(normalized.entities));
      return treasuryItem;
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text:
              rawError.response?.data.error.message ?? "error: treasury item",
            type: "error",
          }),
        );
      }
    }
  };
}

export function getTreasuryHistory(
  itemId: Moim.Id,
  paging?: Moim.IPaging,
  limit?: number,
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Treasury.ITransaction>> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const result = await api.treasury.getTreasuryHistory(
        itemId,
        paging,
        limit,
      );
      return result;
    } catch (rawError) {
      if (axios.isAxiosError(rawError) && !axios.isCancel(rawError)) {
        dispatch(
          openSnackbar({
            text:
              rawError.response?.data.error.message ??
              "error: treasury histories",
            type: "error",
          }),
        );
      }
      throw rawError;
    }
  };
}

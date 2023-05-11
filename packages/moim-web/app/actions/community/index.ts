import { CancelToken } from "axios";
import { ThunkPromiseResult } from "app/store";
import { AddEntities } from "../entity";
import { communityNormalizer } from "app/models";

export function getCommunity(cancelToken?: CancelToken): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const groupId = getState().app.currentGroupId;
    if (!groupId) {
      return;
    }

    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).community.getCommunity({ communityId: groupId }, cancelToken);

      dispatch(AddEntities(communityNormalizer(result).entities));
    } catch (rawError) {}
  };
}

export function getUsersBatch(params: {
  ids?: string[];
  addresses?: string[];
}): ThunkPromiseResult<Moim.Community.ICommunityUser[] | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    try {
      const users = await api.community.getUsersBatch(params);
      return users;
    } catch (rawError) {}
  };
}

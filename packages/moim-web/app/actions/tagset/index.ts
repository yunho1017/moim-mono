import { TagSetTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";
import { loadEntities } from "app/actions/entity";
import GroupAPI from "common/api/group";

import {
  tagItemSingleItemNormalizer,
  tagSetSingleItemNormalizer,
  tagSetListNormalizer,
} from "app/models/tagset";

export type TAG_SET_CREATE_TYPE = "set" | "value";

function createAction<T extends { type: TagSetTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startGetTagSets: () =>
    createAction({ type: TagSetTypes.START_FETCHING_TAG_SET }),
  succeededGetTagSets: (tagSets: Moim.IPaginatedListResponse<Moim.Id>) =>
    createAction({
      type: TagSetTypes.SUCCEED_FETCHING_TAG_SET,
      payload: { tagSets },
    }),
  failedGetTagSets: () =>
    createAction({ type: TagSetTypes.FAILED_FETCHING_TAG_SET }),

  startCreateTagSet: () =>
    createAction({ type: TagSetTypes.START_CREATE_TAG_SET }),
  succeededCreateTagSet: (createType: TAG_SET_CREATE_TYPE, tagSetId: Moim.Id) =>
    createAction({
      type: TagSetTypes.SUCCEED_CREATE_TAG_SET,
      payload: { createType, tagSetId },
    }),
  failedCreateTagSet: () =>
    createAction({ type: TagSetTypes.FAILED_CREATE_TAG_SET }),

  startDeleteTagSet: () =>
    createAction({ type: TagSetTypes.START_DELETE_TAG_SET }),
  succeededDeleteTagSet: (tagSetId: Moim.Id) =>
    createAction({
      type: TagSetTypes.SUCCEED_DELETE_TAG_SET,
      payload: { tagSetId },
    }),
  failedDeleteTagSet: () =>
    createAction({ type: TagSetTypes.FAILED_DELETE_TAG_SET }),

  startUpdateTagSet: () =>
    createAction({ type: TagSetTypes.START_UPDATE_TAG_SET }),
  succeededUpdateTagSet: () =>
    createAction({ type: TagSetTypes.SUCCEED_UPDATE_TAG_SET }),
  failedUpdateTagSet: () =>
    createAction({ type: TagSetTypes.FAILED_UPDATE_TAG_SET }),

  startAppendTagItemToSet: () =>
    createAction({ type: TagSetTypes.START_APPEND_TAG_ITEM_TO_SET }),
  succeededAppendTagItemToSet: (tagSetId: Moim.Id, tagItemId: Moim.Id) =>
    createAction({
      type: TagSetTypes.SUCCEED_APPEND_TAG_ITEM_TO_SET,
      payload: {
        tagSetId,
        tagItemId,
      },
    }),
  failedAppendTagItemToSet: () =>
    createAction({ type: TagSetTypes.FAILED_APPEND_TAG_ITEM_TO_SET }),

  startRemoveTagItemFromSet: () =>
    createAction({ type: TagSetTypes.START_REMOVE_TAG_ITEM_FROM_SET }),
  succeededRemoveTagItemFromSet: (tagSetId: Moim.Id, tagItemId: Moim.Id) =>
    createAction({
      type: TagSetTypes.SUCCEED_REMOVE_TAG_ITEM_FROM_SET,
      payload: {
        tagSetId,
        tagItemId,
      },
    }),
  failedRemoveTagItemFromSet: () =>
    createAction({ type: TagSetTypes.FAILED_REMOVE_TAG_ITEM_FROM_SET }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getTagSets(
  ...params: Parameters<typeof GroupAPI.prototype.getTagSet>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startGetTagSets());
    try {
      const result = tagSetListNormalizer(
        await apiSelector(getStore(), dispatch).group.getTagSet(...params),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeededGetTagSets(result.result));
    } catch (err) {
      dispatch(ActionCreators.failedGetTagSets());
    }
  };
}

export function createTagSet(
  type: TAG_SET_CREATE_TYPE,
  ...params: Parameters<typeof GroupAPI.prototype.createTagSet>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startCreateTagSet());
    try {
      const response = await apiSelector(
        getStore(),
        dispatch,
      ).group.createTagSet(...params);

      const result =
        type === "set"
          ? tagSetSingleItemNormalizer(response)
          : tagItemSingleItemNormalizer(
              response as Moim.ISingleItemResponse<Moim.TagSet.ITagItem>,
            );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeededCreateTagSet(type, result.result.data));
    } catch (err) {
      dispatch(ActionCreators.failedCreateTagSet());
    }
  };
}

export function deleteTagSets(
  ...params: Parameters<typeof GroupAPI.prototype.deleteTagSet>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startDeleteTagSet());
    try {
      await apiSelector(getStore(), dispatch).group.deleteTagSet(...params);
      dispatch(ActionCreators.succeededDeleteTagSet(params[0]));
    } catch (err) {
      dispatch(ActionCreators.failedDeleteTagSet());
    }
  };
}

export function updateTagSet(
  ...params: Parameters<typeof GroupAPI.prototype.putTagSet>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateTagSet());
    try {
      const response = await apiSelector(getStore(), dispatch).group.putTagSet(
        ...params,
      );

      const result = Boolean(
        (response.data as Moim.TagSet.ITagSet & Moim.TagSet.ITagItem).value,
      )
        ? tagSetSingleItemNormalizer(response)
        : tagItemSingleItemNormalizer(
            response as Moim.ISingleItemResponse<Moim.TagSet.ITagItem>,
          );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeededUpdateTagSet());
    } catch (err) {
      dispatch(ActionCreators.failedUpdateTagSet());
    }
  };
}

import { TagTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";
import { loadEntities, loadEntitiesDirect } from "app/actions/entity";
import TagAPI from "common/api/tag";

import { tagListNormalizer, tagSingleItemNormalizer } from "app/models/tag";

function createAction<T extends { type: TagTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  clearTagSubGroups: () => createAction({ type: TagTypes.CLEAR_SUBGROUPS }),

  startGetTags: () => createAction({ type: TagTypes.START_GET_TAGS }),
  succeededGetTags: (tags: Moim.IPaginatedListResponse<Moim.Id>) =>
    createAction({ type: TagTypes.SUCCEEDED_GET_TAGS, payload: { tags } }),
  failedGetTags: () => createAction({ type: TagTypes.FAILED_GET_TAGS }),

  startCreateTag: () => createAction({ type: TagTypes.START_CREATE_TAG }),
  succeededCreateTag: (tag: Moim.Id) =>
    createAction({ type: TagTypes.SUCCEEDED_CREATE_TAG, payload: { tag } }),
  failedCreateTag: () => createAction({ type: TagTypes.FAILED_CREATE_TAG }),

  startUpdateTag: () => createAction({ type: TagTypes.START_UPDATE_TAG }),
  succeededUpdateTag: (tag: Moim.Id) =>
    createAction({ type: TagTypes.SUCCEEDED_UPDATE_TAG, payload: { tag } }),
  failedUpdateTag: () => createAction({ type: TagTypes.FAILED_UPDATE_TAG }),

  startGetSubGroupsFromTags: () =>
    createAction({ type: TagTypes.START_GET_SUBGROUPS_FROM_TAGS }),
  succeededGetSubGroupsFromTags: (
    subgroups: Moim.IPaginatedListResponse<Moim.Id>,
  ) =>
    createAction({
      type: TagTypes.SUCCEEDED_GET_SUBGROUPS_FROM_TAGS,
      payload: { subgroups },
    }),
  failedGetSubGroupsFromTags: () =>
    createAction({ type: TagTypes.FAILED_GET_SUBGROUPS_FROM_TAGS }),

  startGetSubGroupsFromTag: () =>
    createAction({ type: TagTypes.START_GET_SUBGROUPS_FROM_TAG }),
  succeededGetSubGroupsFromTag: (
    subgroups: Moim.IPaginatedListResponse<Moim.Id>,
  ) =>
    createAction({
      type: TagTypes.SUCCEEDED_GET_SUBGROUPS_FROM_TAG,
      payload: { subgroups },
    }),
  failedGetSubGroupsFromTag: () =>
    createAction({ type: TagTypes.FAILED_GET_SUBGROUPS_FROM_TAG }),

  startRegisterSubGroupsToTag: () =>
    createAction({ type: TagTypes.START_REGISTER_SUBGROUPS_TO_TAG }),
  succeededRegisterSubGroupsToTag: (subgroups: Moim.Id[]) =>
    createAction({
      type: TagTypes.SUCCEEDED_REGISTER_SUBGROUPS_TO_TAG,
      payload: { subgroups },
    }),
  failedRegisterSubGroupsToTag: () =>
    createAction({ type: TagTypes.FAILED_REGISTER_SUBGROUPS_TO_TAG }),

  startUnRegisterSubGroupsToTag: () =>
    createAction({ type: TagTypes.START_UNREGISTER_SUBGROUPS_TO_TAG }),
  succeededUnRegisterSubGroupsToTag: (subgroups: Moim.Id[]) =>
    createAction({
      type: TagTypes.SUCCEEDED_UNREGISTER_SUBGROUPS_TO_TAG,
      payload: { subgroups },
    }),
  failedUnRegisterSubGroupsToTag: () =>
    createAction({ type: TagTypes.FAILED_UNREGISTER_SUBGROUPS_TO_TAG }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getTags(
  ...params: Parameters<typeof TagAPI.prototype.getTags>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startGetTags());
    try {
      const tags = tagListNormalizer(
        await apiSelector(getStore(), dispatch).tag.getTags(...params),
      );
      dispatch(loadEntities(tags.entities));
      dispatch(ActionCreators.succeededGetTags(tags.result));
    } catch (err) {
      dispatch(ActionCreators.failedGetTags());
    }
  };
}

export function createTag(
  ...params: Parameters<typeof TagAPI.prototype.createTag>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startCreateTag());
    try {
      const api = apiSelector(getStore(), dispatch).tag;

      const createdTag = await api.createTag(...params);
      const normalizedTag = tagSingleItemNormalizer(
        await api.updateTagData(
          {
            tagId: createdTag.data.id,
          },
          params[1],
        ),
      );
      dispatch(loadEntities(normalizedTag.entities));
      dispatch(ActionCreators.succeededCreateTag(normalizedTag.result.data));
    } catch (err) {
      dispatch(ActionCreators.failedCreateTag());
    }
  };
}

export function updateTag(
  ...params: Parameters<typeof TagAPI.prototype.updateTagData>
): ThunkPromiseResult {
  return async (dispatch, getStore, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateTag());
    try {
      const result = tagSingleItemNormalizer(
        await apiSelector(getStore(), dispatch).tag.updateTagData(...params),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeededUpdateTag(result.result.data));
    } catch (err) {
      dispatch(ActionCreators.failedUpdateTag());
    }
  };
}

export function getSubgroups(
  ...params: Parameters<typeof TagAPI.prototype.getChildGroupsFromTags>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetSubGroupsFromTags());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).tag.getChildGroupsFromTags(...params);

      dispatch(
        loadEntitiesDirect({
          groups: result.data,
        }),
      );
      dispatch(ActionCreators.succeededGetSubGroupsFromTags(result));
    } catch (err) {
      dispatch(ActionCreators.failedGetSubGroupsFromTags());
    }
  };
}

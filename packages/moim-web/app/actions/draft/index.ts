import { replace } from "connected-react-router";
import { ForumDraftTypes } from "../types";
import { ActionUnion } from "app/actions/helpers";
import DraftAPI from "common/api/draft";
import { ThunkPromiseResult } from "app/store";
import {
  threadSingleItemNormalizer,
  threadListNormalizer,
} from "app/models/thread/normalizer";
import { ActionCreators as SnackbarActionCreators } from "app/actions/snackbar";
import { loadEntities } from "app/actions/entity";
import { errorParseData } from "common/helpers/APIErrorParser";

function createAction<T extends { type: ForumDraftTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startSaveDraft: () =>
    createAction({ type: ForumDraftTypes.START_SAVE_DRAFT }),
  succeededSaveDraft: (draftId: Moim.Id) =>
    createAction({
      type: ForumDraftTypes.SUCCEEDED_SAVE_DRAFT,
      payload: { draftId },
    }),
  failedSaveDraft: () =>
    createAction({ type: ForumDraftTypes.FAILED_SAVE_DRAFT }),

  startUpdateDraft: () =>
    createAction({ type: ForumDraftTypes.START_UPDATE_DRAFT }),
  succeededUpdateDraft: () =>
    createAction({ type: ForumDraftTypes.SUCCEEDED_UPDATE_DRAFT }),
  failedUpdateDraft: () =>
    createAction({ type: ForumDraftTypes.FAILED_UPDATE_DRAFT }),

  startDeleteDraft: (draftId: Moim.Id) =>
    createAction({
      type: ForumDraftTypes.START_DELETE_DRAFT,
      payload: { draftId },
    }),
  succeededDeleteDraft: (draftId: Moim.Id) =>
    createAction({
      type: ForumDraftTypes.SUCCEEDED_DELETE_DRAFT,
      payload: { draftId },
    }),
  failedDeleteDraft: (draftId: Moim.Id) =>
    createAction({
      type: ForumDraftTypes.FAILED_DELETE_DRAFT,
      payload: { draftId },
    }),

  startGetDraftList: () =>
    createAction({ type: ForumDraftTypes.START_GET_DRAFT_LIST }),
  succeededGetDraftList: (params: Moim.IPaginatedListResponse<Moim.Id>) =>
    createAction({
      type: ForumDraftTypes.SUCCEEDED_GET_DRAFT_LIST,
      payload: params,
    }),
  failedGetDraftList: () =>
    createAction({ type: ForumDraftTypes.FAILED_GET_DRAFT_LIST }),

  startGetDraft: () => createAction({ type: ForumDraftTypes.START_GET_DRAFT }),
  succeededGetDraft: (threadId: Moim.Id) =>
    createAction({
      type: ForumDraftTypes.SUCCEEDED_GET_DRAFT,
      payload: {
        threadId,
      },
    }),
  failedGetDraft: () =>
    createAction({ type: ForumDraftTypes.FAILED_GET_DRAFT }),

  startGetDraftCount: () =>
    createAction({ type: ForumDraftTypes.START_GET_DRAFT_COUNT }),
  succeededGetDraftCount: (count: number) =>
    createAction({
      type: ForumDraftTypes.SUCCEEDED_GET_DRAFT_COUNT,
      payload: {
        count,
      },
    }),
  failedGetDraftCount: () =>
    createAction({ type: ForumDraftTypes.FAILED_GET_DRAFT_COUNT }),

  startDeleteAllDraft: () =>
    createAction({ type: ForumDraftTypes.START_DELETE_ALL_DRAFT }),
  succeededDeleteAllDraft: () =>
    createAction({ type: ForumDraftTypes.SUCCEEDED_DELETE_ALL_DRAFT }),
  failedDeleteAllDraft: () =>
    createAction({ type: ForumDraftTypes.FAILED_DELETE_ALL_DRAFT }),

  softDelete: (draftId: Moim.Id) =>
    createAction({
      type: ForumDraftTypes.SOFT_DELETE_DRAFT,
      payload: { draftId },
    }),

  setCurrentDraft: (draftId: Moim.Id) =>
    createAction({
      type: ForumDraftTypes.SET_CURRENT_DRAFT,
      payload: {
        draftId,
      },
    }),

  openDraftListModal: () =>
    createAction({
      type: ForumDraftTypes.OPEN_DRAFT_LIST_MODAL,
    }),
  closeDraftListModal: () =>
    createAction({
      type: ForumDraftTypes.CLOSE_DRAFT_LIST_MODAL,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

interface IDeleteResponseMessage {
  success: string;
  failed: string;
}

export function saveDraft(
  ...args: Parameters<typeof DraftAPI.prototype.saveDraft>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSaveDraft());

    try {
      const result = await apiSelector(getState(), dispatch).draft.saveDraft(
        ...args,
      );

      const normalizedData = threadSingleItemNormalizer(result);

      dispatch(loadEntities(normalizedData.entities));
      dispatch(ActionCreators.succeededSaveDraft(normalizedData.result.data));

      const queryParams = new URLSearchParams(location.search);
      queryParams.set("channel", result.data.parent_id);
      queryParams.delete("thread");
      queryParams.set("draft", result.data.id);

      dispatch(
        replace({
          pathname: location.pathname,
          search: queryParams.toString(),
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackbarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedSaveDraft());
      throw err;
    }
  };
}

export function updateDraft(
  ...args: Parameters<typeof DraftAPI.prototype.updateDraft>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateDraft());

    try {
      const result = await apiSelector(getState(), dispatch).draft.updateDraft(
        ...args,
      );

      const normalizedData = threadSingleItemNormalizer(result);

      dispatch(loadEntities(normalizedData.entities));
      dispatch(ActionCreators.succeededUpdateDraft());
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackbarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedUpdateDraft());
      throw err;
    }
  };
}

export function deleteDraft(
  args: Parameters<typeof DraftAPI.prototype.deleteDraft>[0],
  messages: IDeleteResponseMessage,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { success, failed } = messages;
    const draftId = args.threadId;
    dispatch(ActionCreators.startDeleteDraft(draftId));

    try {
      const result = await apiSelector(getState(), dispatch).draft.deleteDraft(
        args,
      );

      if (result.data.success) {
        dispatch(ActionCreators.succeededDeleteDraft(draftId));
        dispatch(
          SnackbarActionCreators.openSnackbar({
            text: success,
          }),
        );
      } else {
        dispatch(ActionCreators.failedDeleteDraft(draftId));
        dispatch(
          SnackbarActionCreators.openSnackbar({
            text: failed,
          }),
        );
      }
    } catch {
      dispatch(ActionCreators.failedDeleteDraft(draftId));
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: failed,
        }),
      );
    }
  };
}

export function getDraftData(
  ...args: Parameters<typeof DraftAPI.prototype.getDraftData>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetDraft());
    try {
      const result = threadSingleItemNormalizer(
        await apiSelector(getState(), dispatch).draft.getDraftData(...args),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeededGetDraft(result.result.data));
    } catch {
      dispatch(ActionCreators.failedGetDraft());
    }
  };
}

export function getAllDraftCount(): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetDraftCount());

    try {
      const result = (
        await apiSelector(getState(), dispatch).draft.getAllDraftCount()
      ).data;
      dispatch(ActionCreators.succeededGetDraftCount(result.draft_amount));
    } catch {
      dispatch(ActionCreators.failedGetDraftCount());
    }
  };
}

export function getDraftList(
  ...args: Parameters<typeof DraftAPI.prototype.getDraftList>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetDraftList());

    try {
      const result = threadListNormalizer(
        await apiSelector(getState(), dispatch).draft.getDraftList(...args),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeededGetDraftList(result.result));
    } catch {
      dispatch(ActionCreators.failedGetDraftList());
    }
  };
}

export function deleteAllDraft(
  params: Parameters<typeof DraftAPI.prototype.deleteAllDraft>,
  messages: IDeleteResponseMessage,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { success, failed } = messages;
    dispatch(ActionCreators.startDeleteAllDraft());

    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).draft.deleteAllDraft(...params);
      if (result.data.success) {
        dispatch(ActionCreators.succeededDeleteAllDraft());
        dispatch(
          SnackbarActionCreators.openSnackbar({
            text: success,
          }),
        );
      } else {
        dispatch(ActionCreators.failedDeleteAllDraft());
        dispatch(
          SnackbarActionCreators.openSnackbar({
            text: failed,
          }),
        );
      }
    } catch {
      dispatch(ActionCreators.failedDeleteAllDraft());
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: failed,
        }),
      );
    }
  };
}

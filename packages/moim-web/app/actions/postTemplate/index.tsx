import { CancelToken } from "axios";
import { PostTemplateTypes } from "app/actions/types";
import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult } from "app/store";
import { loadEntities } from "app/actions/entity";
import {
  postTemplateListNormalizer,
  postTemplateSingleItemNormalizer,
} from "app/models";
import { ActionCreators as SnackbarActionCreators } from "../snackbar";

function createAction<T extends { type: PostTemplateTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startPostPostTemplate: () =>
    createAction({ type: PostTemplateTypes.START_POST_POST_TEAMPLATE }),
  succeededPostPostTemplate: (templateId: Moim.Id) =>
    createAction({
      type: PostTemplateTypes.SUCCEED_POST_POST_TEAMPLATE,
      payload: { templateId },
    }),
  failedPostPostTemplate: () =>
    createAction({ type: PostTemplateTypes.FAILED_POST_POST_TEAMPLATE }),

  startUpdatePostTemplate: (templateId: Moim.Id) =>
    createAction({
      type: PostTemplateTypes.START_UPDATE_POST_TEAMPLATE,
      payload: { templateId },
    }),
  succeededUpdatePostTemplate: (templateId: Moim.Id) =>
    createAction({
      type: PostTemplateTypes.SUCCEED_UPDATE_POST_TEAMPLATE,
      payload: { templateId },
    }),
  failedUpdatePostTemplate: (templateId: Moim.Id) =>
    createAction({
      type: PostTemplateTypes.FAILED_UPDATE_POST_TEAMPLATE,
      payload: { templateId },
    }),

  startDeletePostTemplate: (templateId: Moim.Id) =>
    createAction({
      type: PostTemplateTypes.START_DELETE_POST_TEAMPLATE,
      payload: { templateId },
    }),
  succeededDeletePostTemplate: (templateId: Moim.Id) =>
    createAction({
      type: PostTemplateTypes.SUCCEED_DELETE_POST_TEAMPLATE,
      payload: { templateId },
    }),
  failedDeletePostTemplate: (templateId: Moim.Id) =>
    createAction({
      type: PostTemplateTypes.FAILED_DELETE_POST_TEAMPLATE,
      payload: { templateId },
    }),

  startGetPostTemplates: () =>
    createAction({
      type: PostTemplateTypes.START_GET_POST_TEAMPLATE_LIST,
    }),
  succeededGetPostTemplates: (
    templates: Moim.IPaginatedListResponse<Moim.Id>,
  ) =>
    createAction({
      type: PostTemplateTypes.SUCCEED_GET_POST_TEAMPLATE_LIST,
      payload: { templates },
    }),
  failedGetPostTemplates: () =>
    createAction({
      type: PostTemplateTypes.FAILED_GET_POST_TEAMPLATE_LIST,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function postPostTemplate(
  request: Moim.Forum.IPostPostTemplateRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.Id | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    dispatch(ActionCreators.startPostPostTemplate());

    try {
      const normalized = postTemplateSingleItemNormalizer(
        await api.forum.postPostTemplate(request, cancelToken),
      );
      dispatch(loadEntities(normalized.entities));
      dispatch(
        ActionCreators.succeededPostPostTemplate(normalized.result.data),
      );
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: message.succeed,
        }),
      );
      return normalized.result.data;
    } catch (err) {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: message.failed,
        }),
      );

      dispatch(ActionCreators.failedPostPostTemplate());
      return undefined;
    }
  };
}

export function updatePostTemplate(
  request: Moim.Forum.IUpdatePostTemplateRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    let snackbarMessage = message.succeed;
    const api = apiSelector(getState(), dispatch);
    dispatch(ActionCreators.startUpdatePostTemplate(request.templateId));

    try {
      const normalized = postTemplateSingleItemNormalizer(
        await api.forum.updatePostTemplate(request, cancelToken),
      );
      dispatch(loadEntities(normalized.entities));
      dispatch(
        ActionCreators.succeededUpdatePostTemplate(normalized.result.data),
      );
    } catch (err) {
      snackbarMessage = message.failed;
      dispatch(ActionCreators.failedUpdatePostTemplate(request.templateId));
    } finally {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: snackbarMessage,
        }),
      );
    }
  };
}

export function getPostTemplate(cancelToken?: CancelToken): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch);
    dispatch(ActionCreators.startGetPostTemplates());

    try {
      const normalized = postTemplateListNormalizer(
        await api.forum.getPostTemplate(cancelToken),
      );
      dispatch(loadEntities(normalized.entities));
      dispatch(ActionCreators.succeededGetPostTemplates(normalized.result));
    } catch (err) {
      dispatch(ActionCreators.failedGetPostTemplates());
    }
  };
}

export function deletePostTemplate(
  request: Moim.Forum.IDeletePostTemplateRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    let snackbarMessage = message.succeed;
    const api = apiSelector(getState(), dispatch);
    dispatch(ActionCreators.startDeletePostTemplate(request.templateId));

    try {
      await api.forum.deletePostTemplate(request, cancelToken);
      dispatch(ActionCreators.succeededDeletePostTemplate(request.templateId));
    } catch (err) {
      snackbarMessage = message.failed;
      dispatch(ActionCreators.failedDeletePostTemplate(request.templateId));
    } finally {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: snackbarMessage,
        }),
      );
    }
  };
}

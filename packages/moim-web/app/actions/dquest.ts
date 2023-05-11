import axios, { CancelToken } from "axios";
import { ThunkPromiseResult } from "app/store";
import {
  DQuestQuestNormalizer,
  DQuestQuestListNormalizer,
  DQuestHistoryNormalizer,
  DQuestHistoryListNormalizer,
} from "app/models/dquest";
import { errorParseData } from "common/helpers/APIErrorParser";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { ActionUnion } from "./helpers";
import { DQuestTypes } from "./types";
import { AddEntities, loadEntitiesDirect } from "./entity";

function createAction<T extends { type: DQuestTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startFetchQuestList: () =>
    createAction({ type: DQuestTypes.START_FETCH_QUEST_LIST }),
  succeedFetchQuestList: (
    list: Moim.IPaginatedListResponse<Moim.Id>,
    loadMorePagingKey?: Moim.IPaging,
  ) =>
    createAction({
      type: DQuestTypes.SUCCEED_FETCH_QUEST_LIST,
      payload: {
        list,
        loadMorePagingKey,
      },
    }),
  failedFetchQuestList: () =>
    createAction({ type: DQuestTypes.FAILED_FETCH_QUEST_LIST }),

  startFetchQuest: () => createAction({ type: DQuestTypes.START_FETCH_QUEST }),
  succeedFetchQuest: (id: Moim.Id) =>
    createAction({
      type: DQuestTypes.SUCCEED_FETCH_QUEST,
      payload: {
        id,
      },
    }),
  failedFetchQuest: () =>
    createAction({ type: DQuestTypes.FAILED_FETCH_QUEST }),

  startFetchHistory: () =>
    createAction({ type: DQuestTypes.START_FETCH_HISTORY }),
  succeedFetchHistory: () =>
    createAction({ type: DQuestTypes.SUCCEED_FETCH_HISTORY }),
  failedFetchHistory: () =>
    createAction({ type: DQuestTypes.FAILED_FETCH_HISTORY }),

  startFetchHistories: () =>
    createAction({ type: DQuestTypes.START_FETCH_HISTORIES }),
  succeedFetchHistories: (
    data: Moim.IPaginatedListResponse<Moim.Id>,
    type: Moim.DQuest.HISTORY_STATUS,
    hasAfterKey: boolean,
  ) =>
    createAction({
      type: DQuestTypes.SUCCEED_FETCH_HISTORIES,
      payload: {
        data,
        type,
        hasAfterKey,
      },
    }),
  failedFetchHistories: () =>
    createAction({ type: DQuestTypes.FAILED_FETCH_HISTORIES }),

  startFetchQuestACtion: () =>
    createAction({ type: DQuestTypes.START_FETCH_QUEST_ACTION }),
  succeedFetchQuestACtion: () =>
    createAction({ type: DQuestTypes.SUCCEED_FETCH_QUEST_ACTION }),
  failedFetchQuestACtion: () =>
    createAction({ type: DQuestTypes.FAILED_FETCH_QUEST_ACTION }),

  startFetchQuestGroupAction: () =>
    createAction({ type: DQuestTypes.START_FETCH_QUEST_GROUP_ACTION }),
  succeedFetchQuestGroupAction: (questGroup: Moim.DQuest.IQuestGroup) =>
    createAction({
      type: DQuestTypes.SUCCEED_FETCH_QUEST_GROUP_ACTION,
      payload: {
        questGroup,
      },
    }),
  failedFetchQuestGroupAction: () =>
    createAction({ type: DQuestTypes.FAILED_FETCH_QUEST_GROUP_ACTION }),

  startFetchQuestGroupQuestsAction: () =>
    createAction({ type: DQuestTypes.START_FETCH_QUEST_GROUP_QUESTS_ACTION }),
  succeedFetchQuestGroupQuestsAction: (
    payload: Moim.IPaginatedListResponse<Moim.Id>,
  ) =>
    createAction({
      type: DQuestTypes.SUCCEED_FETCH_QUEST_GROUP_QUESTS_ACTION,
      payload,
    }),
  failedFetchQuestGroupQuestsAction: () =>
    createAction({ type: DQuestTypes.FAILED_FETCH_QUEST_GROUP_QUESTS_ACTION }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function fetchQuestList(
  paging?: Moim.IPaging,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchQuestList());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.fetchQuests(paging, cancelToken);
      const { entities, result } = DQuestQuestListNormalizer(response);
      dispatch(
        loadEntitiesDirect({
          dquest_histories: result.data,
        }),
      );
      dispatch(AddEntities(entities));
      dispatch(ActionCreators.succeedFetchQuestList(result, paging));
    } catch (err) {
      dispatch(ActionCreators.failedFetchQuestList());
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function fetchQuest(
  questId: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchQuest());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.fetchQuest(questId, cancelToken);
      const { entities } = DQuestQuestNormalizer(response);
      dispatch(AddEntities(entities));
      dispatch(ActionCreators.succeedFetchQuest(questId));
    } catch (err) {
      dispatch(ActionCreators.failedFetchQuest());
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function fetchHistory(
  questId: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchHistory());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.fetchQuestHistory(questId, cancelToken);
      const { entities } = DQuestHistoryNormalizer(response);
      dispatch(AddEntities(entities));
      dispatch(ActionCreators.succeedFetchHistory());
    } catch (err) {
      dispatch(ActionCreators.failedFetchHistory());
      const error = errorParseData(err as any);
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.status >= 500 &&
        error?.message
      ) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function fetchQuestSearchForCryptoBadge(
  badgeId: Moim.Id,
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Id> | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.fetchQuestSearchForCryptoBadge(badgeId);
      const { entities, result } = DQuestQuestListNormalizer(response);
      dispatch(
        loadEntitiesDirect({
          dquest_histories: result.data,
        }),
      );
      dispatch(AddEntities(entities));
      return result;
    } catch (err) {
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function fetchHistories(
  payload: Moim.DQuest.IFetchHistoriesRequestPayload,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchHistories());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.fetchUserHistories(payload, cancelToken);
      const { entities, result } = DQuestHistoryListNormalizer(response);
      dispatch(
        loadEntitiesDirect({
          dquest_quests: result.data,
        }),
      );
      dispatch(AddEntities(entities));
      dispatch(
        ActionCreators.succeedFetchHistories(
          result,
          payload.status ?? "IN_PROGRESS",
          Boolean(payload.after),
        ),
      );
    } catch (err) {
      dispatch(ActionCreators.failedFetchHistories());
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function fetchQuestAction(
  questId: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.DQuest.IQuestActionResponse> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchQuestACtion());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.fetchQuestAction(questId, cancelToken);
      dispatch(ActionCreators.succeedFetchQuestACtion());

      return response;
    } catch (err) {
      dispatch(ActionCreators.failedFetchQuestACtion());
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }

      throw err;
    }
  };
}

export function fetchDQuestGroup(
  id: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.DQuest.IQuestGroup> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchQuestGroupAction());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.fetchQuestGroup(id, cancelToken);

      dispatch(ActionCreators.succeedFetchQuestGroupAction(response));
      return response;
    } catch (err) {
      dispatch(ActionCreators.failedFetchQuestGroupAction());
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      throw err;
    }
  };
}

export function fetchDQuestGroupQuests(
  id: Moim.Id,
  payload: {
    limit?: number;
    paging?: Moim.IPaging;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Id>> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchQuestGroupQuestsAction());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.fetchQuestGroupQuests(id, payload, payload.paging, cancelToken);

      const { entities, result } = DQuestQuestListNormalizer(response);
      dispatch(
        loadEntitiesDirect({
          dquest_histories: result.data,
        }),
      );
      dispatch(AddEntities(entities));
      dispatch(ActionCreators.succeedFetchQuestList(result, payload.paging));

      dispatch(ActionCreators.succeedFetchQuestGroupQuestsAction(result));
      return result;
    } catch (err) {
      dispatch(ActionCreators.failedFetchQuestGroupQuestsAction());
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      throw err;
    }
  };
}

export function postQuestView(id: Moim.Id): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      await apiSelector(getState(), dispatch).dquest.postQuestView(id);
      // eslint-disable-next-line no-empty
    } catch {}
  };
}

export function postQuestJoin(
  id: Moim.Id,
): ThunkPromiseResult<Moim.DQuest.IQuestJoinResponse | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      return await apiSelector(getState(), dispatch).dquest.questJoin(id);
    } catch (err) {
      const error = errorParseData(err as any);

      if (axios.isAxiosError(err)) {
        if (err.response?.data && (err.response.data as any).errorCode) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: (err.response.data as any).errorCode,
            }),
          );
        } else if (err.response?.data && (err.response.data as any).details) {
          (err.response.data as any).details.forEach(obj => {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                text: obj.message,
              }),
            );
          });
        } else if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
            }),
          );
        }
      }
      throw err;
    }
  };
}

export function postQuestMissionAction(
  id: Moim.Id,
  missionId: Moim.Id,
  queryPayload?: Record<string, any>,
): ThunkPromiseResult<Moim.DQuest.IQuestActionResponse | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      return await apiSelector(getState(), dispatch).dquest.questMissionAction(
        id,
        missionId,
        queryPayload,
      );
      // eslint-disable-next-line no-empty
    } catch (err) {
      const error = errorParseData(err as any);

      if (axios.isAxiosError(err)) {
        if (err.response?.data && (err.response.data as any).errorCode) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: (err.response.data as any).errorCode,
            }),
          );
        } else if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
            }),
          );
        }
      }
      throw err;
    }
  };
}

export function postQuestAchieve(
  id: Moim.Id,
): ThunkPromiseResult<Moim.DQuest.IQuestActionResponse> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).dquest.questAchieve(id);

      return response;
    } catch (err) {
      const error = errorParseData(err as any);

      if (axios.isAxiosError(err)) {
        if (err.response?.data && (err.response.data as any).errorCode) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: (err.response.data as any).errorCode,
            }),
          );
        } else if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
            }),
          );
        }
      }
      throw err;
    }
  };
}

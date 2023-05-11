import { CancelToken } from "axios";
import _ from "lodash";
import { ThunkPromiseResult } from "app/store";
import { ActionUnion } from "./helpers";
import { ContentsGroupTypes } from "./types";
import { threadListNormalizer } from "app/models";
import { AddEntities } from "app/actions/entity";
import { batchUsers } from "app/actions/user";

function createAction<T extends { type: ContentsGroupTypes }>(d: T): T {
  return d;
}
export const ActionCreators = {
  startFetchContentsGroupThreads: () =>
    createAction({
      type: ContentsGroupTypes.START_FETCH_CONTENTS_GROUP_THREADS,
    }),
  succeedFetchContentsGroupThreads: (
    id: Moim.Id,
    threads: Moim.IPaginatedListResponse<Moim.Id>,
    loadType: "page" | "scroll",
  ) =>
    createAction({
      type: ContentsGroupTypes.SUCCEED_FETCH_CONTENTS_GROUP_THREADS,
      payload: {
        id,
        threads,
        loadType,
      },
    }),
  failedFetchContentsGroupThreads: () =>
    createAction({
      type: ContentsGroupTypes.FAILED_FETCH_CONTENTS_GROUP_THREADS,
    }),

  startFetchContentsGroupData: () =>
    createAction({ type: ContentsGroupTypes.START_FETCH_CONTENTS_GROUP }),
  succeedFetchContentsGroupData: (
    data: Moim.ContentsGroup.IContentsGroupData,
  ) =>
    createAction({
      type: ContentsGroupTypes.SUCCEED_FETCH_CONTENTS_GROUP,
      payload: {
        data,
      },
    }),
  failedFetchContentsGroupData: () =>
    createAction({ type: ContentsGroupTypes.FAILED_FETCH_CONTENTS_GROUP }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getContentsGroupThreads(
  id: Moim.Id,
  limit?: number,
  cancelToken?: CancelToken,
  paging?: { from?: string; after?: string },
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchContentsGroupThreads());
    const loadType = paging?.after ? "scroll" : "page";
    apiSelector(getState(), dispatch)
      .thread.getContentGroupThreads(id, limit, cancelToken, paging)
      .then(result => {
        const normalized = threadListNormalizer(result);
        dispatch(AddEntities(normalized.entities));

        if (result.data.length > 0) {
          const userIds = _.uniq(
            result.data.reduce<Moim.Id[]>((acc, current) => {
              acc.push(current.author);
              return acc;
            }, []),
          );
          dispatch(batchUsers(userIds));
        }

        dispatch(
          ActionCreators.succeedFetchContentsGroupThreads(
            id,
            normalized.result,
            loadType,
          ),
        );
      })
      .catch(() => {
        dispatch(ActionCreators.failedFetchContentsGroupThreads());
      });
  };
}

export function getContentsGroupData(
  id: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.ContentsGroup.IContentsGroupData | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchContentsGroupData());
    try {
      const result = (
        await apiSelector(getState(), dispatch).thread.getContentGroupData(
          id,
          cancelToken,
        )
      ).data;
      dispatch(ActionCreators.succeedFetchContentsGroupData(result));
      return result;
    } catch (err) {
      dispatch(ActionCreators.failedFetchContentsGroupData());
    }
  };
}
export function getContentsGroupPreview(
  contentsGroup: {
    query: Moim.ContentsGroup.IQuery;
    limit: number;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Forum.IThread>> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).thread.getContentGroupPreview(contentsGroup, cancelToken);
      const normalized = threadListNormalizer(result);

      dispatch(AddEntities(normalized.entities));

      if (result.data.length > 0) {
        const userIds = _.uniq(
          result.data.reduce<Moim.Id[]>((acc, current) => {
            acc.push(current.author);
            return acc;
          }, []),
        );
        dispatch(batchUsers(userIds));
      }
      return result;
    } catch (err) {
      throw err;
    }
  };
}

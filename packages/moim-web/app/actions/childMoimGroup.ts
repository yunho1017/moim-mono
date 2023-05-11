import { CancelToken } from "axios";
import * as objectSha from "object-sha";
import { ThunkPromiseResult } from "app/store";
import { ActionUnion } from "./helpers";
import { ChildMoimGroupTypes } from "./types";
import { groupListNormalizer } from "app/models";
import { AddEntities, loadEntitiesDirect } from "app/actions/entity";

function createAction<T extends { type: ChildMoimGroupTypes }>(d: T): T {
  return d;
}
export const ActionCreators = {
  startFetchChildMoimGroupMoims: () =>
    createAction({
      type: ChildMoimGroupTypes.START_FETCH_CHILD_MOIM_GROUP_MOIMS,
    }),
  succeedFetchChildMoimGroupMoims: (
    id: Moim.Id,
    moims: Moim.IPaginatedListResponse<Moim.Id>,
    loadType: "page" | "scroll",
    isInitialFetch: boolean,
  ) =>
    createAction({
      type: ChildMoimGroupTypes.SUCCEED_FETCH_CHILD_MOIM_GROUP_MOIMS,
      payload: {
        id,
        moims,
        loadType,
        isInitialFetch,
      },
    }),
  failedFetchChildMoimGroupMoims: () =>
    createAction({
      type: ChildMoimGroupTypes.FAILED_FETCH_CHILD_MOIM_GROUP_MOIMS,
    }),

  startFetchChildMoimGroup: () =>
    createAction({ type: ChildMoimGroupTypes.START_FETCH_CHILD_MOIM_GROUP }),
  succeedFetchChildMoimGroup: (data: Moim.ChildMoimGroup.IChildMoimGroupData) =>
    createAction({
      type: ChildMoimGroupTypes.SUCCEED_FETCH_CHILD_MOIM_GROUP,
      payload: {
        data,
      },
    }),
  failedFetchChildMoimGroup: () =>
    createAction({ type: ChildMoimGroupTypes.FAILED_FETCH_CHILD_MOIM_GROUP }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

const bufferChildMoimGroupMoims: Record<string, Promise<any>> = {};

export function bufferedGetChildMoimGroupMoims(
  id: Moim.Id,
  limit?: number,
  cancelToken?: CancelToken,
  paging?: { from?: string; after?: string },
  sort?: string,
  desc?: "asc" | "desc",
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const key = await objectSha.digest({
      id,
      limit,
      paging,
      sort,
      desc,
    });
    if (!bufferChildMoimGroupMoims[key]) {
      bufferChildMoimGroupMoims[key] = (async () => {
        dispatch(ActionCreators.startFetchChildMoimGroupMoims());
        const loadType = paging?.from ? "page" : "scroll";

        try {
          const response = await apiSelector(
            getState(),
            dispatch,
          ).group.getChildMoimGroupMoims(
            id,
            limit,
            cancelToken,
            paging,
            sort,
            desc,
          );

          const extractedTags: string[] = [];
          response.data.forEach(group => {
            if (group.tags) {
              extractedTags.push(...group.tags);
            }
          });

          const { result, entities } = groupListNormalizer(response);

          dispatch(loadEntitiesDirect({ tags: extractedTags }));
          dispatch(AddEntities(entities));
          dispatch(
            ActionCreators.succeedFetchChildMoimGroupMoims(
              id,
              result,
              loadType,
              !paging?.after,
            ),
          );
        } catch (err) {
          dispatch(ActionCreators.failedFetchChildMoimGroupMoims());
        }
      })();
    }
    return bufferChildMoimGroupMoims[key];
  };
}

const bufferChildMoimGroupData: Record<
  string,
  Promise<Moim.ChildMoimGroup.IChildMoimGroupData | undefined>
> = {};

export function bufferedGetChildMoimGroupData(
  id: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.ChildMoimGroup.IChildMoimGroupData | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const key = id;
    if (!bufferChildMoimGroupData[key]) {
      bufferChildMoimGroupData[key] = (async () => {
        dispatch(ActionCreators.startFetchChildMoimGroup());
        try {
          const result = (
            await apiSelector(getState(), dispatch).group.getChildMoimGroup(
              id,
              cancelToken,
            )
          ).data;
          dispatch(ActionCreators.succeedFetchChildMoimGroup(result));
          return result;
        } catch (err) {
          dispatch(ActionCreators.failedFetchChildMoimGroup());
        }
      })();
    }
    return bufferChildMoimGroupData[key];
  };
}

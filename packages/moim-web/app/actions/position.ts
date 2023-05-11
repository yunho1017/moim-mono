import { CancelToken } from "axios";
import { PositionTypes } from "./types";
import { ActionUnion } from "./helpers";
import PositionAPI from "common/api/position";
import { ThunkPromiseResult } from "../store";
import { errorParseData } from "common/helpers/APIErrorParser";
import {
  positionListNormalizer,
  positionSingleItemNormalizer,
} from "../models/position";
import {
  ActionCreators as EntityActionCreators,
  loadEntities,
  loadEntitiesAPI,
} from "./entity";
import { ActionCreators as SnackbarActionCreators } from "./snackbar";
import { userListNormalizer } from "../models/user";
import { lowPrioritySelector, positionsSelector } from "../selectors/position";
import { POSITION_PRIORITY_UNIT } from "common/constants/position";
import isLastIndex from "common/helpers/isLastIndex";

function createAction<T extends { type: PositionTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startGetPositions: () =>
    createAction({
      type: PositionTypes.START_GET_POSITIONS,
    }),
  succeedGetPositions: (payload: {
    positions: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_GET_POSITIONS,
    }),
  failedGetPositions: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_GET_POSITIONS,
    }),

  startGetPosition: (payload: { positionId: Moim.Id }) =>
    createAction({
      payload,
      type: PositionTypes.START_GET_POSITION,
    }),
  succeedGetPosition: (payload: {
    position: Moim.ISingleItemResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_GET_POSITION,
    }),
  failedGetPosition: (payload: {
    positionId: Moim.Id;
    error?: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_GET_POSITION,
    }),

  startGetPositionsBatch: (payload: { positionIds: Moim.Id[] }) =>
    createAction({
      payload,
      type: PositionTypes.START_GET_POSITIONS_BATCH,
    }),
  succeedGetPositionsBatch: (payload: {
    positions: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_GET_POSITIONS_BATCH,
    }),
  failedGetPositionsBatch: (payload: {
    positionIds: Moim.Id[];
    error?: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_GET_POSITIONS_BATCH,
    }),

  startCreatePosition: () =>
    createAction({
      type: PositionTypes.START_CREATE_POSITION,
    }),
  succeedCreatePosition: (payload: {
    position: Moim.ISingleItemResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_CREATE_POSITION,
    }),
  failedCreatePosition: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_CREATE_POSITION,
    }),

  startAppointPosition: (payload: { positionId: Moim.Id }) =>
    createAction({
      payload,
      type: PositionTypes.START_APPOINT_POSITION,
    }),
  succeedAppointPosition: (payload: {
    position: Moim.ISingleItemResponse<Moim.Id>;
    members: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_APPOINT_POSITION,
    }),
  failedAppointPosition: (payload: {
    positionId: Moim.Id;
    error?: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_APPOINT_POSITION,
    }),

  startDismissPosition: (payload: { positionId: Moim.Id }) =>
    createAction({
      payload,
      type: PositionTypes.START_DISMISS_POSITION,
    }),
  succeedDismissPosition: (payload: {
    position: Moim.ISingleItemResponse<Moim.Id>;
    members: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_DISMISS_POSITION,
    }),
  failedDismissPosition: (payload: {
    positionId: Moim.Id;
    error?: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_DISMISS_POSITION,
    }),

  startUpdatePositionInfo: (payload: { positionId: Moim.Id }) =>
    createAction({
      payload,
      type: PositionTypes.START_UPDATE_POSITION_INFO,
    }),
  succeedUpdatePositionInfo: (payload: {
    position: Moim.ISingleItemResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_UPDATE_POSITION_INFO,
    }),
  failedUpdatePositionInfo: (payload: {
    positionId: Moim.Id;
    error?: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_UPDATE_POSITION_INFO,
    }),

  startUpdatePositionPriority: (payload: { positionId: Moim.Id }) =>
    createAction({
      payload,
      type: PositionTypes.START_UPDATE_POSITION_PRIORITY,
    }),
  succeedUpdatePositionPriority: (payload: {
    position: Moim.Position.INormalizePosition;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_UPDATE_POSITION_PRIORITY,
    }),
  failedUpdatePositionPriority: (payload: {
    positionId: Moim.Id;
    error?: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_UPDATE_POSITION_PRIORITY,
    }),

  startDeletePosition: (payload: { positionId: Moim.Id }) =>
    createAction({
      payload,
      type: PositionTypes.START_DELETE_POSITION,
    }),
  succeedDeletePosition: (payload: {
    position: Moim.ISingleItemResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_DELETE_POSITION,
    }),
  failedDeletePosition: (payload: {
    positionId: Moim.Id;
    error: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_DELETE_POSITION,
    }),
  clearDeletePositionError: () =>
    createAction({
      type: PositionTypes.CLEAR_DELETE_POSITION_ERROR,
    }),

  startGetPositionMembers: (payload: { positionId: Moim.Id }) =>
    createAction({
      payload,
      type: PositionTypes.START_GET_POSITION_MEMBERS,
    }),
  succeedGetPositionMembers: (payload: {
    positionId: Moim.Id;
    members: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({
      payload,
      type: PositionTypes.SUCCEED_GET_POSITION_MEMBERS,
    }),
  failedGetPositionMembers: (payload: {
    positionId: Moim.Id;
    error?: Moim.IErrorResponse;
  }) =>
    createAction({
      payload,
      type: PositionTypes.FAILED_GET_POSITION_MEMBERS,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getPositions(
  ...args: Parameters<typeof PositionAPI.prototype.getPositions>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startGetPositions());

      const api = apiSelector(getState(), dispatch);
      const positions = positionListNormalizer(
        await api.position.getPositions(...args),
      );
      dispatch(loadEntities(positions.entities));

      dispatch(
        ActionCreators.succeedGetPositions({
          positions: positions.result,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedGetPositions({ error }));
    }
  };
}

export function getPosition(
  ...args: Parameters<typeof PositionAPI.prototype.getPosition>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const [{ positionId }] = args;

    try {
      dispatch(
        ActionCreators.startGetPosition({
          positionId,
        }),
      );

      const api = apiSelector(getState(), dispatch);
      const position = positionSingleItemNormalizer(
        await api.position.getPosition(...args),
      );

      // eslint-disable-next-line @typescript-eslint/await-thenable
      dispatch(loadEntities(position.entities));

      dispatch(
        ActionCreators.succeedGetPosition({
          position: position.result,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(
        ActionCreators.failedGetPosition({
          positionId,
          error,
        }),
      );
    }
  };
}

export function getPositionsBatch(
  ...args: Parameters<typeof PositionAPI.prototype.getPositionsBatch>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const [{ positions: positionIds }] = args;

    try {
      dispatch(ActionCreators.startGetPositionsBatch({ positionIds }));

      const api = apiSelector(getState(), dispatch);
      const positions = positionListNormalizer(
        await api.position.getPositionsBatch(...args),
      );

      // eslint-disable-next-line @typescript-eslint/await-thenable
      dispatch(loadEntities(positions.entities));

      dispatch(
        ActionCreators.succeedGetPositionsBatch({
          positions: positions.result,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedGetPositionsBatch({ positionIds, error }));
    }
  };
}

export function createPosition(
  data: {
    position: {
      name: string;
      color: string;
      description?: string;
    };
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { position: positionData } = data;

    try {
      dispatch(ActionCreators.startCreatePosition());

      const state = getState();
      const api = apiSelector(state, dispatch);
      const priority = lowPrioritySelector(state) + POSITION_PRIORITY_UNIT;
      const position = positionSingleItemNormalizer(
        await api.position.createPosition(
          {
            position: {
              ...positionData,
              priority,
            },
          },
          cancelToken,
        ),
      );

      // eslint-disable-next-line @typescript-eslint/await-thenable
      dispatch(loadEntities(position.entities));

      dispatch(
        ActionCreators.succeedCreatePosition({
          position: position.result,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedCreatePosition({ error }));
    }
  };
}

export function appointPositionBase(
  request: Moim.Position.IAppointPositionRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
  isApprove?: boolean,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { positionId, appoint } = request;
    const { users: userIds } = appoint;
    let snackbarMessage = message.succeed;

    try {
      dispatch(
        ActionCreators.startAppointPosition({
          positionId,
        }),
      );

      const api = apiSelector(getState(), dispatch).position;
      const position = positionSingleItemNormalizer(
        await (isApprove
          ? api.approvePosition(
              { positionId, approve: request.appoint },
              cancelToken,
            )
          : api.appointPosition(request, cancelToken)),
      );

      dispatch(
        EntityActionCreators.addEntity(
          await loadEntitiesAPI({ users: userIds }),
        ),
      );

      dispatch(loadEntities(position.entities));

      dispatch(
        ActionCreators.succeedAppointPosition({
          position: position.result,
          members: { data: userIds, paging: {} },
        }),
      );
    } catch (rawError) {
      snackbarMessage = message.failed;
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedAppointPosition({ positionId, error }));
    } finally {
      dispatch(
        SnackbarActionCreators.openSnackbar({
          text: snackbarMessage,
        }),
      );
    }
  };
}

export function appointPosition(
  request: Moim.Position.IAppointPositionRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(appointPositionBase(request, message, cancelToken));
  };
}

export function approvePosition(
  request: Moim.Position.IAppointPositionRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(appointPositionBase(request, message, cancelToken, true));
  };
}

export function dismissPosition(
  request: Moim.Position.IDismissPositionRequest,
  message: {
    succeed: string;
    failed: string;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const { positionId, dismiss } = request;
    const { users: userIds } = dismiss;
    let snackbarMessage = message.succeed;
    try {
      dispatch(
        ActionCreators.startDismissPosition({
          positionId,
        }),
      );

      const api = apiSelector(getState(), dispatch);
      const position = positionSingleItemNormalizer(
        await api.position.dismissPosition(request, cancelToken),
      );
      dispatch(
        EntityActionCreators.addEntity(
          await loadEntitiesAPI({ users: userIds }),
        ),
      );

      // eslint-disable-next-line @typescript-eslint/await-thenable
      dispatch(loadEntities(position.entities));

      dispatch(
        ActionCreators.succeedDismissPosition({
          position: position.result,
          members: { data: userIds, paging: {} },
        }),
      );
    } catch (rawError) {
      snackbarMessage = message.failed;
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedDismissPosition({ positionId, error }));
    }

    dispatch(
      SnackbarActionCreators.openSnackbar({
        text: snackbarMessage,
      }),
    );
  };
}

export function updatePositionInfo(
  ...args: Parameters<typeof PositionAPI.prototype.updatePositionInfo>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const [{ positionId }] = args;

    try {
      dispatch(
        ActionCreators.startUpdatePositionInfo({
          positionId,
        }),
      );

      const api = apiSelector(getState(), dispatch);
      const position = positionSingleItemNormalizer(
        await api.position.updatePositionInfo(...args),
      );

      // eslint-disable-next-line @typescript-eslint/await-thenable
      dispatch(loadEntities(position.entities));

      dispatch(
        ActionCreators.succeedUpdatePositionInfo({
          position: position.result,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedUpdatePositionInfo({ positionId, error }));
    }
  };
}

export function updatePositionPriority(
  ...args: Parameters<typeof PositionAPI.prototype.updatePositionPriority>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const [{ positionId }] = args;

    try {
      dispatch(
        ActionCreators.startUpdatePositionPriority({
          positionId,
        }),
      );

      const api = apiSelector(getState(), dispatch);
      const position = await api.position.updatePositionPriority(...args);

      dispatch(
        ActionCreators.succeedUpdatePositionPriority({
          position: position.data,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(
        ActionCreators.failedUpdatePositionPriority({ positionId, error }),
      );
    }
  };
}

function getNewPriority({
  position1,
  position2,
}:
  | {
      position1?: Moim.Position.IPosition;
      position2: Moim.Position.IPosition;
    }
  | {
      position1: Moim.Position.IPosition;
      position2?: Moim.Position.IPosition;
    }) {
  if (!position1) {
    return position2!.priority + 1;
  } else if (!position2) {
    return position1!.priority - 1;
  } else {
    return (position1.priority + position2.priority) / 2;
  }
}

export function upPositionPriority(
  positionId: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState) => {
    const positions = positionsSelector(getState());
    const positionIndex = positions.findIndex(
      position => position.id === positionId,
    );
    const isFirstPriority = positionIndex === 0;

    if (isFirstPriority) {
      return;
    }

    await dispatch(
      updatePositionPriority(
        {
          positionId,
          change: {
            priority: getNewPriority({
              position1: positions[positionIndex - 2],
              position2: positions[positionIndex - 1],
            }),
          },
        },
        cancelToken,
      ),
    );
  };
}

export function downPositionPriority(
  positionId: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState) => {
    const positions = positionsSelector(getState());
    const positionIndex = positions.findIndex(
      position => position.id === positionId,
    );

    if (isLastIndex(positions, positionIndex)) {
      return;
    }

    await dispatch(
      updatePositionPriority(
        {
          positionId,
          change: {
            priority: getNewPriority({
              position1: positions[positionIndex + 1],
              position2: positions[positionIndex + 2],
            }),
          },
        },
        cancelToken,
      ),
    );
  };
}

export function deletePosition(
  ...args: Parameters<typeof PositionAPI.prototype.deletePosition>
): ThunkPromiseResult<Moim.Position.IDeletePositionResponseBody | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const [{ positionId }] = args;

    try {
      dispatch(
        ActionCreators.startDeletePosition({
          positionId,
        }),
      );

      const result = await apiSelector(
        getState(),
        dispatch,
      ).position.deletePosition(...args);

      dispatch(
        ActionCreators.succeedDeletePosition({
          position: { data: positionId },
        }),
      );
      return result;
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(
        ActionCreators.failedDeletePosition({
          positionId,
          error: error ?? (rawError as any),
        }),
      );
    }
  };
}

export function getPositionMembers(
  ...args: Parameters<typeof PositionAPI.prototype.getPositionMembers>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const [{ positionId }] = args;

    try {
      dispatch(
        ActionCreators.startGetPositionMembers({
          positionId,
        }),
      );

      const api = apiSelector(getState(), dispatch);
      const users = userListNormalizer(
        await api.position.getPositionMembers(...args),
      );

      // eslint-disable-next-line @typescript-eslint/await-thenable
      dispatch(loadEntities(users.entities));

      dispatch(
        ActionCreators.succeedGetPositionMembers({
          positionId,
          members: users.result,
        }),
      );
    } catch (rawError) {
      const error = errorParseData(rawError);
      dispatch(ActionCreators.failedGetPositionMembers({ positionId, error }));
    }
  };
}

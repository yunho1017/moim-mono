import { ActionUnion } from "./helpers";
import { PermissionTypes } from "./types";
import { ThunkPromiseResult } from "../store";
import { errorParseData } from "common/helpers/APIErrorParser";
import PermissionAPI from "common/api/permission";
import { CancelToken } from "axios";

function createAction<T extends { type: PermissionTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startGetPermission: (payload: { resourceId: Moim.Id }) =>
    createAction({ type: PermissionTypes.START_GET_PERMISSION, payload }),
  succeedGetPermission: (payload: {
    resourceId: Moim.Id;
    permissions: Moim.Permission.IPermission[];
  }) =>
    createAction({
      type: PermissionTypes.SUCCEED_GET_PERMISSION,
      payload,
    }),
  failedGetPermission: (payload: {
    resourceId: Moim.Id;
    error?: Moim.IErrorResponse;
  }) => createAction({ type: PermissionTypes.FAILED_GET_PERMISSION, payload }),

  startUpdatePermission: () =>
    createAction({ type: PermissionTypes.START_UPDATE_PERMISSION }),
  succeedUpdatePermission: (payload: {
    resourceId: Moim.Id;
    permissions: Moim.Permission.IPermission[];
  }) =>
    createAction({ type: PermissionTypes.SUCCEED_UPDATE_PERMISSION, payload }),
  failedUpdatePermission: (payload: { error?: Moim.IErrorResponse }) =>
    createAction({ type: PermissionTypes.FAILED_UPDATE_PERMISSION, payload }),

  clearPermission: () =>
    createAction({ type: PermissionTypes.CLEAR_PERMISSION }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getPermission(
  request: Moim.Permission.IMoimPermissionRequest,
  cancelToken?: CancelToken,
  groupId?: string,
): ThunkPromiseResult {
  const { resource: resourceId } = request;

  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch, groupId);
    const _groupId = api.getCurrentGroupId();
    try {
      dispatch(
        ActionCreators.startGetPermission({
          resourceId: resourceId || _groupId,
        }),
      );
      const permissions = await api.permission.getPermission(
        request,
        cancelToken,
      );

      dispatch(
        ActionCreators.succeedGetPermission({
          resourceId: resourceId || _groupId,
          permissions: permissions.data,
        }),
      );
    } catch (rawError) {
      if (rawError instanceof Error) {
        const error = errorParseData(rawError);
        dispatch(
          ActionCreators.failedGetPermission({
            resourceId: resourceId || _groupId,
            error,
          }),
        );
      }
    }
  };
}

export function updatePermission(
  ...args: Parameters<typeof PermissionAPI.prototype.updatePermission>
): ThunkPromiseResult<{ success: boolean; error?: Moim.IErrorResponse }> {
  return async (dispatch, getState, { apiSelector }) => {
    const [{ resource: resourceId }] = args[0];

    const api = apiSelector(getState(), dispatch);
    const groupId = api.getCurrentGroupId();
    try {
      dispatch(ActionCreators.startUpdatePermission());
      const permissions = await api.permission.updatePermission(...args);
      dispatch(
        ActionCreators.succeedUpdatePermission({
          resourceId: resourceId || groupId,
          permissions: permissions.data,
        }),
      );

      return {
        success: true,
      };
    } catch (rawError) {
      if (rawError instanceof Error) {
        const error = errorParseData(rawError);

        dispatch(ActionCreators.failedUpdatePermission({ error }));

        return { success: false, error };
      }

      return { success: false };
    }
  };
}

// helper
import { AllActions } from "app/actions";
import produce from "immer";
import { PermissionTypes, AuthTypes } from "app/actions/types";

function permissionArray2Record(
  resourceId: string,
  permissions: Moim.Permission.IPermission[],
) {
  if (!permissions.length) {
    return {
      [resourceId]: {},
    };
  }
  return permissions.reduce<Moim.Permission.PermissionRecord>(
    (result, permission) => {
      const permissionResourceId = permission.resource;
      result[permissionResourceId] = {
        ...result[permissionResourceId],
        [permission.right]: permission,
      };
      return result;
    },
    {},
  );
}

export const INITIAL_STATE: Moim.Permission.IPermissionData =
  window.__homeChannel?.data && window.__homePermissionData?.data
    ? {
        permission: permissionArray2Record(
          window.__homeChannel.data.id,
          window.__homePermissionData.data,
        ),
        permissionLoading: {},
      }
    : {
        permission: {},
        permissionLoading: {},
      };

export const reducer = (state = INITIAL_STATE, action: AllActions) =>
  produce(state, draft => {
    switch (action.type) {
      case PermissionTypes.START_GET_PERMISSION: {
        const { resourceId } = action.payload;

        draft.permissionLoading[resourceId] = true;

        break;
      }
      case PermissionTypes.SUCCEED_UPDATE_PERMISSION: {
        const { resourceId, permissions } = action.payload;
        draft.permissionLoading[resourceId] = false;

        const permissionRecord = permissionArray2Record(
          resourceId,
          permissions,
        );

        Object.keys(permissionRecord).forEach(permissionResourceId => {
          draft.permission[permissionResourceId] = {
            ...draft.permission[permissionResourceId],
            ...permissionRecord[permissionResourceId],
          };
        });
        break;
      }
      case PermissionTypes.SUCCEED_GET_PERMISSION: {
        const { resourceId, permissions } = action.payload;
        draft.permissionLoading[resourceId] = false;

        const permissionRecord = permissionArray2Record(
          resourceId,
          permissions,
        );

        Object.keys(permissionRecord).forEach(permissionResourceId => {
          draft.permission[permissionResourceId] =
            permissionRecord[permissionResourceId];
        });

        break;
      }

      case PermissionTypes.FAILED_GET_PERMISSION: {
        const { resourceId } = action.payload;

        draft.permissionLoading[resourceId] = false;

        break;
      }

      case AuthTypes.CURRENT_USER_CHANGED:
      case AuthTypes.SIGN_OUT:
      case PermissionTypes.CLEAR_PERMISSION: {
        draft.permission = INITIAL_STATE.permission;
        draft.permissionLoading = INITIAL_STATE.permissionLoading;

        break;
      }
    }
  });

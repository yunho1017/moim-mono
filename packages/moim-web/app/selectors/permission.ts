import { IAppState } from "app/rootReducer";
import { createSelector } from "reselect";

export const permissionSelector = createSelector(
  (state: IAppState, resourceId: Moim.Id) =>
    Object.values<Moim.Permission.IPermission | undefined>(
      state.permission.permission[resourceId] || {},
    ).filter(permission =>
      Boolean(permission),
    ) as Moim.Permission.IPermission[],
  permission => permission,
);

export const hasPermissionSelector = createSelector(
  (state: IAppState, resourceId: Moim.Id) =>
    permissionSelector(state, resourceId),
  (state: IAppState) =>
    Boolean(state.permission.permission[state.app.currentGroupId || ""]?.SUPER),
  (
    state: IAppState,
    _resourceId: Moim.Id,
    permissionType: Moim.Permission.PermissionType,
    contentOwner?: Moim.Id,
  ) => ({
    permissionType,
    isSameUser: contentOwner ? contentOwner === state.app.currentUserId : false,
  }),
  (permissions, hasSuperPermission, { permissionType, isSameUser }) => {
    const permission = permissions.find(
      target => target.right === permissionType,
    );

    const hasPermission = Boolean(
      permission &&
        (permission?.applied_type === "LIMITED"
          ? !permission.limited?.includes("AUTHOR")
          : true),
    );

    const authorPermission =
      permission?.applied_type === "LIMITED" &&
      permission.limited?.includes("AUTHOR")
        ? isSameUser
        : false;

    return Boolean(hasSuperPermission || hasPermission || authorPermission);
  },
);

export const hasPermissionWithoutSuperSelector = createSelector(
  (state: IAppState, resourceId: Moim.Id) =>
    permissionSelector(state, resourceId),
  (
    _state: IAppState,
    _resourceId: Moim.Id,
    permissionType: Moim.Permission.PermissionType,
  ) => permissionType,
  (
    state: IAppState,
    _resourceId: Moim.Id,
    _permissionType: Moim.Permission.PermissionType,
    contentOwner?: Moim.Id,
  ) => (contentOwner ? contentOwner === state.app.currentUserId : false),

  (permissions, permissionType, isSameUser) => {
    const permission = permissions.find(
      target => target.right === permissionType,
    );

    const hasPermission = Boolean(
      permission &&
        (permission?.applied_type === "LIMITED"
          ? !permission.limited?.includes("AUTHOR")
          : true),
    );

    const authorPermission =
      permission?.applied_type === "LIMITED" &&
      permission.limited?.includes("AUTHOR")
        ? isSameUser
        : false;

    return Boolean(hasPermission || authorPermission);
  },
);

export const permissionLoadingSelector = createSelector(
  (state: IAppState, resourceId: Moim.Id) =>
    state.permission.permissionLoading[resourceId],
  (
    state: IAppState,
    resourceId: Moim.Id,
    permissionType?: Moim.Permission.PermissionType,
  ) =>
    permissionType && hasPermissionSelector(state, resourceId, permissionType),
  (isLoading, hasPermission) => {
    if (hasPermission) {
      return false;
    }

    return isLoading;
  },
);

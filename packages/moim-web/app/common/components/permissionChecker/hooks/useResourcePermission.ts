import { useStoreState } from "app/store";
import {
  permissionSelector,
  permissionLoadingSelector,
  hasPermissionSelector,
  hasPermissionWithoutSuperSelector,
} from "app/selectors/permission";
import { useMemo } from "react";

export function useResourcePermissionWithoutSuperCheck(
  type: Moim.Permission.PermissionType,
  resourceId: Moim.Id,
  contentOwnerId?: Moim.Id,
) {
  const { permissions, hasPermission, isLoading } = useStoreState(state => ({
    permissions: permissionSelector(state, resourceId),
    isLoading: state.permission.permissionLoading[resourceId],
    hasPermission: hasPermissionWithoutSuperSelector(
      state,
      resourceId,
      type,
      contentOwnerId,
    ),
  }));

  return useMemo(
    () => ({
      isLoading,
      permissions,
      hasPermission,
    }),
    [isLoading, permissions, hasPermission],
  );
}

export default function useResourcePermission(
  type: Moim.Permission.PermissionType,
  resourceId: Moim.Id,
  contentOwnerId?: Moim.Id,
) {
  const { permissions, hasPermission, isLoading } = useStoreState(state => ({
    permissions: permissionSelector(state, resourceId),
    isLoading: permissionLoadingSelector(state, resourceId, type),
    hasPermission: hasPermissionSelector(
      state,
      resourceId,
      type,
      contentOwnerId,
    ),
  }));

  return useMemo(
    () => ({
      isLoading,
      permissions,
      hasPermission,
    }),
    [isLoading, permissions, hasPermission],
  );
}

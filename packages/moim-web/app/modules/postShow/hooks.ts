// post show 내부에서만 사용 가능한 Hook 들
import * as React from "react";
import { PostShowContext } from "app/modules/postShow/context";
import { useResourcePermissionWithoutSuperCheck } from "common/components/permissionChecker";

export function useVisibleCommentArea() {
  const { showConfig } = React.useContext(PostShowContext);
  const visibleCommentArea = React.useMemo(() => showConfig.show_comment_area, [
    showConfig,
  ]);

  return visibleCommentArea;
}

export function useVisibleReactionArea() {
  const { showConfig } = React.useContext(PostShowContext);
  const visibleReactionArea = React.useMemo(() => showConfig.show_reaction, [
    showConfig,
  ]);

  return visibleReactionArea;
}

export function usePostShowPermission(
  type: Moim.Permission.PermissionType,
  contentOwnerId?: Moim.Id,
) {
  const { post } = React.useContext(PostShowContext);
  const channelPermission = useResourcePermissionWithoutSuperCheck(
    type,
    post.parent_id,
    contentOwnerId,
  );

  const permission = useResourcePermissionWithoutSuperCheck(
    type,
    post.id,
    contentOwnerId,
  );

  return permission.isLoading === false ? permission : channelPermission;
}

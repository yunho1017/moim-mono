import { useMemo } from "react";
import { useStoreState } from "app/store";
import { hasPermissionSelector } from "app/selectors/permission";
import useSuperPermission from "common/hooks/useSuperPermission";
import { usePostShowPermission } from "app/modules/postShow/hooks";

export default function usePostShowMenu(threadId: Moim.Id, authorId: Moim.Id) {
  const {
    isAnonymous,
    isMine,
    editPermission,
    visibleReportButton,
  } = useStoreState(state => {
    const anonymousData = state.entities.threads[threadId]?.anonymous_data;
    const mine = Boolean(anonymousData?.isMine);
    return {
      isAnonymous: Boolean(anonymousData),
      editPermission: hasPermissionSelector(
        state,
        threadId,
        "MANAGE_POST",
        authorId,
      ),
      isMine: mine,
      visibleReportButton: state.app.currentUserId !== authorId,
    };
  });

  const { hasPermission: hasPinPermission } = useSuperPermission();
  const { hasPermission: deletePermission } = usePostShowPermission(
    "DELETE_POST",
    authorId,
  );

  const hasEditPermission = useMemo(() => editPermission || isMine, [
    editPermission,
    isMine,
  ]);
  const hasDeletePermission = useMemo(() => deletePermission || isMine, [
    deletePermission,
    isMine,
  ]);

  const visibleMoreMenu = useMemo(
    () =>
      hasEditPermission ||
      hasDeletePermission ||
      hasPinPermission ||
      visibleReportButton,
    [
      hasEditPermission,
      hasDeletePermission,
      hasPinPermission,
      visibleReportButton,
    ],
  );

  return {
    hasEditPermission,
    hasPinPermission,
    visibleMoreMenu,
    hasDeletePermission,
    visibleReportButton: isAnonymous ? !isMine : visibleReportButton,
  };
}

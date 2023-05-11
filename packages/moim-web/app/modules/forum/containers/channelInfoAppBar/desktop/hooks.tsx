import * as React from "react";
import { useLocation, useRouteMatch } from "react-router";
// selector
import { selectCurrentForum } from "app/selectors/forum";
// helpers
import { MoimURL } from "common/helpers/url";
import makeShareUrl from "common/helpers/makeShareUrl";
// hooks
import { useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { useResourcePermission } from "common/components/permissionChecker";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProps {}

export function useHooks(props: IProps) {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const match = useRouteMatch<Moim.IMatchParams>();
  const refMenuButton = React.useRef(null);
  const [isMoreMenuOpen, setMoreMenuOpen] = React.useState(false);
  const [minHeight, setMinHeight] = React.useState<number | undefined>(0);

  const { redirect } = useNativeSecondaryView();

  const { forumId, forumData } = useStoreState(state => ({
    forumId: state.forumData.currentForumId,
    forumData: selectCurrentForum(state),
  }));

  const shareUrl = React.useMemo(
    () => forumId && makeShareUrl(new MoimURL.Forum({ forumId }).toString()),
    [forumId],
  );

  const openShareDialog = useOpenSNSShareDialog(shareUrl);

  const {
    hasPermission: hasWritePostPermission,
    isLoading: isPermissionLoading,
  } = useResourcePermission("WRITE_POST", forumId);

  const handleClickMenu = React.useCallback(() => {
    setMoreMenuOpen(true);
  }, []);
  const handleCloseRequestMenu = React.useCallback(() => {
    setMoreMenuOpen(false);
  }, []);
  const isForumEditorRoute = React.useMemo(
    () =>
      MoimURL.CreateForumThread.isSameExact(pathname) ||
      MoimURL.EditForumThread.isSameExact(pathname),
    [pathname],
  );
  const isForumShowRoute = React.useMemo(
    () =>
      MoimURL.Forum.isSameExact(pathname) ||
      MoimURL.ShowForumThread.isSameExact(pathname) ||
      MoimURL.FocusedShowForumThread.isSameExact(pathname),
    [pathname],
  );
  const handleResize = React.useCallback((_width: number, height: number) => {
    setMinHeight(height);
  }, []);

  const openForumMember = React.useCallback(() => {
    redirect(
      new MoimURL.ForumMembers({
        forumId: match.params.forumId || "",
      }).toString(),
    );
  }, [match.params.forumId, redirect]);

  const handleShareChannelClick = React.useCallback(() => {
    openShareDialog();
    handleCloseRequestMenu();
  }, [openShareDialog, handleCloseRequestMenu]);

  return {
    ...props,
    forumId,
    isMobile,
    refMenuButton,
    isMoreMenuOpen,
    shareUrl,
    minHeight,
    forumData,
    isForumShowRoute,
    isForumEditorRoute,
    hasWritePostPermission,
    isPermissionLoading,
    openForumMember,
    handleResize,
    handleClickMenu,
    handleCloseRequestMenu,
    handleShareChannelClick,
  };
}

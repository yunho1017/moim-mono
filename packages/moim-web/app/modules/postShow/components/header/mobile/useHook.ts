// vendor
import * as React from "react";
// helper
import { TopBannerContext } from "common/components/topBanner/context";
import { PostShowContext } from "../../../context";

import useIsMobile from "common/hooks/useIsMobile";
import { useActions, useStoreState } from "app/store";
import usePostShowMenu from "../../threadShow/components/menu/usePostShowMenu";
import useOpenState from "common/hooks/useOpenState";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import { deleteThread } from "app/actions/forum";

export function useProps() {
  const { containerRef, isModalShow, post, onBack } = React.useContext(
    PostShowContext,
  );
  const isMobile = useIsMobile();
  const [topBannerContext] = React.useContext(TopBannerContext);
  const { pinned } = useStoreState(state => ({
    pinned: state.forumData.pinnedPostList[post.parent_id]?.includes(post.id),
  }));
  const { dispatchDeleteThread } = useActions({
    dispatchDeleteThread: deleteThread,
  });

  const refMenuButton = React.useRef(null);
  const {
    isOpen: openMenu,
    open: handleClickMenu,
    close: handleCloseRequestMenu,
  } = useOpenState();
  const [appBarTopPosition, setAppBarTopPosition] = React.useState(0);
  const visibleTopNavigation = useVisibleTopNavigation();
  const { visibleMoreMenu } = usePostShowMenu(post.parent_id, post.author);

  const calcAppBarPosition = React.useCallback(() => {
    requestAnimationFrame(() => {
      if (!isModalShow && containerRef?.current) {
        setAppBarTopPosition(
          containerRef?.current.getBoundingClientRect().y -
            document.documentElement.getBoundingClientRect().y,
        );
      }
    });
  }, [containerRef, isModalShow]);

  const handleDeleteThread = React.useCallback(() => {
    if (post) {
      dispatchDeleteThread(
        {
          forumId: post.parent_id,
          threadId: post.id,
        },
        post.groupId,
      );
      onBack();
    }
  }, [dispatchDeleteThread, post.id, post.parent_id, post.groupId]);

  React.useLayoutEffect(() => {
    // NOTE: re-calc for promote sticky top banner
    window.addEventListener("scroll", calcAppBarPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", calcAppBarPosition);
    };
  }, []);

  React.useLayoutEffect(() => {
    calcAppBarPosition();
  }, [
    visibleTopNavigation,
    topBannerContext.currentVisibleState,
    calcAppBarPosition,
  ]);

  return {
    isMobile,
    refMenuButton,

    pinned,
    appBarTopPosition,
    visibleMoreMenu,

    openMenu,
    handleClickMenu,
    handleCloseRequestMenu,
    handleDeleteThread,
    onBack,
  };
}

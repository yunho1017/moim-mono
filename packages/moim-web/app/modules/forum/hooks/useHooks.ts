import React from "react";
import { useRouteMatch } from "react-router";
import { replace as replaceAction } from "connected-react-router";
// action
import { ActionCreators as ForumActionCreators } from "app/actions/forum";
import { getPermission } from "app/actions/permission";
import { getChannel } from "app/actions/channel";
// hooks
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import useCancelToken from "common/hooks/useCancelToken";
import { useVisibleMobileTopTab } from "app/modules/layout/components/controller/hooks";
// helper
import { selectCurrentForum } from "app/selectors/forum";
import { MoimURL } from "common/helpers/url";
import { PostShowTypes } from "app/enums";
import { ForumContext } from "../context";

export function useHooks() {
  const cancelToken = useCancelToken();
  const match = useRouteMatch<Moim.IMatchParams>();
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refBody = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const {
    permissionLoading,
    postShowType,
    threadListColumnCount,
  } = useStoreState(state => ({
    permissionLoading: state.permission.permissionLoading,
    postShowType: (state.entities.channels[
      match.params.forumId ?? state.forumData.currentForumId
    ] as Moim.Channel.IForumSimpleChannel | undefined)?.show_config?.show_type,
    threadListColumnCount: selectCurrentForum(state)?.list_config.column_count,
  }));
  const {
    dispatchGetPermission,
    dispatchGetChannel,
    replace,
    changeForumId,
    dispatchUpdateHighlightThreadId,
  } = useActions({
    dispatchGetChannel: getChannel,
    dispatchGetPermission: getPermission,
    replace: replaceAction,
    changeForumId: ForumActionCreators.changeForumId,
    dispatchUpdateHighlightThreadId:
      ForumActionCreators.updateHighlightThreadId,
  });
  const visibleTopTabNavigation = useVisibleMobileTopTab();
  const { forumId, threadId } = match.params;

  const handleMainBackClick = React.useCallback(() => {
    const backUrl = forumId
      ? new MoimURL.Forum({
          forumId,
        }).toString()
      : new MoimURL.MoimAppHome().toString();
    replace(backUrl);
    if (isMobile && threadId) {
      dispatchUpdateHighlightThreadId(threadId);
    }
  }, [forumId, replace, isMobile, threadId, dispatchUpdateHighlightThreadId]);

  React.useEffect(() => {
    if (forumId) {
      dispatchGetChannel({ channelId: forumId }, cancelToken.current.token);

      changeForumId(forumId);
      refContainer.current?.scrollTo({ top: 0, left: 0 });
    }
  }, [forumId]);

  React.useEffect(() => {
    if (forumId && permissionLoading[forumId] === undefined) {
      dispatchGetPermission({ resource: forumId });
    }
  }, [permissionLoading, forumId]);

  return {
    refContainer,
    refBody,
    isMobile,
    postShowType,
    threadListColumnCount,
    visibleTopTabNavigation,
    handleMainBackClick,
  };
}

export function useIsPostShowModalView() {
  const isMobile = useIsMobile();
  const { showType } = React.useContext(ForumContext);

  return React.useMemo(() => showType !== PostShowTypes.DEFAULT && !isMobile, [
    isMobile,
    showType,
  ]);
}

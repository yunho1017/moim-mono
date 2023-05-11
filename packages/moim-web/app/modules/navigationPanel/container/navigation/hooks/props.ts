// vendor
import * as React from "react";
// hooks
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useRedirect from "common/hooks/useRedirect";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
// action
import { getGroupStatus } from "app/actions/group";
import { channelWithCategorySelector } from "app/selectors/channel";
import { directMessagesSelector } from "app/selectors/directMessage";
import getIsUnread from "common/helpers/getIsUnread";

import { UnreadSnackBarType } from "../../../components/unreadSnackBar";

export type IHookProps = ReturnType<typeof useProps>;

type IUnreadSnackBarState =
  | { open: false }
  | {
      open: true;
      type: UnreadSnackBarType;
      openBy: Moim.Id;
      ref: React.RefObject<HTMLDivElement | null>;
    };

export const CLOSED_UNREAD_SNACK_BAR_STATE: IUnreadSnackBarState = {
  open: false,
};

function findUnreadChannel(
  channels: (
    | Moim.Channel.SimpleChannelWithoutCategoryType
    | Moim.DirectMessage.IDirectMessage
  )[],
) {
  return channels
    ?.filter(i => Boolean(i))
    .find(channel => {
      if (channel.type === "forum") {
        return Boolean(channel.stat?.has_new);
      }

      if (!channel.stat) {
        return false;
      }

      return getIsUnread({
        lastRead: channel.stat.last_read,
        latest: channel.latest,
        statCount: channel.stat.count,
      });
    });
}

export default function useProps() {
  const state = useStoreState(storeState => ({
    status: storeState.group.status,
    authenticationError: storeState.app.authenticationError,
    authenticationLoading: storeState.app.authenticationLoading,
    channelList: channelWithCategorySelector(storeState),
    dmChannelList: directMessagesSelector(storeState),
    logo: storeState.group.theme.logo,
  }));
  const actions = useActions({
    dispatchGetGroupStatus: getGroupStatus,
  });
  const push = useRedirect();
  const currentUser = useCurrentUser();
  const currentGroup = useCurrentGroup();
  const { collapseSideNavigation } = useSideNavigationPanel();
  const channelListRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);

  const [topUnreadSnackBar, setTopUnreadSnackBar] = React.useState<
    IUnreadSnackBarState
  >(CLOSED_UNREAD_SNACK_BAR_STATE);
  const [bottomUnreadSnackBar, setBottomUnreadSnackBar] = React.useState<
    IUnreadSnackBarState
  >(CLOSED_UNREAD_SNACK_BAR_STATE);

  const channelListWithoutCategory = React.useMemo(
    () =>
      state.channelList.data.reduce<
        Moim.Channel.SimpleChannelWithoutCategoryType[]
      >((result, current) => {
        if (current.type === "category") {
          return current.items ? result.concat(current.items) : result;
        } else {
          result.push(current);

          return result;
        }
      }, []),
    [state.channelList.data],
  );
  const firstUnreadChannel = React.useMemo(
    () =>
      findUnreadChannel([
        ...channelListWithoutCategory,
        ...state.dmChannelList.data,
      ]),
    [channelListWithoutCategory, state.dmChannelList.data],
  );

  const lastUnreadChannel = React.useMemo(
    () =>
      findUnreadChannel(
        [...channelListWithoutCategory, ...state.dmChannelList.data].reverse(),
      ),

    [channelListWithoutCategory, state.dmChannelList.data],
  );

  const hasNonCategoryChannel = React.useMemo(
    () => state.channelList.data[0]?.type !== "category",
    [state.channelList.data],
  );

  const visibleCurrentUser = React.useMemo(
    () =>
      Boolean(currentUser) &&
      !currentGroup?.navigation_structure.web.topNavi.showNavigation,
    [currentGroup, currentUser],
  );

  return {
    ...state,
    ...actions,
    push,
    currentUser,
    currentGroup,
    channelListRef,
    headerRef,
    footerRef,
    hasNonCategoryChannel,
    collapseSideNavigation,
    firstUnreadChannel,
    lastUnreadChannel,
    topUnreadSnackBar,
    setTopUnreadSnackBar,
    bottomUnreadSnackBar,
    setBottomUnreadSnackBar,
    visibleCurrentUser,
  };
}

import * as React from "react";
import { IHookProps, CLOSED_UNREAD_SNACK_BAR_STATE } from ".";
import { MoimURL } from "common/helpers/url";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const {
    dispatchGetGroupStatus,
    push,
    collapseSideNavigation,
    channelListRef,
    firstUnreadChannel,
    lastUnreadChannel,
    topUnreadSnackBar,
    setTopUnreadSnackBar,
    bottomUnreadSnackBar,
    setBottomUnreadSnackBar,
  } = props;

  const handleInitialDataLoad = React.useCallback(() => {
    dispatchGetGroupStatus();
  }, [dispatchGetGroupStatus]);

  const redirectToChannel = React.useCallback(
    (channel: Moim.Channel.SimpleChannelType) => {
      switch (channel.type) {
        case "forum": {
          push(
            new MoimURL.Forum({
              forumId: channel.id || "",
            }).toString(),
          );
          break;
        }

        case "conversation": {
          push(
            new MoimURL.ConversationShow({
              conversationId: channel.id || "",
            }).toString(),
          );
          break;
        }

        case "subgroups":
        case "tag": {
          push(
            new MoimURL.SubMoimList({
              tag: channel.id,
            }).toString(),
          );
          break;
        }

        case "view": {
          push(
            new MoimURL.ViewShow({
              viewId: channel.id,
            }).toString(),
          );
          break;
        }

        default: {
          break;
        }
      }
    },
    [push],
  );

  const handleClickChannel = React.useCallback(
    (channel: Moim.Channel.SimpleChannelType) => {
      redirectToChannel(channel);
      collapseSideNavigation();
    },
    [redirectToChannel, collapseSideNavigation],
  );

  const handleChannelInViewChange = React.useCallback(
    (
      inView: boolean,
      channelId: Moim.Id,
      ref: React.RefObject<HTMLDivElement> | null,
      statCount?: number,
    ) => {
      const isFirst = channelId === firstUnreadChannel?.id;
      const isLast = channelId === lastUnreadChannel?.id;
      if (!isFirst && !isLast) {
        return;
      }

      if (inView) {
        topUnreadSnackBar.open &&
          topUnreadSnackBar.openBy === channelId &&
          setTopUnreadSnackBar(CLOSED_UNREAD_SNACK_BAR_STATE);

        bottomUnreadSnackBar.open &&
          bottomUnreadSnackBar.openBy === channelId &&
          setBottomUnreadSnackBar(CLOSED_UNREAD_SNACK_BAR_STATE);
      } else {
        requestAnimationFrame(() => {
          if (channelListRef.current && ref?.current) {
            const currentScrollTop = channelListRef.current.scrollTop;
            const channelScrollTop =
              ref.current.getBoundingClientRect().y -
              channelListRef.current.getBoundingClientRect().y +
              currentScrollTop;

            if (currentScrollTop > channelScrollTop) {
              setTopUnreadSnackBar({
                ref,
                open: true,
                type: statCount ? "mention" : "unread",
                openBy: channelId,
              });
            } else if (
              currentScrollTop + channelListRef.current.offsetHeight <
              channelScrollTop
            ) {
              setBottomUnreadSnackBar({
                ref,
                open: true,
                type: statCount ? "mention" : "unread",
                openBy: channelId,
              });
            }
          }
        });
      }
    },
    [
      topUnreadSnackBar,
      bottomUnreadSnackBar,
      channelListRef,
      firstUnreadChannel,
      lastUnreadChannel,
      setBottomUnreadSnackBar,
      setTopUnreadSnackBar,
    ],
  );

  const handleClickUnreadSnackBar = React.useCallback(
    (target: "top" | "bottom") => {
      if (target === "top" && topUnreadSnackBar.open) {
        topUnreadSnackBar.ref?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      if (target === "bottom" && bottomUnreadSnackBar.open) {
        bottomUnreadSnackBar.ref?.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    },
    [topUnreadSnackBar, bottomUnreadSnackBar],
  );

  return {
    handleInitialDataLoad,
    handleClickChannel,
    collapseSideNavigation,
    handleChannelInViewChange,
    handleClickUnreadSnackBar,
  };
}

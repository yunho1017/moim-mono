import { AnalyticsClass } from "common/helpers/analytics/analytics";
import * as React from "react";

import { IHookProps, IHookHandlers } from ".";

export default function useEffects(props: IHookProps, handlers: IHookHandlers) {
  const {
    refThis,
    isMobile,
    channelId,
    permissionLoading,
    initialScrollToBottom,
    setInitialScrollToBottom,
    setMobileHeight,
    dispatchGetPermission,
    handleGetConversationMessage,
    dispatchClearMessageEditState,
  } = props;
  const { handleGetConversation } = handlers;

  React.useEffect(() => {
    dispatchClearMessageEditState();
    handleGetConversation(channelId);
    handleGetConversationMessage(channelId);

    AnalyticsClass.getInstance().chatShowView({ chatId: channelId });
  }, [channelId]);

  React.useEffect(() => {
    if (channelId && permissionLoading[channelId] === undefined) {
      dispatchGetPermission({ resource: channelId });
    }
  }, [channelId, permissionLoading]);

  React.useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (isMobile && refThis.current) {
        setMobileHeight(
          window.innerHeight -
            (refThis.current.getBoundingClientRect().y -
              document.documentElement.getBoundingClientRect().y),
        );
      }
    });
  }, [isMobile, refThis, setMobileHeight]);

  React.useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (initialScrollToBottom && isMobile) {
        setTimeout(() => {
          document.scrollingElement?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
          setInitialScrollToBottom(false);
        }, 500);
      }
    });
  }, [initialScrollToBottom, isMobile, setInitialScrollToBottom]);
}

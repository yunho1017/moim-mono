import * as React from "react";

import { IHookProps } from ".";

export default function useEffects(props: IHookProps) {
  const {
    refThis,
    isMobile,
    setLoadStatus,
    setFetchedStatus,
    currentUser,
    channelId,
    setMobileHeight,
    dispatchClearMessageEditState,
    handleGetConversationMessage,
    getDirectMessage,
  } = props;

  React.useEffect(() => {
    if (channelId) {
      setLoadStatus(true);
      getDirectMessage({ direct_message_id: channelId }).finally(() => {
        setFetchedStatus(true);
        setLoadStatus(false);
      });
    }
  }, [channelId]);

  React.useEffect(() => {
    if (currentUser) {
      handleGetConversationMessage(channelId);
    }
  }, [currentUser?.id, channelId, handleGetConversationMessage]);

  React.useEffect(() => {
    dispatchClearMessageEditState();
  }, [channelId]);

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
      if (isMobile) {
        document.scrollingElement?.scrollIntoView(false);
      }
    });
  }, [isMobile]);
}

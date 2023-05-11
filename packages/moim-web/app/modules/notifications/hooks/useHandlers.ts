import * as React from "react";
import { IHookProps } from "./useProps";
import { NotificationType } from "app/enums";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    notificationGroupList,
    cancelToken,
    dispatchGetNotifications,
    scrollSectionRef,
    setSelectedTab,
  } = hookProps;

  const handleGetNotifications = React.useCallback(
    (type: Moim.Enums.NotificationType, paging?: Moim.IPaging) => {
      dispatchGetNotifications({ ...paging, type }, cancelToken.current.token);
    },
    [dispatchGetNotifications, cancelToken],
  );

  const handleLoadMoreAllNotification = React.useCallback(() => {
    handleGetNotifications(
      NotificationType.ALL,
      notificationGroupList[NotificationType.ALL].paging,
    );
  }, [handleGetNotifications, notificationGroupList]);

  const handleLoadMoreMentionNotification = React.useCallback(() => {
    handleGetNotifications(
      NotificationType.MENTION,
      notificationGroupList[NotificationType.MENTION].paging,
    );
  }, [handleGetNotifications, notificationGroupList]);

  const handleClickTab = React.useCallback(
    (tab: Moim.Enums.NotificationType) => {
      setSelectedTab(tab);
      scrollSectionRef.current?.scrollTo(0, 0);
    },
    [scrollSectionRef, setSelectedTab],
  );
  return {
    handleGetNotifications,
    handleLoadMoreAllNotification,
    handleLoadMoreMentionNotification,
    handleClickTab,
  };
}

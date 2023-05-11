import * as React from "react";
import { IHookProps } from "./useProps";
import { MoimURL } from "common/helpers/url";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    redirect,
    isMobile,
    currentUser,
    notiButtonRef,
    openProfileMenu,
    collapseSideNavigation,
    openNotificationsDialog,
  } = hookProps;

  const openMembersInSecondaryView = React.useCallback(() => {
    redirect(new MoimURL.Members({ userId: currentUser.id }).toString());
  }, [currentUser.id, redirect]);

  const handleClickCurrentUser = React.useCallback(() => {
    openProfileMenu();
  }, [openProfileMenu]);

  const handleNotificationButtonClick = React.useCallback(() => {
    if (isMobile) {
      collapseSideNavigation();
    }
    openNotificationsDialog({
      anchorElement: notiButtonRef,
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      transformOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    });
  }, [
    collapseSideNavigation,
    isMobile,
    notiButtonRef,
    openNotificationsDialog,
  ]);

  const handleMyCartClick = React.useCallback(() => {
    redirect(new MoimURL.CommerceMyCarts().toString());
  }, [redirect]);

  return {
    openMembersInSecondaryView,
    handleClickCurrentUser,
    handleNotificationButtonClick,
    handleMyCartClick,
  };
}

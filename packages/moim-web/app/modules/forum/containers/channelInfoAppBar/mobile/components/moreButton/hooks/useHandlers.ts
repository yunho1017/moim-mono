import * as React from "react";
import { IHookProps } from "./useProps";
import { MoimURL } from "common/helpers/url";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { setIsOpenMenu, redirect, forumId } = hookProps;

  const handleClickOpenMenu = React.useCallback(() => {
    setIsOpenMenu(true);
  }, [setIsOpenMenu]);

  const handleClickCloseMenu = React.useCallback(() => {
    setIsOpenMenu(false);
  }, [setIsOpenMenu]);

  const handleClickChannelInfoButton = React.useCallback(() => {
    redirect(
      new MoimURL.ForumMembers({
        forumId,
      }).toString(),
    );
    handleClickCloseMenu();
  }, [handleClickCloseMenu, redirect, forumId]);

  const handleAfterShareChannel = React.useCallback(() => {
    handleClickCloseMenu();
  }, [handleClickCloseMenu]);

  return {
    handleClickOpenMenu,
    handleClickCloseMenu,
    handleClickChannelInfoButton,
    handleAfterShareChannel,
  };
}

import * as React from "react";
import { IHookProps } from "./useProps";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    onClickAppointButton,
    onClickDismissButton,
    onClickEditButton,
    onClickDeleteButton,
    setOpenMenu,
  } = hookProps;

  const handleClickAppointButton = React.useCallback(() => {
    setOpenMenu(false);
    onClickAppointButton();
  }, [onClickAppointButton, setOpenMenu]);

  const handleClickDismissButton = React.useCallback(() => {
    setOpenMenu(false);
    onClickDismissButton();
  }, [onClickDismissButton, setOpenMenu]);

  const handleClickEditButton = React.useCallback(() => {
    setOpenMenu(false);
    onClickEditButton();
  }, [onClickEditButton, setOpenMenu]);

  const handleClickDeleteButton = React.useCallback(() => {
    setOpenMenu(false);
    onClickDeleteButton();
  }, [onClickDeleteButton, setOpenMenu]);

  const handleClickMenuButton = React.useCallback(() => {
    setOpenMenu(true);
  }, [setOpenMenu]);

  const handleCloseMenuDialog = React.useCallback(() => {
    setOpenMenu(false);
  }, [setOpenMenu]);

  return {
    handleClickAppointButton,
    handleClickDismissButton,
    handleClickEditButton,
    handleClickDeleteButton,
    handleClickMenuButton,
    handleCloseMenuDialog,
  };
}

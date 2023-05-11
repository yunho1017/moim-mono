import * as React from "react";
import { IHookProps } from "./useProps";
import { POSITION_DIALOG_PURPOSE } from "../../positionDialog/types";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    position,
    openPositionEditDialog,
    setDialogPurpose,
    setOpenDeleteDialog,
    getPositionMembers,
    dispatchClearDeletePositionError,
  } = hookProps;

  const handleClickAppointButton = React.useCallback(() => {
    setDialogPurpose(POSITION_DIALOG_PURPOSE.APPOINT);
  }, [setDialogPurpose]);

  const handleClickDismissButton = React.useCallback(() => {
    setDialogPurpose(POSITION_DIALOG_PURPOSE.DISMISS);
  }, [setDialogPurpose]);

  const handleCloseDialog = React.useCallback(() => {
    setDialogPurpose(undefined);
  }, [setDialogPurpose]);

  const handleClickEditButton = React.useCallback(() => {
    if (!position) {
      return;
    }

    openPositionEditDialog(position.id);
  }, [openPositionEditDialog, position]);

  const handleClickDeleteButton = React.useCallback(() => {
    setOpenDeleteDialog(true);
  }, [setOpenDeleteDialog]);

  const handleCloseDeleteDialog = React.useCallback(() => {
    setOpenDeleteDialog(false);
    dispatchClearDeletePositionError();
  }, [dispatchClearDeletePositionError, setOpenDeleteDialog]);

  const handleGetPositionMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      if (position) {
        getPositionMembers({
          ...paging,
          positionId: position.id,
        });
      }
    },
    [getPositionMembers, position],
  );

  return {
    handleClickAppointButton,
    handleCloseDialog,
    handleClickDismissButton,
    handleClickEditButton,
    handleClickDeleteButton,
    handleCloseDeleteDialog,
    handleGetPositionMembers,
  };
}

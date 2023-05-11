import * as React from "react";
import { IHookProps } from "./useProps";
import { POSITION_DIALOG_PURPOSE } from "../types";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    intl,
    positionMembers,
    appointPosition,
    dismissPosition,
    cancelToken,
    purpose,
    onClose,
    positionId,
    dispatchGetPositionMembers,
  } = hookProps;

  const handleAppointPosition = React.useCallback(
    async (userIds: Moim.Id[]) => {
      await appointPosition(
        { positionId, appoint: { users: userIds } },
        {
          succeed: intl.formatMessage({
            id: "position_settings/appointment_position/toast_success",
          }),
          failed: intl.formatMessage({
            id: "position_settings/appointment_position/toast_failure",
          }),
        },
        cancelToken.current.token,
      );
    },
    [appointPosition, positionId, intl, cancelToken],
  );

  const handleDismissPosition = React.useCallback(
    async (userIds: Moim.Id[]) => {
      await dismissPosition(
        { positionId, dismiss: { users: userIds } },
        {
          succeed: intl.formatMessage({
            id: "position_settings/dismissal_position/toast_success",
          }),
          failed: intl.formatMessage({
            id: "position_settings/dismissal_position/toast_failure",
          }),
        },
        cancelToken.current.token,
      );
    },
    [dismissPosition, positionId, intl, cancelToken],
  );

  const handleNext = React.useCallback(
    async (userIds: Moim.Id[]) => {
      if (purpose === POSITION_DIALOG_PURPOSE.APPOINT) {
        await handleAppointPosition(userIds);
      } else if (purpose === POSITION_DIALOG_PURPOSE.DISMISS) {
        await handleDismissPosition(userIds);
      }

      onClose();
    },
    [purpose, handleAppointPosition, handleDismissPosition, onClose],
  );

  const appointSelectableUserFilter = React.useCallback(
    (user: Moim.User.IUser) =>
      !positionMembers?.data.find(target => target.id === user.id),
    [positionMembers],
  );

  const handleGetPositionMembers = React.useCallback(
    (paging?: Moim.IPaging) => {
      dispatchGetPositionMembers({
        ...paging,
        positionId,
      });
    },
    [dispatchGetPositionMembers, positionId],
  );

  return {
    handleNext,
    handleGetPositionMembers,
    appointSelectableUserFilter,
  };
}

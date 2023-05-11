import * as React from "react";
import { ActionCreators as ProfileActionCreator } from "app/actions/profile";
import { useActions } from "app/store";

export const useOpenProfileDialog = () => {
  const { open } = useActions({
    open: ProfileActionCreator.openProfileDialog,
  });

  return React.useCallback(
    (...params: Parameters<typeof ProfileActionCreator.openProfileDialog>) => {
      open(...params);
    },
    [open],
  );
};

export const useCloseProfileDialog = () => {
  const { close } = useActions({
    close: ProfileActionCreator.closeProfileDialog,
  });

  return close;
};

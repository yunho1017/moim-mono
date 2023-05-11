import * as React from "react";
import { IHookProps } from "./useProps";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { onChange, setOpenColorDialog } = hookProps;

  const handleClickColor = React.useCallback(
    (color: string) => {
      onChange(color);
    },
    [onChange],
  );

  const handleClickDialogColor = React.useCallback(
    (color: string) => {
      setOpenColorDialog(false);
      onChange(color);
    },
    [onChange],
  );

  const handleClickCurrentColor = React.useCallback(() => {
    setOpenColorDialog(true);
  }, [setOpenColorDialog]);

  const handleCloseColorDialog = React.useCallback(() => {
    setOpenColorDialog(false);
  }, [setOpenColorDialog]);

  return {
    handleClickColor,
    handleClickCurrentColor,
    handleCloseColorDialog,
    handleClickDialogColor,
  };
}

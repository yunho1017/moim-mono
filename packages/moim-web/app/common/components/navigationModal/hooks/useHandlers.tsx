import * as React from "react";
import useNavigationModalClose from "common/hooks/useNavigationModalClose";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers() {
  const handleClose = useNavigationModalClose();

  const handleContentsClick = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
  };

  return {
    handleClose,
    handleContentsClick,
  };
}

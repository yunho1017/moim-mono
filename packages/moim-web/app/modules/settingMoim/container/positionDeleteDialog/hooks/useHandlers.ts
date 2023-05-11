import * as React from "react";
import { IHookProps } from "./useProps";
import { MoimURL } from "app/common/helpers/url";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    deletePosition,
    positionId,
    setChecked,
    isChecked,
    redirect,
  } = hookProps;

  const handleDeletePosition = React.useCallback(async () => {
    const result = await deletePosition({ positionId });

    if (result?.data.success) {
      redirect(new MoimURL.SettingMoimPosition().toString());
    }
  }, [positionId, deletePosition]);

  const handleClickCheckbox = React.useCallback(() => {
    setChecked(!isChecked);
  }, [isChecked, setChecked]);

  return { handleDeletePosition, handleClickCheckbox };
}

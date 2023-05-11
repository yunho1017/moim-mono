import * as React from "react";
import { IHookProps } from "./useProps";
import { MoimURL } from "common/helpers/url";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    cancelToken,
    redirect,
    upPositionPriority,
    downPositionPriority,
  } = hookProps;

  const handleClickPriorityUp = React.useCallback(
    async (positionId: string) => {
      await upPositionPriority(positionId, cancelToken.current.token);
    },
    [upPositionPriority, cancelToken],
  );

  const handleClickPriorityDown = React.useCallback(
    async (positionId: string) => {
      await downPositionPriority(positionId, cancelToken.current.token);
    },
    [downPositionPriority, cancelToken],
  );

  const handleClickDoneButton = React.useCallback(() => {
    redirect(new MoimURL.SettingMoimPosition().toString());
  }, [redirect]);

  return {
    handleClickPriorityUp,
    handleClickPriorityDown,
    handleClickDoneButton,
  };
}

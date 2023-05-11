import * as React from "react";
import { IHookProps } from "./useProps";
import { MoimURL } from "common/helpers/url";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const {
    redirect,
    positionsPaging,
    dispatchOpenForCreate,
    dispatchGetPositions,
    loadingPositions,
  } = hookProps;

  const handleClickAddButton = React.useCallback(() => {
    dispatchOpenForCreate();
  }, [dispatchOpenForCreate]);

  const handleClickEditButton = React.useCallback(() => {
    redirect(new MoimURL.SettingMoimPositionEdit().toString());
  }, [redirect]);

  const handleClickPosition = React.useCallback(
    (positionId: Moim.Id) => {
      redirect(
        new MoimURL.SettingMoimPositionShow({
          positionId,
        }).toString(),
      );
    },
    [redirect],
  );

  const handleLoadMore = React.useCallback(() => {
    if (!loadingPositions && positionsPaging.after) {
      dispatchGetPositions({
        after: positionsPaging.after,
      });
    }
  }, [dispatchGetPositions, positionsPaging, loadingPositions]);

  return {
    handleClickAddButton,
    handleClickEditButton,
    handleClickPosition,
    handleLoadMore,
  };
}

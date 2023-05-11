import { IHookProps } from "./useProps";
import * as React from "react";
import { MoimURL } from "common/helpers/url";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { history, currentGroup, redirect } = hookProps;

  const handleClickButton = React.useCallback(() => {
    if (history.length > 0) {
      history.goBack();
      return;
    }

    if (currentGroup) {
      redirect(new MoimURL.MoimAppHome().toString());
    }
  }, [history, currentGroup, redirect]);

  return {
    handleClickButton,
  };
}

import * as React from "react";
import { IHookProps } from "./useProps";
import { MoimURL } from "common/helpers/url";
import { PRODUCTION_HOST } from "common/constants/hosts";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { history, currentMoim, redirect } = hookProps;

  const handleClickBackButton = React.useCallback(() => {
    history.goBack();
  }, [history]);

  const handleClickHomeButton = React.useCallback(() => {
    if (currentMoim) {
      redirect(new MoimURL.MoimAppHome().toString());
      return;
    }

    window.location.href = PRODUCTION_HOST;
  }, [currentMoim, redirect]);

  return {
    handleClickBackButton,
    handleClickHomeButton,
  };
}

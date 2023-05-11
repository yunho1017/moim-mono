import * as React from "react";
import { useHistory } from "react-router";
import { IHookProps } from "./useProps";
import { BackButton, BackIcon, CloseButton, CloseIcon } from "../styled";
import useNavigationModalClose from "common/hooks/useNavigationModalClose";
import { SpacerVertical } from "common/components/designSystem/spacer";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(props: IHookProps) {
  const history = useHistory();
  const { isMobile, isSettingListPage } = props;

  const handleClickCloseButton = useNavigationModalClose();

  const handleClickBackButton = React.useCallback(() => {
    history.goBack();
  }, [history]);

  const renderLeftButton = React.useCallback(() => {
    if (isMobile) {
      if (isSettingListPage) {
        return (
          <>
            <SpacerVertical value={13} />
            <CloseButton onClick={handleClickCloseButton}>
              <CloseIcon />
            </CloseButton>
          </>
        );
      }

      return (
        <>
          <SpacerVertical value={13} />
          <BackButton onClick={handleClickBackButton}>
            <BackIcon />
          </BackButton>
        </>
      );
    }

    return null;
  }, [
    isMobile,
    isSettingListPage,
    handleClickCloseButton,
    handleClickBackButton,
  ]);

  const renderRightButton = React.useCallback(() => {
    if (isMobile) {
      return null;
    }

    return (
      <CloseButton onClick={handleClickCloseButton}>
        <CloseIcon />
      </CloseButton>
    );
  }, [isMobile, handleClickCloseButton]);

  return {
    ...props,
    renderLeftButton,
    renderRightButton,
  };
}

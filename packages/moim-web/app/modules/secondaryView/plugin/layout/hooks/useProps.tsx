import * as React from "react";
import memoize from "lodash/memoize";
import { css } from "styled-components";
import { useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { usePluginSecondaryView } from "common/hooks/useSecondaryView";
import { TopBannerContext } from "common/components/topBanner/context";
import getDocumentScrollElement from "common/helpers/getDocumentScrollElement";
import { IProps } from "..";
import {
  AppBarLeftButtonWrapper,
  AppBarRightButtonWrapper,
  CloseButton,
  BackIcon,
} from "../../../styled";

const memoizedGetScrollElement = memoize(getDocumentScrollElement);

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { appBar } = props;
  const { leftButton, rightButton, ...appBarRestProps } = appBar;
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const [appBarTopPosition, setAppBarTopPosition] = React.useState(0);
  const isMobile = useIsMobile();
  const { goBack, close } = usePluginSecondaryView();
  const [topBannerContext] = React.useContext(TopBannerContext);
  const {
    pluginOpenStatus,
    nativeOpenStatus,
    pluginHashHistory,
  } = useStoreState(state => ({
    ...state.secondaryViewPage,
  }));

  const containerStyle = React.useMemo(
    () =>
      pluginOpenStatus && nativeOpenStatus
        ? css`
            position: absolute;
            top: 0;
            right: 0;
          `
        : undefined,
    [nativeOpenStatus, pluginOpenStatus],
  );

  const handleClose = React.useCallback(() => {
    close();
  }, [close]);

  const handleBackClick = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const backButton = React.useMemo(() => {
    return pluginHashHistory.length > 1 ? (
      <div onClick={handleBackClick}>
        <BackIcon />
      </div>
    ) : null;
  }, [pluginHashHistory, handleBackClick]);

  const defaultLeftElement = React.useMemo(
    () => isMobile && <CloseButton size="s" onClick={handleClose} touch={24} />,
    [isMobile, handleClose],
  );

  const defaultRightElement = React.useMemo(
    () =>
      !isMobile && <CloseButton size="s" onClick={handleClose} touch={24} />,
    [isMobile, handleClose],
  );

  const leftButtonElement = React.useMemo(
    () =>
      (defaultLeftElement || backButton || leftButton) && (
        <AppBarLeftButtonWrapper>
          {[defaultLeftElement, backButton, leftButton]}
        </AppBarLeftButtonWrapper>
      ),
    [defaultLeftElement, backButton, leftButton],
  );

  const rightButtonElement = React.useMemo(
    () =>
      (rightButton || defaultRightElement) && (
        <AppBarRightButtonWrapper>
          {[rightButton, defaultRightElement]}
        </AppBarRightButtonWrapper>
      ),
    [defaultRightElement, rightButton],
  );

  React.useLayoutEffect(() => {
    const scrollElement = memoizedGetScrollElement(refWrapper.current);

    requestAnimationFrame(() => {
      if (refWrapper.current) {
        if (isMobile) {
          setAppBarTopPosition(
            refWrapper.current.getBoundingClientRect().y -
              scrollElement.getBoundingClientRect().y,
          );
        } else {
          setAppBarTopPosition(
            refWrapper.current.getBoundingClientRect().y -
              document.documentElement.getBoundingClientRect().y,
          );
        }
      }
    });
  }, [refWrapper.current, topBannerContext.currentVisibleState, isMobile]);

  return {
    ...props,
    refWrapper,
    appBarTopPosition,
    appBarRestProps,
    containerStyle,
    leftElement: leftButtonElement,
    rightElement: rightButtonElement,
  };
}

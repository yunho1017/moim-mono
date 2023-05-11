import * as React from "react";
import { useProps } from "./hooks";
import { useHistory } from "react-router-dom";
import { FlattenInterpolation } from "styled-components";
import AppBar from "common/components/appBar";
import FreezeView from "common/components/freezeView";
import {
  getAppBarStickyStyle,
  AppBarWrapperStyle,
  Body,
  SecondaryView,
  ScrollSection,
  BackIconButton,
  LeftButtonWrapper,
} from "../../styled";

export interface IProps extends React.PropsWithChildren<{}> {
  disableLeftButton?: boolean;
  appBar: React.ComponentProps<typeof AppBar>;
  bodyOverrideStyle?: FlattenInterpolation<any>;
  renderCloseButton?: (close: () => void) => React.ReactNode;
}

export function DefaultLayout(props: IProps) {
  const {
    refWrapper,
    appBarTopPosition,
    bodyOverrideStyle,
    // leftElement,
    rightElement,
    appBarRestProps,
    children,
  } = useProps(props);
  const { wrapperStickyStyle, ...rest } = appBarRestProps;

  const history = useHistory();

  const goBack = React.useCallback(() => {
    if (history.length > 2) {
      history.goBack();
    }
  }, [history]);

  return (
    <SecondaryView id="native-secondary-view" ref={refWrapper}>
      <FreezeView isFreeze={false}>
        <ScrollSection>
          <AppBar
            wrapperStickyStyle={getAppBarStickyStyle(
              appBarTopPosition,
              wrapperStickyStyle,
            )}
            wrapperStyle={AppBarWrapperStyle}
            leftButton={
              !props.disableLeftButton && (
                <LeftButtonWrapper>
                  <BackIconButton onClick={goBack} />
                </LeftButtonWrapper>
              )
            }
            rightButton={rightElement}
            {...rest}
          />
          <Body overrideStyle={bodyOverrideStyle}>{children}</Body>
        </ScrollSection>
      </FreezeView>
    </SecondaryView>
  );
}

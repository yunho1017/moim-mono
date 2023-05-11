import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import AppBar from "common/components/appBar";
import FreezeView from "common/components/freezeView";
import {
  getAppBarStickyStyle,
  AppBarWrapperStyle,
  Body,
  SecondaryView,
  ScrollSection,
} from "../../styled";
import { useProps } from "./hooks";

export interface IProps extends React.PropsWithChildren<{}> {
  appBar: React.ComponentProps<typeof AppBar>;
  bodyOverrideStyle?: FlattenInterpolation<any>;
  renderCloseButton?: (close: () => void) => React.ReactNode;
}

export function DefaultLayout(props: IProps) {
  const {
    refWrapper,
    appBarTopPosition,
    bodyOverrideStyle,
    leftElement,
    rightElement,
    appBarRestProps,
    children,
  } = useProps(props);
  const { wrapperStickyStyle, ...rest } = appBarRestProps;

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
            leftButton={leftElement}
            rightButton={rightElement}
            {...rest}
          />
          <Body overrideStyle={bodyOverrideStyle}>{children}</Body>
        </ScrollSection>
      </FreezeView>
    </SecondaryView>
  );
}

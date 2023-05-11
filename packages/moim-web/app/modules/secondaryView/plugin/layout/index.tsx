import * as React from "react";
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
}

export function DefaultLayout(props: IProps) {
  const {
    refWrapper,
    appBarTopPosition,
    leftElement,
    rightElement,
    appBarRestProps,
    containerStyle,
    children,
  } = useProps(props);
  const { wrapperStickyStyle, ...rest } = appBarRestProps;

  return (
    <SecondaryView ref={refWrapper} overrideStyle={containerStyle}>
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
          <Body>{children}</Body>
        </ScrollSection>
      </FreezeView>
    </SecondaryView>
  );
}

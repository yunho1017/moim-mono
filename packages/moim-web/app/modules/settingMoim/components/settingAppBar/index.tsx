import * as React from "react";
import AppBar from "common/components/appBar";
import { useProps, useHandlers } from "./hooks";
import { TitleWrapper, WrapperStyle, HeaderStyle } from "./styled";

export interface IProps {
  basePathPattern: string;
  title: React.ReactNode;
}

function SettingAppBar(props: IProps) {
  const hookHandlers = useHandlers(useProps(props));
  const { title, renderLeftButton, renderRightButton } = hookHandlers;

  return (
    <AppBar
      titleElement={<TitleWrapper>{title}</TitleWrapper>}
      leftButton={renderLeftButton()}
      rightButton={renderRightButton()}
    />
  );
}

export default SettingAppBar;

export { WrapperStyle, HeaderStyle };

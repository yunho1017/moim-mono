import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import AppBar from "common/components/appBar";
import { Wrapper, Header, Content } from "./styled";
import FreezeView from "common/components/freezeView";

interface IProps extends React.PropsWithChildren<{}> {
  title: React.ReactNode;
  modalOpenStatus?: boolean;
  actionButton?: React.ReactNode;
  leftElement?: React.ReactNode;
  headerWrapperStyle?: FlattenInterpolation<any>;
  customContentWrapper?: React.ElementType;
}

export default function AppBarModalLayout({
  title,
  modalOpenStatus = false,
  leftElement,
  actionButton,
  headerWrapperStyle,
  children,
  customContentWrapper = Content,
}: IProps) {
  return (
    <Wrapper>
      <Header overrideStyle={headerWrapperStyle}>
        <AppBar
          titleElement={title}
          titleAlignment="Center"
          rightButton={actionButton}
          leftButton={leftElement}
        />
      </Header>
      <FreezeView isFreeze={modalOpenStatus} delayedFreeze={100}>
        {React.createElement(customContentWrapper, undefined, children)}
      </FreezeView>
    </Wrapper>
  );
}

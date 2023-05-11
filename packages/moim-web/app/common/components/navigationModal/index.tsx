import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// hooks
import { useHandlers } from "./hooks";
// components
import FreezeView from "app/common/components/freezeView";
import { Wrapper, Content, FixedContainer } from "./styledComponent";

export type IProps = React.PropsWithChildren<{}>;

function NavigationModal({ children }: IProps) {
  const hookHandlers = useHandlers();

  const { handleClose, handleContentsClick } = hookHandlers;

  return (
    <FixedContainer onClick={handleClose}>
      <FreezeView>
        <Content>
          <Wrapper onClick={handleContentsClick}>{children}</Wrapper>
        </Content>
      </FreezeView>
    </FixedContainer>
  );
}

export default NavigationModal;

export function DialogContainer({
  children,
  overrideContainerStyle,
  handleClose,
}: IProps & {
  overrideContainerStyle?: FlattenInterpolation<any>;
  handleClose(): void;
}) {
  return (
    <FixedContainer
      overrideStyle={overrideContainerStyle}
      onClick={handleClose}
    >
      <FreezeView>{children}</FreezeView>
    </FixedContainer>
  );
}

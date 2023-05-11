import * as React from "react";
import {
  Container,
  LeftWrapper,
  RightWrapper,
  TopWrapper,
  Wrapper,
} from "./styled";
import { useProps } from "./hooks";

export interface IProps {
  top?: React.ReactElement;
  left?: React.ReactElement;
  right?: React.ReactElement;
}

function SettingLayout(props: IProps) {
  const hookProps = useProps(props);
  const { top, left, right, isRenderLeft } = hookProps;

  return (
    <Wrapper>
      {top && <TopWrapper>{top}</TopWrapper>}
      <Container>
        {isRenderLeft && <LeftWrapper>{left}</LeftWrapper>}
        {right && <RightWrapper>{right}</RightWrapper>}
      </Container>
    </Wrapper>
  );
}

export default SettingLayout;

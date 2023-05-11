import * as React from "react";

import { Wrapper, IconWrapper, Text } from "./styled";

interface IProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  onClick?: () => void;
}

export default function SNSShareItem({ icon, text, onClick }: IProps) {
  return (
    <Wrapper onClick={onClick}>
      <IconWrapper>{icon}</IconWrapper>
      <Text>{text}</Text>
    </Wrapper>
  );
}

import * as React from "react";
import styled, { css } from "styled-components";
import DragIconBase from "@icon/18-move-g.svg";
import { px2rem } from "common/helpers/rem";

interface IProps {
  draggable?: boolean;
}

const Wrapper = styled.div<IProps>`
  width: ${px2rem(42)};
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-radius: ${px2rem(2)};
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }

  ${props =>
    !props.draggable &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;
const DragIcon = styled(DragIconBase).attrs({
  size: "xs",
})``;

export default function DragButton(
  props: Omit<React.HTMLProps<HTMLDivElement>, "ref" | "as"> & IProps,
) {
  return (
    <Wrapper {...props}>
      <DragIcon />
    </Wrapper>
  );
}

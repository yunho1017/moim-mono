import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

import { H9Bold } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import PeriodIconBase from "@icon/18-timersolid.svg";

const BUTTON_WIDTH = 172 + 16;

export const MoimInfoWrapper = styled.div<{ visibleJoinButton: boolean }>`
  padding: 0 ${px2rem(16)};
  max-width: calc(
    100% - ${props => (props.visibleJoinButton ? px2rem(BUTTON_WIDTH) : 0)}
  );
  height: 100%;

  display: flex;
  align-items: center;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex: 1;
    min-width: 0;
  }
`;

export const MoimName = styled(H9Bold)`
  color: ${props => {
    const palette = props.theme.getTopSubAreaElementPalette(
      "childMoimNameText",
    );
    return palette.color ?? palette.fog800;
  }};
  margin-left: ${px2rem(12)};
  flex: 1;
  min-width: 0;
`;

export const ButtonWrapper = styled.div`
  width: ${px2rem(BUTTON_WIDTH)};
`;

export const Wrapper = styled.div`
  width: 100%;
  min-width: ${px2rem(330)};
  height: ${px2rem(44)};
  display: flex;
  align-items: center;

  & > ${MoimInfoWrapper} + ${ButtonWrapper} {
    margin-right: ${px2rem(16)};
  }
`;

export const PeriodIconWrapper = styled.div.attrs({ role: "button" })<{
  selected: boolean;
}>`
  display: inline-block;
  transition: background-color 200ms ease-in;
  border-radius: ${px2rem(2)};
  position: relative;
  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.getTopSubAreaElementPalette("background")
        .fog50};
    `};
  &:hover {
    background-color: ${props =>
      props.theme.getTopSubAreaElementPalette("background").fog50};
  }
`;

export const PeriodIcon = styled(PeriodIconBase).attrs(props => {
  const palette = props.theme.getTopSubAreaElementPalette("menuText");
  const iconColor = palette.color ?? palette.fog800;

  return {
    size: "xs",
    touch: 42,
    role: "button",
    iconColor,
  };
})``;

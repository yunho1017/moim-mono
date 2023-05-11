import styled, { css } from "styled-components";

import { px2rem } from "common/helpers/rem";
import { B2Regular } from "common/components/designSystem/typos";
import BottomUnreadIconBase from "@icon/18-doublearrow-g-2.svg";

export const newCommentSnackbarStyles = css`
  width: auto;
  min-width: 0;
  padding: 0 ${px2rem(16)} 0 ${px2rem(8)};
  margin: 0 auto;
`;

export const UnreadSnackBarContent = styled<any>(B2Regular)`
  padding: ${px2rem(7)} 0 ${px2rem(6)};
  color: ${props => props.theme.colorV2.colorSet.white1000};
  margin-left: ${px2rem(8)};
  white-space: nowrap;
`;

export const BottomUnreadIcon = styled(BottomUnreadIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const TopUnreadIcon = styled(BottomUnreadIconBase).attrs({
  size: "xs",
  touch: 18,
})`
  transform: rotate(180deg);
`;

import styled, { css } from "styled-components";

import { px2rem } from "common/helpers/rem";
import { B2Regular } from "common/components/designSystem/typos";
import NewPostIconBase from "@icon/18-retry-w.svg";

export const newPostSnackbarStyles = css`
  width: auto;
  min-width: 0;
  padding: 0 ${px2rem(8)} 0 ${px2rem(16)};
  margin: 0 auto;
`;

export const UnreadSnackBarContent = styled(B2Regular)`
  padding: ${px2rem(7)} 0 ${px2rem(6)};
  color: ${props => props.theme.colorV2.colorSet.white1000};
  margin-right: ${px2rem(14)};
  white-space: nowrap;
`;

export const NewPostIcon = styled(NewPostIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

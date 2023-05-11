import { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle } from "common/components/designSystem/typos";

export const textAreaStyle = css`
  min-height: ${px2rem(66)};
  padding: ${px2rem(15)} 0;
  border: 0;
  outline: 0;
  resize: none;
  ${B1RegularStyle};
  &::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

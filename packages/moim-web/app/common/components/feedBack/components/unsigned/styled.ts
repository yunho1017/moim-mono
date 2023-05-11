import styled, { FlattenInterpolation } from "styled-components";

import LoginIconBase from "@icon/48-login.svg";
import { B2Regular } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";

export const LoginIcon = styled(LoginIconBase).attrs(props => ({
  size: "l",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey600,
}))``;

export const UnsignedInputWrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  margin-top: ${px2rem(12)};
  padding: 0 ${px2rem(16)} ${px2rem(23)};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
  ${props => props.overrideStyle}
`;

export const UnsignedInputText = styled(B2Regular)`
  position: relative;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  height: ${px2rem(44)};
  line-height: ${px2rem(44)};
  border-radius: ${px2rem(4)};
  padding: 0 ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

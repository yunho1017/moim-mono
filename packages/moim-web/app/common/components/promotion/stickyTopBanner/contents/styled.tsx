import styled from "styled-components";
import CloseIconBase from "@icon/18-close-w.svg";

import { px2rem } from "common/helpers/rem";
import { H10Bold } from "common/components/designSystem/typos";
import { FlatGeneralButton } from "common/components/designSystem/buttons";

export const Wrapper = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  height: ${px2rem(40)};
  background-color: ${props =>
    props.backgroundColor ?? props.theme.colorV2.accent};

  display: flex;
  align-items: center;
  padding-left: ${px2rem(16)};
  padding-right: ${px2rem(10)};
`;

export const ContentText = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  width: 100%;
  min-width: 0;
  flex: 1;
  padding-left: ${px2rem(8)};
  padding-right: ${px2rem(4)};
`;

export const OpenAppButton = styled(FlatGeneralButton).attrs({ size: "s" })``;

export const CloseButton = styled(CloseIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  role: "button",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

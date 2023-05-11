import styled, { css } from "styled-components";
import {
  B4Regular,
  pB4RegularStyle,
  H8Bold,
  H4BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import BackIconBase from "@icon/24-back-b";
import CurrencyFormatter from "common/components/currencyFormatter";

export const AppBarTitleWrapper = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const AppBarStickyWrapperStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const ToBeExpiredCurrency = styled(CurrencyFormatter)`
  display: inline-block;
`;

export const LeftButtonWrapper = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
`;

export const BackIcon = styled(BackIconBase).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;

export const Guide = styled(B4Regular)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const ExpiredCreditAmount = styled(B4Regular)`
  padding: ${px2rem(20)} ${px2rem(12)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};

  .title {
    color: ${props => props.theme.color.red700};
    ${pB4RegularStyle}
  }

  .amount {
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${H4BoldStyle}
  }
`;

import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import {
  PB3Regular,
  B4Regular,
  H10Bold,
} from "common/components/designSystem/typos";
import { Wrapper } from "common/components/userProfileImage/styledComponents";
import { SizeWrapper } from "common/icons/styledComponents";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import CurrencyFormatter from "common/components/currencyFormatter";

import RecieveCoinIconBase from "@icon/24-recieve-coin-blue.svg";
import WalletCoinIconBase from "@icon/24-wallet-blue.svg";
import SwapCoinIconBase from "@icon/24-swap-coin.svg";
import SendCoinIconBase from "@icon/24-send-coin.svg";

export const RecieveCoinIcon = styled(RecieveCoinIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const SmallRecieveCoinIcon = styled(RecieveCoinIconBase).attrs(
  props => ({
    size: "xs",
    iconColor: props.theme.colorV2.colorSet.grey800,
  }),
)``;

export const WalletCoinIcon = styled(WalletCoinIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const SwapCoinIcon = styled(SwapCoinIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const SendCoinIcon = styled(SendCoinIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const SmallSendCoinIcon = styled(SendCoinIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const OverImageIcon = styled.div`
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  ${SizeWrapper} {
    z-index: ${props => props.theme.zIndexes.default};
  }
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  border-radius: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const TypeIconWrapper = styled.div<{
  hasBlueBackgroundColor?: boolean;
  isUserType?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  background-color: ${props =>
    props.hasBlueBackgroundColor
      ? rgba(props.theme.color.lightblue900, 0.06)
      : props.theme.colorV2.colorSet.grey50};
  border-radius: 100%;
  ${props =>
    props.isUserType &&
    css`
      background-color: transparent;
      position: relative;
      ${Wrapper} {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      ${OverImageIcon}::before {
        background-color: ${props.hasBlueBackgroundColor
          ? rgba(props.theme.color.lightblue900, 0.06)
          : rgba(props.theme.colorV2.colorSet.grey50, 0.02)};
      }
    `};
`;

export const CoinHistoryItemWrapper = styled.div`
  padding: 0 ${px2rem(16)};
`;

export const ItemContainer = styled.div`
  min-height: ${px2rem(72)};
  padding: ${px2rem(12)} 0;
  display: flex;
  gap: ${px2rem(12)};
  justify-content: center;
  align-items: center;
`;

export const HistoryItemRightContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: auto;
  grid-row-gap: ${px2rem(2)};
  div:nth-child(2n) {
    text-align: right;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Value = styled(H10Bold)<{ isPositive?: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  color: ${props =>
    props.isPositive
      ? props.theme.color.lightblue900
      : props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
`;

export const SubText = styled(B4Regular)`
  ${useSingleLineStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  a {
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;

export const MemoBubbleWrapper = styled.div`
  width: calc(100% - ${px2rem(60)});
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  display: flex;
  justify-content: center;
  margin-left: ${px2rem(60)};
  padding: ${px2rem(7)} ${px2rem(12)};
  border-radius: 0 ${px2rem(16)} ${px2rem(16)} ${px2rem(16)};
`;

export const MemoText = styled(PB3Regular)<{ isShaved: boolean }>`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  width: 100%;
  user-select: none;
  ${props => props.isShaved && useSingleLineStyle}
`;

export const HistoryItemCurrency = styled(CurrencyFormatter)`
  word-break: break-all;
`;

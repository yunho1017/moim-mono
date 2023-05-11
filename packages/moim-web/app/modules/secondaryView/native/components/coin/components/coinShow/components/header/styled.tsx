import styled from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { B4Regular, H4Bold } from "common/components/designSystem/typos";
import InfoIconBase from "@icon/18-info-g.svg";

export const CoinHeaderWrapper = styled.div`
  height: fit-content;
`;

export const TopWrapper = styled.div<{
  hexCode?: string;
  hasBottomBorderRadius: boolean;
}>`
  padding: ${px2rem(8)} 0 ${px2rem(20)};
  background-color: ${props =>
    rgba(props.hexCode ? props.hexCode : props.theme.color.yellow900, 0.1)};
  border-radius: ${props =>
    props.hasBottomBorderRadius && `0 0 ${px2rem(12)} ${px2rem(12)}`};
`;

export const CoinInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${px2rem(16)};
`;

export const CoinIconWrapper = styled.div`
  height: ${px2rem(18)};
  width: ${px2rem(18)};
`;

export const CoinInfoText = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(5)};
`;

export const InfoIcon = styled(InfoIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const CoinPrice = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  text-align: center;
`;
export const ExchangePrice = styled(B4Regular)`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  text-align: center;
`;

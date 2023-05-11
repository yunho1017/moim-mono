import { B3Regular, H10Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";
import styled from "styled-components";

export const Wrapper = styled.div<{ coinColor?: string }>`
  width: 100%;
  height: ${px2rem(60)};
  background-color: ${props =>
    props.coinColor ? rgba(props.coinColor, 0.15) : undefined};
  border-radius: ${px2rem(8)};
  padding: 0 ${px2rem(16)};
  display: flex;
  align-items: center;
`;

export const CoinIcon = styled.img`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  margin-right: ${px2rem(12)};
  object-fit: cover;
`;
export const CoinName = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  flex: 1;
  min-width: 0;
  margin-right: ${px2rem(8)};
  text-align: left;
`;
export const CoinAmount = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  flex: 1;
  min-width: 0;
  text-align: right;
`;

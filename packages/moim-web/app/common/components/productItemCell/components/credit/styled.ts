import styled from "styled-components";
import CoinIconBase from "@icon/18-coin.svg";
import ChipBase from "common/components/chips";

import { px2rem } from "common/helpers/rem";
import { getFlexAlignStyle } from "../wrapper/styled";

export const CoinIcon = styled(CoinIconBase).attrs({ size: "xs" })`
  margin-right: ${px2rem(2)};
`;

export const PointChip = styled(ChipBase).attrs({
  shape: "round",
  size: "small",
})`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(15)};
  text-transform: uppercase;
`;

export const Wrapper = styled.div<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  display: flex;
  padding: ${px2rem(4)} 0;
  ${props =>
    props.horizontalAlign &&
    getFlexAlignStyle({
      direction: "row",
      horizontalAlign: props.horizontalAlign,
    })}
`;

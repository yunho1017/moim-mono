import styled from "styled-components";

import CoinIconBase from "@icon/24-coin.svg";

import { px2rem } from "common/helpers/rem";

import { B2RegularStyle } from "common/components/designSystem/typos";
import ProductSummaryElementWrapper from "../../wrapper";

export const PointContainer = styled(ProductSummaryElementWrapper)`
  width: 100%;
  padding: ${px2rem(10)} ${px2rem(16)};
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B2RegularStyle}

  span + span {
    margin-left: ${px2rem(14)};
  }
`;

export const CoinIcon = styled(CoinIconBase).attrs({ size: "s" })``;

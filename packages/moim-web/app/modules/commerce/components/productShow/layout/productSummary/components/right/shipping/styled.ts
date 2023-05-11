import styled from "styled-components";
import ArrowIconBase from "@icon/18-rightarrow-g.svg";
import ChipBase from "common/components/chips";
import { B3Regular } from "common/components/designSystem/typos";
import ProductSummaryElementWrapper from "../../wrapper";

import { px2rem } from "common/helpers/rem";

export const ShippingFeeContainer = styled(ProductSummaryElementWrapper)`
  padding: ${px2rem(6)} ${px2rem(16)};
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: baseline;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const ShippingFee = styled(B3Regular)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  .deliveryFeeRange {
    & > span + span {
      &::before {
        content: "~";
      }
    }
  }
`;

export const ArrowIcon = styled(ArrowIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey600,
}))``;

export const DeliveryGroupLinkChip = styled(ChipBase)`
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  cursor: pointer;

  :hover {
    opacity: 0.6;
  }
`;

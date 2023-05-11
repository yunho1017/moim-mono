import styled from "styled-components";

import { px2rem } from "common/helpers/rem";
import ProductSummaryElementWrapper from "../../wrapper";

export const HorizontalStackContainer = styled(ProductSummaryElementWrapper)`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Percentage = styled.span`
  color: ${props => props.theme.color.red700};
`;
export const Price = styled.span`
  margin-left: ${px2rem(2)};

  text-decoration: line-through;
  color: ${props => props.theme.colorV2.colorSet.grey200};
`;

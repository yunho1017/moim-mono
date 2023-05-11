import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

import { B4RegularStyle } from "common/components/designSystem/typos";
import ProductSummaryElementWrapper from "../../wrapper";

export const Review = styled(ProductSummaryElementWrapper)`
  display: flex;
  align-items: center;
  padding: ${px2rem(4)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle};
`;

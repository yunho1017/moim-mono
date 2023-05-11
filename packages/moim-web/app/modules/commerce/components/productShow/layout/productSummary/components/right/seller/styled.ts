import styled from "styled-components";

import ProductSummaryElementWrapper from "../../wrapper";
import { px2rem } from "common/helpers/rem";

import { B3RegularStyle } from "common/components/designSystem/typos";

export const Wrapper = styled(ProductSummaryElementWrapper)`
  display: inline-flex;
  align-items: center;
  padding: ${px2rem(10)} ${px2rem(16)};

  span.name {
    display: inline-block;
    margin-left: ${px2rem(12)};
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${B3RegularStyle}
  }
`;

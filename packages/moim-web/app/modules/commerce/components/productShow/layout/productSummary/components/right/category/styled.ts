import styled from "styled-components";
import { Link } from "react-router-dom";

import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

import {
  B3RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import ProductSummaryElementWrapper from "../../wrapper";

export const CategoryContainer = styled(ProductSummaryElementWrapper)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: ${px2rem(4)} ${px2rem(16)};
`;

export const CategoryLabel = styled(Link)<{ isFundType?: boolean }>`
  display: inline-block;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${props => (props.isFundType ? B3RegularStyle : H10BoldStyle)}

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    :hover {
      text-decoration: underline;
    }
  }
`;

export const CategorySep = styled.span`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H10BoldStyle};
  display: inline-display;
  padding: 0 ${px2rem(4)};

  :last-of-type {
    display: none;
  }
`;

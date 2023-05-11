import styled from "styled-components";

import { px2rem } from "common/helpers/rem";
import {
  B1RegularStyle,
  pB1RegularStyle,
  H2Bold,
  H8Bold,
  B2Regular,
} from "common/components/designSystem/typos";

const DEFAULT_PADDING = 16;

export const StyledHeadingOne = styled(H2Bold)`
  padding: ${px2rem(15)} ${px2rem(DEFAULT_PADDING)};
`;

export const StyledHeadingThree = styled(H8Bold)`
  padding: ${px2rem(15)} ${px2rem(DEFAULT_PADDING)};
  position: sticky;
  top: ${px2rem(52)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.default};
`;

export const StyledBodyOne = styled.div`
  padding: ${px2rem(8)} ${px2rem(DEFAULT_PADDING)};
  ${pB1RegularStyle}
`;

export const Section = styled.section`
  a {
    color: ${props => props.theme.color.cobalt800};
  }
`;

export const UlWrapper = styled.ul`
  list-style: disc;
  padding-top: ${px2rem(24)};
  position: relative;
`;

export const UlDashWrapper = styled.ul`
  position: relative;
  li:before {
    content: "-";
    margin-right: ${px2rem(5)};
    ${B1RegularStyle};
  }
`;

export const Description = styled(B2Regular)`
  padding-top: ${px2rem(2)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

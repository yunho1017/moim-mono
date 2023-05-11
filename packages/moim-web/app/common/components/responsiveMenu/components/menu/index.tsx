import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

import { MEDIA_QUERY } from "common/constants/responsive";
import { B2RegularStyle } from "common/components/designSystem/typos";
import { useHoverStyle } from "common/components/designSystem/styles";

export const MenuWrapper = styled.ul`
  width: 100%;
  padding: ${px2rem(4)} 0;

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    max-width: ${px2rem(300)};
  }
`;

export const MenuItem = styled.li.attrs({ role: "button" })`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  ${B2RegularStyle}
  min-width: ${px2rem(130)};
  height: ${px2rem(42)};
  padding: ${px2rem(10)} ${px2rem(16)};
  display: flex;
  align-items: center;

  ${useHoverStyle};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(52)};
    padding: ${px2rem(15)} ${px2rem(16)};
    gap: ${px2rem(12)};
    color: ${props => props.theme.colorV2.colorSet.grey900};
  }
`;

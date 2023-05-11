import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  B1RegularStyle,
  B2RegularStyle,
} from "common/components/designSystem/typos";

export const MenuWrapper = styled.ul`
  width: 100%;
  padding: ${px2rem(4)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    max-width: ${px2rem(300)};
  }
`;

export const MenuText = styled.div`
  margin-left: ${px2rem(12)};
  color: ${props => props.theme.colorV2.colorSet.grey600};

  ${B2RegularStyle}

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${B1RegularStyle}
  }
`;

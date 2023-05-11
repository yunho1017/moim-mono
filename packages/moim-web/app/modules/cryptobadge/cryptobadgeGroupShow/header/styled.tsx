import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import {
  B3RegularStyle,
  H8BoldStyle,
  H4BoldStyle,
} from "common/components/designSystem/typos";

export const HeaderWrapper = styled.div`
  max-width: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin: ${px2rem(40)} auto ${px2rem(28)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(24)} auto ${px2rem(20)};
  }
`;

export const Title = styled.div`
  position: relative;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle};
  }
`;

export const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B3RegularStyle};
  ${useSingleLineStyle};
`;

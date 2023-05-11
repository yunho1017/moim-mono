import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H8BoldStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const SectionTitle = styled.div<{
  disableSidePadding?: boolean;
}>`
  display: block;
  padding: ${px2rem(10)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};

  ${props =>
    props.disableSidePadding &&
    css`
      padding: ${px2rem(10)} 0;
    `}

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H10BoldStyle}
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }
`;

export const WideDivider = styled.div`
  width: calc(100% + ${px2rem(32)});
  height: ${px2rem(8)};
  margin-left: ${px2rem(-16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: none;
  }
`;

export const MaxWidthWrapper = styled.div`
  width: 100%;
  max-width: ${px2rem(1000)};
  margin: 0 auto;
`;

import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { BGLevel1 } from "common/components/designSystem/BGLevel";
import { useOpacityHoverStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const TreasuryItemContentWrapper = styled(BGLevel1)`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(8)};

  box-sizing: border-box;

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    &:hover {
      ${useOpacityHoverStyle}
    }
  }
`;

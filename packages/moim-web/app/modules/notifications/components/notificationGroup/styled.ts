import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H10BoldStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { BG_LEVEL_BACKGROUND_CLASS_NAME } from "common/components/designSystem/BGLevel";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Title = styled.label.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})`
  ${H10BoldStyle};

  color: ${props => props.theme.colorV2.colorSet.grey800};
  z-index: ${props => props.theme.zIndexes.default};
  padding: ${px2rem(12)} ${px2rem(16)};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: sticky;
    top: 0;
    left: 0;
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

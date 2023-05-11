import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "../designSystem/styles";
import { BG_LEVEL_BACKGROUND_CLASS_NAME } from "../designSystem/BGLevel";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${px2rem(24)};
  ${useScrollStyle}
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: 100%;
  }
`;
export const Inner = styled.div`
  padding: 0 ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex: 1;
    min-width: 0;
    padding: 0;
  }
`;

export const AppBarWrapper = styled.div.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})`
  padding: ${px2rem(8)} ${px2rem(4)} ${px2rem(0)};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndexes.default + 1};
`;

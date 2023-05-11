import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  ${useScrollStyle}
`;

export const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const MaxWidthWrapper = styled.div`
  width: 100%;
  max-width: ${px2rem(968)};
  margin: 0 auto;
  padding: 0 ${px2rem(16)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    overflow: inherit;
  }
`;

export const TopWrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: flex;
    gap: ${px2rem(32)};
  }
`;

export const Left = styled.div`
  width: calc(100% / 5 * 3 - ${px2rem(16)});
`;

export const Right = styled.div`
  width: calc(100% / 5 * 2 - ${px2rem(16)});
`;

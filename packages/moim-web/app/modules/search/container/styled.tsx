import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  ${useScrollStyle};
`;

export const Inner = styled.div`
  max-width: ${px2rem(700)};
  width: 100%;
  padding-top: ${px2rem(24)};
`;

export const ItemWrapper = styled.a`
  width: 100%;
  display: block;
  padding: 0 ${px2rem(8)};

  & + & {
    margin-top: ${px2rem(12)};
  }
`;

export const BottomSpacer = styled.div`
  width: 100%;
  height: ${px2rem(80)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: 0;
  }
`;

import styled from "styled-components";

import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const List = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
  column-gap: ${px2rem(12)};
  row-gap: ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${MEDIA_QUERY.ONLY_TABLET} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

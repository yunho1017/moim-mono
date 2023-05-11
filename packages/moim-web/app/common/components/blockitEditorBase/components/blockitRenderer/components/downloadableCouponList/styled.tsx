import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const InnerContainer = styled.div`
  width: 100%;
  padding: ${px2rem(8)} 0;
`;

export const Inner = styled.div`
  width: 100%;
  height: fit-content;

  .react-card-flip {
    width: 100%;

    @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
      max-width: ${px2rem(400)};
    }
  }
`;

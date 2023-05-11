import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const AlertContainer = styled.div`
  width: ${px2rem(343)};
  height: fit-content;
  border-radius: ${px2rem(4)};
  overflow: hidden;
  margin: ${px2rem(10)} !important;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: calc(100vw - ${px2rem(20)});
    border-radius: 0;
  }
  animation-duration: 500ms;
`;

import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const ScheduleListWrapper = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: ${px2rem(16)};
  }
`;

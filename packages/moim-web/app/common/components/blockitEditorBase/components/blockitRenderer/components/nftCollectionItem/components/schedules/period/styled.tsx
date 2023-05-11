import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { B4Regular } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const SchedulePeriod = styled(B4Regular)`
  max-height: ${px2rem(32)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const SchedulePeriodStyle = css`
  color: ${props => props.theme.colorV2.accent};
  background-color: ${props => rgba(props.theme.colorV2.accent, 0.14)};
`;

export const SchedulePeriodWrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: flex;
    gap: 0 ${px2rem(8)};
    align-items: center;
  }
`;

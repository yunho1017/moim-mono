import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular, H8BoldStyle } from "common/components/designSystem/typos";
import { Wrapper } from "common/components/blockitEditorBase/components/blockitRenderer/components/timer/styled";
import { MEDIA_QUERY } from "common/constants/responsive";

export const SchedulePeriod = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const SchedulePeriodStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  ${H8BoldStyle};
`;

export const ScheduleTimerText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  width: 100%;
  height: ${px2rem(40)};
  border-radius: ${px2rem(4)};
  ${H8BoldStyle};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    border-radius: 0;
  }
`;

export const UpcomingTimerWrapper = styled(Wrapper)`
  margin: 0 0 ${px2rem(6)};
`;

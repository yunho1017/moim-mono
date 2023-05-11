import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H2Bold } from "common/components/designSystem/typos";

export const ScheduleInner = styled.div``;

export const ScheduleHeaderWrapper = styled.div`
  min-height: ${px2rem(58)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ScheduleHeaderTitle = styled(H2Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  word-break: break-word;
`;

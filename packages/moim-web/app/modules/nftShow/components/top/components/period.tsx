import * as React from "react";
import DDayComponent, { calculateDDay } from "common/components/period";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import TimeIconBase from "@icon/18-time-g.svg";
import { B4Regular } from "common/components/designSystem/typos";
import { getScheduleStatus } from "common/helpers/nft";

const PeriodWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(20)};
`;

const PeriodText = styled(B4Regular)`
  margin-left: ${px2rem(6)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const TimeIcon = styled(TimeIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface IProps {
  startAt?: number;
  endAt?: number;
}

const Period: React.FC<IProps> = ({ startAt, endAt }: IProps) => {
  if (!startAt || !endAt) return null;

  const dDayData = calculateDDay({
    startTime: startAt,
    endTime: endAt,
  });

  const scheduleStatus = getScheduleStatus(startAt, endAt);

  if (scheduleStatus === "TERMINATED") return null;

  return (
    <PeriodWrapper>
      <TimeIcon />
      <PeriodText>
        <DDayComponent dDay={dDayData} />
      </PeriodText>
    </PeriodWrapper>
  );
};

export default React.memo(Period);

import * as React from "react";
import DDayComponent, { calculateDDay } from "common/components/period";
import { PeriodWrapper, PeriodText, TimeIcon } from "./styled";
import { getScheduleStatus } from "common/helpers/nft";
import { FormattedMessage } from "react-intl";

interface IProps {
  startAt: number;
  endAt: number;
}

const Period: React.FC<IProps> = ({ startAt, endAt }: IProps) => {
  if (!startAt || !endAt) return null;

  const scheduleStatus = getScheduleStatus(startAt, endAt);
  const dDayData = calculateDDay({
    startTime: startAt,
    endTime: endAt,
  });

  if (scheduleStatus === "TERMINATED") {
    return (
      <PeriodWrapper>
        <TimeIcon />
        <PeriodText>
          <FormattedMessage id={"timer_terminated"} />
        </PeriodText>
      </PeriodWrapper>
    );
  }

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

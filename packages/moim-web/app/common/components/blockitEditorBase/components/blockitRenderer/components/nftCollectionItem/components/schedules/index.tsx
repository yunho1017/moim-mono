import * as React from "react";
import { Spacer } from "common/components/designSystem/spacer";
import ScheduleItem from "./item";

interface IProps {
  schedules: Moim.NFT.ISchedule[];
}

const Schedules: React.FC<IProps> = ({ schedules }: IProps) => {
  const scheduleElement = React.useMemo(
    () => schedules.map(schedule => <ScheduleItem schedule={schedule} />),
    [schedules],
  );

  if (!schedules.length) return null;

  return (
    <>
      <Spacer value={12} />
      {scheduleElement}
    </>
  );
};

export default React.memo(Schedules);

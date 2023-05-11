import * as React from "react";
import moment from "moment";

import {
  TimerWrapper,
  Unit,
  UnitCount,
  UnitDescription,
  TimeSep,
} from "./styled";

interface IProps {
  endDateTime?: number;
  scope?: "days" | "hours" | "minutes" | "seconds";
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}

const TickDuration = ({
  endDateTime,
  elementPaletteProps,
  scope = "seconds",
}: IProps) => {
  const destDate = React.useMemo(() => moment(endDateTime), [endDateTime]);
  const [diffDuration, setDiffDuration] = React.useState(
    moment.duration(destDate.diff(moment())),
  );

  const scopePoint = React.useMemo(() => {
    switch (scope) {
      case "days":
        return 0;
      case "hours":
        return 1;
      case "minutes":
        return 2;
      case "seconds":
        return 3;
    }
  }, [scope]);

  React.useEffect(() => {
    const tick = setInterval(() => {
      setDiffDuration(moment.duration(destDate.diff(moment())));
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  }, [destDate]);

  return (
    <TimerWrapper elementPaletteProps={elementPaletteProps}>
      {scopePoint >= 0 && (
        <Unit>
          <UnitCount>{parseInt(`${diffDuration.asDays()}`, 10)}</UnitCount>
          <UnitDescription>d</UnitDescription>
        </Unit>
      )}
      {scopePoint >= 1 && (
        <>
          <Unit>
            <UnitCount>
              <TimeSep>:</TimeSep>
            </UnitCount>
            <UnitDescription>&nbsp;</UnitDescription>
          </Unit>
          <Unit fixedWidth={true}>
            <UnitCount>{diffDuration.hours()}</UnitCount>
            <UnitDescription>h</UnitDescription>
          </Unit>
        </>
      )}
      {scopePoint >= 2 && (
        <>
          <Unit>
            <UnitCount>
              <TimeSep>:</TimeSep>
            </UnitCount>
            <UnitDescription>&nbsp;</UnitDescription>
          </Unit>
          <Unit fixedWidth={true}>
            <UnitCount>{diffDuration.minutes()}</UnitCount>
            <UnitDescription>m</UnitDescription>
          </Unit>
        </>
      )}
      {scopePoint >= 3 && (
        <>
          <Unit>
            <UnitCount>
              <TimeSep>:</TimeSep>
            </UnitCount>
            <UnitDescription>&nbsp;</UnitDescription>
          </Unit>
          <Unit fixedWidth={true}>
            <UnitCount>{diffDuration.seconds()}</UnitCount>
            <UnitDescription>s</UnitDescription>
          </Unit>
        </>
      )}
    </TimerWrapper>
  );
};
export default TickDuration;

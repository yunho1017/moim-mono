import * as React from "react";
import { Wrapper, chipWrapperStyle } from "./styled";

import DDayComponent, { calculateDDay } from "common/components/period";
import ChipBase from "common/components/chips";

import useGroupTexts from "common/hooks/useGroupTexts";

interface IProps {
  status?: Moim.Group.GroupPeriodType;
  period?: Moim.Group.IGroupPeriod;
  statusConfig?: Moim.IMoimStatusConfig;
}

function Period({ status, period, statusConfig }: IProps) {
  const comingSoonTextSet = useGroupTexts("child_moim_coming_soon");
  const activeTextSet = useGroupTexts("child_moim_active");
  const terminatedTextSet = useGroupTexts("child_moim_terminated");
  const dDayData = React.useMemo(() => calculateDDay(period), [period]);

  const label = React.useMemo(() => {
    switch (status) {
      case "ready":
        return (
          <>
            {comingSoonTextSet?.singular}
            {statusConfig?.type === "withPeriod" && (
              <>
                (<DDayComponent dDay={dDayData} />)
              </>
            )}
          </>
        );
      case "activated":
        return (
          <>
            {activeTextSet?.singular}
            {statusConfig?.type === "withPeriod" && (
              <>
                (<DDayComponent dDay={dDayData} />)
              </>
            )}
          </>
        );

      case "terminated":
        return terminatedTextSet?.singular;
    }
  }, [
    status,
    statusConfig,
    dDayData,
    comingSoonTextSet,
    activeTextSet,
    terminatedTextSet,
  ]);

  if (statusConfig?.type === "none") {
    return null;
  }

  return (
    <ChipBase shape="rectangle" size="medium" overrideStyle={chipWrapperStyle}>
      <Wrapper status={status}>{label}</Wrapper>
    </ChipBase>
  );
}

export default Period;

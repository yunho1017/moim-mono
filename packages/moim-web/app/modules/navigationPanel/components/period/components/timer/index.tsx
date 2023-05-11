import * as React from "react";
import { Wrapper } from "./styled";
import { TickDuration } from "common/components/designSystem/timer";
import useGroupTexts from "common/hooks/useGroupTexts";
import { getStatus } from "common/components/period";

interface IProps {
  status: Moim.Group.GroupPeriodType;
  period?: Moim.Group.IGroupPeriod;
  statusConfig?: Moim.IMoimStatusConfig;
}

function Timer({ status: statusProps, period, statusConfig }: IProps) {
  const comingSoonTextSet = useGroupTexts("child_moim_coming_soon");
  const activeTextSet = useGroupTexts("child_moim_active");
  const terminatedTextSet = useGroupTexts("child_moim_terminated");
  const [status, setStatus] = React.useState<Moim.Group.GroupPeriodType>(
    statusProps,
  );

  const content = React.useMemo(() => {
    if (statusConfig?.type === "withPeriod") {
      switch (status) {
        case "terminated": {
          return terminatedTextSet?.singular;
        }

        case "ready":
        case "activated": {
          const endDateTime =
            status === "ready" ? period?.startTime : period?.endTime;
          return (
            <TickDuration
              endDateTime={endDateTime}
              scope="minutes"
              elementPaletteProps={{ type: "sideArea", key: "menuText" }}
            />
          );
        }
      }
    } else {
      switch (statusProps) {
        case "terminated":
          return terminatedTextSet?.singular;
        case "ready":
          return comingSoonTextSet?.singular;
        case "activated":
          return activeTextSet?.singular;
      }
    }
  }, [
    period,
    statusProps,
    status,
    terminatedTextSet,
    comingSoonTextSet,
    activeTextSet,
  ]);

  React.useEffect(() => {
    setStatus(getStatus(period));
    const timer = setInterval(() => {
      setStatus(getStatus(period));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [period]);

  return <Wrapper>{content}</Wrapper>;
}

export default Timer;

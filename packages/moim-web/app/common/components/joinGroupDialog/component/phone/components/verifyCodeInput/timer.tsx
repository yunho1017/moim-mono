import * as React from "react";
import moment from "moment";

import { Wrapper } from "./styled";

interface IProps {
  phoneValidationSucceed: boolean;
  endDateTime?: number;
  onVerifyTimeout(): void;
}

const MiniTimer = ({
  phoneValidationSucceed,
  endDateTime,
  onVerifyTimeout,
}: IProps) => {
  const destDate = React.useMemo(() => moment(endDateTime), [endDateTime]);
  const [diffDuration, setDiffDuration] = React.useState(
    moment.duration(destDate.diff(moment())),
  );

  const timerContents = React.useMemo(() => {
    if (!endDateTime || phoneValidationSucceed) {
      return null;
    }

    return (
      <>
        <span>{diffDuration.minutes()}</span>
        <span>{diffDuration.seconds()}</span>
      </>
    );
  }, [diffDuration, endDateTime, phoneValidationSucceed]);

  React.useEffect(() => {
    const tick = setInterval(() => {
      const duration = moment.duration(destDate.diff(moment()));
      if (duration.asSeconds() < 0) {
        clearInterval(tick);
        onVerifyTimeout();
      } else {
        setDiffDuration(duration);
      }
    }, 1000);

    return () => {
      clearInterval(tick);
    };
  }, [destDate, onVerifyTimeout]);

  return <Wrapper>{timerContents}</Wrapper>;
};

export default MiniTimer;

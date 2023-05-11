import * as React from "react";
import FromNow from "common/components/fromNow";

const ONE_DAY_AS_MS = 1000 * 3600 * 24;

interface IProps {
  givenDate: number;
  className?: string;
  useChange?: boolean;
  normalFormat?: string;
  hoverFormat?: string;
}

const CreateDayOMeter: React.FC<IProps> = ({
  givenDate,
  normalFormat,
  hoverFormat,
  useChange = true,
  className,
}) => {
  const isOverSevenDays = React.useMemo(() => {
    const currentDateMillisecond = new Date().getTime();
    const diffMillisecond = currentDateMillisecond - givenDate;
    const diffDay = Math.ceil(diffMillisecond / ONE_DAY_AS_MS);
    return diffDay > 7;
  }, [givenDate]);

  return (
    <FromNow
      className={className}
      useChange={useChange}
      givenDate={givenDate}
      normalFormat={normalFormat}
      hoverFormat={hoverFormat}
      disableRelativeDateTime={isOverSevenDays}
    />
  );
};

export default CreateDayOMeter;

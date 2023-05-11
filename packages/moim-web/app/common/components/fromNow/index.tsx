import * as React from "react";
import moment from "moment";
import styled from "styled-components";
import { FormattedRelativeTime, useIntl } from "react-intl";

const TimeLabel = styled.time`
  cursor: default;
`;

interface IProps {
  givenDate: string | number;
  useChange?: boolean;
  normalFormat?: string;
  hoverFormat?: string;
  disableRelativeDateTime?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const AUTO_UPDATE_TIME = 60; // 1 minute

export const MINUTE_OF_MILLI_SECOND = 1000 * 60;
export const HOUR_OF_MILLI_SECOND = 1000 * 3600;
export const DAY_OF_MILLI_SECOND = 1000 * 86400;
export const WEEK_OF_MILLI_SECOND = DAY_OF_MILLI_SECOND * 7;
export const MONTH_OF_MILLI_SECOND = DAY_OF_MILLI_SECOND * 30;

export function getFromNowOptions(date: Date) {
  const diffMs = Date.now() - date.valueOf();
  if (diffMs > MONTH_OF_MILLI_SECOND) {
    return null;
  } else if (diffMs > WEEK_OF_MILLI_SECOND) {
    return {
      value: diffMs / WEEK_OF_MILLI_SECOND,
      unit: "week",
      update: undefined,
    } as const;
  } else if (diffMs > DAY_OF_MILLI_SECOND) {
    return {
      value: diffMs / DAY_OF_MILLI_SECOND,
      unit: "day",
      update: undefined,
    } as const;
  } else if (diffMs > HOUR_OF_MILLI_SECOND) {
    return {
      value: diffMs / HOUR_OF_MILLI_SECOND,
      unit: "hour",
      update: undefined,
    } as const;
  } else if (diffMs > MINUTE_OF_MILLI_SECOND) {
    return {
      value: diffMs / MINUTE_OF_MILLI_SECOND,
      unit: "minute",
      update: AUTO_UPDATE_TIME,
    } as const;
  } else {
    return {
      value: diffMs / 1000,
      unit: "second",
      update: AUTO_UPDATE_TIME,
    } as const;
  }
}

function FromNow({
  givenDate,
  useChange,
  normalFormat,
  hoverFormat,
  disableRelativeDateTime,
  ...restOfProps
}: IProps) {
  const intl = useIntl();
  const date = moment(givenDate);
  const hoveredDataTime = date.format(
    hoverFormat ?? intl.formatMessage({ id: "datetime_format_full_time_date" }),
  );
  const normalDate = date.format(
    normalFormat ?? intl.formatMessage({ id: "datetime_format_short_date" }),
  );
  const [isDetailView, setDetailView] = React.useState(false);
  const handleMouseEvent = React.useCallback((e: React.MouseEvent) => {
    setDetailView(e.type === "mouseenter");
  }, []);
  const options = getFromNowOptions(date.toDate());

  return (
    <TimeLabel
      {...restOfProps}
      dateTime={date.toISOString()}
      title={hoveredDataTime}
      onMouseEnter={useChange ? handleMouseEvent : undefined}
      onMouseLeave={useChange ? handleMouseEvent : undefined}
    >
      {isDetailView && useChange ? (
        hoveredDataTime
      ) : options && !disableRelativeDateTime ? (
        <FormattedRelativeTime
          value={Math.ceil(-options.value)}
          numeric="auto"
          unit={options.unit}
          updateIntervalInSeconds={options.update}
        />
      ) : (
        normalDate
      )}
    </TimeLabel>
  );
}

const MemoFromNow = React.memo(FromNow);
MemoFromNow.displayName = "FromNow";

export default MemoFromNow;

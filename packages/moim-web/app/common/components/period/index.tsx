import * as React from "react";
import { FormattedMessage } from "react-intl";
import { DDayType, calculateDDay, getStatus } from "./helper";

export { DDayType, calculateDDay, getStatus };

export default function DDayComponent({ dDay }: { dDay: DDayType | null }) {
  if (!dDay) {
    return null;
  }

  return (
    <>
      {dDay.days ? (
        <FormattedMessage
          id="days_left_count"
          values={{ count: Math.floor(dDay.days) }}
        />
      ) : Boolean(dDay.hours) ? (
        <FormattedMessage
          id="hours_left_count"
          values={{ count: Math.floor(dDay.hours) }}
        />
      ) : (
        Boolean(dDay.minutes) && (
          <FormattedMessage
            id="minutes_left_count"
            values={{ count: Math.floor(dDay.minutes) }}
          />
        )
      )}
    </>
  );
}

import moment from "moment";
import memoize from "lodash/memoize";

const DEFAULT_STATE_TIME = moment("00:00", "HH:mm").toDate();
const DEFAULT_END_TIME = moment("23:59", "HH:mm").toDate();

export const getTimeList = memoize(
  ({
    start,
    end,
    intervalMinute = 30,
  }: {
    start?: Date;
    end?: Date;
    format?: 12 | 24;
    intervalMinute?: number;
  }) => {
    const startTime = moment(start ?? DEFAULT_STATE_TIME);
    const endTime = moment(end ?? DEFAULT_END_TIME);
    const timeList: Date[] = [];

    while (endTime.isAfter(startTime)) {
      timeList.push(startTime.toDate());
      startTime.add(intervalMinute, "minutes");
    }

    return timeList;
  },
);

export function formatTime(date: Date, format: 12 | 24) {
  const isNoonFormat = format === 12;
  const hourFormat = isNoonFormat ? "hh" : "HH";
  const timeFormat = isNoonFormat ? " A" : "";

  return moment(date).format(`${hourFormat}:mm${timeFormat}`);
}

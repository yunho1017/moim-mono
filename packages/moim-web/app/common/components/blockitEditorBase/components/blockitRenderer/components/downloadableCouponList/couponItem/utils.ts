import memoize from "lodash/memoize";

type RELATIVE_DATE_STATUS = "before" | "after" | "during";

export const checkCurrentDateStatus = memoize(
  (startAt: number, endAt: number): RELATIVE_DATE_STATUS => {
    const currentAt = Date.now();
    if (startAt > 0 && currentAt < startAt) {
      return "before";
    }
    if (endAt > 0 && currentAt > endAt) {
      return "after";
    }

    return "during";
  },
);

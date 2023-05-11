import moment from "moment";

export interface DDayType {
  days: number;
  hours: number;
  minutes: number;
}

export function calculateDDay(
  period?: Moim.Group.IGroupPeriod,
): DDayType | null {
  const start = moment(period?.startTime);
  const end = moment(period?.endTime);
  const today = moment();
  let base: moment.Moment | null = null;
  let target: moment.Moment | null = null;

  if (period?.startTime && today.diff(start) < 0) {
    base = start;
    target = today;
  } else {
    if (period?.endTime && today.diff(end) > 0) {
      base = today;
      target = end;
    }

    if (period?.startTime && period?.endTime) {
      base = end;
      target = today;
    }
  }

  if (!base || !target) {
    return null;
  }

  const days = base.diff(target, "days");
  const hours = base.diff(target, "hours");
  const minutes = base.diff(target, "minutes");

  return {
    days,
    hours: hours - days * 24,
    minutes: minutes - hours * 60,
  };
}

export function getStatus(
  period?: Moim.Group.IGroupPeriod,
): Moim.Group.GroupPeriodType {
  const start = moment(period?.startTime);
  const end = moment(period?.endTime);
  const today = moment();

  if (period?.startTime && today.diff(start) < 0) {
    return "ready";
  } else {
    if (period?.endTime && today.diff(end) > 0) {
      return "terminated";
    }

    return "activated";
  }
}

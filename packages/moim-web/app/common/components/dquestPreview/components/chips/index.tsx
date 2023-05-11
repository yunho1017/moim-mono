import * as React from "react";
import moment from "moment";
import styled from "styled-components";
import { FormattedMessage, FormattedRelativeTime } from "react-intl";
import useGroupTexts from "common/hooks/useGroupTexts";
import ChipBase, { ChipSize } from "common/components/chips";
import { MaxWidthContent } from "./styled";
import { B4RegularStyle } from "common/components/designSystem/typos";

const ChipWrapper = styled.div`
  display: inline-flex;

  .scheduledChip {
    min-width: 0;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    background-color: ${props => props.theme.colorV2.colorSet.grey100};
  }

  .activeChip {
    min-width: 0;
    color: ${props => props.theme.themeMode.lightPalette.colorSet.grey800};

    // NOTE: change to server given systemTheme color(green);
    // NOTE: check this guide comment 17 https://app.zeplin.io/project/5db7ff7b7ef2d22c5191d3cb/screen/63509ee25b33f43bf00a7229
    background-color: #60ff00;
  }

  .closedChip {
    min-width: 0;
    color: ${props => props.theme.colorV2.colorSet.fog1000};
    background-color: ${props => props.theme.color.red700};
  }

  .commonGreyChip {
    min-width: 0;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }

  .achievedChip {
    min-width: 0;
    color: ${props => props.theme.color.jade400};
    background-color: ${props => props.theme.color.jade415};
  }

  .outcomeChip {
  }
`;

export const StatusChip: React.FC<{
  status: Moim.DQuest.QUEST_DISPLAY_STATUS;
  size?: ChipSize;
}> = React.memo(({ status, size = "small" }) => {
  const scheduledTexts = useGroupTexts("status_quest_scheduled");
  const activeTexts = useGroupTexts("status_quest_ongoing");
  const closedTexts = useGroupTexts("status_quest_finished");
  switch (status.toUpperCase()) {
    case "READY": {
      return (
        <ChipWrapper>
          <ChipBase shape="rectangle" size={size} className="scheduledChip">
            <MaxWidthContent size={size}>
              {scheduledTexts?.singular}
            </MaxWidthContent>
          </ChipBase>
        </ChipWrapper>
      );
    }
    default:
    case "ACTIVE": {
      return (
        <ChipWrapper>
          <ChipBase shape="rectangle" size={size} className="activeChip">
            <MaxWidthContent size={size}>
              {activeTexts?.singular}
            </MaxWidthContent>
          </ChipBase>
        </ChipWrapper>
      );
    }
    case "CLOSED": {
      return (
        <ChipWrapper>
          <ChipBase shape="rectangle" size={size} className="closedChip">
            <MaxWidthContent size={size}>
              {closedTexts?.singular}
            </MaxWidthContent>
          </ChipBase>
        </ChipWrapper>
      );
    }
  }
});

const TickingDateTime: React.FC<{ value: number; format?: string }> = ({
  value,
}) => {
  const [changedValue, setValue] = React.useState(value);
  const duration = React.useMemo(() => moment.duration(changedValue), [
    changedValue,
  ]);

  React.useLayoutEffect(() => {
    const id = setInterval(() => {
      setValue(v => v - 1000);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [value]);

  return (
    <span>
      {duration.hours().toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
      {duration
        .minutes()
        .toLocaleString(undefined, { minimumIntegerDigits: 2 })}
      :
      {duration
        .seconds()
        .toLocaleString(undefined, { minimumIntegerDigits: 2 })}
    </span>
  );
};

export const RemainDateNoStyleChip: React.FC<{
  targetDate: number;
}> = React.memo(({ targetDate }) => {
  const diffDuration = React.useMemo(
    () => moment.duration(moment(targetDate).diff(moment())),
    [targetDate],
  );
  const content = React.useMemo(() => {
    if (diffDuration.asDays() > 1) {
      return (
        <FormattedRelativeTime
          value={Math.round(diffDuration.asDays())}
          numeric="auto"
          unit="day"
        />
      );
    }

    return <TickingDateTime value={diffDuration.asMilliseconds()} />;
  }, [diffDuration]);

  if (diffDuration.asMilliseconds() <= 0 || Date.now() >= targetDate) {
    return null;
  }

  return content;
});

const PeriodSpan = styled.div`
  display: flex;
  align-items: center;
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const PeriodChip: React.FC<{
  startAt?: number;
  endAt?: number;
}> = React.memo(({ startAt, endAt }) => {
  const currentMoment = React.useMemo(() => moment(), []);
  const startMoment = React.useMemo(() => moment(startAt), [startAt]);
  const endMoment = React.useMemo(() => moment(endAt), [endAt]);

  const displayFormat = React.useMemo(() => {
    const currentYear = currentMoment.year();
    const startYear = startMoment.year();
    const endYear = endMoment.year();
    return currentYear !== startYear || currentYear !== endYear
      ? "YY.MM.DD"
      : "MM.DD";
  }, [currentMoment, startMoment, endMoment]);

  if (!startAt || !endAt) {
    return null;
  }

  return (
    <PeriodSpan>
      <MaxWidthContent maxWidth={120} size="small">
        {startMoment.format(displayFormat)} ~ {endMoment.format(displayFormat)}
      </MaxWidthContent>
    </PeriodSpan>
  );
});

export const AchievedChip: React.FC<{
  size?: ChipSize;
}> = React.memo(({ size = "small" }) => {
  const progressTexts = useGroupTexts("quest_progress");
  return (
    <ChipWrapper>
      <ChipBase shape="rectangle" size={size} className="achievedChip">
        <MaxWidthContent size={size}>{progressTexts?.singular}</MaxWidthContent>
      </ChipBase>
    </ChipWrapper>
  );
});

export const PercentageChip: React.FC<{
  value: number;
  size?: ChipSize;
}> = React.memo(({ value, size = "small" }) => (
  <ChipWrapper>
    <ChipBase shape="rectangle" size={size} className="commonGreyChip">
      <MaxWidthContent size={size}>{value}%</MaxWidthContent>
    </ChipBase>
  </ChipWrapper>
));

export const OutcomeChip: React.FC<{
  size?: ChipSize;
  title?: string;
}> = React.memo(({ children, size = "small", title }) => (
  <ChipWrapper>
    <ChipBase
      shape="round"
      size={size}
      className="commonGreyChip outcomeChip"
      title={title}
    >
      <MaxWidthContent size={size}>{children}</MaxWidthContent>
    </ChipBase>
  </ChipWrapper>
));

export const ViewerChip: React.FC<{
  viewerCount: number;
  size?: ChipSize;
  title?: string;
}> = React.memo(({ viewerCount: viewerCount, size = "small", title }) => (
  <ChipWrapper>
    <ChipBase
      shape="rectangle"
      size={size}
      className="commonGreyChip"
      title={title}
    >
      <FormattedMessage
        id="quest_number_of_viewers"
        values={{ number_viewers: viewerCount }}
      />
    </ChipBase>
  </ChipWrapper>
));

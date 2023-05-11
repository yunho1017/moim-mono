import * as React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";

import {
  Wrapper,
  TopChip,
  Content,
  ContentMessage,
  Unit,
  UnitCount,
  UnitDescription,
  TimeSep,
} from "./styled";

import { useStoreState } from "app/store";
import replaceTextFromTextSet from "../helper/replaceTextFromTextSet";
import { browserLocale } from "app/intl";

interface IProps extends Omit<Moim.Blockit.ITimerBlock, "type" | "style"> {
  styleType: "default" | "brand-colored" | "image";
}

const TickDuration = ({
  endDateTime,
  scope = "seconds",
}: {
  endDateTime: string;
  scope?: "days" | "hours" | "minutes" | "seconds";
}) => {
  const destDate = React.useMemo(() => moment(endDateTime), [endDateTime]);
  const [diffDuration, setDiffDuration] = React.useState(
    moment.duration(destDate.diff(moment())),
  );
  const scopePoint = React.useMemo(() => {
    switch (scope) {
      case "days":
        return 0;
      case "hours":
        return 1;
      case "minutes":
        return 2;
      case "seconds":
        return 3;
    }
  }, [scope]);

  React.useEffect(() => {
    const tick = setInterval(() => {
      setDiffDuration(moment.duration(destDate.diff(moment())));
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  }, [destDate]);

  return (
    <>
      {scopePoint >= 0 && (
        <Unit>
          <UnitCount>{parseInt(`${diffDuration.asDays()}`, 10)}</UnitCount>
          <UnitDescription>
            <FormattedMessage
              id="day_and_time_day"
              values={{ count: parseInt(`${diffDuration.asDays()}`, 10) }}
            />
          </UnitDescription>
        </Unit>
      )}
      {scopePoint >= 1 && (
        <Unit fixedWidth={true}>
          <UnitCount>{diffDuration.hours()}</UnitCount>
          <UnitDescription>
            <FormattedMessage
              id="day_and_time_hour"
              values={{ count: diffDuration.hours() }}
            />
          </UnitDescription>
        </Unit>
      )}
      {scopePoint >= 2 && (
        <>
          <Unit>
            <UnitCount>
              <TimeSep>:</TimeSep>
            </UnitCount>
            <UnitDescription>&nbsp;</UnitDescription>
          </Unit>
          <Unit fixedWidth={true}>
            <UnitCount>{diffDuration.minutes()}</UnitCount>
            <UnitDescription>
              <FormattedMessage
                id="day_and_time_minute"
                values={{ count: diffDuration.minutes() }}
              />
            </UnitDescription>
          </Unit>
        </>
      )}
      {scopePoint >= 3 && (
        <>
          <Unit>
            <UnitCount>
              <TimeSep>:</TimeSep>
            </UnitCount>
            <UnitDescription>&nbsp;</UnitDescription>
          </Unit>
          <Unit fixedWidth={true}>
            <UnitCount>{diffDuration.seconds()}</UnitCount>
            <UnitDescription>
              <FormattedMessage
                id="day_and_time_second"
                values={{ count: diffDuration.seconds() }}
              />
            </UnitDescription>
          </Unit>
        </>
      )}
    </>
  );
};

const Timer: React.FC<IProps> = ({
  styleType,
  imageUrl,
  beforeStart,
  afterEnd,
  onGoing,
  startDateTime,
  endDateTime,
  margin,
  textSets,
}) => {
  const { defaultLocale } = useStoreState(storeState => ({
    defaultLocale: storeState.app.locale,
  }));
  const locale = browserLocale(defaultLocale ?? undefined);
  const [phase, setPhase] = React.useState<"before" | "running" | "after">(
    "before",
  );
  const [topChipContent, setTopChipContent] = React.useState("");
  const [content, setContent] = React.useState<React.ReactNode>(null);

  const getCurrentPhase = React.useCallback(() => {
    const currMoment = moment();
    const startMoment = moment(startDateTime);
    const endMoment = moment(endDateTime);
    if (currMoment.diff(startMoment) < 0) {
      setPhase("before");
    } else if (
      currMoment.diff(startMoment) >= 0 &&
      currMoment.diff(endMoment) < 0
    ) {
      setPhase("running");
    } else {
      setPhase("after");
    }
  }, [endDateTime, startDateTime]);

  React.useEffect(() => {
    switch (phase) {
      case "before": {
        if (!beforeStart) break;
        const content = replaceTextFromTextSet({
          text: beforeStart.content,
          locale,
          textSets,
        });
        setTopChipContent(
          beforeStart.chips || moment(startDateTime).format("LLL"),
        );
        setContent(
          content ? (
            <ContentMessage>{content}</ContentMessage>
          ) : (
            <TickDuration
              endDateTime={startDateTime}
              scope={beforeStart.scope}
            />
          ),
        );
        break;
      }

      case "after": {
        if (!afterEnd) break;
        const content = replaceTextFromTextSet({
          text: afterEnd.content,
          locale,
          textSets,
        });
        setTopChipContent(afterEnd.chips || moment(endDateTime).format("LLL"));

        setContent(<ContentMessage>{content}</ContentMessage>);
        break;
      }

      case "running": {
        if (!onGoing) break;
        setTopChipContent(onGoing.chips || moment(endDateTime).format("LLL"));
        setContent(
          <TickDuration endDateTime={endDateTime} scope={onGoing.scope} />,
        );
        break;
      }
    }
  }, [
    afterEnd,
    beforeStart,
    endDateTime,
    onGoing,
    phase,
    startDateTime,
    textSets,
    locale,
  ]);

  React.useEffect(() => {
    getCurrentPhase();
    const timer = setInterval(() => {
      getCurrentPhase();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [getCurrentPhase]);

  return (
    <Wrapper
      bgStyle={styleType}
      phase={phase}
      imageUrl={imageUrl}
      margin={margin}
    >
      <TopChip>{topChipContent}</TopChip>
      <Content>{content}</Content>
    </Wrapper>
  );
};

export default Timer;

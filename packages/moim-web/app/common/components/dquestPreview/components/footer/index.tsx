import * as React from "react";
import {
  StatusChip,
  RemainDateNoStyleChip,
  PeriodChip,
  OutcomeChip,
} from "../chips";
import { Footer, OutcomeFooter, OutcomeContainer } from "./styled";

const MAX_SIZE = 3;

interface IProps {
  questId: Moim.Id;
  status: Moim.DQuest.QUEST_DISPLAY_STATUS;
  startAt?: number;
  endAt?: number;
  showOutcome?: boolean;
  outcomes?: Moim.DQuest.IOutcome[];
  showPeriod?: boolean;
  viewerCount?: number;
}

const FooterComponent: React.FC<IProps> = ({
  questId,
  status,
  startAt,
  endAt,
  showOutcome = false,
  outcomes = [],
  showPeriod = true,
}) => {
  const outcomeContents: Moim.DQuest.IOutcomeContent[] = React.useMemo(
    () =>
      outcomes
        .filter(out => Boolean(out.contentVisible))
        .map(out => ({
          iconUrl: out.imageUrl,
          text: out.title,
        })),
    [outcomes],
  );

  const outcomeElements = React.useMemo(
    () =>
      outcomeContents.slice(0, MAX_SIZE).map((outcome, index) => (
        <OutcomeChip key={`${questId}outcome_${index}`} title={outcome.text}>
          <OutcomeContainer>
            {outcome.iconUrl && <img className="icon" src={outcome.iconUrl} />}
            <span className="text">{outcome.text}</span>
          </OutcomeContainer>
        </OutcomeChip>
      )),
    [questId, outcomeContents],
  );

  const remainChip = React.useMemo(() => {
    const count = outcomeContents.length - MAX_SIZE;
    if (count > 0) {
      return (
        <OutcomeChip key={`${questId}outcome_remain_count`}>
          <OutcomeContainer>
            <span className="text">+{count}</span>
          </OutcomeContainer>
        </OutcomeChip>
      );
    }

    return null;
  }, [outcomeContents.length, questId]);

  return (
    <>
      {showPeriod ? (
        <Footer>
          <div className="left">
            <StatusChip status={status} />
            {Boolean(status === "READY" && startAt) && (
              <RemainDateNoStyleChip targetDate={startAt!} />
            )}
            <PeriodChip startAt={startAt} endAt={endAt} />
          </div>
          {/*
          NOTE: Temporary disabled feature. 어드민 설정값이 을 적용할때 재활성화 합니다.
          <div className="right">
            {viewerCount ? <ViewerChip viewerCount={viewerCount} /> : null}
          </div> */}
        </Footer>
      ) : null}

      {Boolean(showOutcome && outcomeContents.length) && (
        <OutcomeFooter>
          {outcomeElements}
          {remainChip}
        </OutcomeFooter>
      )}
    </>
  );
};

export default React.memo(FooterComponent);

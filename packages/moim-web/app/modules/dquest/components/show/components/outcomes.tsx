import * as React from "react";
import styled from "styled-components";
import useIsMobile from "common/hooks/useIsMobile";
import useGroupTexts from "app/common/hooks/useGroupTexts";
import { px2rem } from "common/helpers/rem";
import { OutcomeChip } from "common/components/dquestPreview/components/chips";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { PaddedWrapper } from "../styled";
import { H9BoldStyle } from "common/components/designSystem/typos";

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(8)} 0;
  display: flex;
  align-items: center;

  .field {
    color: ${props => props.theme.colorV2.colorSet.grey800};
    margin-right: ${px2rem(12)};
    ${H9BoldStyle}
  }

  .list {
    flex: 2;
    width: 100%;
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${px2rem(4)};
  }
`;

const ChipContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: ${px2rem(2)};

  .icon {
    width: ${px2rem(18)};
    height: ${px2rem(18)};
  }

  .text {
    flex: 1;
    min-width: 0;
    ${useSingleLineStyle}
  }
`;

const MAX_SIZE = 3;

interface IProps {
  outcomes: Moim.DQuest.IOutcome[];
}

const Outcomes: React.FC<IProps> = ({ outcomes }) => {
  const isMobile = useIsMobile();
  const rewardTexts = useGroupTexts("quest_outcome");

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

  const chips = React.useMemo(() => {
    const newArray = isMobile
      ? outcomeContents.slice(0, MAX_SIZE)
      : outcomeContents;
    return newArray.map((outcome, index) => (
      <OutcomeChip key={`outcome_${index}`} title={outcome.text}>
        <ChipContent>
          {outcome.iconUrl && <img className="icon" src={outcome.iconUrl} />}
          <span className="text">{outcome.text}</span>
        </ChipContent>
      </OutcomeChip>
    ));
  }, [isMobile, outcomeContents]);

  const remainChip = React.useMemo(() => {
    const count = outcomeContents.length - MAX_SIZE;
    if (isMobile && count > 0) {
      return (
        <OutcomeChip key="outcome_remain_count">
          <ChipContent>
            <span className="text">+{count}</span>
          </ChipContent>
        </OutcomeChip>
      );
    }

    return null;
  }, [outcomeContents.length, isMobile]);

  if (!outcomeContents.length) {
    return null;
  }

  return (
    <PaddedWrapper>
      <Wrapper>
        <div className="field">{rewardTexts?.singular}</div>
        <div className="list">
          {chips}
          {remainChip}
        </div>
      </Wrapper>
    </PaddedWrapper>
  );
};

export default React.memo(Outcomes);

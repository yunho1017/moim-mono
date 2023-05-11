import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { PaddedWrapper } from "../styled";
import QuestLinearProgressBar from "common/components/dquestPreview/components/progressBar";
import useGroupTexts from "common/hooks/useGroupTexts";
import { B4RegularStyle } from "common/components/designSystem/typos";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(6)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  height: ${px2rem(24)};
  border-radius: ${px2rem(6)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey100};
  gap: ${px2rem(8)};

  .progress,
  .left,
  .right {
    display: flex;
  }

  .progress {
    flex: 1;
    width: 100%;
    min-width: 0;
    margin: 0 ${px2rem(12)};
    display: flex;
    align-items: center;
  }

  .left,
  .right {
    ${B4RegularStyle}
    color: ${props => props.theme.colorV2.colorSet.grey800}
  }

  .left {
    justify-content: flex-start;
  }

  .right {
    justify-content: flex-end;
  }
`;

interface IProps {
  showProgress?: boolean;
  value?: number;
  max?: number;
}

const Progress: React.FC<IProps> = ({ showProgress, value = 0, max = 100 }) => {
  const progressTexts = useGroupTexts("quest_progress");

  if (!showProgress) {
    return null;
  }

  return (
    <PaddedWrapper>
      <Wrapper>
        <div className="left">{progressTexts?.singular ?? "전체 달성률"}</div>
        <div className="progress">
          <QuestLinearProgressBar value={value} max={max} />
        </div>
        <div className="right">{Math.round((value / max) * 100)}%</div>
      </Wrapper>
    </PaddedWrapper>
  );
};

export default React.memo(Progress);

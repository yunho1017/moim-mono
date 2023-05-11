import * as React from "react";
import useGroupTexts from "common/hooks/useGroupTexts";
import QuestLinearProgressBar from "../progressBar";
import { ProgressFooter } from "./styled";

interface IProps {
  isReJoinableQuest?: boolean;
  showProgress?: boolean;
  progress?: number;
  max?: number;
}

const ProgressFooterComponent: React.FC<IProps> = ({
  isReJoinableQuest = false,
  showProgress = false,
  progress = 0,
  max = 100,
}) => {
  const progressTexts = useGroupTexts("quest_progress");
  const currentValue = isReJoinableQuest ? 0 : progress;
  if (!showProgress || (!isReJoinableQuest && progress <= 0)) {
    return null;
  }

  return (
    <ProgressFooter>
      <div className="left">{progressTexts?.singular ?? "전체 달성률"}</div>
      <div className="progress">
        <QuestLinearProgressBar value={currentValue} max={max} />
      </div>
      <div className="right">{Math.round((progress / max) * 100)}%</div>
    </ProgressFooter>
  );
};

export default React.memo(ProgressFooterComponent);

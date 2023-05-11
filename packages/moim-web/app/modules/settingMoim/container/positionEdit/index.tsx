import * as React from "react";
import PositionEdit from "../../components/positionEdit";
import { useHandlers, useProps } from "./hooks";

function PositionEditContainer() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);

  const { positions } = hookProps;
  const {
    handleClickPriorityUp,
    handleClickPriorityDown,
    handleClickDoneButton,
  } = hookHandlers;

  return (
    <PositionEdit
      positions={positions}
      onClickPriorityUp={handleClickPriorityUp}
      onClickPriorityDown={handleClickPriorityDown}
      onClickDoneButton={handleClickDoneButton}
    />
  );
}

export default PositionEditContainer;

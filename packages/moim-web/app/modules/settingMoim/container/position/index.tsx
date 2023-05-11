import * as React from "react";
import { useEffects, useHandlers, useProps } from "./hooks";
import Position from "../../components/position";

function PositionContainer() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);

  useEffects(hookProps, hookHandlers);

  const { title, positions, positionsPaging, loadingPositions } = hookProps;
  const {
    handleClickAddButton,
    handleClickEditButton,
    handleClickPosition,
    handleLoadMore,
  } = hookHandlers;

  return (
    <Position
      title={title}
      positions={positions}
      paging={positionsPaging}
      loadingPositions={loadingPositions}
      onLoadMore={handleLoadMore}
      onClickAddButton={handleClickAddButton}
      onClickEditButton={handleClickEditButton}
      onClickPosition={handleClickPosition}
    />
  );
}

export default PositionContainer;

import * as React from "react";
import { Wrapper } from "./styled";
import { useBlockitListLayoutConfig } from "../hooks/useLayout";

interface IProps extends Omit<Moim.Blockit.IListStyleElement, "type"> {
  children: React.ReactNode[];
}

const GridLayout: React.FC<IProps> = props => {
  const { children } = props;
  const {
    gapSize,
    columnSize,
    rowSize,
    maxViewCount,
    itemStackDirection,
  } = useBlockitListLayoutConfig("vertical", props);

  return (
    <Wrapper
      gapSize={gapSize}
      columnCount={columnSize}
      rowCount={rowSize}
      stackDirection={itemStackDirection}
    >
      {maxViewCount ? children.slice(0, maxViewCount) : children}
    </Wrapper>
  );
};

export default GridLayout;

import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import useIsMobile from "app/common/hooks/useIsMobile";
import BlockitRenderer from "../..";
import {
  ChildrenStyle,
  Wrapper,
  GridContainer,
  ChildGridStyle,
} from "./styled";

type IProps = Omit<Moim.Blockit.IGridBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
  gridWrapperStyle?: FlattenInterpolation<any>;
  gridItemStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
};

const GridBlock: React.FC<IProps> = ({
  wrapperStyle,
  gridWrapperStyle,
  gridItemStyle,
  minColumn,
  maxColumn,
  blocks,
  backgroundColor,
  borderColor,
  margin,
}) => {
  const isMobile = useIsMobile();
  const enableGrid = React.useMemo(
    () => !isMobile && blocks.length >= minColumn && maxColumn !== 1,
    [blocks.length, isMobile, maxColumn, minColumn],
  );

  const elements = React.useMemo(
    () =>
      blocks.map((block, idx) => (
        <BlockitRenderer
          key={`${block.type}_${idx}`}
          block={block}
          gridWrapperStyle={ChildGridStyle}
          wrapperStyle={
            gridItemStyle ? [...ChildrenStyle, ...gridItemStyle] : ChildrenStyle
          }
        />
      )),
    [blocks, gridItemStyle],
  );

  return (
    <Wrapper
      margin={margin}
      overrideStyle={wrapperStyle}
      gridWrapperStyle={gridWrapperStyle}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      <GridContainer enableGrid={enableGrid} maxColumn={maxColumn}>
        {elements}
      </GridContainer>
    </Wrapper>
  );
};

export default GridBlock;

import * as React from "react";

import { chunk } from "lodash";
import HorizontalScroll from "common/components/horizontalScroll";
import { Wrapper, InnerPage, Item, itemContainerStyle } from "./styled";

import useIsMobile from "common/hooks/useIsMobile";
import { useBlockitListLayoutConfig } from "../hooks/useLayout";

interface IProps extends Omit<Moim.Blockit.IListStyleElement, "type"> {
  children: React.ReactNode[];
  portalTargetId?: string;
  rightArrow?: React.ElementType;
  leftArrow?: React.ElementType;
}

const ScrollLayout: React.FC<IProps> = props => {
  const { portalTargetId, rightArrow, leftArrow, children } = props;
  const isMobile = useIsMobile();
  const {
    gapSize,
    columnSize,
    rowSize,
    maxViewCount,
    itemStackDirection,
  } = useBlockitListLayoutConfig("horizontal", props);

  const chunkArray = React.useMemo(
    () =>
      chunk(
        maxViewCount ? children.slice(0, maxViewCount) : children,
        columnSize * rowSize,
      ),
    [children, maxViewCount, columnSize, rowSize],
  );

  const chunkPage = React.useMemo(
    () =>
      chunkArray.map((item, idx1) => (
        <InnerPage
          key={idx1}
          stackDirection={itemStackDirection}
          gapSize={gapSize}
          columnCount={columnSize}
          rowCount={rowSize}
        >
          {item.map((elm, idx2) =>
            idx2 === 0 ? (
              <Item key={`${idx1}_${idx2}`}>{elm}</Item>
            ) : (
              <Item key={`${idx1}_${idx2}`}>{elm}</Item>
            ),
          )}
        </InnerPage>
      )),
    [chunkArray, gapSize, columnSize, rowSize, itemStackDirection],
  );

  return (
    <Wrapper hasNextPage={chunkArray.length > 1}>
      <HorizontalScroll
        disableArrow={isMobile || chunkArray.length <= 1}
        arrowPlacement="inner"
        rightArrow={
          rightArrow &&
          React.createElement(rightArrow, {
            targetId: portalTargetId,
          })
        }
        leftArrow={
          leftArrow &&
          React.createElement(leftArrow, {
            targetId: portalTargetId,
          })
        }
        itemContainerStyle={itemContainerStyle}
      >
        {chunkPage}
      </HorizontalScroll>
    </Wrapper>
  );
};

export default ScrollLayout;

import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";

export const useBlockitListLayoutConfig = (
  type: "horizontal" | "vertical",
  {
    scrollable,
    scrollable_web,
    rowCount,
    rowCount_web,
    columnCount,
    columnCount_web,
    maxDisplayedItemsCount,
    maxDisplayedItemsCount_web,
    itemGutterSize,
    itemGutterSize_web,
    itemStackDirection,
    itemStackDirection_web,
  }: Moim.Blockit.IListStyleElement,
) => {
  const isMobile = useIsMobile();

  const gapSize = React.useMemo(
    () =>
      isMobile || !itemGutterSize_web ? itemGutterSize : itemGutterSize_web,
    [isMobile, itemGutterSize, itemGutterSize_web],
  );

  const columnSize = React.useMemo(
    () =>
      (!isMobile && columnCount_web ? columnCount_web : undefined) ??
      columnCount,
    [isMobile, columnCount, columnCount_web],
  );

  const rowSize = React.useMemo(
    () => (!isMobile && rowCount_web ? rowCount_web : undefined) ?? rowCount,
    [isMobile, rowCount, rowCount_web],
  );

  const processedScrollable = React.useMemo(
    () =>
      (isMobile || scrollable_web === undefined
        ? scrollable
        : scrollable_web) ?? (type === "horizontal" ? true : false),
    [type, isMobile, scrollable, scrollable_web],
  );

  const processedItemStackDirection = React.useMemo(
    () =>
      (isMobile || !itemStackDirection_web
        ? itemStackDirection
        : itemStackDirection_web) ??
      (type === "horizontal" ? "vertical" : "horizontal"),
    [isMobile, itemStackDirection_web, itemStackDirection, type],
  );

  const maxViewCount = React.useMemo(
    () =>
      processedScrollable
        ? isMobile || !maxDisplayedItemsCount_web
          ? maxDisplayedItemsCount
          : maxDisplayedItemsCount_web
        : columnSize * rowSize,
    [
      isMobile,
      processedScrollable,
      columnSize,
      rowSize,
      maxDisplayedItemsCount,
      maxDisplayedItemsCount_web,
    ],
  );

  return {
    gapSize,
    columnSize,
    rowSize,
    maxViewCount,
    scrollable: processedScrollable,
    itemStackDirection: processedItemStackDirection,
  };
};

import * as React from "react";
// hooks
import { useParseListElementConfig } from "common/components/blockitListLayout/hooks/useParseListElementConfig";

const DEFAULT_LIST_ELEMENT: Moim.Blockit.IListStyleElement = {
  scrollable_web: false,
  scrollable: false,
  maxDisplayedItemsCount_web: 10,
  maxDisplayedItemsCount: 4,
  columnCount_web: 5,
  columnCount: 2,
  itemStackDirection_web: "horizontal",
  itemStackDirection: "horizontal",
  scrollDirection_web: "vertical",
  scrollDirection: "vertical",
  rowCount_web: 1,
  rowCount: 2,
};

export const useParseListElementConfigWithFallback = (
  listElement?: Moim.Blockit.IListStyleElement,
  maxDisplayedItemsCount?: number,
  maxDisplayedItemsCount_web?: number,
) => {
  const convertedListElement = React.useMemo(() => {
    if (!listElement) {
      return {
        ...DEFAULT_LIST_ELEMENT,
        maxDisplayedItemsCount:
          maxDisplayedItemsCount ?? DEFAULT_LIST_ELEMENT.maxDisplayedItemsCount,
        columnCount_web:
          maxDisplayedItemsCount_web ?? DEFAULT_LIST_ELEMENT.columnCount_web,
        rowCount: maxDisplayedItemsCount
          ? maxDisplayedItemsCount / DEFAULT_LIST_ELEMENT.columnCount
          : DEFAULT_LIST_ELEMENT.rowCount,
      };
    } else {
      return listElement;
    }
  }, [listElement, maxDisplayedItemsCount, maxDisplayedItemsCount_web]);
  const {
    column,
    listElementType,
    maxVisibleCount,
  } = useParseListElementConfig(convertedListElement);
  return { convertedListElement, column, listElementType, maxVisibleCount };
};

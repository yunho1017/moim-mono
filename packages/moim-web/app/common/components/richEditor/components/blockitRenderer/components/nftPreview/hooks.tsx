import * as React from "react";
// hooks
import useIsMobile from "common/hooks/useIsMobile";

const useConfig = (listElement: Moim.Blockit.IListStyleElement) => {
  const isMobile = useIsMobile();

  const listElementType = React.useMemo(
    () =>
      (!isMobile && listElement.scrollDirection_web
        ? listElement.scrollDirection_web
        : listElement.scrollDirection) ??
      ((!isMobile && listElement.type_web
        ? listElement.type_web
        : listElement.type) === "grid"
        ? "vertical"
        : "horizontal"),
    [
      isMobile,
      listElement.scrollDirection,
      listElement.scrollDirection_web,
      listElement.type,
      listElement.type_web,
    ],
  );

  const maxVisibleCount = React.useMemo(
    () =>
      isMobile || !listElement.maxDisplayedItemsCount_web
        ? listElement.maxDisplayedItemsCount
        : listElement.maxDisplayedItemsCount_web,
    [
      isMobile,
      listElement.maxDisplayedItemsCount,
      listElement.maxDisplayedItemsCount_web,
    ],
  );

  const column = React.useMemo(
    () =>
      isMobile || !listElement.columnCount_web
        ? listElement.columnCount
        : listElement.columnCount_web,
    [isMobile, listElement.columnCount_web, listElement.columnCount],
  );

  return {
    column,
    listElementType,
    maxVisibleCount,
  };
};

export const NftSetHooks = {
  useConfig,
};

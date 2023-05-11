// vendor
import * as React from "react";
// type
import { IHookProps } from "./props";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(props: IHookProps) {
  const {
    collapsedState,
    useCollapse,
    setCollapse,
    onClickCategoryName,
    onClickChannelAddButton,
    categoryName,
  } = props;

  const handleClickCategoryName = React.useCallback(() => {
    const collapsed = !collapsedState;

    if (useCollapse) {
      setCollapse(collapsed);
    }

    onClickCategoryName?.(categoryName!, collapsed);
  }, [
    collapsedState,
    setCollapse,
    onClickCategoryName,
    useCollapse,
    categoryName,
  ]);

  const handleClickChannelAddButton = React.useCallback(() => {
    onClickChannelAddButton?.(categoryName!);
  }, [categoryName, onClickChannelAddButton]);

  return {
    handleClickCategoryName,
    handleClickChannelAddButton,
  };
}

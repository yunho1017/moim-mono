import * as React from "react";
import { IHookProps } from "./props";

export function useHandlers(props: IHookProps) {
  const { categoryName, onClickCategory, onClickChannelAddButton } = props;

  const handleClickCategory = React.useCallback(() => {
    onClickCategory?.(categoryName);
  }, [onClickCategory, categoryName]);

  const handleClickChannelAddButton: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    e => {
      e.stopPropagation();
      onClickChannelAddButton?.(categoryName);
    },
    [categoryName, onClickChannelAddButton],
  );

  return { handleClickCategory, handleClickChannelAddButton };
}

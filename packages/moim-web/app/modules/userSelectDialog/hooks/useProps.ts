import * as React from "react";
import { IProps } from "../";
import { ISelectedData } from "common/components/searchInput/selectable/type";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const [selected, setSelected] = React.useState<ISelectedData[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const selectedListRef = React.useRef<HTMLInputElement>(null);

  const canNext = Boolean(selected.length);
  const showEmpty = React.useMemo(
    () => !props.isLoading && props.users?.data.length === 0,
    [props.isLoading, props.users],
  );

  return {
    ...props,
    selected,
    setSelected,
    inputRef,
    selectedListRef,
    canNext,
    showEmpty,
  };
}

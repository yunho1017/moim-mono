import * as React from "react";
import { IProps } from "../";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const [selected, setSelected] = React.useState<Moim.Id[]>(props.selectedTags);
  const canNext = Boolean(selected.length);

  return {
    ...props,
    selected,
    setSelected,
    canNext,
  };
}

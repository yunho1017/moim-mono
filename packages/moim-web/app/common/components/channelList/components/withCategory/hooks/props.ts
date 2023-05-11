// vendor
import * as React from "react";
// type
import { IProps } from "../";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { collapsed } = props;

  const [collapsedState, setCollapse] = React.useState(collapsed ?? false);

  React.useEffect(() => {
    setCollapse(collapsed ?? false);
  }, [collapsed]);
  return {
    ...props,
    collapsedState,
    setCollapse,
  };
}

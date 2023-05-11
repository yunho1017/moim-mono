import * as React from "react";
import { IHookProps } from "./";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const { expandSideNavigation, collapseSideNavigation } = props;

  const expandSidebar = React.useCallback(() => {
    expandSideNavigation();
  }, [expandSideNavigation]);

  const collapseSidebar = React.useCallback(() => {
    collapseSideNavigation();
  }, [collapseSideNavigation]);

  return {
    expandSidebar,
    collapseSidebar,
  };
}

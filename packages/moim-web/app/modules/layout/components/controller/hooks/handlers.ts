import * as React from "react";
import { IHookProps } from "./";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export default function useHandlers(props: IHookProps) {
  const {
    expandSideNavigation,
    collapseSideNavigation,
    setTopNaviHeight,
  } = props;

  const expandSidebar = React.useCallback(() => {
    expandSideNavigation();
  }, [expandSideNavigation]);

  const collapseSidebar = React.useCallback(() => {
    collapseSideNavigation();
  }, [collapseSideNavigation]);

  const handleResize = React.useCallback(
    (_, height) => {
      setTopNaviHeight(height);
    },
    [setTopNaviHeight],
  );

  return {
    expandSidebar,
    collapseSidebar,
    handleResize,
  };
}

import * as React from "react";
import { IHookHandlers, IHookProps } from ".";

export default function useEffects(props: IHookProps, handlers: IHookHandlers) {
  const { isMobile } = props;
  const { expandSidebar, collapseSidebar } = handlers;

  React.useEffect(() => {
    if (isMobile) {
      collapseSidebar();
    } else {
      expandSidebar();
    }
  }, [isMobile, collapseSidebar, expandSidebar]);
}

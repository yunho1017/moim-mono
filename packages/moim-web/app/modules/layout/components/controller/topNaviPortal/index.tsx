import * as React from "react";
import { createPortal } from "react-dom";

export const TOP_NAVI_PORTAL_ID = "top_navi_portal";

export const TopNaviPortalContainer: React.FC<{ portalKey?: string }> = ({
  portalKey,
  children,
}) => {
  const [portalGate, setPortalGate] = React.useState<HTMLElement | null>(null);
  React.useLayoutEffect(() => {
    setPortalGate(document.getElementById(TOP_NAVI_PORTAL_ID));
  }, []);

  return portalGate ? (
    createPortal(children, portalGate, portalKey)
  ) : (
    <>{children}</>
  );
};

export const getTopNaviPortalSize = () => {
  const element = document.getElementById(TOP_NAVI_PORTAL_ID);

  if (element) {
    return element.getBoundingClientRect();
  }

  return null;
};

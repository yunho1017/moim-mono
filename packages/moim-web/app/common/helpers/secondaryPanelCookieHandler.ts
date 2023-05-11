import * as CookieHandler from "common/helpers/cookieHandler";
import {
  SECONDARY_PANEL_LAST_SEEN,
  SECONDARY_PANEL_TYPE,
} from "common/constants/keys";

type SECONDARY_VIEW_TYPE = "native" | "plugin";

export function setSecondaryPanelLastSeen(
  pathname: string,
  type: SECONDARY_VIEW_TYPE,
) {
  CookieHandler.set(SECONDARY_PANEL_LAST_SEEN, pathname);
  CookieHandler.set(SECONDARY_PANEL_TYPE, type);
}

export function getSecondaryPanelLastSeen(): {
  pathname: string;
  type: SECONDARY_VIEW_TYPE;
} {
  const pathname = CookieHandler.get<string>(SECONDARY_PANEL_LAST_SEEN, "/");
  const type = CookieHandler.get<SECONDARY_VIEW_TYPE>(
    SECONDARY_PANEL_TYPE,
    "native",
  );

  return {
    pathname,
    type,
  };
}

export function removeSecondaryPanelLastSeen() {
  CookieHandler.remove(SECONDARY_PANEL_LAST_SEEN);
  CookieHandler.remove(SECONDARY_PANEL_TYPE);
}

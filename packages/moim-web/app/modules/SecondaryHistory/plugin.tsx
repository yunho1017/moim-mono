// vendor
import * as React from "react";
import { MemoryHistory } from "history";
import { useLocation } from "react-router";
import { replace } from "connected-react-router";
// hook
import { useActions } from "app/store";
// helper
import { SECONDARY_VIEW_URL_REGEX } from "common/constants/default";

export const MemoryHistoryContext = React.createContext<MemoryHistory | null>(
  null,
);

type IProps = React.PropsWithChildren<{
  history: MemoryHistory;
}>;

function PluginSecondaryViewHistory({ history, children }: IProps) {
  const location = useLocation();
  const { replaceHistory } = useActions({
    replaceHistory: replace,
  });
  const secondaryMatch = location.pathname.match(SECONDARY_VIEW_URL_REGEX);
  const secondaryPath = secondaryMatch && secondaryMatch[0];

  if (secondaryPath) {
    replaceHistory(location.pathname.replace(SECONDARY_VIEW_URL_REGEX, ""));
    history.replace(secondaryPath.replace(/\/panel/i, ""));
  }

  return (
    <MemoryHistoryContext.Provider value={history}>
      {children}
    </MemoryHistoryContext.Provider>
  );
}

export default PluginSecondaryViewHistory;

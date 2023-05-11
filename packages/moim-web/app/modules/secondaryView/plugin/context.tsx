import * as React from "react";

export const PluginPanelContext = React.createContext(false);

export default function PluginPanelContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <PluginPanelContext.Provider value={true}>
      {children}
    </PluginPanelContext.Provider>
  );
}

import * as React from "react";

interface ITopNavigationContextValue {
  visibleMoimName: boolean;
  setVisibleMoimName(value: boolean): void;

  onlyMoreMenu: boolean;
  setVisibleOnlyMoreMenu(value: boolean): void;

  visibleSimpSearch: boolean;
  setVisibleSimpSearch(value: boolean): void;
}

const initialValue: ITopNavigationContextValue = {
  visibleMoimName: true,
  setVisibleMoimName: () => {},

  onlyMoreMenu: false,
  setVisibleOnlyMoreMenu: () => {},

  visibleSimpSearch: false,
  setVisibleSimpSearch: () => {},
};

export const TopNavigationContext = React.createContext<
  ITopNavigationContextValue
>(initialValue);

export default function TopNavigationContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [visibleMoimName, setVisibleMoimName] = React.useState(true);
  const [onlyMoreMenu, setVisibleOnlyMoreMenu] = React.useState(false);
  const [visibleSimpSearch, setVisibleSimpSearch] = React.useState(false);

  const value: ITopNavigationContextValue = React.useMemo(
    () => ({
      visibleMoimName,
      setVisibleMoimName,
      onlyMoreMenu,
      setVisibleOnlyMoreMenu,
      visibleSimpSearch,
      setVisibleSimpSearch,
    }),
    [
      visibleMoimName,
      setVisibleMoimName,
      onlyMoreMenu,
      setVisibleOnlyMoreMenu,
      visibleSimpSearch,
      setVisibleSimpSearch,
    ],
  );
  return (
    <TopNavigationContext.Provider value={value}>
      {children}
    </TopNavigationContext.Provider>
  );
}

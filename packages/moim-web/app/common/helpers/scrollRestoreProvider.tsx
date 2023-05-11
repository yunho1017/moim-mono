import * as React from "react";

export const ScrollRestoreContext = React.createContext<{
  storedScrolls: Record<string, number>;
  storeScrollPosition(key: string, position: number): void;
}>({
  storedScrolls: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  storeScrollPosition: (_: string, __: number) => {},
});

export default function ScrollRestoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storedScrollPositions, setScrollPositions] = React.useState<
    Record<string, number>
  >({});

  const storeScrollPosition = React.useCallback(
    (key: string, position: number) => {
      setScrollPositions({
        ...storedScrollPositions,
        [key]: position,
      });
    },
    [storedScrollPositions],
  );

  return (
    <ScrollRestoreContext.Provider
      value={{
        storedScrolls: storedScrollPositions,
        storeScrollPosition,
      }}
    >
      {children}
    </ScrollRestoreContext.Provider>
  );
}

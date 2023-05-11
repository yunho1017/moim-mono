import * as React from "react";

export const ModalShowContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([
  false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  (_: boolean) => {},
]);

export default function ModalShowContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const stateHandler = React.useState(false);
  return (
    <ModalShowContext.Provider value={stateHandler}>
      {children}
    </ModalShowContext.Provider>
  );
}

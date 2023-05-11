import * as React from "react";
import { TOP_BANNER_TYPE } from "./constants";

interface ITopBannerContext {
  isOpen: boolean;
  type: TOP_BANNER_TYPE;
  forceHidden?: boolean;
  currentVisibleState: boolean; // use for third-party ui constraint only
  message?: React.ReactNode;
  messageKey?: string;
  disableCloseButton?: boolean;
  custom?: {
    textColor?: string;
    bgColor?: string;
  };
}

const INITIAL_CONTEXT: ITopBannerContext = {
  isOpen: false,
  currentVisibleState: false,
  type: "normal",
};

export const TopBannerContext = React.createContext<
  [ITopBannerContext, React.Dispatch<React.SetStateAction<ITopBannerContext>>]
>([
  INITIAL_CONTEXT,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  (_: ITopBannerContext) => {},
]);

export default function TopBannerContextProvider({
  children,
}: // eslint-disable-next-line @typescript-eslint/ban-types
React.PropsWithChildren<{}>) {
  const stateHandler = React.useState(INITIAL_CONTEXT);

  return (
    <TopBannerContext.Provider
      value={[
        {
          ...stateHandler[0],
          currentVisibleState:
            stateHandler[0].forceHidden || !stateHandler[0].message
              ? false
              : stateHandler[0].isOpen,
        },
        stateHandler[1],
      ]}
    >
      {children}
    </TopBannerContext.Provider>
  );
}

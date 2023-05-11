import React, { createContext } from "react";
import useMedia from "common/hooks/useMedia";
import { isMobileAgent } from "common/helpers/browserDetect";
import { MEDIA_QUERY } from "common/constants/responsive";

interface IsMobileContextValue {
  isMobile: boolean;
}

const queries = [MEDIA_QUERY.ONLY_MOBILE];
const values = [true];

const initialValue: IsMobileContextValue = { isMobile: false };

const IsMobileContext = createContext<IsMobileContextValue>(initialValue);

export { IsMobileContext };

export function IsMobileProvider({ children }: React.PropsWithChildren<{}>) {
  const isMobile = useMedia(queries, values, false);
  const value = React.useMemo(() => {
    return { isMobile: isMobile || isMobileAgent() };
  }, [isMobile]);

  return (
    <IsMobileContext.Provider value={value}>
      {children}
    </IsMobileContext.Provider>
  );
}

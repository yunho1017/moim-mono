// javascript
import React from "react";
import { JoinedSubMoimStatusType } from "./container/joinedSubMoims";
import useIsMobile from "common/hooks/useIsMobile";

interface IJoinedSubMoimsContextValue {
  joinedSubMoimsStatus: JoinedSubMoimStatusType;
  setJoinedSubMoimsStatus(status: JoinedSubMoimStatusType): void;
}
const initialValue: IJoinedSubMoimsContextValue = {
  joinedSubMoimsStatus: "Open",
  setJoinedSubMoimsStatus: () => {},
};

const NavigationPanelContext = React.createContext<IJoinedSubMoimsContextValue>(
  initialValue,
);

export default NavigationPanelContext;

export function useNavigationPanelContext(): IJoinedSubMoimsContextValue {
  const isMobile = useIsMobile();

  const [status, setStatus] = React.useState<JoinedSubMoimStatusType>(
    isMobile ? "Open" : "Disabled",
  );
  return React.useMemo(
    () => ({
      joinedSubMoimsStatus: status,
      setJoinedSubMoimsStatus: setStatus,
    }),
    [status, setStatus],
  );
}

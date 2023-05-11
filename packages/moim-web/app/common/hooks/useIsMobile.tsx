import { useContext } from "react";
import { IsMobileContext } from "app/client/providers/isMobileProvider";

function useIsMobile() {
  const { isMobile } = useContext(IsMobileContext);
  return isMobile;
}

export default useIsMobile;

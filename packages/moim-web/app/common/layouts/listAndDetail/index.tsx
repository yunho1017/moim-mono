import * as React from "react";
import { matchPath, useLocation } from "react-router";
import useIsMobile from "common/hooks/useIsMobile";
import DesktopLayout, {
  IProps as IDesktopLayoutProps,
} from "./components/desktop";
import MobileLayout, {
  IProps as IMobileLayoutProps,
} from "./components/mobile";

export interface IProps
  extends IDesktopLayoutProps,
    Omit<IMobileLayoutProps, "isShowRightPanel"> {
  mainPanelUrls: string[];
}

const ListAndDetailLayout: React.FC<IProps> = ({ mainPanelUrls, ...props }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isShowRightPanel = React.useMemo(
    () =>
      Boolean(
        matchPath(location.pathname, {
          path: mainPanelUrls,
        }),
      ),
    [mainPanelUrls, location.pathname],
  );

  return isMobile ? (
    <MobileLayout isShowRightPanel={isShowRightPanel} {...props} />
  ) : (
    <DesktopLayout {...props} />
  );
};

export default ListAndDetailLayout;

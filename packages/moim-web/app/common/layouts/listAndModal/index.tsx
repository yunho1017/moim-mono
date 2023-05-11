import * as React from "react";
import { matchPath, useLocation } from "react-router";
import useIsMobile from "common/hooks/useIsMobile";
import DesktopLayout from "./components/desktop";
import MobileLayout from "../listAndDetail/components/mobile";
import { ModalShowContext } from "common/layouts/context";

export interface IProps
  extends Omit<React.ComponentProps<typeof DesktopLayout>, "isShowMainPanel">,
    Omit<React.ComponentProps<typeof MobileLayout>, "isShowRightPanel"> {
  mainPanelUrls: string[];
}

const ListAndModalLayout: React.FC<IProps> = ({ mainPanelUrls, ...props }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isShowMainPanel, setIsShowMainPanel] = React.useContext(
    ModalShowContext,
  );

  React.useEffect(() => {
    setIsShowMainPanel(
      Boolean(
        matchPath(location.pathname, {
          path: mainPanelUrls,
        }),
      ),
    );
  }, [mainPanelUrls, location.pathname]);

  return isMobile ? (
    <MobileLayout isShowRightPanel={isShowMainPanel} {...props} />
  ) : (
    <DesktopLayout isShowMainPanel={isShowMainPanel} {...props} />
  );
};

export default React.memo(ListAndModalLayout);

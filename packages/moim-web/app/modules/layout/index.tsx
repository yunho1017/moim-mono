import * as React from "react";

// hooks
import { useProps, useHandlers, useEffects } from "./hooks";
// components
import AppDownloadPromoteTopBanner from "common/components/promotion/stickyTopBanner";
import { MainWrapper, Container } from "./components/styled";
import FreezeView from "common/components/freezeView";
import TopBanner from "common/components/topBanner";
import SecondaryViewContainer from "../secondaryView";
import NavigationPanelContext, {
  useNavigationPanelContext,
} from "../navigationPanel/context";
import LayoutController from "./components/controller";
import ThreadShowModalContainer from "app/modules/postShow/modal";
import DQuestShowModalContainer from "app/modules/dquest/containers/show/modal";
import {
  Wrapper as InnerWrapper,
  MainWrapper as InnerMainWrapper,
} from "./components/controller/styled";

export const NO_GNB_TOP_NAV_PORTAL_ID = "no_nav_gnb_portal";

export type IProps = React.PropsWithChildren<{}>;

function Layout(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps, hookHandlers);

  const {
    isExpandSideNavigation,
    nativeSecondaryViewOpenStatus,
    pluginSecondaryViewOpenStatus,
    isMobile,
    children,
  } = hookProps;
  const navigationPanelContextValue = useNavigationPanelContext();

  return (
    <NavigationPanelContext.Provider value={navigationPanelContextValue}>
      <FreezeView
        isFreeze={
          isMobile &&
          (isExpandSideNavigation ||
            nativeSecondaryViewOpenStatus ||
            pluginSecondaryViewOpenStatus)
        }
      >
        <Container>
          <AppDownloadPromoteTopBanner />
          <TopBanner />
          <LayoutController>
            <MainWrapper>{children}</MainWrapper>
            <SecondaryViewContainer />
          </LayoutController>
          <ThreadShowModalContainer />
          <DQuestShowModalContainer />
        </Container>
      </FreezeView>
    </NavigationPanelContext.Provider>
  );
}

function NoGNBLayout(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps, hookHandlers);

  const {
    isExpandSideNavigation,
    nativeSecondaryViewOpenStatus,
    pluginSecondaryViewOpenStatus,
    isMobile,
    children,
  } = hookProps;
  const navigationPanelContextValue = useNavigationPanelContext();

  return (
    <NavigationPanelContext.Provider value={navigationPanelContextValue}>
      <FreezeView
        isFreeze={
          isMobile &&
          (isExpandSideNavigation ||
            nativeSecondaryViewOpenStatus ||
            pluginSecondaryViewOpenStatus)
        }
      >
        <Container>
          <AppDownloadPromoteTopBanner />
          <InnerWrapper>
            <div id={NO_GNB_TOP_NAV_PORTAL_ID} />
            <InnerMainWrapper>
              <MainWrapper>{children}</MainWrapper>
              <SecondaryViewContainer />
            </InnerMainWrapper>
          </InnerWrapper>
        </Container>
      </FreezeView>
    </NavigationPanelContext.Provider>
  );
}

export default Layout;

export { NoGNBLayout };

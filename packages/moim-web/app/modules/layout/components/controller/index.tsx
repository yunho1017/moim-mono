import * as React from "react";
import { matchPath, useLocation } from "react-router";
import ReactResizeDetector from "react-resize-detector";
import { TOP_NAVI_PORTAL_ID } from "./topNaviPortal";
// hooks
import { useProps, useHandlers } from "./hooks";
import { MoimURL } from "common/helpers/url";
// components
import {
  Wrapper,
  TopNavigationWrapper,
  TopSubNavigationWrapper,
  joinChildMoimBannerStickyStyle,
  TopNavigationSiblingWrapper,
  MainWrapper,
  JOIN_GROUP_BANNER_HEIGHT,
  BottomFooterWrapper,
} from "./styled";
import SideBar from "../sideBar";
import NavigationPanel from "app/modules/navigationPanel";
import DisplayController from "common/components/displayControllerAboutScrollDirection";
import TopNavigation from "../topNavigation";
import TopSubNavigation from "../topSubNavigation";
import BottomFooter from "common/components/bottomFooter";
import TopTabNavigation from "../topTabNavigation";

export type IProps = React.PropsWithChildren<{}>;

function LayoutController(props: IProps) {
  const location = useLocation();
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    isExpandSideNavigation,
    topBannerContext,
    visibleTopNavigation,
    visibleTopSubNavigation,
    visibleBottomFooter,
    visibleTopTabNavigation,
    groupJoinBannerDirection,
    setGroupJoinBannerDirection,
    isMobile,
    currentUser,
    currentGroup,
    children,
    topNaviHeight,
  } = hookProps;
  const { expandSidebar, collapseSidebar, handleResize } = hookHandlers;
  const topNaviDisabled = React.useMemo(
    () =>
      isMobile &&
      Boolean(
        matchPath(location.pathname, {
          path: [
            MoimURL.ShowForumThread.pattern,
            MoimURL.FocusedShowForumThread.pattern,
            MoimURL.CreateForumThread.pattern,
            MoimURL.EditForumThread.pattern,
            MoimURL.PostTemplateEditor.pattern,
            MoimURL.PostTemplateShow.pattern,
            MoimURL.NftShow.pattern,
            MoimURL.CryptobadgeShow.pattern,
            MoimURL.CertificateShow.pattern,
          ],
          exact: true,
        }),
      ),
    [isMobile, location.pathname],
  );

  const topNavigationElement = React.useMemo(() => {
    if (visibleTopNavigation) {
      return (
        <>
          <TopNavigationWrapper
            isBannerOpened={topBannerContext.currentVisibleState}
            isExpandSideNavigation={isExpandSideNavigation}
            disabled={topNaviDisabled}
          >
            <ReactResizeDetector handleHeight={true} onResize={handleResize}>
              <TopNavigation />
            </ReactResizeDetector>
          </TopNavigationWrapper>
        </>
      );
    }

    return null;
  }, [
    visibleTopNavigation,
    topBannerContext.currentVisibleState,
    isExpandSideNavigation,
    topNaviDisabled,
    handleResize,
  ]);

  const topSubNavigationElement = React.useMemo(() => {
    if (!visibleTopSubNavigation) {
      return null;
    }

    return (
      <DisplayController<{
        isBannerOpened: boolean;
        isTopNaviDisabled: boolean;
      }>
        overrideStyle={joinChildMoimBannerStickyStyle}
        isTopNaviDisabled={topNaviDisabled}
        isBannerOpened={topBannerContext.currentVisibleState}
        onChangeDirection={setGroupJoinBannerDirection}
      >
        <TopSubNavigationWrapper
          isBannerOpened={topBannerContext.currentVisibleState}
        >
          <TopSubNavigation />
        </TopSubNavigationWrapper>
      </DisplayController>
    );
  }, [
    visibleTopSubNavigation,
    topNaviDisabled,
    topBannerContext.currentVisibleState,
    setGroupJoinBannerDirection,
  ]);

  const groupJoinHeight: number = React.useMemo(() => {
    if (!isMobile || currentUser?.id || currentGroup?.is_hub) return 0;
    return groupJoinBannerDirection === "down" ? 0 : JOIN_GROUP_BANNER_HEIGHT;
  }, [currentGroup, currentUser, groupJoinBannerDirection, isMobile]);

  const topPos = React.useMemo(() => topNaviHeight + groupJoinHeight, [
    topNaviHeight,
    groupJoinHeight,
  ]);

  const topNavigationSiblingElement = React.useMemo(
    () => (
      <TopNavigationSiblingWrapper
        id={TOP_NAVI_PORTAL_ID}
        top={topPos}
        isBannerOpened={topBannerContext.currentVisibleState}
        isExpandSideNavigation={isExpandSideNavigation}
      />
    ),
    [topPos, topBannerContext.currentVisibleState, isExpandSideNavigation],
  );

  const topTabNavigationElement = React.useMemo(() => {
    if (!visibleTopTabNavigation) {
      return null;
    }

    return (
      <TopTabNavigation disabled={topNaviDisabled || isExpandSideNavigation} />
    );
  }, [isExpandSideNavigation, topNaviDisabled, visibleTopTabNavigation]);

  return (
    <Wrapper>
      {topNavigationElement}
      {topSubNavigationElement}
      {topTabNavigationElement}
      {topNavigationSiblingElement}
      <MainWrapper>
        <SideBar
          isExpanded={isExpandSideNavigation}
          showCollapseButton={false}
          onClickDim={collapseSidebar}
          onClickCollapseButton={collapseSidebar}
          onClickExpandedDim={expandSidebar}
        >
          <NavigationPanel />
        </SideBar>
        {children}
      </MainWrapper>
      {visibleBottomFooter && (
        <BottomFooterWrapper>
          <BottomFooter />
        </BottomFooterWrapper>
      )}
    </Wrapper>
  );
}

export default LayoutController;

import * as React from "react";
import ReactResizeDetector from "react-resize-detector";

import ElementRenderer from "./components/elementRenderer";
import {
  ExpandIcon,
  ChangeStatusButton,
} from "app/modules/navigationPanel/container/joinedSubMoims/styled";
import { Wrapper, InnerWrapper, JoinedSubMoimOpenButton } from "./styled";

import useHover from "common/hooks/useHover";
import useIsTablet from "common/hooks/useIsTablet";
import useIsCurrentGroupVisibleInTopNavi from "../hooks/useIsCurrentGroupVisible";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useVisibleTopSubNavigation } from "../../controller/hooks";
import { useStoreState } from "app/store";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";

import { currentGroupSelector } from "app/selectors/app";
import NavigationPanelContext from "app/modules/navigationPanel/context";
import { TopNavigationContext } from "../context";

export default function DesktopTopNavigation() {
  const [hoverRef, hover] = useHover<HTMLDivElement>();
  const {
    visibleMoimName,
    setVisibleMoimName,
    onlyMoreMenu,
    setVisibleOnlyMoreMenu,
    visibleSimpSearch,
    setVisibleSimpSearch,
  } = React.useContext(TopNavigationContext);
  const isTablet = useIsTablet();
  const isCurrentGroupVisible = useIsCurrentGroupVisibleInTopNavi();
  const currentUser = useCurrentUser();
  const visibleTopSubNavigation = useVisibleTopSubNavigation();
  const parentGroup = useCurrentHubGroup();
  const { currentGroup } = useStoreState(storeState => ({
    currentGroup: currentGroupSelector(storeState),
  }));

  const { joinedSubMoimsStatus, setJoinedSubMoimsStatus } = React.useContext(
    NavigationPanelContext,
  );

  const visibleGroup = React.useMemo(() => {
    if (isCurrentGroupVisible) {
      return currentGroup as Moim.Group.INormalizedGroup | null;
    } else {
      return parentGroup;
    }
  }, [parentGroup, currentGroup, isCurrentGroupVisible]);

  const handleResize = React.useCallback(
    (width: number) => {
      if (width < 650 && !onlyMoreMenu) {
        setVisibleOnlyMoreMenu(true);
      }

      if (width > 650 && onlyMoreMenu) {
        setVisibleOnlyMoreMenu(false);
      }

      if (width < 700 && !visibleSimpSearch) {
        setVisibleSimpSearch(true);
      }

      if (width > 700 && visibleSimpSearch) {
        setVisibleSimpSearch(false);
      }

      if (width < 620 && visibleMoimName) {
        setVisibleMoimName(false);
      }

      if (width > 620 && !visibleMoimName) {
        setVisibleMoimName(true);
      }
    },
    [
      visibleMoimName,
      setVisibleMoimName,
      onlyMoreMenu,
      setVisibleOnlyMoreMenu,
      visibleSimpSearch,
      setVisibleSimpSearch,
    ],
  );

  const handleOpenJoinedSubMoims = React.useCallback(() => {
    setJoinedSubMoimsStatus("Open");
  }, [setJoinedSubMoimsStatus]);

  const joinedSubMoimOpenButtonElement = React.useMemo(() => {
    if (
      (!hover && !isTablet) ||
      !visibleGroup?.sub_groups_count ||
      !currentUser
    ) {
      return;
    }

    switch (joinedSubMoimsStatus) {
      case "Disabled": {
        return (
          <JoinedSubMoimOpenButton>
            <ChangeStatusButton onClick={handleOpenJoinedSubMoims}>
              <ExpandIcon />
            </ChangeStatusButton>
          </JoinedSubMoimOpenButton>
        );
      }
      default:
        return null;
    }
  }, [
    currentUser,
    handleOpenJoinedSubMoims,
    hover,
    isTablet,
    joinedSubMoimsStatus,
    visibleGroup,
  ]);

  const innerElement = React.useMemo(
    () =>
      currentGroup?.navigation_structure.web.topNavi.elements?.map(
        (element, index) => (
          <ElementRenderer key={`${element.type}-${index}`} element={element} />
        ),
      ),
    [currentGroup],
  );

  return (
    <Wrapper ref={hoverRef} visibleTopSubNavigation={visibleTopSubNavigation}>
      {joinedSubMoimOpenButtonElement}
      <ReactResizeDetector
        handleWidth={true}
        refreshMode="debounce"
        onResize={handleResize}
      >
        <InnerWrapper>{innerElement}</InnerWrapper>
      </ReactResizeDetector>
    </Wrapper>
  );
}

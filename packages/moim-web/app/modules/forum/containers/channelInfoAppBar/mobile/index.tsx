import * as React from "react";
import { useLocation } from "react-router";
import {
  appbarWrapperStyle,
  LeftButtonWrapper,
  MenuIcon,
  RightButtonWrapper,
  SearchIcon,
  Title,
  TitleWrapper,
} from "./styledComponents";
import AppBar from "common/components/appBar";
import ShavedText from "common/components/shavedText";
import MoreButton from "./components/moreButton";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal";
import PermissionChecker, {
  useResourcePermission,
} from "common/components/permissionChecker";
import ThreadWriteButton from "app/modules/forum/components/forumThreadList/components/threadWriteButton";
import ForumNotiSettingButton from "app/modules/forum/components/forumNotiSettingButton";

import useVisibleExpandSideNavigationButton from "common/hooks/useVisibleExpandSideNavigationButton";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import { useStoreState } from "app/store";
import { selectCurrentForum } from "app/selectors/forum";
import { MoimURL } from "common/helpers/url";
import { PermissionDeniedFallbackType } from "app/enums";

const isTBDSearchButton = true;

export const isForumShowRoute = (pathname: string) =>
  MoimURL.ShowForumThread.isSameExact(pathname) ||
  MoimURL.FocusedShowForumThread.isSameExact(pathname) ||
  MoimURL.CreateForumThread.isSameExact(pathname) ||
  MoimURL.EditForumThread.isSameExact(pathname);

export const isForumRoute = (pathname: string) =>
  MoimURL.Forum.isSameExact(pathname);

interface IProps {
  visibleTopTabNavigation?: boolean;
}

function ThreadListAppBar({ visibleTopTabNavigation }: IProps) {
  const location = useLocation();
  const visibleExpandSideNavigationButton = useVisibleExpandSideNavigationButton();
  const { expandSideNavigation } = useSideNavigationPanel();
  const { forumId, forumName } = useStoreState(state => ({
    forumId: state.forumData.currentForumId,
    forumName: selectCurrentForum(state)?.name,
  }));
  const {
    hasPermission: hasWritePostPermission,
    isLoading: isPermissionLoading,
  } = useResourcePermission("WRITE_POST", forumId);

  if (
    !(isForumRoute(location.pathname) && !isForumShowRoute(location.pathname))
  ) {
    return null;
  }

  return (
    <TopNaviPortalContainer>
      <AppBar
        leftButton={
          <LeftButtonWrapper>
            {visibleExpandSideNavigationButton ? (
              <MenuIcon role="button" onClick={expandSideNavigation} />
            ) : null}
          </LeftButtonWrapper>
        }
        titleElement={
          <TitleWrapper>
            <Title isApplyFlex={!visibleExpandSideNavigationButton}>
              <ShavedText
                value={<NativeEmojiSafeText value={forumName || ""} />}
              />
            </Title>
          </TitleWrapper>
        }
        rightButton={
          <RightButtonWrapper>
            {!isTBDSearchButton ? (
              <button>
                <SearchIcon />
              </button>
            ) : null}
            <PermissionChecker
              fallbackType={PermissionDeniedFallbackType.ALERT}
              hasPermission={hasWritePostPermission}
              isLoading={isPermissionLoading}
            >
              <ThreadWriteButton
                visibleTopTabNavigation={visibleTopTabNavigation}
                forumId={forumId}
              />
            </PermissionChecker>
            <ForumNotiSettingButton />
            <MoreButton
              forumId={forumId}
              visibleTopTabNavigation={visibleTopTabNavigation}
            />
          </RightButtonWrapper>
        }
        wrapperStyle={appbarWrapperStyle}
      />
    </TopNaviPortalContainer>
  );
}

export default React.memo(ThreadListAppBar);

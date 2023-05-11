import * as React from "react";

import AppBar from "common/components/appBar";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import UserProfileImage from "common/components/userProfileImage";
import ShavedText from "common/components/shavedText";
import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal";

import {
  AppBarStyle,
  AppBarTitleWrapper,
  ChannelName,
  ChannelDescription,
  RightWrapper,
  DMTitleWrapper,
  InfoIcon,
  MenuIcon,
  MoreIcon,
  MoreIconWrapper,
} from "./styled";
import MoreMenu from "./menu";
import UnsignedChecker from "common/components/unsiginedChecker";
// hooks
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useIsMobile from "common/hooks/useIsMobile";
import useVisibleExpandSideNavigationButton from "common/hooks/useVisibleExpandSideNavigationButton";
import useOpenState from "common/hooks/useOpenState";
import {
  useNotiIconWithStatus,
  useOpenChannelNotificationSettingDialog,
} from "common/components/channelNotificationSettingDialog/hooks";
import useCurrentUser from "common/hooks/useCurrentUser";
// helpers
import { MoimURL } from "common/helpers/url";
import { PermissionDeniedFallbackType } from "app/enums";

interface IConversationShowProps {
  wrapperRef: React.RefObject<HTMLDivElement>;
  type: "conversation";
  channelId: string;
  currentConversation?: Moim.Conversations.IConversation;
}

interface IDirectMessageProps {
  wrapperRef: React.RefObject<HTMLDivElement>;
  type: "dm";
  channelId: string;
  targetUser?: Moim.User.IUser;
}

export default function Header(
  props: IConversationShowProps | IDirectMessageProps,
) {
  const currentUser = useCurrentUser();
  const isMobile = useIsMobile();
  const refMoreMenuButton = React.useRef<HTMLDivElement>(null);
  const { redirect } = useNativeSecondaryView();
  const { expandSideNavigation } = useSideNavigationPanel();
  const visibleExpandSideNavigationButton = useVisibleExpandSideNavigationButton();

  const visibleNotiIcon = React.useMemo(
    () =>
      props.type === "conversation" || props.targetUser?.id !== currentUser?.id,
    [props, currentUser],
  );
  const openChannelNotiSettingDialog = useOpenChannelNotificationSettingDialog({
    channelId: props.channelId,
    type: props.type,
  });
  const notiIcon = useNotiIconWithStatus({
    channelId: props.channelId,
    handler: openChannelNotiSettingDialog,
  });

  const {
    isOpen: moreMenuOpen,
    open: openMoreMenu,
    close: closeMoreMenu,
  } = useOpenState(false);

  const openConversationMember = React.useCallback(() => {
    if (props.type === "conversation") {
      redirect(
        new MoimURL.ConversationMembers({
          conversationId: props.channelId || "",
        }).toString(),
      );
    }
  }, [props.channelId, props.type, redirect]);

  const openConversationMoreMenu = React.useCallback(() => {
    if (props.type === "conversation") {
      openMoreMenu();
    }
  }, [openMoreMenu, props.type]);

  const leftElement = React.useMemo(
    () =>
      visibleExpandSideNavigationButton ? (
        <MenuIcon onClick={expandSideNavigation} />
      ) : null,
    [expandSideNavigation, visibleExpandSideNavigationButton],
  );

  const rightElement = React.useMemo(() => {
    const elements: React.ReactNode[] = [];

    if (visibleNotiIcon)
      elements.push(
        <UnsignedChecker fallbackType={PermissionDeniedFallbackType.NONE}>
          {notiIcon}
        </UnsignedChecker>,
      );
    if (props.type === "conversation") {
      elements.push(
        <InfoIcon key="conversation-info" onClick={openConversationMember} />,
      );
      elements.push(
        <MoreIconWrapper key="more-info" ref={refMoreMenuButton}>
          <MoreIcon onClick={openConversationMoreMenu} />
        </MoreIconWrapper>,
      );
    }

    return <RightWrapper>{elements}</RightWrapper>;
  }, [openConversationMember, props.type, visibleNotiIcon, currentUser]);

  const titleElement = React.useMemo(() => {
    switch (props.type) {
      case "conversation":
        const { currentConversation } = props;
        return (
          <AppBarTitleWrapper>
            {currentConversation && (
              <>
                <ChannelName>
                  <NativeEmojiSafeText value={currentConversation.name} />
                </ChannelName>
                {currentConversation.purpose && (
                  <ChannelDescription>
                    <NativeEmojiSafeText
                      value={currentConversation.purpose.content}
                    />
                  </ChannelDescription>
                )}
              </>
            )}
          </AppBarTitleWrapper>
        );

      case "dm":
        const { targetUser } = props;
        return (
          targetUser && (
            <DMTitleWrapper>
              <UserProfileImage
                userId={targetUser.id}
                src={targetUser.avatar_url || ""}
                size="xs"
                isOnline={targetUser.presence === "ACTIVE"}
              />
              <ShavedText
                value={<NativeEmojiSafeText value={targetUser.name} />}
                line={1}
              />
            </DMTitleWrapper>
          )
        );
    }
  }, [props]);

  const element = React.useMemo(
    () => (
      <AppBar
        titleElement={titleElement}
        titleAlignment={isMobile ? "Center" : "Left"}
        rightButton={rightElement}
        leftButton={leftElement}
        wrapperStyle={AppBarStyle}
      />
    ),
    [isMobile, leftElement, rightElement, titleElement],
  );

  if (isMobile) {
    return (
      <>
        <TopNaviPortalContainer>{element}</TopNaviPortalContainer>
        <MoreMenu
          open={moreMenuOpen}
          anchorElement={refMoreMenuButton.current}
          onCloseRequest={closeMoreMenu}
        />
      </>
    );
  }

  return (
    <>
      {element}
      <MoreMenu
        open={moreMenuOpen}
        anchorElement={refMoreMenuButton.current}
        onCloseRequest={closeMoreMenu}
      />
    </>
  );
}

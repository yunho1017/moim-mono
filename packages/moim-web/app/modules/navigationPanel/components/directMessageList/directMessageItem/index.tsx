// vendor
import * as React from "react";
import { InView } from "react-intersection-observer";
// helpers
import getDirectMessageTargetUser from "common/helpers/getDirectMessageTargetUser";
import {
  unreadCountSelector,
  directMessageUnreadStatusSelector,
} from "app/selectors/channel";
// hook
import useRedirect from "common/hooks/useRedirect";
import { useStoreState } from "app/store";
// component
import { ChannelName, Wrapper, TitleWrapper } from "./styled";
import ShavedText from "common/components/shavedText";
import { BaseItemCell } from "common/components/itemCell";
import { CommonBadge } from "common/components/alertBadge";

import UserProfileImage from "common/components/userProfileImage";
import useCurrentUser from "common/hooks/useCurrentUser";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";

import { MarginSize } from "app/enums";
import { MoimURL } from "common/helpers/url";

export interface IProps {
  directMessage: Moim.DirectMessage.IDirectMessage;
  isSelected: boolean;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
  onClick?: () => void;
  onInViewChange?: (
    visible: boolean,
    channel: Moim.Id,
    ref: React.RefObject<any>,
    statCount?: number,
  ) => void;
}
const MAX_UNREAD_COUNT = 9;

function DirectMessageItem({
  directMessage,
  isSelected,
  elementPaletteProps,
  onClick,
  onInViewChange,
}: IProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const redirect = useRedirect();
  const currentUser = useCurrentUser();
  const { collapseSideNavigation } = useSideNavigationPanel();
  const { unreadCount, isUnread } = useStoreState(storeState => ({
    unreadCount: unreadCountSelector(storeState, directMessage.id),
    isUnread: directMessageUnreadStatusSelector(
      directMessage,
      storeState.entities.stats[directMessage.id],
    ),
  }));
  const targetUser = getDirectMessageTargetUser(
    currentUser || undefined,
    directMessage.members,
  );

  const leftElement = React.useMemo(
    () =>
      targetUser
        ? {
            element: (
              <UserProfileImage
                userId={targetUser.id}
                src={targetUser.avatar_url}
                isOnline={targetUser.presence === "ACTIVE"}
                size="s"
                canOpenProfileDialog={false}
                elementPaletteProps={elementPaletteProps}
              />
            ),
            props: {
              leftContentsSize: "s" as Moim.DesignSystem.Size,
              margin: {
                left: MarginSize.SIXTEEN,
                right: MarginSize.TWELVE,
              },
            },
          }
        : undefined,
    [targetUser, elementPaletteProps],
  );

  const rightElement: React.ReactNode = React.useMemo(() => {
    const elements: React.ReactNode[] = [];

    if (unreadCount) {
      elements.push(
        <CommonBadge key="blue-badge">
          {unreadCount > MAX_UNREAD_COUNT
            ? `${MAX_UNREAD_COUNT}+`
            : unreadCount}
        </CommonBadge>,
      );
    }

    return elements;
  }, [unreadCount]);

  const channelItemElement = (
    <BaseItemCell
      title={
        <TitleWrapper title={targetUser?.name}>
          <ChannelName
            isSelected={isSelected}
            isUnread={isUnread}
            elementPaletteProps={elementPaletteProps}
            leftMargin={!Boolean(leftElement)}
          >
            <ShavedText value={targetUser?.name} line={1} />
          </ChannelName>
        </TitleWrapper>
      }
      size="xs"
      leftElement={leftElement}
      rightElement={rightElement}
    />
  );

  const handleClickDirectMessage = React.useCallback(() => {
    onClick?.();
    redirect(
      new MoimURL.DirectMessageShow({
        directMessageId: directMessage.id || "",
      }).toString(),
    );
    collapseSideNavigation();
  }, [onClick, collapseSideNavigation, directMessage.id, redirect]);

  const handleInViewChange = React.useCallback(
    (inView: boolean) => {
      onInViewChange?.(
        inView,
        directMessage.id,
        wrapperRef,
        directMessage.stat?.count,
      );
    },
    [onInViewChange, directMessage.id, directMessage.stat],
  );

  if (!targetUser) {
    return null;
  }

  return (
    <InView onChange={handleInViewChange}>
      <Wrapper
        ref={wrapperRef}
        onClick={handleClickDirectMessage}
        isSelected={isSelected}
        isUnread={isUnread}
        elementPaletteProps={elementPaletteProps}
      >
        {channelItemElement}
      </Wrapper>
    </InView>
  );
}

export default DirectMessageItem;

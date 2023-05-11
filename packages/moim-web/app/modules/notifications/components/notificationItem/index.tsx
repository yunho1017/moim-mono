import * as React from "react";
import ShavedText from "common/components/shavedText";
import UserProfileImage from "common/components/userProfileImage";
import {
  AnchorWrapper,
  Wrapper,
  Left,
  Right,
  Title,
  Description,
  Status,
  StatusWrapper,
  UnreadMark,
} from "./styled";

import { useActions, useStoreState } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import useNotificationsDialog from "common/hooks/useNotificationsDialog";

import { browserLocale } from "app/intl";
import {
  displayHighlightedTextWithStyle,
  displayNotificationBodyWithStyle,
} from "./helper";
import { ActionCreators as ForumActionCreators } from "app/actions/forum";

import { ItemIdTypes } from "app/enums";
import { MoimURL } from "common/helpers/url";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";

const NOTIFICATION_BODY_LINE_HEIGHT = 20;

function parseRedirectTo(redirectTo: string, channelType?: Moim.Channel.Type) {
  switch (channelType) {
    case "forum":
      return redirectTo.split("#").join("/replies/");
    default:
      return redirectTo;
  }
}
interface IProps {
  type: Moim.Notification.NotificationType;
  title: Moim.Notification.NotificationItemHeader;
  itemId: Moim.Id;
  parentId: Moim.Id;
  channelType?: Moim.Channel.Type;
  description: string;
  status: React.ReactNode[];
  redirectTo: string;
  host: string;
  isUnread: boolean;
  profile?: string;
}
function NotificationItem({
  type,
  channelType,
  profile,
  title,
  description,
  status,
  redirectTo,
  host,
  isUnread,
  itemId,
  parentId,
}: IProps) {
  const redirect = useRedirect();
  const { redirect: secViewRedirect } = useNativeSecondaryView();
  const { closeNotificationsDialog } = useNotificationsDialog();
  const parsedRedirectTo = parseRedirectTo(redirectTo, channelType);
  const { titleElement, descriptionElement } = useStoreState(state => ({
    titleElement: displayHighlightedTextWithStyle(
      title[browserLocale(state.app.locale || undefined)],
      state,
    ),
    descriptionElement: displayNotificationBodyWithStyle(state, description),
  }));

  const { dispatchUpdateHighlightThreadId } = useActions({
    dispatchUpdateHighlightThreadId:
      ForumActionCreators.updateHighlightThreadId,
  });

  const statusElements = React.useMemo(
    () =>
      status.map((el, idx) =>
        el ? (
          <Status key={`status_${idx}`}>
            <ShavedText value={el} line={1} />
          </Status>
        ) : null,
      ),
    [status],
  );

  const handleClick = React.useCallback(() => {
    closeNotificationsDialog();
    if (MoimURL.PositionMembers.matchExact(parsedRedirectTo)) {
      secViewRedirect(parsedRedirectTo);
      return;
    }

    const threadId = [itemId, parentId].find(id =>
      id?.startsWith(ItemIdTypes.THREAD),
    );
    redirect(parsedRedirectTo);
    if (threadId) {
      dispatchUpdateHighlightThreadId(threadId);
    }
  }, [
    closeNotificationsDialog,
    itemId,
    parentId,
    parsedRedirectTo,
    redirect,
    secViewRedirect,
    dispatchUpdateHighlightThreadId,
  ]);

  const inner = React.useMemo(
    () => (
      <>
        <Left>
          <UserProfileImage src={profile} size="m" />
          {isUnread && <UnreadMark />}
        </Left>
        <Right>
          <Title>{titleElement}</Title>
          <Description notiType={type}>
            <ShavedText
              value={<div>{descriptionElement}</div>}
              shaveHeight={NOTIFICATION_BODY_LINE_HEIGHT * 2}
            />
          </Description>
          {Boolean(status.length) && (
            <StatusWrapper>{statusElements}</StatusWrapper>
          )}
        </Right>
      </>
    ),
    [
      isUnread,
      profile,
      titleElement,
      type,
      descriptionElement,
      statusElements,
      status,
    ],
  );

  return host !== `https://${location.host}` ? (
    <AnchorWrapper
      href={`${host}${parsedRedirectTo ?? ""}${location.search}`}
      target="_self"
    >
      {inner}
    </AnchorWrapper>
  ) : (
    <Wrapper onClick={handleClick}>{inner}</Wrapper>
  );
}

export default React.memo(NotificationItem);

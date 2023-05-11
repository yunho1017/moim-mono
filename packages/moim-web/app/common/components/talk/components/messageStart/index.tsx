import * as React from "react";
import moment from "moment";
import { useIntl } from "react-intl";
import ShavedText from "common/components/shavedText";
import { BaseItemCell } from "common/components/itemCell";
import UserProfileImage from "common/components/userProfileImage";
import {
  Wrapper,
  Title,
  Description,
  Header,
  DirectMessageHeader,
  CreatorName,
  DirectMessageTitle,
} from "./styledComponents";

import { MarginSize } from "app/enums";
import { WITHOUT_TIME_DATE_FORMAT } from "common/constants/default";

import { useOpenProfileDialog } from "common/hooks/profileDialog";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

// GroupChannel Message start
export function MessageStartFromChannel({
  channel,
}: {
  channel: Moim.Channel.IChannel;
}) {
  const intl = useIntl();

  return (
    <Wrapper>
      <Header>
        <Title>
          <NativeEmojiSafeText value={channel.name} />
        </Title>
      </Header>
      <Description>
        <NativeEmojiSafeText
          value={intl
            .formatMessage({ id: "chat_show/header_title_body" }, {
              username: `@${channel.creator.name}`,
              day_created_at: moment(channel.created_at).format(
                intl.formatMessage({ id: WITHOUT_TIME_DATE_FORMAT }),
              ),
              tag: (msg: any) => <CreatorName>{msg}</CreatorName>,
            } as any)
            .toString()}
        />
      </Description>
    </Wrapper>
  );
}

export function MessageStartFromDirectMessage({
  user,
}: {
  user: Moim.User.IUser;
}) {
  const intl = useIntl();
  const openProfileDialog = useOpenProfileDialog();
  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      if (user.id && !user.is_deactivated) {
        openProfileDialog(user.id, { current: e.currentTarget });
      }
    },
    [openProfileDialog, user.id, user.is_deactivated],
  );

  return (
    <Wrapper>
      <DirectMessageHeader>
        <BaseItemCell
          hover={false}
          title={
            <DirectMessageTitle>
              <ShavedText
                value={
                  <NativeEmojiSafeText
                    role="button"
                    value={user.name}
                    onClick={handleClick}
                  />
                }
                line={1}
              />
            </DirectMessageTitle>
          }
          size="member"
          leftElement={{
            element: (
              <UserProfileImage
                role="button"
                size="s"
                userId={user.id}
                src={user.avatar_url || ""}
                isOnline={user.presence === "ACTIVE"}
              />
            ),
            props: {
              leftContentsSize: "m",
              margin: {
                left: MarginSize.FOUR,
                right: MarginSize.ZERO,
              },
            },
          }}
        />
      </DirectMessageHeader>
      <Description>
        <NativeEmojiSafeText
          value={intl.formatMessage(
            { id: "dm_show/dm_header_title_sub" },
            { username: `@${user.name}` },
          )}
        />
      </Description>
    </Wrapper>
  );
}

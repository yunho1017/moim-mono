import * as React from "react";
import { FormattedMessage } from "react-intl";
import MemoFromNow from "common/components/fromNow";
import { NotificationGroupKeyType } from "app/enums";
import NotificationItem from "../notificationItem";
import { Wrapper, Title, Contents } from "./styled";

interface IProps {
  type: Moim.Enums.NotificationGroupKeyType;
  notifications: Moim.Notification.INotification[];
}

export default function NotificationGroup({ type, notifications }: IProps) {
  const title = React.useMemo(() => {
    switch (type) {
      case NotificationGroupKeyType.TODAY:
        return <FormattedMessage id="notifications/date_today" />;
      case NotificationGroupKeyType.YESTERDAY:
        return <FormattedMessage id="notifications/date_yesterday" />;
      case NotificationGroupKeyType.OLDER:
        return <FormattedMessage id="notifications/date_older" />;
    }
  }, [type]);

  if (!notifications.length) {
    return null;
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Contents>
        {notifications.map(noti => (
          <NotificationItem
            key={`${noti.createdAt}_${noti.channelId}_${noti.parentId}_${noti.itemId}`}
            itemId={noti.itemId}
            parentId={noti.parentId}
            type={noti.notiType}
            channelType={noti.channelType}
            profile={noti.sender.image}
            title={noti.itemHeader}
            description={noti.itemBody}
            status={[
              noti.groupName,
              noti.channelName,
              <MemoFromNow givenDate={noti.createdAt} />,
            ]}
            host={noti.host}
            redirectTo={noti.uri}
            isUnread={noti.readAt === 0}
          />
        ))}
      </Contents>
    </Wrapper>
  );
}

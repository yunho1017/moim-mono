import moment from "moment";
import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { notificationListDenormalizer } from "app/models/notification";
import { NotificationType, NotificationGroupKeyType } from "app/enums";

const getNotificationGroupDefaultValue = () =>
  ({
    [NotificationGroupKeyType.TODAY]: [] as Moim.Notification.INotification[],
    [NotificationGroupKeyType.YESTERDAY]: [] as Moim.Notification.INotification[],
    [NotificationGroupKeyType.OLDER]: [] as Moim.Notification.INotification[],
  } as Moim.Notification.NotificationGroupByCreatedAtTypes);

const groupingNotificationByCreatedAt = (
  notifications: Moim.Notification.NotificationGroupByCreatedAtTypes,
  notification: Moim.Notification.INotification,
  today: moment.Moment,
  yesterday: moment.Moment,
) => {
  const createdAt = moment(notification.createdAt);
  if (createdAt.isAfter(today)) {
    notifications[NotificationGroupKeyType.TODAY].push(notification);
  } else if (createdAt.isBetween(yesterday, today)) {
    notifications[NotificationGroupKeyType.YESTERDAY].push(notification);
  } else {
    notifications[NotificationGroupKeyType.OLDER].push(notification);
  }
  return notifications;
};

export const selectNotificationGroup = createSelector(
  (state: IAppState) =>
    notificationListDenormalizer(
      state.notification.allNotifications,
      state.entities,
    ),
  (state: IAppState) =>
    notificationListDenormalizer(
      state.notification.mentionNotifications,
      state.entities,
    ),
  (allNotifications, mentionNotifications) => {
    const today = moment().startOf("day");
    const yesterday = moment()
      .add(-1, "days")
      .startOf("day");

    const allNotificationGroups = allNotifications.data.reduce<
      Moim.Notification.NotificationGroupByCreatedAtTypes
    >(
      (result, current) =>
        groupingNotificationByCreatedAt(result, current, today, yesterday),
      getNotificationGroupDefaultValue(),
    );

    const mentionNotificationGroups = mentionNotifications.data.reduce<
      Moim.Notification.NotificationGroupByCreatedAtTypes
    >(
      (result, current) =>
        groupingNotificationByCreatedAt(result, current, today, yesterday),
      getNotificationGroupDefaultValue(),
    );

    return {
      [NotificationType.ALL]: {
        ...allNotifications,
        data: allNotificationGroups,
      },
      [NotificationType.MENTION]: {
        ...mentionNotifications,
        data: mentionNotificationGroups,
      },
    };
  },
);

export const selectNotificationLength = createSelector(
  (state: IAppState) => state.notification.allNotifications,
  (state: IAppState) => state.notification.mentionNotifications,
  (allNotifications, mentionNotifications) => ({
    [NotificationType.ALL]: allNotifications.data.length,
    [NotificationType.MENTION]: mentionNotifications.data.length,
  }),
);

export const selectNotificationLoading = createSelector(
  (state: IAppState) => state.notification.isAllNotificationsLoading,
  (state: IAppState) => state.notification.isMentionNotificationLoading,
  (isAllNotificationsLoading, isMentionNotificationLoading) => ({
    [NotificationType.ALL]: isAllNotificationsLoading,
    [NotificationType.MENTION]: isMentionNotificationLoading,
  }),
);

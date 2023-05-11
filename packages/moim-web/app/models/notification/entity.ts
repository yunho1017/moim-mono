import { schema } from "normalizr";

export const notificationsDefinition = {};

export const notificationEntity = new schema.Entity<
  Moim.Conversations.INormalizedMessage
>("notifications", notificationsDefinition, {
  idAttribute(notification: Moim.Notification.INormalizedNotification) {
    return `${notification.createdAt}_${notification.itemId}`;
  },
});
export const notificationSingleItemEntity = new schema.Object<
  Moim.Conversations.INormalizedMessage
>({
  data: notificationEntity,
});
export const notificationListEntity = new schema.Object<
  Moim.Conversations.INormalizedMessage
>({
  data: new schema.Array(notificationEntity),
});

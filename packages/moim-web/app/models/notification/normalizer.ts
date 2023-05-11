import { normalize } from "normalizr";
import {
  notificationEntity,
  notificationListEntity,
  notificationSingleItemEntity,
} from "./entity";

export const notificationNormalizer = (
  notification: Moim.Notification.INormalizedNotification,
) =>
  normalize<
    Moim.Notification.INormalizedNotification,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(notification, notificationEntity);

export const notificationSingleItemNormalizer = (
  notification: Moim.ISingleItemResponse<
    Moim.Notification.INormalizedNotification
  >,
) =>
  normalize<
    Moim.Notification.INormalizedNotification,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(notification, notificationSingleItemEntity);

export const notificationListNormalizer = <
  T extends Moim.IListResponse<Moim.Notification.INormalizedNotification>
>(
  notifications: T,
) =>
  normalize<
    Moim.Notification.INormalizedNotification,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(notifications, notificationListEntity);

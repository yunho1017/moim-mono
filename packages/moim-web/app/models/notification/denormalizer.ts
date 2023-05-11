import { denormalize } from "../";
import {
  notificationSingleItemEntity,
  notificationListEntity,
  notificationEntity,
} from "./entity";

export const notificationDenormalizer = <T = Moim.Id>(
  input: T,
  entities: Moim.Entity.INormalizedData,
): Moim.Notification.INotification =>
  denormalize<T, Moim.Notification.INotification>(
    input,
    notificationEntity,
    entities,
  );

export const notificationSingleItemDenormalizer = <
  T = Moim.ISingleItemResponse<Moim.Id>
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.ISingleItemResponse<Moim.Notification.INotification>>(
    input,
    notificationSingleItemEntity,
    entities,
  );

export const notificationListDenormalizer = <
  T extends Moim.IListResponse<Moim.Id>
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Notification.INotification>>(
    input,
    notificationListEntity,
    entities,
  );

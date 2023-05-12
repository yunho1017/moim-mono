declare namespace Moim {
  namespace Notification {
    type NotificationType = "mention" | "likePost" | "commentPost";
    interface INormalizedNotification {
      notiType: NotificationType;
      itemId: Id;
      itemHeader: NotificationItemHeader;
      itemBody: string;

      sender: {
        id: Id;
        name: string;
        image: string | undefined;
      };

      parentId: Id;
      channelId: Id;
      groupName: string;
      channelName: string;
      channelType: Channel.Type;
      uri: string;
      host: string;
      createdAt: number;
      readAt: number;
    }
    type INormalizedData = INormalizedEntities<INormalizedMessage>;

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface INotification extends INormalizedNotification {}

    interface NotificationItemHeader {
      ko: string;
      en: string;
    }
    type NotificationGroupByCreatedAtTypes = Record<
      Enums.NotificationGroupKeyType,
      INotification[]
    >;
    interface IGetNotificationsRequestQuery extends IPaging {
      type: Enums.NotificationType;
      limit?: number;
      includingNotListed?: boolean;
    }

    type IGetNotificationsRequest = IGetNotificationsRequestQuery;

    type IGetNotificationsResponseBody = IPaginatedListResponse<INotification>;
  }
}

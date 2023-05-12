declare namespace Moim {
  declare namespace DirectMessage {
    interface INormalizedDirectMessage {
      id: string;
      members: Id[];
      creator: Id;
      created_at: number;
      latest: string;
      stat: Channel.IChannelStat;
      blocked: boolean;
      sendable: boolean;
    }

    interface IDirectMessage
      extends Omit<INormalizedDirectMessage, "creator" | "members"> {
      type: "dm";
      id: any;
      members: User.IUser[];
      creator: User.IUser;
    }

    type INormalizedData = INormalizedEntities<INormalizedDirectMessage>;

    interface IDirectMessageDialogState {
      open: boolean;
    }

    interface IGetDirectMessagesRequestQuery extends IPaging {
      limit?: number; // default: 30
    }

    type IGetDirectMessagesRequest = IGetDirectMessagesRequestQuery;

    type IGetDirectMessagesResponseBody = IPaginatedListResponse<
      INormalizedDirectMessage
    >;

    interface IGetDirectMessageRequestPath {
      direct_message_id: Id;
    }

    type IGetDirectMessageRequest = IGetDirectMessageRequestPath;

    type IGetDirectMessageResponseBody = ISingleItemResponse<
      INormalizedDirectMessage
    >;

    interface ICreateDirectMessageRequestBody {
      direct_message: {
        invitees: Id[];
      };
    }

    type ICreateDirectMessageRequest = ICreateDirectMessageRequestBody;

    type ICreateDirectMessageResponseBody = ISingleItemResponse<
      INormalizedDirectMessage
    >;
  }
}

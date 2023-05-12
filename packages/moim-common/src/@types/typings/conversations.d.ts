// http://petstore.swagger.io/?url=https://3zogor8jbl.execute-api.us-east-1.amazonaws.com/stage/swagger#/default/listMessages
declare namespace Moim {
  namespace Conversations {
    interface INormalizedMessage {
      id: Id;
      user: Id;
      content: string;
      blocks?: Blockit.Blocks[];
      deleted: boolean;
      created_at: number;
      updated_at: number;
      parent_id: Id;
    }

    type INormalizedData = INormalizedEntities<INormalizedMessage>;
    type IConversationNormalizedData = INormalizedEntities<
      INormalizedConversation
    >;

    interface IMessage extends Omit<INormalizedMessage, "user"> {
      user: Moim.User.IUser;
    }

    type IMessageGroupList = IDateFilteredMessages<IMessageGroup>;

    interface IDateFilteredMessages<T> {
      created_at: number;
      data: T[];
    }

    interface IMessageGroup {
      user: User.IUser;
      created_at: number;
      messages: IMessage[];
    }

    // GET: /api/conversations
    interface IListConversationsRequestQuery {
      limit?: number; // default: 30
      after?: string;
    }

    type IListConversationsResponseBody = IPaginatedListResponse<
      INormalizedConversation
    >;

    // POST: /api/conversations
    interface ICreateConversationRequestBody {
      conversation: {
        name: string;
      };
    }

    type ICreateConversationRequest = ICreateConversationRequestBody;

    type ICreateConversationResponseBody = ISingleItemResponse<
      Channel.ICommonSimpleChannel
    >;

    // GET: /api/conversations/{channel_id}
    interface IConversationInformationRequestPath {
      channel_id: Moim.Id;
    }

    type IConversationInformationRequest = IConversationInformationRequestPath;

    type IConversationInformationResponseBody = ISingleItemResponse<
      INormalizedConversation
    >;

    // GET: /api/conversations/{channel_id}/members
    interface IConversationMembersRequestPath {
      channel_id: Moim.Id;
    }

    interface IConversationMembersRequestQuery extends IPaging {
      limit?: number; // default: 30
    }

    type IConversationMembersRequest = IConversationMembersRequestPath &
      IConversationMembersRequestQuery;

    type IConversationMembersResponseBody = IPaginatedListResponse<
      User.IOriginalUserDatum
    >;

    // POST: ​/api​/conversations​/{channel_id}​/relation
    interface IJoinConversationRequestPath {
      channel_id: Moim.Id;
    }

    type IJoinConversationRequest = IJoinConversationRequestPath;

    type IJoinConversationResponseBody = ISingleItemResponse<
      INormalizedConversation
    >;

    // PUT: /api/conversations/{channel_id}/name
    interface IRenameConversationRequestPath {
      channel_id: Moim.Id;
    }

    interface IRenameConversationRequestBody {
      conversation: {
        name: string;
      };
    }

    type IRenameConversationRequest = IRenameConversationRequestBody &
      IRenameConversationRequestPath;

    type IRenameConversationResponseBody = ISingleItemResponse<
      Channel.ICommonSimpleChannel
    >;

    // PUT: /api/conversations/{channel_id}/topic
    interface IEditConversationTopicRequestPath {
      channel_id: Moim.Id;
    }

    interface IEditConversationTopicRequestBody {
      conversation: {
        topic: string | null;
      };
    }

    type IEditConversationTopicRequest = IEditConversationTopicRequestPath &
      IEditConversationTopicRequestBody;

    type IEditConversationTopicResponseBody = ISingleItemResponse<
      Channel.ICommonSimpleChannel
    >;

    // PUT: /api/conversations/{channel_id}/purpose
    interface IEditConversationPurposeRequestPath {
      channel_id: Moim.Id;
    }

    interface IEditConversationPurposeRequestBody {
      conversation: {
        purpose: string | null;
      };
    }

    type IEditConversationPurposeRequest = IEditConversationPurposeRequestPath &
      IEditConversationPurposeRequestBody;

    type IEditConversationPurposeResponseBody = ISingleItemResponse<
      Channel.ICommonSimpleChannel
    >;

    // GET: /api/conversations/{channel_id}/messages
    interface IConversationMessagesRequestPath {
      channel_id: Moim.Id;
    }

    interface IConversationMessagesRequestQuery extends IPaging {
      limit?: number; // default: 50
    }

    type IConversationMessagesRequest = IConversationMessagesRequestPath &
      IConversationMessagesRequestQuery;

    type IConversationMessagesResponseBody = IPaginatedListResponse<
      INormalizedMessage
    >;

    // POST: /api/conversations/{channel_id}/messages
    interface ICreateConversationMessageRequestPath {
      channel_id: Moim.Id;
    }

    interface ICreateConversationMessageRequestBody {
      message: {
        content?: string;
        files?: Moim.Id[];
      };
    }

    type ICreateConversationMessageRequest = ICreateConversationMessageRequestPath &
      ICreateConversationMessageRequestBody;

    type ICreateConversationMessageResponseBody = ISingleItemResponse<
      INormalizedMessage
    >;

    interface IEditConversationMessageRequestPath {
      channel_id: Moim.Id;
      message_id: Moim.Id;
    }

    interface IEditConversationMessageRequestBody {
      message: {
        content?: string;
        files?: Moim.Id[];
      };
    }

    type IEditConversationMessageRequest = IEditConversationMessageRequestPath &
      IEditConversationMessageRequestBody;

    type IEditConversationMessageResponseBody = ISingleItemResponse<
      INormalizedMessage
    >;

    interface INormalizedConversation extends Channel.INormalizedCommonChannel {
      type: "conversation";
    }

    interface IConversation
      extends Omit<INormalizedConversation, "group" | "creator"> {
      group: Group.IGroup;
      creator: User.IUser;
    }

    type INormalizedConversationData = INormalizedEntities<
      INormalizedConversation
    >;

    interface ICreateConversationMessageRequestBody {
      message: {
        content: string;
      };
    }

    type ICreateConversationMessageRequest = ICreateConversationMessageRequestPath &
      ICreateConversationMessageRequestBody;

    type ICreateConversationMessageResponseBody = ISingleItemResponse<
      INormalizedMessage
    >;

    type IConversationListResponseBody = IPaginatedListResponse<
      IConversationNormalizedData
    >;

    interface IGetSearchMessagesRequest extends IPaging {
      query: string;
      limit?: number;
      contentTypes?: SearchContentType;
      filter?: ISearchFilterOption;
    }

    interface ISearchedMessageBody {
      moimName: string;
      channelName: string;
      channelId: string;
      content: {
        id: string;
        creator: {
          id: string;
          username: string;
          avatar?: string;
        };
        createdAt: number;
        body: {
          texts?: string[];
          files?: Blockit.IFileBlock[];
        };
      };
      url: string;
    }
  }
}
